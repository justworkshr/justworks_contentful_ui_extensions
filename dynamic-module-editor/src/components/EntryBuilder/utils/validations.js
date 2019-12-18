import { getEntryContentTypeId } from './index';

export const validateTemplate = async ({ setInvalid, state, setState }) => {
  const errors = await getTemplateErrors(
    state.templateConfig.fieldRoles,
    state.entryInternalMapping,
    state.entries
  );

  const isValid = templateIsValid(errors);
  setState(
    {
      errors
    },
    () => {
      if (isValid) {
        setInvalid(false);
      } else {
        setInvalid(true);
      }
    }
  );
};

const addError = (errorArray, message) => {
  return Array.isArray(errorArray) ? errorArray.push({ message: message }) : [{ message: message }];
};

const missingRequiredRoles = (errors, templateConfigFieldRoles, internalMapping) => {
  Object.keys(templateConfigFieldRoles).forEach(roleKey => {
    const templateRole = templateConfigFieldRoles[roleKey] || {};
    if (!!templateRole.required && !internalMapping[roleKey]) {
      errors[roleKey] = addError(errors[roleKey], 'Entry is required.');
    }
  });

  return errors;
};

const hasInvalidCustomTemplateType = (errors, templateConfigFieldRoles, hydratedEntries) => {
  Object.keys(templateConfigFieldRoles).map(roleKey => {
    const roleMappingObject = templateConfigFieldRoles[roleKey] || {};
    const entry = hydratedEntries.find(he => roleMappingObject.value === he.sys.id);
    if (
      entry &&
      !!roleMappingObject.allowedCustomTemplates &&
      getEntryContentTypeId(entry) == 'customTemplate' &&
      !roleMappingObject.allowedCustomTemplates.includes(entry.fields.type['en-US'].toLowerCase())
    ) {
      errors[roleKey] = addError(
        errors[roleKey],
        `Invalid template type: ${
          entry.fields.type['en-US']
        }. Valid types for this role are: ${roleMappingObject.allowedCustomTemplates.join(', ')}`
      );
    }
  });

  return errors;
};

export const getTemplateErrors = (
  templateConfigFieldRoles,
  updatedInternalMapping,
  hydratedEntries
) => {
  let errors = {};
  errors = missingRequiredRoles(
    errors,
    templateConfigFieldRoles,
    updatedInternalMapping.fieldRoles
  );
  errors = hasInvalidCustomTemplateType(errors, templateConfigFieldRoles, hydratedEntries);

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

const validateAssetType = (entry, assetTypes) => {
  if (!assetTypes) return true;
  return assetTypes.some(type => entry.fields.file['en-US'].contentType.includes(type));
};

export const validateLinkedAsset = (entry, roleObject) => {
  if (!entry) return;
  let message = '';
  if (!validateAssetType(entry, roleObject.assetTypes)) {
    message = `Only ${roleObject.assetTypes.map(t => t).join(', ')} assets are allowed.`;
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
    !!linkedEntry.fields.entries &&
    !!Object.keys(linkedEntry.fields.entries).length &&
    !!linkedEntry.fields.entries['en-US']
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
  const template = linkedEntry.fields.type['en-US'];
  return (
    !!role.allowedCustomTemplates.length &&
    !role.allowedCustomTemplates.includes(template ? template.toLowerCase() : undefined)
  );
};
