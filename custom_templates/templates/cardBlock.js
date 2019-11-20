import { constructRole } from '../utils';
import * as c from '../constants';

export const cardBlock = {
  [c.CARD_BLOCK]: {
    meta: {
      description: 'copy pending',
      imageUrl: "https://images.ctfassets.net/mnc2gcng0j8q/5pdJcFDuIBnItoXMFz1Uan/cb0e4626cfce261f21529a0d622110cd/Screenshot_from_2019-10-30_12-49-17.png"
    },
    roles: {
      card_link: constructRole({
        contentType: c.CONTENT_TYPE_LINK,
        fieldType: c.FIELD_TYPE_TEXT,
        required: false,
        description: 'Link url for the card.'
      }),
      left_text: constructRole({
        contentType: [c.CONTENT_TYPE_TEXT, c.CONTENT_TYPE_CUSTOM_TEMPLATE],
        fieldType: c.FIELD_TYPE_MARKDOWN,
        allowedCustomTemplates: [c.TEXT_COLLECTION],
        required: true,
        description: `Text or Custom Template [${[c.TEXT_COLLECTION]}]. Primary markdown text to display on the left half section.`
      }),
      cta_text: constructRole({
        contentType: c.CONTENT_TYPE_TEXT,
        fieldType: c.FIELD_TYPE_TEXT,
        required: false,
        description: 'Text for the optional CTA'
      }),
      tag_text: constructRole({
        contentType: c.CONTENT_TYPE_TEXT,
        fieldType: c.FIELD_TYPE_TEXT,
        required: false,
        description: 'Text for the optional tag on the upper right corner of the card.'
      }),
      right_media: constructRole({
        contentType: c.CONTENT_TYPE_MEDIA,
        required: false,
        description: 'Media to display on the right half section.'
      }),
      background_media: constructRole({
        contentType: c.CONTENT_TYPE_MEDIA,
        required: false,
        description: 'Specific triangular SVG background for the right half of the card.'
      }),
      tag_text_style: constructRole({
        contentType: c.CONTENT_TYPE_STYLE,
        required: false,
        description: 'style to apply to the optional tag.'
      }),
      media_fallback_style: constructRole({
        contentType: c.CONTENT_TYPE_STYLE,
        required: false,
        description: "Use 'background color' to define a solid color which displays if media is not used."
      }),
      card_style: constructRole({
        contentType: c.CONTENT_TYPE_STYLE,
        required: false,
        description: 'Custom style applied directly to the card.'
      })
    }
  }
};
