import { getEntry } from './shared';

export const cloneEntry = async (space, entry, name) => {
  const entrySys = entry.sys || entry.getSys();
  const contentType = entrySys.contentType.sys.id;
  const clonedEntry = await space.createEntry(contentType, {
    fields: await constructFields(space, entry, contentType, name)
  });
  return clonedEntry;
};

const constructFields = async (space, entry, contentType, name) => {
  const fields = {};
  let multiReferenceCount = {};
  for (let [key, value] of Object.entries(entry.fields)) {
    let parsedValue =
      key === 'name' || key === 'internalName'
        ? name
        : value['en-US'] || value._fieldLocales['en-US']._value;

    if (
      parsedValue &&
      parsedValue.sys &&
      parsedValue.sys.type === 'Link' &&
      parsedValue.sys.linkType === 'Entry'
    ) {
      // Single reference
      const linkEntry = await getEntry(space, parsedValue.sys.id);
      const linkEntryContentType = linkEntry.sys.contentType.sys.id;
      const clonedEntry = await cloneEntry(space, linkEntry, `${name} ${linkEntryContentType}`);
      fields[key] = {
        ['en-US']: constructLink(clonedEntry)
      };
    } else if (
      (value.type === 'Array' && value.items && value.items.type === 'Link') ||
      Array.isArray(value['en-US'])
    ) {
      // Multi Reference
      const references = await Promise.all(
        parsedValue.map(async link => {
          const linkEntry = await getEntry(space, link.sys.id);
          const linkEntryContentType = linkEntry.sys.contentType.sys.id;
          multiReferenceCount[linkEntryContentType] = multiReferenceCount[linkEntryContentType]
            ? (multiReferenceCount[linkEntryContentType] += 1)
            : 1;
          const clonedEntry = await cloneEntry(
            space,
            linkEntry,
            `${name} ${linkEntryContentType} ${multiReferenceCount[linkEntryContentType]}`
          );

          return constructLink(clonedEntry);
        })
      );

      fields[key] = {
        ['en-US']: references
      };
    } else {
      // Assets, all other fields
      fields[key] = {
        ['en-US']: parsedValue
      };
    }
  }

  return fields;
};

const constructLink = entry => {
  return {
    sys: {
      id: entry.sys.id,
      linkType: entry.sys.type,
      type: 'Link'
    }
  };
};
