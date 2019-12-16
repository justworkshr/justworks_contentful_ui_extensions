export const constructLink = entry => {
  if (!entry) return undefined;
  return {
    sys: {
      type: "Link",
      linkType: entry.sys.type,
      id: entry.sys.id
    }
  };
};
