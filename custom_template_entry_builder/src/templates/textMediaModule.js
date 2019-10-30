import { constructRole } from '../utils';

export const textMediaModule = {
  'text media module': {
    left_content: constructRole({
      contentType: ['text', 'customTemplate', 'media'],
      required: true,
      description: 'Text for the top of collection'
    }),
    right_content: constructRole({
      contentType: ['text', 'customTemplate', 'media'],
      required: true,
      description: 'Text for the top of collection'
    }),
    module_style: constructRole({
      contentType: 'style',
      required: false,
      description: 'Global style for the module.'
    })
  }
};
