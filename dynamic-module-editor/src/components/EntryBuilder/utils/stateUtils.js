import * as c from '../../../../../custom_templates/constants';

import { removeByIndex, constructFieldEntry } from './index';

export const setEntryLoading = ({ setState, roleKey, value }) => {
  setState(prevState => ({
    loadingEntries: { ...prevState.loadingEntries, [roleKey]: value }
  }));
};

export const addStateAsset = (stateEntries, roleKey, newAsset) => {
  return {
    ...stateEntries,
    [roleKey]: newAsset
  };
};

export const addStateAssets = (stateEntries, roleKey, newAssets) => {
  const roleAssets =
    !!stateEntries[roleKey] && !!stateEntries[roleKey].length ? stateEntries[roleKey] : [];
  return {
    ...stateEntries,
    [roleKey]: [...roleAssets, ...newAssets]
  };
};

export const addStateField = (stateEntries, roleKey, fieldObject) => {
  const type = fieldObject.type === c.FIELD_TYPE_ASSET ? c.SYSTEM_TYPE_ASSET : c.SYSTEM_TYPE_FIELD;
  return {
    ...stateEntries,
    [roleKey]: constructFieldEntry(type, fieldObject)
  };
};

export const addStateEntry = (stateEntries, roleKey, entryResponse) => {
  return {
    ...stateEntries,
    [roleKey]: entryResponse
  };
};

export const addStateEntries = (stateEntries, roleKey, entryResponses) => {
  const roleEntries =
    !!stateEntries[roleKey] && !!stateEntries[roleKey].length ? stateEntries[roleKey] : [];
  return {
    ...stateEntries,
    [roleKey]: [...roleEntries, ...entryResponses]
  };
};

export const removeStateEntry = (stateEntries, updatedInternalMapping, entryIndex = null) => {
  return Object.assign(
    {},
    ...Object.keys(stateEntries)
      .filter(key => updatedInternalMapping.fieldKeys().includes(key))
      .map(key => ({
        [key]: Array.isArray(stateEntries[key])
          ? removeByIndex(stateEntries[key], entryIndex)
          : stateEntries[key]
      }))
  );
};

export const removeStateLoadingEntry = (stateLoadingEntries, updatedInternalMapping) => {
  return Object.assign(
    {},
    ...Object.keys(stateLoadingEntries).filter(key =>
      updatedInternalMapping.fieldKeys().includes(key)
    )
  );
};
