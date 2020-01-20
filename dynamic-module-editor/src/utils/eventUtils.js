import * as c from '../../../customModules/constants';
import { cloneEntry } from '../../../shared/utilities/deepCopy';
import { duplicateEntry } from '../../../shared/utilities/duplicate';

import {
  createEntry,
  createAsset,
  constructEntryName,
  getContentTypeArray,
  cleanStyleClasses,
  roleIsMultiReference
} from '../components/EntryBuilder/utils/index';
import InternalMapping from '../classes/InternalMapping';

import {
  validateLinkedEntry,
  validateLinkedAsset
} from '../components/EntryBuilder/utils/validations';

import { getAssetType } from '../../../shared/utilities/elementUtils';

export const handleRemoveMappingKey = ({
  updateEntry,
  mappingKey,
  entryIndex = null,
  entryInternalMapping
} = {}) => {
  if (!mappingKey) return null;
  const updatedInternalMapping = entryInternalMapping;
  updatedInternalMapping.removeEntry(mappingKey, entryIndex);
  updateEntry(updatedInternalMapping.asJSON());
};

const linkAssetsToTemplate = ({ entryInternalMapping, assets, mappingKey, updateEntry }) => {
  const updatedInternalMapping = entryInternalMapping;

  updatedInternalMapping.addEntriesOrAssets({
    key: mappingKey,
    value: assets.map(asset => {
      return InternalMapping.assetMapping({
        type: c.FIELD_TYPE_ASSET,
        value: asset.sys.id,
        assetUrl: asset.fields.file['en-US'].url,
        assetType: getAssetType(asset.fields.file['en-US'].contentType)
      });
    })
  });

  updateEntry(updatedInternalMapping.asJSON());
};

const linkAssetToTemplate = ({ entryInternalMapping, asset, mappingKey, updateEntry }) => {
  const updatedInternalMapping = entryInternalMapping;

  updatedInternalMapping.addAsset(
    mappingKey,
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
  mappingObject,
  entryInternalMapping,
  mappingKey,
  assets,
  updateEntry
} = {}) => {
  let linkedEntryValidation;
  assets.forEach(asset => {
    linkedEntryValidation = validateLinkedAsset(asset, mappingObject[mappingKey]);
  });
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  } else {
    linkAssetsToTemplate({ entryInternalMapping, assets, mappingKey, updateEntry });
  }
};

export const handleSingleAssetLink = ({
  sdk,
  mappingKey,
  asset,
  updateEntry,
  mappingObject,
  entryInternalMapping,
  assetType
} = {}) => {
  if (!asset) return;
  const linkedEntryValidation = validateLinkedAsset(asset, assetType);
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  linkAssetToTemplate({ entryInternalMapping, asset, mappingKey, updateEntry });
};

