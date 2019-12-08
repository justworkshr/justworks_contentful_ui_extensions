import * as c from '../../../custom_templates/constants';
import { cloneEntry } from '../../../shared/utilities/deepCopy';

import {
  constructLink,
  removeByIndex,
  selectAssetEntries,
  createEntry,
  createAsset,
  constructEntryName,
  getContentTypeArray,
  cleanStyleClasses
} from './index';
import InternalMapping from '../utils/InternalMapping';

import { addFieldAsset, addFieldAssets } from './sdkUtils';

import {
  addStateField,
  addStateAsset,
  addStateAssets,
  addStateEntry,
  addStateEntries,
  removeStateEntry,
  removeStateLoadingEntry,
  setEntryLoading
} from './stateUtils';

import { validateLinkedEntry, validateLinkedAsset } from '../utils/validations';

export const handleRemoveEntry = ({
  sdk,
  state,
  setState,
  timeoutUpdateEntry,
  roleKey,
  entryIndex = null
} = {}) => {
  if (!roleKey) return null;
  const entriesValue = sdk.entry.fields.entries.getValue();
  const updatedInternalMapping = state.entryInternalMapping;
  updatedInternalMapping.removeEntry(roleKey, entryIndex);

  // State Entries object
  const updatedStateEntryList = removeStateEntry(state.entries, updatedInternalMapping, entryIndex);

  // State Loading Entries object
  const updatedStateLoadingEntries = removeStateLoadingEntry(
    state.loadingEntries,
    updatedInternalMapping
  );

  // CustomTemplate entries field
  const updatedEntryList = removeByIndex(entriesValue, entryIndex);

  // CustomTemplate assets field
  const updatedAssetList = selectAssetEntries(updatedStateEntryList).map(asset =>
    constructLink(asset)
  );

  setState(
    () => {
      return {
        loadingEntries: updatedStateLoadingEntries,
        entries: updatedStateEntryList,
        entryInternalMapping: updatedInternalMapping
      };
    },
    () => {
      timeoutUpdateEntry({
        updatedEntries: updatedEntryList,
        updatedAssets: updatedAssetList,
        updatedInternalMapping,
        ms: 0
      });
    }
  );
};

const updateInternalMapping = ({ setState, timeoutUpdateEntry, updatedInternalMapping }) => {
  setState({ entryInternalMapping: updatedInternalMapping }, () => {
    timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
  });
};

const updateAssets = ({
  updatedAssetList,
  updatedStateAssetList,
  updatedInternalMapping,
  setState,
  timeoutUpdateEntry
}) => {
  setState(
    () => {
      return {
        entries: updatedStateAssetList,
        entryInternalMapping: updatedInternalMapping
      };
    },
    () => [
      timeoutUpdateEntry({
        updatedAssets: updatedAssetList,
        updatedInternalMapping,
        ms: 150
      })
    ]
  );
};

const updateField = ({
  setState,
  timeoutUpdateEntry,
  updatedStateEntries,
  updatedInternalMapping
} = {}) => {
  setState(
    () => {
      return {
        entries: updatedStateEntries,
        updatedInternalMapping
      };
    },
    () => {
      timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
    }
  );
};

const updateEntries = ({
  setState,
  timeoutUpdateEntry,
  updatedStateEntries,
  updatedEntries,
  updatedInternalMapping
}) => {
  setState(
    () => {
      return {
        entries: updatedStateEntries,
        updatedInternalMapping
      };
    },
    () => {
      timeoutUpdateEntry({ updatedEntries: updatedEntries, updatedInternalMapping, ms: 150 });
    }
  );
};

const linkAssetsToTemplate = ({ sdk, state, setState, assets, roleKey, timeoutUpdateEntry }) => {
  const roleConfigObject = state.templateConfig.fieldRoles[roleKey];
  const updatedInternalMapping = state.entryInternalMapping;
  const firstAsset =
    state.entryInternalMapping[roleKey] && !!state.entryInternalMapping[roleKey].value.length
      ? state.entryInternalMapping[roleKey].value.find(el => el.type === c.FIELD_TYPE_ASSET)
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

  const assetsValue = sdk.entry.fields.assets.getValue();
  const updatedAssetList = addFieldAssets(assetsValue, assets);
  const updatedStateAssetList = addStateAssets(state.entries, roleKey, assets);

  updateAssets({
    updatedStateAssetList,
    updatedAssetList,
    updatedInternalMapping,
    setState,
    timeoutUpdateEntry
  });
};

const linkAssetToTemplate = ({ sdk, state, setState, asset, roleKey, timeoutUpdateEntry }) => {
  const roleConfigObject = state.templateConfig.fieldRoles[roleKey];
  const updatedInternalMapping = state.entryInternalMapping;

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

  const assetsValue = sdk.entry.fields.assets.getValue();
  const updatedAssetList = addFieldAsset(assetsValue, asset);
  const updatedStateAssetList = addStateAsset(state.entries, roleKey, asset);

  updateAssets({
    updatedStateAssetList,
    updatedAssetList,
    updatedInternalMapping,
    setState,
    timeoutUpdateEntry
  });
};

