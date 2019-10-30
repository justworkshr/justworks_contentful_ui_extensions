import { constructRole } from '../utils';
import * as c from '../constants';

export const textMediaModule = {
  [c.TEXT_MEDIA_MODULE]: {
    left_content: constructRole({
      contentType: ['text', 'media', 'customTemplate'],
      description: `Text, Media, or Custom Template [${c.TEXT_COLLECTION}].`,
      allowedCustomTemplates: [c.TEXT_COLLECTION],
      required: true
    }),
    right_content: constructRole({
      contentType: ['text', 'media', 'customTemplate'],
      description: `Text, Media, or Custom Template [${c.TEXT_COLLECTION}].`,
      allowedCustomTemplates: [c.TEXT_COLLECTION],
      required: true
    }),
    module_style: constructRole({
      contentType: 'style',
      description: 'Global style for this module.',
      required: false
    })
  }
};
