import { constructRole, allowAsset, defaultStyleTypes, styleProperty, fieldObject } from '../utils';
import * as c from '../constants';

export const cardBlock = {
  [c.CARD_BLOCK]: {
    meta: {
      description: 'copy pending',
      imageUrl: "https://images.ctfassets.net/mnc2gcng0j8q/5pdJcFDuIBnItoXMFz1Uan/cb0e4626cfce261f21529a0d622110cd/Screenshot_from_2019-10-30_12-49-17.png"
    },
    style: {
      ...defaultStyleTypes(),
      'tag_style': {
        ...styleProperty({label: 'background_color', type: c.STYLE_TYPE_BACKGROUND_COLOR, defaultClasses: 'bg-color-cerulean', description: 'The background color the top right tag.'})
      }
    },
    fieldRoles: {
      left_text: constructRole({
        contentType: [c.CONTENT_TYPE_TEXT, c.CONTENT_TYPE_CUSTOM_TEMPLATE],
        field: fieldObject({type: c.FIELD_TYPE_MARKDOWN}),
        defaultClasses: 'text-black',
        allowedCustomTemplates: [c.TEXT_COLLECTION],
        required: true,
        description: `Text or Custom Template [${[c.TEXT_COLLECTION]}]. Primary markdown text to display on the left half section.`
      }),
      right_media: constructRole({
        contentType: c.CONTENT_TYPE_MEDIA,
        ...allowAsset({type: c.ASSET_TYPE_IMAGE, allowFormatting: false, maxWidth: '800' }),
        required: true,
        description: 'Media to display on the right half section.'
      }),
      card_link: constructRole({
        contentType: c.CONTENT_TYPE_LINK,
        field: fieldObject({type: c.FIELD_TYPE_TEXT }),
        required: false,
        description: 'Link url for the card.'
      }),
      cta_text: constructRole({
        field: fieldObject({type: c.FIELD_TYPE_TEXT}),
        defaultClasses: 'text-cerulean',
        required: false,
        description: 'Text for the optional CTA'
      }),
      tag_text: constructRole({
        field: fieldObject({type: c.FIELD_TYPE_TEXT}),
        defaultClasses: 'text-white text-uppercase',
        required: false,
        description: 'Text for the optional tag on the upper right corner of the card.'
      }),
      background_media: constructRole({
        ...allowAsset({type: c.ASSET_TYPE_IMAGE, allowFormatting: false, maxWidth: '800' }),
        required: false,
        description: 'Specific triangular SVG background for the right half of the card.'
      }),
    }
  }
};