export const handleMultipleAssetsLink = async ({
  sdk,
  state,
  setState,
  roleKey,
  assets,
  timeoutUpdateEntry
} = {}) => {
  let linkedEntryValidation;

  assets.forEach(asset => {
    linkedEntryValidation = validateLinkedAsset(asset, state.templateConfig.fieldRoles[roleKey]);
  });

  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  } else {
    linkAssetsToTemplate({ sdk, state, setState, assets, roleKey, timeoutUpdateEntry });
  }
};

export const handleSingleAssetLink = async ({
  sdk,
  state,
  setState,
  roleKey,
  asset,
  timeoutUpdateEntry
} = {}) => {
  if (!asset) return;

  const linkedEntryValidation = validateLinkedAsset(
    asset,
    state.templateConfig.fieldRoles[roleKey]
  );
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  linkAssetToTemplate({ sdk, state, setState, asset, roleKey, timeoutUpdateEntry });
};

export const handleLinkAssetClick = async ({
  sdk,
  state,
  setState,
  timeoutUpdateEntry,
  roleKey
} = {}) => {
  if (state.templateConfig.fieldRoles[roleKey].allowMultipleReferences) {
    const assets = await sdk.dialogs.selectMultipleAssets({
      locale: 'en-US'
    });
    handleMultipleAssetsLink({
      sdk,
      state,
      setState,
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
      state,
      setState,
      roleKey,
      asset,
      timeoutUpdateEntry
    });
  }
};

export const linkEntryToTemplate = ({
  sdk,
  state,
  setState,
  timeoutUpdateEntry,
  entryResponse,
  roleKey
}) => {
  if (!entryResponse) throw new Error('No entryResponse was passed to linkEntryToTemplate');
  const entriesFieldValue = sdk.entry.fields.entries.getValue() || [];

  const updatedStateEntries = addStateEntry(state.entries, roleKey, entryResponse);
  const updatedEntries = [...entriesFieldValue, constructLink(entryResponse)];
  const updatedInternalMapping = state.entryInternalMapping;
  updatedInternalMapping.addEntry(roleKey, entryResponse.sys.id);

  updateEntries({
    setState,
    timeoutUpdateEntry,
    updatedStateEntries,
    updatedEntries,
    updatedInternalMapping
  });
};

export const linkEntriesToTemplate = ({
  sdk,
  state,
  setState,
  timeoutUpdateEntry,
  entryResponses,
  roleKey
} = {}) => {
  const entriesFieldValue = sdk.entry.fields.entries.getValue() || [];
  const updatedStateEntries = addStateEntries(state.entries, roleKey, entryResponses);
  const updatedEntries = [
    ...entriesFieldValue,
    ...entryResponses.map(entry => constructLink(entry))
  ];
  const updatedInternalMapping = state.entryInternalMapping;
  const roleConfigObject = state.templateConfig.fieldRoles[roleKey];
  updatedInternalMapping.addEntriesOrAssets({
    key: roleKey,
    value: entryResponses.map(entry => entry.sys.id),
    styleClasses: (roleConfigObject || {}).defaultClasses
  });

  updateEntries({
    setState,
    timeoutUpdateEntry,
    updatedStateEntries,
    updatedEntries,
    updatedInternalMapping
  });
};

export const handleAddField = async ({
  sdk,
  state,
  setState,
  timeoutUpdateEntry,
  roleKey,
  field
}) => {
  const roleConfigObject = state.templateConfig.fieldRoles[roleKey];
  const updatedInternalMapping = state.entryInternalMapping;
  updatedInternalMapping.addField({
    key: roleKey,
    type: field.type,
    styleClasses: roleConfigObject.defaultClasses
  });

  const updatedStateEntries = addStateField(
    state.entries,
    roleKey,
    InternalMapping.entryMapping({ ...updatedInternalMapping[roleKey] })
  );

  updateField({
    setState,
    timeoutUpdateEntry,
    updatedStateEntries,
    updatedInternalMapping
  });
};

