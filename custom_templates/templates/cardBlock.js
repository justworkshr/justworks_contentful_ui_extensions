import { constructRole } from '../utils';
import * as c from '../constants';

export const cardBlock = {
  [c.CARD_BLOCK]: {
    meta: {
      description: 'A full-width & self-contained card module configured for text on the left and media (image or video) on the right. Collapses into a card on mobile.',
      imageUrl: "https://images.ctfassets.net/mnc2gcng0j8q/5pdJcFDuIBnItoXMFz1Uan/cb0e4626cfce261f21529a0d622110cd/Screenshot_from_2019-10-30_12-49-17.png"
    },
    roles: {
      card_link: constructRole({
        contentType: 'link',
        fieldType: 'text',
        required: false,
        description: 'Optional link to supply for when a user clicks on the card.'
      }),
      left_text: constructRole({
        contentType: ['text', 'customTemplate'],
        fieldType: 'markdown',
        allowedCustomTemplates: [c.TEXT_COLLECTION],
        required: true,
        description: `Text or Custom Template [${[c.TEXT_COLLECTION]}]. Primary markdown text to display on the left half section.`
      }),
      cta_text: constructRole({
        contentType: 'text',
        fieldType: 'text',
        required: false,
        description: 'Text for the optional CTA'
      }),
      tag_text: constructRole({
        contentType: 'text',
        fieldType: 'text',
        required: false,
        description: 'Text for the optional tag on the upper right corner of the card.'
      }),
      right_media: constructRole({
        contentType: 'media',
        required: false,
        description: 'Optional media (image or video) to display on the right half section.'
      }),
      background_media: constructRole({
        contentType: 'media',
        required: false,
        description:
        'Optional media to display in the background of the right half of the card. Optimized for a specific image type.'
      }),
      tag_text_style: constructRole({
        contentType: 'style',
        required: false,
        description: 'Optional style to apply to the optional tag.'
      }),
      media_fallback_style: constructRole({
        contentType: 'style',
        required: false,
        description:
        "Use 'background color' to define a solid color which should display if a Media entry is not used."
      }),
      card_style: constructRole({
        contentType: 'style',
        required: false,
        description: 'Custom style applied directly to the card - background color, text color, etc.'
      })
    }
  }
};