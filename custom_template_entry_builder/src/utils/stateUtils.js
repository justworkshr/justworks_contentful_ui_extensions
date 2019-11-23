import InternalMapping from './InternalMapping';

import { selectAssetEntries, constructFieldEntry, constructLink } from './index';

export const addStateAsset = (stateEntries, newAsset) => {
  let assetList = selectAssetEntries(stateEntries);

  return [...assetList, newAsset].filter(a => a).map(asset => constructLink(asset));
};

export const addStateEntry = (stateEntries, roleKey, fieldObject) => {
  return {
    ...stateEntries,
    [roleKey]: constructFieldEntry(InternalMapping.FIELDSYS, fieldObject)
  };
};

export const removeStateEntry = (stateEntries, updatedInternalMapping) => {
  return Object.assign(
    {},
    ...Object.keys(stateEntries)
      .filter(key => updatedInternalMapping.fieldKeys().includes(key))
      .map(key => ({ [key]: stateEntries[key] }))
  );
};
