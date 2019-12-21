import * as c from '../../../../../customModules/constants';
import { cloneEntry } from '../../../../../shared/utilities/deepCopy';
import { duplicateEntry } from '../../../../../shared/utilities/duplicate';

import {
  createEntry,
  createAsset,
  constructEntryName,
  getContentTypeArray,
  cleanStyleClasses,
  roleIsMultiReference
} from './index';
import InternalMapping from '../../../utils/InternalMapping';

import { validateLinkedEntry, validateLinkedAsset } from '../utils/validations';

import { getAssetType } from '../../../../../shared/utilities/elementUtils';

export const handleRemoveEntry = ({ props, updateEntry, roleKey, entryIndex = null } = {}) => {
  if (!roleKey) return null;
  const updatedInternalMapping = props.entryInternalMapping;
  updatedInternalMapping.removeEntry(roleKey, entryIndex);
  updateEntry(updatedInternalMapping.asJSON());
};

const linkAssetsToTemplate = ({ props, assets, roleKey, updateEntry }) => {
  const updatedInternalMapping = props.entryInternalMapping;

  // attaches existing asset style to new assets
  const firstAsset = updatedInternalMapping.fieldRoles[roleKey]
    ? updatedInternalMapping.fieldRoles[roleKey].value.find(
        entry => entry.type === c.FIELD_TYPE_ASSET
      )
    : undefined;
  let assetStyle;
  if (firstAsset) {
    assetStyle = firstAsset.style;
  }
  updatedInternalMapping.addEntriesOrAssets({
    key: roleKey,
    value: assets.map(asset => {
      return InternalMapping.assetMapping({
        type: c.FIELD_TYPE_ASSET,
        value: asset.sys.id,
        assetUrl: asset.fields.file['en-US'].url,
        assetType: getAssetType(asset.fields.file['en-US'].contentType),
        style: assetStyle
      });
    })
  });

  updateEntry(updatedInternalMapping.asJSON());
};

const linkAssetToTemplate = ({ props, asset, roleKey, updateEntry }) => {
  const updatedInternalMapping = props.entryInternalMapping;

  updatedInternalMapping.addAsset(
    roleKey,
    asset.sys.id,
    asset.fields.file['en-US'].url,
    getAssetType(asset.fields.file['en-US'].contentType)
  );

  updateEntry(updatedInternalMapping.asJSON());
};

export const handleAddRoleEntryStyle = async ({ sdk, props, roleKey } = {}) => {
  const entry = await sdk.dialogs.selectSingleEntry({
    contentTypes: ['style']
  });
  if (entry) {
    let updatedInternalMapping = props.entryInternalMapping;
    updatedInternalMapping.setStyleEntry(roleKey, entry.sys.id);

    props.updateEntry(updatedInternalMapping.asJSON());
  }
};

export const handleAddRoleReferencesEntryStyle = async ({ sdk, props, roleKey } = {}) => {
  const entry = await sdk.dialogs.selectSingleEntry({
    contentTypes: ['style']
  });
  if (entry) {
    let updatedInternalMapping = props.entryInternalMapping;
    updatedInternalMapping.setReferencesStyleEntry(roleKey, entry.sys.id);

    props.updateEntry(updatedInternalMapping.asJSON());
  }
};

export const handleMultipleAssetsLink = async ({
  sdk,
  props,
  roleKey,
  assets,
  updateEntry
} = {}) => {
  let linkedEntryValidation;
  assets.forEach(asset => {
    linkedEntryValidation = validateLinkedAsset(asset, props.templateConfig.fieldRoles[roleKey]);
  });
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  } else {
    linkAssetsToTemplate({ props, assets, roleKey, updateEntry });
  }
};

export const handleSingleAssetLink = ({ sdk, props, roleKey, asset, updateEntry } = {}) => {
  if (!asset) return;

  const linkedEntryValidation = validateLinkedAsset(
    asset,
    props.templateConfig.fieldRoles[roleKey]
  );
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  linkAssetToTemplate({ props, asset, roleKey, updateEntry });
};

