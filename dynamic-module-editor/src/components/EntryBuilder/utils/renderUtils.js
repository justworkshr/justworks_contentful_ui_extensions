import InternalMapping from '../../../utils/InternalMapping';
import * as c from '../../../../../custom_templates/constants';
import { roleAllowsAssets, isDirectField } from './index';

export const renderSingleEntryStyle = (roleType, roleConfigObject) => {
  if (isDirectField(roleType)) return true; // if internalMapping type is a field
  if (
    roleAllowsAssets(roleConfigObject.fieldTypes) &&
    roleConfigObject.assetSubType === c.ASSET_SUBTYPE_LOGO
  )
    return true; // if internalMapping type is asset and subtype is logo
};

export const renderMultiReferenceStyle = roleConfigObject => {
  return !!roleConfigObject.multiReferenceStyleView;
};

export const renderMultiReferenceAssetStyle = (roleConfigObject, roleMappingObject) => {
  return (
    !!roleConfigObject.multiReferenceStyleView && // When multi-reference field has assets
    !!roleMappingObject.value.find(entry => entry.type === c.FIELD_TYPE_ASSET)
  );
};
