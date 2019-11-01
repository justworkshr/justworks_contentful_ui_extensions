import { constructRole } from '../utils';
import * as c from '../constants';

export const textMediaModule = {
  [c.TEXT_MEDIA_MODULE]: {
    meta: {
      description: 'copy pending',
      imageUrl: "https://images.ctfassets.net/mnc2gcng0j8q/3xn8AvsyundHautmUuOKhJ/b7f3bd11eb55910ca7b3e34920099f39/Screenshot_from_2019-10-30_12-49-03.png"
    },
    roles: {
      left_content: constructRole({
        contentType: ['text', 'media', 'customTemplate'],
        fieldType: 'markdown',
        description: `Text, Media, or Custom Template [${c.TEXT_COLLECTION}].`,
        allowedCustomTemplates: [c.TEXT_COLLECTION],
        required: true
      }),
      right_content: constructRole({
        contentType: ['text', 'media', 'customTemplate'],
        fieldType: 'markdown',
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
  }
};
