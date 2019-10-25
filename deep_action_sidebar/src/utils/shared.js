export const getEntry = async (space, id) => {
  return await space.getEntry(id);
};

export const hasExcluviveLinkToEntry = async (space, entry) => {
  const entrySys = entry.sys || entry.getSys();
  const linkedEntries = await space.getEntries({
    links_to_entry: entrySys.id
  });

  return linkedEntries.items && linkedEntries.items.length <= 1;
};

export const getResolvedEntries = async ({
  space,
  entry,
  includeRoot = false,
  checkExlusive = true,
  array = []
} = {}) => {
  let entries = array;
  await Promise.all(
    await Object.entries(entry.fields).map(async ([key, value]) => {
      let parsedValue = value['en-US'] || value._fieldLocales['en-US']._value;

      if (
        parsedValue &&
        parsedValue.sys &&
        parsedValue.sys.type === 'Link' &&
        parsedValue.sys.linkType === 'Entry'
      ) {
        // Single reference
        const linkEntry = await getEntry(space, parsedValue.sys.id);

        await array.push(linkEntry);
      } else if (
        (value.type === 'Array' && value.items && value.items.type === 'Link') ||
        Array.isArray(value['en-US'])
      ) {
        // Multi Reference
        await Promise.all(
          await parsedValue.map(async link => {
            const linkEntry = await getEntry(space, link.sys.id);

            await Promise.all(
              await getResolvedEntries({
                space: space,
                entry: linkEntry,
                includeRoot: true,
                checkExlusive: checkExlusive,
                array: array
              })
            );
          })
        );
      }
    })
  );

  if (includeRoot) {
    const newEntry = entry.sys ? entry : await getEntry(space, entry.getSys().id);
    await array.push(newEntry);
  }

  if (checkExlusive) {
    // validate all for exlusivity, add 'isExclusive' property to object
    // remove all linked entries from list that link to non-exclusive object
    entries = await Promise.all(
      await entries.map(async entry => {
        return { ...entry, isExclusive: await hasExcluviveLinkToEntry(space, entry) };
      })
    );

    if (entries.some(entry => !entry.isExclusive)) {
      const entriesForRemoval = [];
      entries
        .filter(e => !e.isExclusive)
        .map(exclusiveEntry => {
          Object.entries(exclusiveEntry.fields).map(([key, value]) => {
            const parsedField = value['en-US'];
            if (
              parsedField.sys &&
              parsedField.sys.type === 'Link' &&
              parsedField.sys.linkType === 'Entry'
            ) {
              entriesForRemoval.push(parsedField.sys.id);
            } else if (Array.isArray(parsedField)) {
              parsedField.forEach(childEntry => {
                entriesForRemoval.push(childEntry.sys.id);
              });
            }
          });
        });

      entries = entries.filter(e => !entriesForRemoval.includes(e.sys.id));
    }
  }

  return entries;
};

export const getName = entry => {
  return (entry.fields.name || entry.fields.internalName)['en-US'].toUpperCase();
};
