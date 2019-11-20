export const constructRole = ({
  contentType = '',
  linkAsset = false,
  description = '',
  allowedCustomTemplates = [],
  required = true,
  fieldType = ''
} = {}) => {
  return {
    contentType,
    linkAsset,
    description,
    allowedCustomTemplates,
    required,
    fieldType
  };
};
