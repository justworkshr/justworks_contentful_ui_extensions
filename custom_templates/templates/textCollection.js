import { constructRole } from '../utils';
import * as c from '../constants';

export const textCollection = {
  [c.TEXT_COLLECTION]: {
    meta: {
      description: 'copy pending',
      imageUrl: "https://images.ctfassets.net/mnc2gcng0j8q/2fTQlSqACoJQavUL6wq5Bg/1fa3038c0b79d26e55fd8c3a62a4cef0/Screenshot_from_2019-10-30_12-48-45.png"
    },
    roles: {

      text_1: constructRole({
        contentType: 'text',
        fieldType: 'markdown',
        required: true,
        description: 'Text for the top of collection'
      }),
      text_2: constructRole({
        contentType: 'text',
        fieldType: 'markdown',
        required: false,
        description: 'Text for the middle of collection'
      }),
      text_3: constructRole({
        contentType: 'text',
        fieldType: 'markdown',
        required: false,
        description: 'Text for the bottom of collection'
      }),
      module_style: constructRole({
        contentType: 'style',
        required: false,
        description: 'Global style for the module.'
      }),
      text_1_style: constructRole({
        contentType: 'style',
        required: false,
        description: 'Style for text 1'
      }),
      text_2_style: constructRole({
        contentType: 'style',
        required: false,
        description: 'Style for text 2'
      }),
      text_3_style: constructRole({
        contentType: 'style',
        required: false,
        description: 'Style for text 3'
      })
    }
  }
};
