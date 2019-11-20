import { getEntryContentTypeId } from './index';

const addError = (errorArray, message) => {
  return Array.isArray(errorArray) ? errorArray.push({ message: message }) : [{ message: message }];
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

export const validateLinkedAsset = entry => {
  if (!entry) return;
  let message = '';
  if (entry.fields.file['en-US'].contentType !== 'image/png') {
    message = 'Only image assets are allowed.';
  }

  return message;
};

export const validateLinkedEntry = (entry, roleKey, parentEntryId, internalMapping) => {
  if (!entry) return;
  let message = '';
  if (linkHasCircularReference(parentEntryId, entry)) {
    message = 'Linked entry has a circular reference to this entry.';
  } else if (linkHasInvalidCustomTemplateType(internalMapping[roleKey], entry)) {
    message = `Only the following Custom Template types are allowed: ${internalMapping[
      roleKey
    ].allowedCustomTemplates.join(', ')}`;
  }

  return message;
};

export const linkHasCircularReference = (thisEntryId, linkedEntry) => {
  if (!linkedEntry) return false;
  let circularReferenceFound = false;
  if (linkedEntry === thisEntryId) {
    circularReferenceFound = true;
  } else if (
    getEntryContentTypeId(linkedEntry) === 'customTemplate' &&
    !!linkedEntry.fields.entries
  ) {
    linkedEntry.fields.entries['en-US'].forEach(e => {
      if (e.sys.id === thisEntryId) {
        circularReferenceFound = true;
      }
    });
  }

  return circularReferenceFound;
};

export const linkHasInvalidCustomTemplateType = (role, linkedEntry) => {
  if (getEntryContentTypeId(linkedEntry) !== 'customTemplate') return false;
  const template = linkedEntry.fields.template['en-US'];
  return (
    !!role.allowedCustomTemplates.length &&
    !role.allowedCustomTemplates.includes(template ? template.toLowerCase() : undefined)
  );
};
