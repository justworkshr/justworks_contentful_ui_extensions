import InternalMapping from './InternalMapping';

import { selectAssetEntries, constructFieldEntry, constructLink } from './index';

export const addStateAsset = (stateEntries, newAsset) => {
  let assetList = selectAssetEntries(stateEntries);

  return [...assetList, newAsset].filter(a => a).map(asset => constructLink(asset));
};

export const addStateEntry = (stateEntries, roleKey, fieldObject) => {
  const type =
    fieldObject.type === InternalMapping.ASSETSYS
      ? InternalMapping.ASSETSYS
      : InternalMapping.FIELDSYS;
  return {
    ...stateEntries,
    [roleKey]: constructFieldEntry(type, fieldObject)
  };
};

export const removeStateEntry = (stateEntries, updatedInternalMapping, entrySysId = null) => {
  return Object.assign(
    {},
    ...Object.keys(stateEntries)
      .filter(key => updatedInternalMapping.fieldKeys().includes(key))
      .map(key => ({
        [key]: Array.isArray(stateEntries[key])
          ? stateEntries[key].filter(entry => entry.sys.id !== entrySysId)
          : stateEntries[key]
      }))
  );
};
