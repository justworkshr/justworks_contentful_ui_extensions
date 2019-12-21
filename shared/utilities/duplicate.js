const getEntrySys = entry => {
  return entry.sys || entry.getSys();
};

export const duplicateEntry = async (space, entry) => {
  const entrySys = getEntrySys(entry);
  const contentType = entrySys.contentType.sys.id;
  const duplicatedEntry = await space.createEntry(contentType, {
    fields: {
      ...entry.fields,
      name: {
        "en-US": entry.fields.name["en-US"] + " - duplicate"
      }
    }
  });

  return duplicatedEntry;
};
