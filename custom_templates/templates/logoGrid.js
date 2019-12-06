import { constructRole, allowAsset, fieldObject, allowMultipleReferences } from '../utils';
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
        description: 'Template title.',
        required: false,
        field: fieldObject({type: c.FIELD_TYPE_TEXT}),
        defaultClasses: 'text-center text-black text-bold'
      }),
      items: constructRole({
        description: 'Grid items.',
        required: false,
        allowedCustomTemplates: [c.LOGO_ITEM],
        ...allowMultipleReferences({allow: true, allowStyle: true, contentTypes: ['customTemplate']}),
        defaultClasses: 'flex-row flex-align-start flex-justify-center flex-items-per-1 small-flex-items-per-2 large-flex-items-per-4',
      })
    }
  }
}
