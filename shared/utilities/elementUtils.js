import * as c from "../../custom_templates/constants";

export const capitalize = string => {
  return string
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const displaySnakeCaseName = string => {
  return string
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const displayCamelCaseName = string => {
  return string
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, str => str.toUpperCase());
};

export const getStatus = entry => {
  if (
    entry &&
    entry.sys &&
    entry.sys.publishedAt &&
    entry.sys.publishedAt === entry.sys.updatedAt
  ) {
    return "published";
  } else if (
    entry &&
    entry.sys &&
    entry.sys.publishedAt &&
    entry.sys.publishedAt !== entry.sys.updatedAt
  ) {
    return "changed";
  } else if (entry && entry.sys && entry.sys.archivedAt) {
    return "archived";
  } else {
    return "draft";
  }
};

export const getAssetType = contentType => {
  if (contentType.includes(c.ASSET_TYPE_IMAGE)) return c.ASSET_TYPE_IMAGE;
  if (contentType.includes(c.ASSET_TYPE_VIDEO)) return c.ASSET_TYPE_VIDEO;
  if (contentType.includes(c.ASSET_TYPE_PDF)) return c.ASSET_TYPE_PDF;
};
