export const getEntry = async (space, id) => {
  return await space.getEntry(id);
};

const getEntrySys = entry => {
  return entry.sys || entry.getSys()
}

const isSingleReference = fieldValue => {
  return fieldValue &&
  fieldValue.sys &&
  fieldValue.sys.type === 'Link' &&
  fieldValue.sys.linkType === 'Entry'
}

const isMultiReference = fieldObject => {
  return (fieldObject.type === 'Array' && fieldObject.items && fieldObject.items.type === 'Link') ||
  Array.isArray(fieldObject['en-US'])
}

const fetchMultiReferences = async (space, fieldValue, name) => {
  const multiReferenceCount = {}
  const references = await Promise.all(
    fieldValue.map(async link => {
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

  return references
}

export const cloneEntry = async (space, entry, name) => {
  const entrySys = getEntrySys(entry);
  const contentType = entrySys.contentType.sys.id;
  const clonedEntry = await space.createEntry(contentType, {
    fields: contentType === 'customTemplate' ? await constructCustomTemplateFields(space, entry, contentType, name) : await constructFields(space, entry, contentType, name)
  });
  return clonedEntry;
};

const constructFields = async (space, entry, contentType, name) => {
  const fields = {};
  for (let [key, value] of Object.entries(entry.fields)) {
    let parsedField =
      key === 'name'
        ? name
        : value['en-US'] || value._fieldLocales['en-US']._value;

    if (isSingleReference(parsedField)) {
      // Single reference
      const linkEntry = await getEntry(space, parsedField.sys.id);
      const linkEntryContentType = linkEntry.sys.contentType.sys.id;
      const clonedEntry = await cloneEntry(space, linkEntry, `${name} ${linkEntryContentType}`);
      fields[key] = {
        ['en-US']: constructLink(clonedEntry)
      };
    } else if (isMultiReference(value)) {
      // Multi Reference, not customTemplate
      const references = await fetchMultiReferences(space, parsedField, name)

      fields[key] = {
        ['en-US']: references
      };
    } else {
      // Assets, all other fields
      fields[key] = {
        ['en-US']: parsedField
      };
    }
  }

  return fields;
};

const constructCustomTemplateFields = async (space, entry, contentType, name) => {
  const fields = {};
  for (let [key, value] of Object.entries(entry.fields)) {
    let parsedField =
      key === 'name'
        ? name
        : value['en-US'] || value._fieldLocales['en-US']._value;

    if (isSingleReference(parsedField)) {
      // Single reference
      const linkEntry = await getEntry(space, parsedField.sys.id);
      const linkEntryContentType = linkEntry.sys.contentType.sys.id;
      const clonedEntry = await cloneEntry(space, linkEntry, `${name} ${linkEntryContentType}`);
      fields[key] = {
        ['en-US']: constructLink(clonedEntry)
      };
    } else if (isMultiReference(value)) {
      if (key === 'entries') continue
      // Multi Reference, not customTemplate
      const references = await fetchMultiReferences(space, parsedField, name)

      fields[key] = {
        ['en-US']: references
      };
    } else {
      if (key === 'internalMapping') continue
      // Assets, all other fields except customTemplate's internalMapping field
      fields[key] = {
        ['en-US']: parsedField
      };
    }
  }

  // Handle customTemplate separately

  if (getEntrySys(entry).contentType.sys.id === 'customTemplate') {
    const entries = entry.fields.entries['en-US']
    let internalMapping = entry.fields.internalMapping['en-US']
    internalMapping = internalMapping ? JSON.parse(internalMapping) : internalMapping

    let newInternalMapping = {}
    let newEntries = []
    await Promise.all(await Object.keys(internalMapping).map(async key => {
      const entryId = entries.find(e => getEntrySys(e).id === internalMapping[key]).sys.id

      if (entryId) {
        const fetchedEntry = await getEntry(space, entryId)
        const entryContentType = getEntrySys(entry).contentType.sys.id;

        const clonedEntry = await cloneEntry(
          space,
          fetchedEntry,
          `${name} ${entryContentType} ${key}`
        );

        newInternalMapping[key] = getEntrySys(clonedEntry).id
        newEntries.push(constructLink(clonedEntry))
      }
    }))

    fields['internalMapping'] = {
      ['en-US']: JSON.stringify(newInternalMapping)
    };

    fields['entries'] = {
      ['en-US']: newEntries
    };
  }

  return fields;
}

const constructLink = entry => {
  return {
    sys: {
      id: entry.sys.id,
      linkType: entry.sys.type,
      type: 'Link'
    }
  };
};