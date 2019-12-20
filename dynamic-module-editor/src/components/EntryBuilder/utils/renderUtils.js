import * as c from '../../../../../customModules/constants';

export const renderSingleEntryStyle = fieldConfigObject => {
  return !!(fieldConfigObject || {}).styleView;
};

export const renderMultiReferenceStyle = fieldConfigObject => {
  return !!(fieldConfigObject || {}).styleView;
};

export const renderMultiReferenceAssetStyle = (roleMappingObject, fieldConfigObject) => {
  return (
    !!fieldConfigObject.assetStyleView && // When multi-reference field has assetStyleView
    !!roleMappingObject.value.find(entry => entry.type === c.FIELD_TYPE_ASSET)
  );
};
