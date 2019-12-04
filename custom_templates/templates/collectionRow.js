import { constructRole, allowAsset, fieldObject } from '../utils';
import * as c from '../constants';

export const collectionRow = {
  [c.COLLECTION_ROW]: {
    meta: {
      hidden: true,
      description: 'copy pending',
      imageUrl: ""
    },
    fieldRoles: {
      title: constructRole({
        field: fieldObject({type: c.FIELD_TYPE_TEXT, defaultClasses: 'text-center text-black text-bold'}),
        required: false,
        description: 'Text beneath the logo.'
      }),
      items: {}
    }
  }
}