export const handleLinkAssetClick = async ({
  sdk,
  mappingObject,
  entryInternalMapping,
  updateEntry,
  mappingKey,
  assetType,
  multiple
} = {}) => {
  if (multiple) {
    try {
      const assets = await sdk.dialogs.selectMultipleAssets({
        locale: 'en-US'
      });
      handleMultipleAssetsLink({
        sdk,
        mappingObject,
        entryInternalMapping,
        mappingKey,
        assets,
        updateEntry,
        assetType
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
        mappingObject,
        entryInternalMapping,
        mappingKey,
        asset,
        updateEntry,
        assetType
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};

export const linkEntryToTemplate = ({
  updateEntry,
  entryResponse,
  mappingKey,
  entryInternalMapping
}) => {
  if (!entryResponse) return;

  const updatedInternalMapping = entryInternalMapping;
  updatedInternalMapping.addEntry(mappingKey, entryResponse.sys.id);
  updateEntry(updatedInternalMapping.asJSON());
};

export const linkEntriesToTemplate = ({
  updateEntry,
  entryResponses,
  mappingKey,
  entryInternalMapping
} = {}) => {
  const updatedInternalMapping = entryInternalMapping;
  updatedInternalMapping.addEntriesOrAssets({
    key: mappingKey,
    value: entryResponses.map(entry => entry.sys.id)
  });

  updateEntry(updatedInternalMapping.asJSON());
};

export const handleAddField = ({
  setInternalMappingValue,
  mappingKey,
  fieldType,
  entryInternalMapping
}) => {
  const updatedInternalMapping = entryInternalMapping;
  updatedInternalMapping.addField({
    key: mappingKey,
    type: fieldType
  });

  setInternalMappingValue(updatedInternalMapping.asJSON());
};

export const handleAddEntry = async ({
  sdk,
  updateEntry,
  mappingKey,
  contentType,
  template = undefined,
  type = 'entry',
  entryInternalMapping,
  multiple = false
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
      const newEntryName = constructEntryName(sdk.entry.fields.name.getValue(), mappingKey);
      const newEntry = await createEntry(sdk.space, contentType, newEntryName, template);

      if (multiple) {
        linkEntriesToTemplate({
          updateEntry,
          entryResponses: [newEntry],
          mappingKey,
          entryInternalMapping
        });
      } else {
        linkEntryToTemplate({
          updateEntry,
          entryResponse: newEntry,
          mappingKey,
          entryInternalMapping
        });
      }
      sdk.navigator.openEntry(newEntry.sys.id, { slideIn: true });
    } catch (e) {
      throw new Error(e.message);
    }
  }
};

export const handleSingleEntryLink = ({
  sdk,
  updateEntry,
  mappingKey,
  entryResponse,
  mappingObject,
  entryInternalMapping
} = {}) => {
  if (!entryResponse) throw new Error('No entryResponse was passed to handleSingleEntryLink');

  const linkedEntryValidation = validateLinkedEntry(
    entryResponse,
    mappingKey,
    sdk.entry.getSys().id,
    mappingObject
  );

  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  linkEntryToTemplate({
    updateEntry,
    entryResponse,
    mappingKey,
    entryInternalMapping
  });
};

export const handleMultipleEntriesLink = ({
  sdk,
  updateEntry,
  mappingKey,
  entryResponses,
  mappingObject,
  entryInternalMapping
}) => {
  if (!entryResponses) return;

  let linkedEntryValidation;
  entryResponses.forEach(entry => {
    linkedEntryValidation = validateLinkedEntry(
      entry,
      mappingKey,
      sdk.entry.getSys().id,
      mappingObject
    );

    if (linkedEntryValidation) {
      return sdk.notifier.error(linkedEntryValidation);
    }
  });

  if (!linkedEntryValidation) {
    linkEntriesToTemplate({
      updateEntry,
      entryResponses,
      mappingKey,
      entryInternalMapping
    });
  }
};

export const handleLinkEntryClick = async ({
  sdk,
  updateEntry,
  mappingKey,
  contentType,
  mappingObject,
  entryInternalMapping,
  multiple = false
} = {}) => {
  if (multiple) {
    const entryResponses = await sdk.dialogs.selectMultipleEntries({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    handleMultipleEntriesLink({
      sdk,
      updateEntry,
      mappingKey,
      entryResponses,
      mappingObject,
      entryInternalMapping
    });
  } else {
    const entryResponse = await sdk.dialogs.selectSingleEntry({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    handleSingleEntryLink({
      sdk,
      updateEntry,
      mappingKey,
      entryResponse,
      mappingObject,
      entryInternalMapping
    });
  }
};

export const handleDeepCopyClick = async ({
  sdk,
  updateEntry,
  mappingKey,
  contentType,
  entry = undefined,
  mappingObject,
  entryInternalMapping,
  multiple
} = {}) => {
  entry =
    entry ||
    (await sdk.dialogs.selectSingleEntry({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    }));
  const linkedEntryValidation = validateLinkedEntry(
    entry,
    mappingKey,
    sdk.entry.getSys().id,
    mappingObject
  );
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  if (entry) {
    const clonedEntry = await cloneEntry(
      sdk.space,
      entry,
      `${sdk.entry.fields.name.getValue()} ${mappingKey}`
    );
    // Only links 1 entry at a time, even in multi-reference fields
    if (multiple) {
      linkEntriesToTemplate({
        updateEntry,
        entryResponses: [clonedEntry],
        mappingKey,
        entryInternalMapping
      });
    } else {
      linkEntryToTemplate({
        updateEntry,
        entryResponse: clonedEntry,
        mappingKey,
        entryInternalMapping
      });
    }
    sdk.notifier.success('Deep copy completed. New entry is now linked.');
  }
};

export const handleDuplicateClick = async ({
  sdk,
  updateEntry,
  mappingKey,
  contentType,
  entry = undefined,
  mappingObject,
  entryInternalMapping,
  multiple
} = {}) => {
  entry =
    entry ||
    (await sdk.dialogs.selectSingleEntry({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    }));
  const linkedEntryValidation = validateLinkedEntry(
    entry,
    mappingKey,
    sdk.entry.getSys().id,
    mappingObject
  );
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  if (entry) {
    const duplicatedEntry = await duplicateEntry(sdk.space, entry);
    // Only links 1 entry at a time, even in multi-reference fields
    if (multiple) {
      linkEntriesToTemplate({
        updateEntry,
        entryResponses: [duplicatedEntry],
        mappingKey,
        entryInternalMapping
      });
    } else {
      linkEntryToTemplate({
        updateEntry,
        entryResponse: duplicatedEntry,
        mappingKey,
        entryInternalMapping
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

export const handleFieldChange = ({
  entryInternalMapping,
  setInternalMappingValue,
  e,
  mappingKey
} = {}) => {
  const value = e.currentTarget.value;
  if (typeof value === 'string') {
    let updatedInternalMapping = entryInternalMapping;
    updatedInternalMapping[mappingKey].value = value;

    // if ((updatedInternalMapping[mappingKey].style || {}).type === c.STYLE_TYPE_CUSTOM) {
    //   const styleClasses = cleanStyleClasses(
    //     updatedInternalMapping[mappingKey].styleClasses,
    //     updatedInternalMapping[mappingKey].value
    //   );

    //   updatedInternalMapping.setStyleValue(mappingKey, styleClasses);
    // }

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

export const handleAddComponentZone = ({
  mappingKey,
  componentZoneName,
  entryInternalMapping,
  setInternalMappingValue
} = {}) => {
  const updatedInternalMapping = entryInternalMapping;
  updatedInternalMapping.addComponentZone({ mappingKey, componentZoneName });
  setInternalMappingValue(updatedInternalMapping.asJSON());
};

export const handleClearComponentZone = ({
  mappingKey,
  entryInternalMapping,
  setInternalMappingValue
} = {}) => {
  const updatedInternalMapping = entryInternalMapping;
  updatedInternalMapping.clearComponentZone({ mappingKey });
  setInternalMappingValue(updatedInternalMapping.asJSON());
};
