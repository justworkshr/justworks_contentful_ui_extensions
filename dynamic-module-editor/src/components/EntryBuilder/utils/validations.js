import { getEntryContentTypeId } from './index';
import * as c from '../../../../../customModules/constants';
import { getCustomTemplateFieldConfig } from '../../../../../shared/utilities/elementUtils';

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
    const roleConfigObject = templateConfigFieldRoles[roleKey] || {};
    const entry = hydratedEntries.find(he => roleConfigObject.value === he.sys.id);
    const customTemplateFieldConfigObject = getCustomTemplateFieldConfig(roleConfigObject);

    if (
      entry &&
      !!customTemplateFieldConfigObject.allowedCustomTemplates &&
      getEntryContentTypeId(entry) == c.CONTENT_TYPE_CUSTOM_TEMPLATE &&
      !customTemplateFieldConfigObject.allowedCustomTemplates.includes(
        entry.fields.type['en-US'].toLowerCase()
      )
    ) {
      errors[roleKey] = addError(
        errors[roleKey],
        `Invalid template type: ${
          entry.fields.type['en-US']
        }. Valid types for this role are: ${customTemplateFieldConfigObject.allowedCustomTemplates.join(
          ', '
        )}`
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
  if (!assetTypes || !assetTypes.length) return true;
  return assetTypes.some(type => entry.fields.file['en-US'].contentType.includes(type));
};

export const validateLinkedAsset = (entry, roleObject) => {
  if (!entry) return;
  const fieldConfigObject = roleObject.fieldConfigs.find(
    fc => fc.type === c.FIELD_TYPE_MULTI_REFERENCE
  )
    ? roleObject.fieldConfigs.find(fc => fc.type === c.FIELD_TYPE_MULTI_REFERENCE)
    : roleObject.fieldConfigs.find(fc => fc.type === c.FIELD_TYPE_ASSET);

  const assetTypes = fieldConfigObject.assetTypes || [];
  let message = '';
  if (!validateAssetType(entry, assetTypes)) {
    message = `Only ${assetTypes.map(t => t).join(', ')} assets are allowed.`;
  }

  return message;
};

export const validateLinkedEntry = (entry, roleKey, parentEntryId, internalMapping) => {
  if (!entry) return;
  let message = '';
  const customTemplateFieldConfigObject = getCustomTemplateFieldConfig(internalMapping[roleKey]);

  if (linkHasCircularReference(parentEntryId, entry)) {
    message = 'Linked entry has a circular reference to this entry.';
  } else if (linkHasInvalidCustomTemplateType(customTemplateFieldConfigObject, entry)) {
    message = `Only the following Custom Template types are allowed: ${customTemplateFieldConfigObject.allowedCustomTemplates.join(
      ', '
    )}`;
  }

  return message;
};

export const linkHasCircularReference = (thisEntryId, linkedEntry) => {
  if (!linkedEntry) return false;
  let circularReferenceFound = false;
  if (linkedEntry === thisEntryId) {
    circularReferenceFound = true;
  } else if (
    getEntryContentTypeId(linkedEntry) === c.CONTENT_TYPE_CUSTOM_TEMPLATE &&
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

export const linkHasInvalidCustomTemplateType = (fieldConfigObject, linkedEntry) => {
  if (getEntryContentTypeId(linkedEntry) !== c.CONTENT_TYPE_CUSTOM_TEMPLATE) return false;
  const template = linkedEntry.fields.type['en-US'];
  return (
    !!fieldConfigObject.allowedCustomTemplates.length &&
    !fieldConfigObject.allowedCustomTemplates.includes(
      template ? template.toLowerCase() : undefined
    )
  );
};
