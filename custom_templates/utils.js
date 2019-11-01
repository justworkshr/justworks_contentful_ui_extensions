export const constructRole = ({
  contentType = '',
  description = '',
  allowedCustomTemplates = [],
  required = true,
  fieldType = ''
} = {}) => {
  return {
    contentType,
    description,
    allowedCustomTemplates,
    required,
    fieldType
  };
};
