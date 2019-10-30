import { constructRole } from '../utils';

export const textMediaModule = {
  'text media module': {
    left_content: constructRole({
      contentType: ['text', 'media', 'customTemplate'],
      description: 'Text, Media, or Custom Template [Text Collection].',
      allowedCustomTemplates: ['text collection'],
      required: true
    }),
    right_content: constructRole({
      contentType: ['text', 'media', 'customTemplate'],
      description: 'Text, Media, or Custom Template [Text Collection].',
      allowedCustomTemplates: ['text collection'],
      required: true
    }),
    module_style: constructRole({
      contentType: 'style',
      description: 'Global style for this module.',
      required: false
    })
  }
};
