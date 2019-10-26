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

// Groups an array of objects by key
export const groupByContentType = (internalMapping, entries) => {
  if (!Object.keys(internalMapping).length) return {};
  const groups = {};

  Object.keys(internalMapping).forEach(key => {
    groups[internalMapping[key].contentType] = {
      ...groups[internalMapping[key].contentType],
      [key]: undefined
    };
  });

  if (!Object.keys(entries).length) return groups;
  Object.keys(entries).forEach(key => {
    groups[entries[key].sys.contentType.sys.id][key] = entries[key];
  });

  return groups;
};