export const handleLinkAssetClick = async ({ sdk, props, updateEntry, roleKey } = {}) => {
  if (roleIsMultiReference(props.templateConfig.fieldRoles[roleKey].fieldConfigs)) {
    try {
      const assets = await sdk.dialogs.selectMultipleAssets({
        locale: 'en-US'
      });
      handleMultipleAssetsLink({
        sdk,
        props,
        roleKey,
        assets,
        updateEntry
      });
    } catch (e) {
      throw new Error(e);
    }
  } else {
    try {
      const asset = await sdk.dialogs.selectSingleAsset({
        locale: 'en-US'
      });

      handleSingleAssetLink({
        sdk,
        props,
        roleKey,
        asset,
        updateEntry
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};

export const linkEntryToTemplate = ({ props, updateEntry, entryResponse, roleKey }) => {
  if (!entryResponse) return;

  const updatedInternalMapping = props.entryInternalMapping;
  updatedInternalMapping.addEntry(
    roleKey,
    entryResponse.sys.id,
    entryResponse.sys.contentType.sys.id
  );
  updateEntry(updatedInternalMapping.asJSON());
};

export const linkEntriesToTemplate = ({ props, updateEntry, entryResponses, roleKey } = {}) => {
  const updatedInternalMapping = props.entryInternalMapping;
  updatedInternalMapping.addEntriesOrAssets({
    key: roleKey,
    value: entryResponses.map(entry => entry.sys.id)
  });

  updateEntry(updatedInternalMapping.asJSON());
};

export const handleAddField = ({ props, setInternalMappingValue, roleKey, fieldType }) => {
  const updatedInternalMapping = props.entryInternalMapping;
  updatedInternalMapping.addField({
    key: roleKey,
    type: fieldType
  });

  setInternalMappingValue(updatedInternalMapping.asJSON());
};

export const handleAddEntry = async ({
  sdk,
  props,
  updateEntry,
  roleKey,
  contentType,
  template = undefined,
  type = 'entry'
}) => {
  if (type === 'asset') {
    try {
      const newAsset = await createAsset(sdk.space);
      sdk.navigator.openAsset(newAsset.sys.id, { slideIn: true });
    } catch (e) {
      throw new Error(e);
    }
  } else if (type === 'entry') {
    try {
      const newEntryName = constructEntryName(sdk.entry.fields.name.getValue(), roleKey);
      const newEntry = await createEntry(sdk.space, contentType, newEntryName, template);

      if (roleIsMultiReference(props.templateConfig.fieldRoles[roleKey].fieldConfigs)) {
        linkEntriesToTemplate({
          props,
          updateEntry,
          entryResponses: [newEntry],
          roleKey
        });
      } else {
        linkEntryToTemplate({
          props,
          updateEntry,
          entryResponse: newEntry,
          roleKey
        });
      }
      sdk.navigator.openEntry(newEntry.sys.id, { slideIn: true });
    } catch (e) {
      throw new Error(e.message);
    }
  }
};

export const handleSingleEntryLink = ({ sdk, props, updateEntry, roleKey, entryResponse } = {}) => {
  if (!entryResponse) throw new Error('No entryResponse was passed to handleSingleEntryLink');
  const linkedEntryValidation = validateLinkedEntry(
    entryResponse,
    roleKey,
    sdk.entry.getSys().id,
    props.templateConfig.fieldRoles
  );

  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  linkEntryToTemplate({
    props,
    updateEntry,
    entryResponse,
    roleKey
  });
};

export const handleMultipleEntriesLink = ({ sdk, props, updateEntry, roleKey, entryResponses }) => {
  if (!entryResponses) return;

  let linkedEntryValidation;
  entryResponses.forEach(entry => {
    linkedEntryValidation = validateLinkedEntry(
      entry,
      roleKey,
      sdk.entry.getSys().id,
      props.templateConfig.fieldRoles
    );

    if (linkedEntryValidation) {
      return sdk.notifier.error(linkedEntryValidation);
    }
  });

  if (!linkedEntryValidation) {
    linkEntriesToTemplate({
      props,
      updateEntry,
      entryResponses,
      roleKey
    });
  }
};

export const handleLinkEntryClick = async ({
  sdk,
  props,
  updateEntry,
  roleKey,
  contentType
} = {}) => {
  if (roleIsMultiReference(props.templateConfig.fieldRoles[roleKey].fieldConfigs)) {
    const entryResponses = await sdk.dialogs.selectMultipleEntries({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    handleMultipleEntriesLink({
      sdk,
      props,
      updateEntry,
      roleKey,
      entryResponses
    });
  } else {
    const entryResponse = await sdk.dialogs.selectSingleEntry({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    handleSingleEntryLink({
      sdk,
      props,
      updateEntry,
      roleKey,
      entryResponse
    });
  }
};

export const handleDeepCopyClick = async ({
  sdk,
  props,
  updateEntry,
  roleKey,
  contentType,
  entry = undefined
} = {}) => {
  entry =
    entry ||
    (await sdk.dialogs.selectSingleEntry({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    }));
  const linkedEntryValidation = validateLinkedEntry(
    entry,
    roleKey,
    sdk.entry.getSys().id,
    props.templateConfig.fieldRoles
  );
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  if (entry) {
    const clonedEntry = await cloneEntry(
      sdk.space,
      entry,
      `${sdk.entry.fields.name.getValue()} ${roleKey}`
    );
    // Only links 1 entry at a time, even in multi-reference fields
    if (roleIsMultiReference(props.templateConfig.fieldRoles[roleKey].fieldConfigs)) {
      linkEntriesToTemplate({
        props,
        updateEntry,
        entryResponses: [clonedEntry],
        roleKey
      });
    } else {
      linkEntryToTemplate({
        props,
        updateEntry,
        entryResponse: clonedEntry,
        roleKey
      });
    }
    sdk.notifier.success('Deep copy completed. New entry is now linked.');
  }
};

export const handleDuplicateClick = async ({
  sdk,
  props,
  updateEntry,
  roleKey,
  contentType,
  entry = undefined
} = {}) => {
  entry =
    entry ||
    (await sdk.dialogs.selectSingleEntry({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    }));
  const linkedEntryValidation = validateLinkedEntry(
    entry,
    roleKey,
    sdk.entry.getSys().id,
    props.templateConfig.fieldRoles
  );
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  if (entry) {
    const duplicatedEntry = await duplicateEntry(sdk.space, entry);
    // Only links 1 entry at a time, even in multi-reference fields
    if (roleIsMultiReference(props.templateConfig.fieldRoles[roleKey].fieldConfigs)) {
      linkEntriesToTemplate({
        props,
        updateEntry,
        entryResponses: [duplicatedEntry],
        roleKey
      });
    } else {
      linkEntryToTemplate({
        props,
        updateEntry,
        entryResponse: duplicatedEntry,
        roleKey
      });
    }
  }
};

export const handleUpdateEntryStyle = ({
  setInternalMappingValue,
  internalMappingObject,
  roleKey,
  styleKey,
  styleValue
} = {}) => {
  internalMappingObject.setStyleValue(roleKey, styleKey, styleValue);

  setInternalMappingValue(internalMappingObject.asJSON());
};

export const handleUpdateReferencesStyle = ({
  setInternalMappingValue,
  internalMappingObject,
  roleKey,
  styleKey,
  styleValue
} = {}) => {
  internalMappingObject.setReferencesStyle(roleKey, styleKey, styleValue);

  setInternalMappingValue(internalMappingObject.asJSON());
};

export const handleEntryEditClick = async ({ sdk, entry, type } = {}) => {
  if (!entry) return null;
  if (type === 'entry') {
    await sdk.navigator.openEntry(entry.sys.id, { slideIn: true });
  } else if (type === 'asset') {
    await sdk.navigator.openAsset(entry.sys.id, { slideIn: true });
  }
};

export const handleFieldChange = ({ props, setInternalMappingValue, e, roleKey } = {}) => {
  const value = e.currentTarget.value;
  if (typeof value === 'string') {
    let updatedInternalMapping = props.entryInternalMapping;
    updatedInternalMapping[roleKey] = value;

    if ((updatedInternalMapping[roleKey].style || {}).type === c.STYLE_TYPE_CUSTOM) {
      const styleClasses = cleanStyleClasses(
        updatedInternalMapping[roleKey].styleClasses,
        updatedInternalMapping[roleKey].value
      );

      updatedInternalMapping.setStyleValue(roleKey, styleClasses);
    }

    setInternalMappingValue(updatedInternalMapping.asJSON());
  }
};

export const handleMultiReferenceDragEnd = ({
  entryInternalMapping,
  setInternalMappingValue,
  roleKey,
  draggedIndex,
  draggedOverIndex
} = {}) => {
  const updatedInternalMapping = entryInternalMapping;
  updatedInternalMapping.switchMultiReferenceValues({ roleKey, draggedIndex, draggedOverIndex });
  setInternalMappingValue(updatedInternalMapping.asJSON());
};
