export const constructRole = ({
  contentType = '',
  description = '',
  allowedCustomTemplates = [],
  required = true
} = {}) => {
  return {
    contentType,
    description,
    allowedCustomTemplates,
    required
  };
};
