import { constructRole, allowAsset, fieldObject } from '../utils';
import * as c from '../constants';

export const logoItem = {
  [c.LOGO_ITEM]: {
    meta: {
      hidden: true,
      description: 'copy pending',
      imageUrl: ""
    },
    fieldRoles: {
      logo_asset: constructRole({
        ...allowAsset({type: c.ASSET_TYPE_IMAGE, subType: c.ASSET_SUBTYPE_LOGO, allowFormatting: false, maxWidth: '200', defaultClasses: 'logo-small'}),
        description: `Logo image asset`,
        required: true
      }),
      label: constructRole({
        field: fieldObject({type: c.FIELD_TYPE_TEXT}),
        defaultClasses: 'text-center text-black text-bold',
        required: false,
        description: 'Text beneath the logo.'
      })
    }
  }
}
