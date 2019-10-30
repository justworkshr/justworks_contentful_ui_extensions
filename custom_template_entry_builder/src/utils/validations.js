import { getEntryContentTypeId } from './index';

const addError = (errorArray, message) => {
  const error = { message: message };
  return Array.isArray(errorArray) ? errorArray.push(error) : [error];
};

const missingRequiredRoles = (errors, templateMapping, internalMapping) => {
  Object.keys(templateMapping).forEach(roleKey => {
    const templateRole = templateMapping[roleKey] || {};

    if (!!templateRole.required && !internalMapping[roleKey]) {
      errors[roleKey] = addError(errors[roleKey], 'Entry is required.');
    }
  });

  return errors;
};

const hasInvalidCustomTemplateType = (errors, templateMapping, entries) => {
  Object.keys(templateMapping).map(roleKey => {
    const templateRole = templateMapping[roleKey] || {};
    const entry = entries[roleKey];
    if (
      entry &&
      !!templateRole.allowedCustomTemplates &&
      getEntryContentTypeId(entry) == 'customTemplate' &&
      !templateRole.allowedCustomTemplates.includes(entry.fields.template['en-US'].toLowerCase())
    ) {
      errors[roleKey] = addError(
        errors[roleKey],
        `Invalid template type: ${
          entry.fields.template['en-US']
        }. Valid types for this role are: ${templateRole.allowedCustomTemplates.join(', ')}`
      );
    }
  });

  return errors;
};

export const getTemplateErrors = (templateMapping, updatedInternalMapping, entries) => {
  let errors = {};
  errors = missingRequiredRoles(errors, templateMapping, updatedInternalMapping);
  errors = hasInvalidCustomTemplateType(errors, templateMapping, entries);

  return errors;
};

export const templateIsValid = errorObject => {
  Object.keys(errorObject).forEach(key => {
    if (Array.isArray(errorObject[key]) && !errorObject[key].length) {
      delete errorObject[key];
    }
  });

  return !Object.keys(errorObject).length;
};
