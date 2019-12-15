import * as c from '../../../../../custom_templates/constants';
import { cloneEntry } from '../../../../../shared/utilities/deepCopy';

import {
  createEntry,
  createAsset,
  constructEntryName,
  getContentTypeArray,
  cleanStyleClasses
} from './index';
import InternalMapping from '../../../utils/InternalMapping';

import { validateLinkedEntry, validateLinkedAsset } from '../utils/validations';

export const handleRemoveEntry = ({
  props,
  timeoutUpdateEntry,
  roleKey,
  entryIndex = null
} = {}) => {
  if (!roleKey) return null;
  const updatedInternalMapping = props.entryInternalMapping;
  updatedInternalMapping.removeEntry(roleKey, entryIndex);
  timeoutUpdateEntry({
    updatedInternalMapping,
    ms: 0
  });
};

const updateInternalMapping = ({ timeoutUpdateEntry, updatedInternalMapping }) => {
  timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
};

const updateAssets = ({ updatedInternalMapping, timeoutUpdateEntry }) => {
  timeoutUpdateEntry({
    updatedInternalMapping,
    ms: 0
  });
};

const updateField = ({ timeoutUpdateEntry, updatedInternalMapping } = {}) => {
  timeoutUpdateEntry({ updatedInternalMapping, ms: 0 });
};

const updateEntries = ({ timeoutUpdateEntry, updatedInternalMapping }) => {
  timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
};

const linkAssetsToTemplate = ({ props, assets, roleKey, timeoutUpdateEntry }) => {
  const roleConfigObject = props.templateConfig.fieldRoles[roleKey];
  const updatedInternalMapping = props.entryInternalMapping;
  const firstAsset =
    props.entryInternalMapping[roleKey] && !!props.entryInternalMapping[roleKey].value.length
      ? props.entryInternalMapping[roleKey].value.find(el => el.type === c.FIELD_TYPE_ASSET)
      : undefined;

  const assetStyleClasses = firstAsset
    ? firstAsset.styleClasses
    : roleConfigObject.asset.defaultClasses; // duplicate existing asset style classes to maintain consistancy
  updatedInternalMapping.addEntriesOrAssets({
    key: roleKey,
    value: assets.map(asset => {
      return InternalMapping.assetMapping({
        type: c.FIELD_TYPE_ASSET,
        value: asset.sys.id,
        assetUrl: asset.fields.file['en-US'].url,
        assetType: roleConfigObject.asset.type,
        formatting:
          roleConfigObject.asset.type === c.ASSET_TYPE_IMAGE
            ? { fm: 'png', w: roleConfigObject.asset.formatting.maxWidth }
            : {},
        styleClasses: assetStyleClasses
      });
    }),
    styleClasses: (roleConfigObject || {}).defaultClasses
  });

  updateAssets({
    updatedInternalMapping,
    timeoutUpdateEntry
  });
};

const linkAssetToTemplate = ({ props, asset, roleKey, timeoutUpdateEntry }) => {
  const roleConfigObject = props.templateConfig.fieldRoles[roleKey];
  const updatedInternalMapping = props.entryInternalMapping;

  updatedInternalMapping.addAsset(
    roleKey,
    asset.sys.id,
    asset.fields.file['en-US'].url,
    roleConfigObject.asset.type,
    roleConfigObject.asset.type === c.ASSET_TYPE_IMAGE
      ? { fm: 'png', w: roleConfigObject.asset.formatting.maxWidth }
      : {},
    roleConfigObject.asset.defaultClasses
  );

  updateAssets({
    updatedInternalMapping,
    timeoutUpdateEntry
  });
};

export const handleMultipleAssetsLink = async ({
  sdk,
  props,
  roleKey,
  assets,
  timeoutUpdateEntry
} = {}) => {
  let linkedEntryValidation;

  assets.forEach(asset => {
    linkedEntryValidation = validateLinkedAsset(asset, props.templateConfig.fieldRoles[roleKey]);
  });

  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  } else {
    linkAssetsToTemplate({ props, assets, roleKey, timeoutUpdateEntry });
  }
};

export const handleSingleAssetLink = async ({
  sdk,
  props,
  roleKey,
  asset,
  timeoutUpdateEntry
} = {}) => {
  if (!asset) return;

  const linkedEntryValidation = validateLinkedAsset(
    asset,
    props.templateConfig.fieldRoles[roleKey]
  );
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  linkAssetToTemplate({ props, asset, roleKey, timeoutUpdateEntry });
};

export const handleLinkAssetClick = async ({ sdk, props, timeoutUpdateEntry, roleKey } = {}) => {
  if (props.templateConfig.fieldRoles[roleKey].allowMultipleReferences) {
    const assets = await sdk.dialogs.selectMultipleAssets({
      locale: 'en-US'
    });
    handleMultipleAssetsLink({
      sdk,
      props,
      roleKey,
      assets,
      timeoutUpdateEntry
    });
  } else {
    const asset = await sdk.dialogs.selectSingleAsset({
      locale: 'en-US'
    });

    handleSingleAssetLink({
      sdk,
      props,
      roleKey,
      asset,
      timeoutUpdateEntry
    });
  }
};

export const linkEntryToTemplate = ({ props, timeoutUpdateEntry, entryResponse, roleKey }) => {
  if (!entryResponse) return;

  const updatedInternalMapping = props.entryInternalMapping;
  updatedInternalMapping.addEntry(roleKey, entryResponse.sys.id);
  updateEntries({
    timeoutUpdateEntry,
    updatedInternalMapping
  });
};