export const handleAddEntry = async ({
  sdk,
  state,
  setState,
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

    if (state.templateConfig.fieldRoles[roleKey].allowMultipleReferences) {
      linkEntriesToTemplate({
        sdk,
        state,
        setState,
        timeoutUpdateEntry,
        entryResponses: [newEntry],
        roleKey
      });
    } else {
      linkEntryToTemplate({
        sdk,
        state,
        setState,
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
  state,
  setState,
  timeoutUpdateEntry,
  roleKey,
  entryResponse
} = {}) => {
  if (!entryResponse) throw new Error('No entryResponse was passed to handleSingleEntryLink');
  const linkedEntryValidation = validateLinkedEntry(
    entryResponse,
    roleKey,
    sdk.entry.getSys().id,
    state.templateConfig.fieldRoles
  );
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  linkEntryToTemplate({
    sdk,
    state,
    setState,
    timeoutUpdateEntry,
    entryResponse,
    roleKey
  });
};

export const handleMultipleEntriesLink = async ({
  sdk,
  state,
  setState,
  timeoutUpdateEntry,
  roleKey,
  entryResponses
}) => {
  if (!entryResponses)
    throw new Error('No entryResponses were passed to handleMultipleEntriesLink');

  let linkedEntryValidation;
  entryResponses.forEach(entry => {
    linkedEntryValidation = validateLinkedEntry(
      entry,
      roleKey,
      sdk.entry.getSys().id,
      state.templateConfig.fieldRoles
    );

    if (linkedEntryValidation) {
      return sdk.notifier.error(linkedEntryValidation);
    }
  });

  if (!linkedEntryValidation) {
    linkEntriesToTemplate({
      sdk,
      state,
      setState,
      timeoutUpdateEntry,
      entryResponses,
      roleKey
    });
  }
};

export const handleLinkEntryClick = async ({
  sdk,
  state,
  setState,
  timeoutUpdateEntry,
  roleKey,
  contentType
} = {}) => {
  if (state.templateConfig.fieldRoles[roleKey].allowMultipleReferences) {
    const entryResponses = await sdk.dialogs.selectMultipleEntries({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    handleMultipleEntriesLink({
      sdk,
      state,
      setState,
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
      state,
      setState,
      timeoutUpdateEntry,
      roleKey,
      entryResponse
    });
  }
};

export const handleDeepCloneClick = async ({
  sdk,
  state,
  setState,
  timeoutUpdateEntry,
  roleKey,
  contentType
} = {}) => {
  setEntryLoading({ setState, roleKey, value: true });
  const entry = await sdk.dialogs.selectSingleEntry({
    locale: 'en-US',
    contentTypes: getContentTypeArray(contentType)
  });

  const linkedEntryValidation = validateLinkedEntry(
    entry,
    roleKey,
    sdk.entry.getSys().id,
    state.templateConfig.fieldRoles
  );
  if (linkedEntryValidation) {
    return sdk.notifier.error(linkedEntryValidation);
  }

  if (entry) {
    setEntryLoading({ setState, roleKey, value: true });
    const clonedEntry = await cloneEntry(
      sdk.space,
      entry,
      `${sdk.entry.fields.name.getValue()} ${roleKey}`
    );

    linkEntryToTemplate({
      sdk,
      state,
      setState,
      timeoutUpdateEntry,
      entryResponse: clonedEntry,
      roleKey
    });

    setEntryLoading({ setState, roleKey, value: false });
    sdk.notifier.success('Deep copy completed. New entry is now linked.');
  }
};

export const handleUpdateEntryStyle = ({
  setState,
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

  updateInternalMapping({
    setState,
    timeoutUpdateEntry,
    updatedInternalMapping: internalMappingObject
  });
};

export const handleUpdateReferencesStyle = ({
  setState,
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

  updateInternalMapping({
    setState,
    timeoutUpdateEntry,
    updatedInternalMapping: internalMappingObject
  });
};

export const handleEntryEditClick = async ({ sdk, state, setState, entry, type } = {}) => {
  if (!entry) return null;
  if (type === 'entry') {
    await sdk.navigator.openEntry(entry.sys.id, { slideIn: true });
  } else if (type === 'asset') {
    await sdk.navigator.openAsset(entry.sys.id, { slideIn: true });
  }
  const rolesNavigatedTo = [
    ...sdk.entry.fields.entries
      .getValue()
      .filter(e => e.sys.id === entry.sys.id)
      .map(e => {
        return Object.keys(state.entries).find(
          key => (state.entries[key].sys || {}).id === e.sys.id // may not work for array multi-references
        );
      })
  ];

  setState(prevState => ({
    rolesNavigatedTo: [...prevState.rolesNavigatedTo, ...rolesNavigatedTo]
  }));
};

export const handleFieldChange = ({ state, setState, timeoutUpdateEntry, e, roleKey } = {}) => {
  const value = e.currentTarget.value;
  if (typeof value === 'string') {
    let updatedInternalMapping = state.entryInternalMapping;
    updatedInternalMapping[roleKey] = value;

    const styleClasses = cleanStyleClasses(
      updatedInternalMapping[roleKey].styleClasses,
      updatedInternalMapping[roleKey].value
    );

    updatedInternalMapping.setStyleClasses(roleKey, styleClasses);

    const updatedStateEntries = addStateField(
      state.entries,
      roleKey,
      InternalMapping.entryMapping({ ...updatedInternalMapping[roleKey], value })
    );

    updateField({
      setState,
      timeoutUpdateEntry,
      updatedStateEntries,
      updatedInternalMapping
    });
  }
};
