import * as c from '../../../customModules/constants';

export const linkFromMapping = roleMappingObject => {
  return {
    sys: {
      type: 'Link',
      linkType:
        roleMappingObject.type === c.FIELD_TYPE_ENTRY ? c.SYSTEM_TYPE_ENTRY : c.SYSTEM_TYPE_ASSET,
      id: roleMappingObject.value
    }
  };
};
