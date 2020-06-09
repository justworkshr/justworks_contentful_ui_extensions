export const capitalizeString = string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const schemaTitle = schema => {
  if (!schema) return '';
  return schema.meta.title || schema.meta.id || '< schema title missing >';
};

export const parse_underscore = string => {
  if (!string) return '';
  return string
    .split('_')
    .map(w => capitalizeString(w))
    .join(' ');
};
