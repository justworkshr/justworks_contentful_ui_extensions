export const constructRole = ({ contentType = '', description = '', required = true } = {}) => {
  return {
    contentType,
    required,
    description
  };
};

export const getStatus = entry => {
  if (!entry) return null;
  if (entry.sys.publishedAt && entry.sys.publishedAt === entry.sys.updatedAt) {
    return 'published';
  } else if (entry.sys.publishedAt && entry.sys.publishedAt !== entry.sys.updatedAt) {
    return 'changed';
  } else if (entry.sys.archivedAt) {
    return 'archived';
  } else {
    return 'draft';
  }
};

export const constructLink = entry => {
  return {
    sys: {
      type: 'Link',
      linkType: entry.sys.type,
      id: entry.sys.id
    }
  };
};

export const constructEntryName = (parentName, entryDescriptor) => {
  return `${parentName} ${entryDescriptor}`;
};

export const createEntry = async (space, contentType, name) => {
  const newEntry = await space.createEntry(contentType, {
    fields: {
      name: { 'en-US': name }
    }
  });

  return newEntry;
};

// Groups an array of objects by key
export const groupByContentType = (internalMapping, entries) => {
  if (!Object.keys(internalMapping).length) return {};
  const groups = {};

  // { <"contentType">: {<"mappingId">: <"entryId">}...}
  // or:
  // { "text": {"left_text": "1234"}...}
  Object.keys(internalMapping).forEach(key => {
    groups[internalMapping[key].contentType] = {
      ...groups[internalMapping[key].contentType],
      [key]: undefined
    };
  });

  if (!Object.keys(entries).length) return groups;
  Object.keys(entries)
    .filter(entryKey => !!internalMapping[entryKey])
    .forEach(key => {
      const contentTypeKey = internalMapping[key].contentType;
      groups[contentTypeKey][key] = entries[key];
    });

  return groups;
};

export const displayContentType = contentType => {
  return contentType
    .split(',')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' or ');
};

export const displayRoleName = contentType => {
  return contentType.split('_').join(' ');
};
