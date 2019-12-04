import { constructRole, allowAsset, fieldObject } from '../utils';
import * as c from '../constants';

export const collectionGrid = {
  [c.COLLECTION_GRID]: {
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
        field: fieldObject({type: c.FIELD_TYPE_MULTI_REFERENCE}),
        required: false,
        description: 'Text beneath the logo.'
      })
    }
  }
}
