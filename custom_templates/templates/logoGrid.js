import { constructRole, allowAsset, fieldObject } from '../utils';
import * as c from '../constants';

export const logoGrid = {
  [c.LOGO_GRID]: {
    meta: {
      hidden: true,
      description: 'copy pending',
      imageUrl: ""
    },
    fieldRoles: {
      title: constructRole({
        field: fieldObject({type: c.FIELD_TYPE_TEXT, defaultClasses: 'text-center text-black text-bold'}),
        required: false,
        description: 'Template title.'
      }),
      items: constructRole({
        contentType: ['customTemplate'],
        allowedCustomTemplates: [c.LOGO_ITEM],
        allowMultipleReferences: true,
        required: false,
        description: 'Grid items.'
      })
    }
  }
}
