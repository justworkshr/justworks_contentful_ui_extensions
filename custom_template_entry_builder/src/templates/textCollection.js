import { constructRole } from '../utils';

export const textCollection = {
  'text collection': {
    text_1: constructRole({
      contentType: 'text',
      required: true,
      description: 'Text for the top of collection'
    }),
    text_2: constructRole({
      contentType: 'text',
      required: false,
      description: 'Text for the middle of collection'
    }),
    text_3: constructRole({
      contentType: 'text',
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
};
