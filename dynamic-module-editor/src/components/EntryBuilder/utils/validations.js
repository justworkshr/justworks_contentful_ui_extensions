import { getEntryContentTypeId } from './index';
import * as c from '../../../../../customModules/constants';
import { getCustomTemplateFieldConfig } from '../../../../../shared/utilities/elementUtils';

export const validateTemplate = async ({ setInvalid, state, setState }) => {
  const errors = await getTemplateErrors(
    state.templateConfig.properties,
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

const missingRequiredRoles = (errors, componentProperties, internalMapping) => {
  Object.keys(componentProperties).forEach(roleKey => {
    const templateRole = componentProperties[roleKey] || {};
    if (!!templateRole.required && !internalMapping[roleKey]) {
      errors[roleKey] = addError(errors[roleKey], 'Entry is required.');
    }
  });

  return errors;
};

const hasInvalidCustomTemplateType = (errors, componentProperties, hydratedEntries) => {
  Object.keys(componentProperties).map(roleKey => {
    const roleConfigObject = componentProperties[roleKey] || {};
    const entry = hydratedEntries.find(he => roleConfigObject.value === he.sys.id);
    const customTemplateFieldConfigObject = getCustomTemplateFieldConfig(roleConfigObject);

    if (
      entry &&
      !!customTemplateFieldConfigObject.allowedCollectionModules &&
      getEntryContentTypeId(entry) == c.CONTENT_TYPE_COLLECTION_MODULE &&
      !customTemplateFieldConfigObject.allowedCollectionModules.includes(entry.fields.type['en-US'])
    ) {
      errors[roleKey] = addError(
        errors[roleKey],
        `Invalid template type: ${
          entry.fields.type['en-US']
        }. Valid types for this role are: ${customTemplateFieldConfigObject.allowedCollectionModules.join(
          ', '
        )}`
      );
    }
  });

  return errors;
};

export const getTemplateErrors = (componentProperties, updatedInternalMapping, hydratedEntries) => {
  let errors = {};
  errors = missingRequiredRoles(errors, componentProperties, updatedInternalMapping.componentZones);
  errors = hasInvalidCustomTemplateType(errors, componentProperties, hydratedEntries);

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

const validateAssetType = (entry, assetType) => {
  if (!assetType) return true;
  return entry.fields.file['en-US'].contentType.includes(assetType);
};

export const validateLinkedAsset = (entry, assetType) => {
  if (!entry) return;

  let message = '';
  if (!validateAssetType(entry, assetType)) {
    message = `Only ${assetType} assets are allowed.`;
  }

  return message;
};

export const validateLinkedEntry = (entry, mappingKey, parentEntryId, internalMapping) => {
  if (!entry) return;
  let message = '';
  // const customTemplateFieldConfigObject = getCustomTemplateFieldConfig(internalMapping[mappingKey]);

  if (linkHasCircularReference(parentEntryId, entry)) {
    message = 'Linked entry has a circular reference to this entry.';
  }
  // else if (linkHasInvalidCustomTemplateType(customTemplateFieldConfigObject, entry)) {
  //   message = `Only the following Custom Template types are allowed: ${customTemplateFieldConfigObject.allowedCollectionModules.join(
  //     ', '
  //   )}`;
  // }

  return message;
};

export const linkHasCircularReference = (thisEntryId, linkedEntry) => {
  if (!linkedEntry) return false;
  let circularReferenceFound = false;
  if (linkedEntry === thisEntryId) {
    circularReferenceFound = true;
  } else if (
    getEntryContentTypeId(linkedEntry) === c.CONTENT_TYPE_COLLECTION_MODULE &&
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
  if (getEntryContentTypeId(linkedEntry) !== c.CONTENT_TYPE_COLLECTION_MODULE) return false;
  const template = linkedEntry.fields.type['en-US'];
  return (
    !!fieldConfigObject.allowedCollectionModules.length &&
    !fieldConfigObject.allowedCollectionModules.includes(template ? template : undefined)
  );
};
