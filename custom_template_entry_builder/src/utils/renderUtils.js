import InternalMapping from './InternalMapping';
import * as c from '../../../custom_templates/constants';

export const renderSingleEntryStyle = (roleType, roleConfigObject) => {
  if (c.FIELD_TYPES.includes(roleType)) return true; // if internalMapping type is a field
  if (
    roleType === InternalMapping.asset &&
    roleConfigObject.asset &&
    roleConfigObject.asset.formatting.allow
  )
    return true; // if internalMapping type is asset and asset formatting is allowed
  if (roleConfigObject.asset && roleConfigObject.asset.subType === c.ASSET_SUBTYPE_LOGO)
    return true; // if internalMapping type is asset and subtype is logo
};

export const renderMultiReferenceStyle = roleConfigObject => {
  return !!roleConfigObject.allowMultiReferenceStyle && !!roleConfigObject.multipleReferenceStyle;
};

export const renderMultiReferenceItemStyle = (roleConfigObject, roleMappingObject) => {
  return (
    !!roleConfigObject.allowMultiReferenceStyle &&
    !!roleConfigObject.multipleReferenceStyle && // When multi-reference field has assets
    !!roleMappingObject.value.find(entry => entry.type === InternalMapping.ASSET)
  );
};
