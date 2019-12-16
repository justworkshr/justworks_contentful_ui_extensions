export const getStatus = entry => {
  if (
    entry.sys &&
    entry.sys.publishedAt &&
    entry.sys.publishedAt === entry.sys.updatedAt
  ) {
    return "published";
  } else if (
    entry.sys &&
    entry.sys.publishedAt &&
    entry.sys.publishedAt !== entry.sys.updatedAt
  ) {
    return "changed";
  } else if (entry.sys && entry.sys.archivedAt) {
    return "archived";
  } else {
    return "draft";
  }
};