export const linkEntriesToTemplate = ({
  props,
  timeoutUpdateEntry,
  entryResponses,
  roleKey
} = {}) => {
  const updatedInternalMapping = props.entryInternalMapping;
  const roleConfigObject = props.templateConfig.fieldRoles[roleKey];
  updatedInternalMapping.addEntriesOrAssets({
    key: roleKey,
    value: entryResponses.map(entry => entry.sys.id),
    styleClasses: (roleConfigObject || {}).defaultClasses
  });

  updateEntries({
    timeoutUpdateEntry,
    updatedInternalMapping
  });
};

export const handleAddField = async ({ props, timeoutUpdateEntry, roleKey, field }) => {
  const roleConfigObject = props.templateConfig.fieldRoles[roleKey];
  const updatedInternalMapping = props.entryInternalMapping;
  updatedInternalMapping.addField({
    key: roleKey,
    type: field.type,
    styleClasses: roleConfigObject.defaultClasses
  });

  updateField({
    timeoutUpdateEntry,
    updatedInternalMapping
  });
};

export const handleAddEntry = async ({
  sdk,
  props,
  timeoutUpdateEntry,
  roleKey,
  contentType,
  template = undefined,
  type = 'entry'
}) => {
  if (type === 'asset') {
    const newAsset = await createAsset(sdk.space);

    sdk.navigator.openAsset(newAsset.sys.id, { slideIn: true });
  } else if (type === 'entry') {
    const newEntryName = constructEntryName(sdk.entry.fields.name.getValue(), roleKey);
    const newEntry = await createEntry(sdk.space, contentType, newEntryName, template);

    if (props.templateConfig.fieldRoles[roleKey].allowMultipleReferences) {
      linkEntriesToTemplate({
        props,
        timeoutUpdateEntry,
        entryResponses: [newEntry],
        roleKey
      });
    } else {
      linkEntryToTemplate({
        props,
        timeoutUpdateEntry,
        entryResponse: newEntry,
        roleKey
      });
    }
    sdk.navigator.openEntry(newEntry.sys.id, { slideIn: true });
  }
};

export const handleSingleEntryLink = async ({
  sdk,
  props,
  timeoutUpdateEntry,
  roleKey,
  entryResponse
} = {}) => {
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
    timeoutUpdateEntry,
    entryResponse,
    roleKey
  });
};

export const handleMultipleEntriesLink = async ({
  sdk,
  props,
  timeoutUpdateEntry,
  roleKey,
  entryResponses
}) => {
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
      timeoutUpdateEntry,
      entryResponses,
      roleKey
    });
  }
};

export const handleLinkEntryClick = async ({
  sdk,
  props,
  timeoutUpdateEntry,
  roleKey,
  contentType
} = {}) => {
  if (props.templateConfig.fieldRoles[roleKey].allowMultipleReferences) {
    const entryResponses = await sdk.dialogs.selectMultipleEntries({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    handleMultipleEntriesLink({
      sdk,
      props,
      timeoutUpdateEntry,
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
      timeoutUpdateEntry,
      roleKey,
      entryResponse
    });
  }
};

export const handleDeepCopyClick = async ({
  sdk,
  props,
  timeoutUpdateEntry,
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
    if (props.templateConfig.fieldRoles[roleKey].allowMultipleReferences) {
      linkEntriesToTemplate({
        props,
        timeoutUpdateEntry,
        entryResponses: [clonedEntry],
        roleKey
      });
    } else {
      linkEntryToTemplate({
        props,
        timeoutUpdateEntry,
        entryResponse: clonedEntry,
        roleKey
      });
    }
    sdk.notifier.success('Deep copy completed. New entry is now linked.');
  }
};

export const handleUpdateEntryStyle = ({
  timeoutUpdateEntry,
  internalMappingObject,
  roleKey,
  styleClasses
} = {}) => {
  internalMappingObject.setStyleClasses(
    roleKey,
    cleanStyleClasses(styleClasses, internalMappingObject[roleKey].value)
  );
  styleClasses = internalMappingObject[roleKey].styleClasses;

  timeoutUpdateEntry({ updatedInternalMapping: internalMappingObject, ms: 0 });
};

export const handleUpdateReferencesStyle = ({
  timeoutUpdateEntry,
  internalMappingObject,
  roleKey,
  styleClasses
} = {}) => {
  internalMappingObject.setReferencesStyleClasses(
    roleKey,
    cleanStyleClasses(styleClasses, internalMappingObject[roleKey].value)
  );
  styleClasses = internalMappingObject[roleKey].styleClasses;

  timeoutUpdateEntry({ updatedInternalMapping: internalMappingObject, ms: 0 });
};

export const handleEntryEditClick = async ({ sdk, entry, type } = {}) => {
  if (!entry) return null;
  if (type === 'entry') {
    await sdk.navigator.openEntry(entry.sys.id, { slideIn: true });
  } else if (type === 'asset') {
    await sdk.navigator.openAsset(entry.sys.id, { slideIn: true });
  }
};

export const handleFieldChange = ({ props, timeoutUpdateEntry, e, roleKey } = {}) => {
  const value = e.currentTarget.value;
  if (typeof value === 'string') {
    let updatedInternalMapping = props.entryInternalMapping;
    updatedInternalMapping[roleKey] = value;
    const styleClasses = cleanStyleClasses(
      updatedInternalMapping[roleKey].styleClasses,
      updatedInternalMapping[roleKey].value
    );

    updatedInternalMapping.setStyleClasses(roleKey, styleClasses);

    updateField({
      timeoutUpdateEntry,
      updatedInternalMapping
    });
  }
};
