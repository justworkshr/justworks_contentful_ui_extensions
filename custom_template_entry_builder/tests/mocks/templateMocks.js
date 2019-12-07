import {
  allowMultipleReferences,
  constructRole,
  fieldObject,
  allowAsset
} from '../../../custom_templates/utils';
import * as c from '../../../custom_templates/constants';

export const MOCK_TEMPLATE_NAME = 'mock 1';
export const MOCK_FIELDS_TEMPLATE = 'fields mock';
export const MOCK_ASSETS_TEMPLATE = 'assets mock';
export const MOCK_ENTRY_TEMPLATE = 'entry mock';
export const MOCK_MULTI_REFERENCE_TEMPLATE = 'multi-reference mock';

export const mockCustomTemplates = {
  [MOCK_TEMPLATE_NAME]: {
    meta: {},
    style: {},
    fieldRoles: {
      left_section: {
        contentType: 'text',
        description: 'A left section'
      },
      right_section: {
        contentType: 'text',
        description: 'A left section'
      }
    }
  },
  [MOCK_FIELDS_TEMPLATE]: {
    meta: {},
    style: {},
    fieldRoles: {
      text_field: constructRole({
        field: fieldObject({ type: c.FIELD_TYPE_TEXT }),
        defaultClasses: 'text-left text-black',
        description: `Text Field.`,
        required: true
      }),
      markdown_field: constructRole({
        field: fieldObject({ type: c.FIELD_TYPE_MARKDOWN }),
        defaultClasses: 'text-left text-black',
        description: `Markdown Field.`,
        required: false
      })
    }
  },
  [MOCK_ASSETS_TEMPLATE]: {
    meta: {},
    style: {},
    fieldRoles: {
      image_asset: constructRole({
        ...allowAsset({ type: c.ASSET_TYPE_IMAGE, allowFormatting: false, maxWidth: 800 }),
        description: `Image asset field`
      }),
      formattable_image_asset: constructRole({
        ...allowAsset({ type: c.ASSET_TYPE_IMAGE, allowFormatting: true, maxWidth: 800 }),
        description: `Image asset field`
      }),
      logo_asset: constructRole({
        ...allowAsset({
          type: c.ASSET_TYPE_IMAGE,
          subType: c.ASSET_SUBTYPE_LOGO,
          allowFormatting: false,
          maxWidth: 200
        }),
        description: `Logo asset field.`
      })
    }
  },
  [MOCK_ENTRY_TEMPLATE]: {
    meta: {},
    style: {},
    fieldRoles: {
      entry_field: constructRole({
        contentType: [c.CONTENT_TYPE_MEDIA, c.CONTENT_TYPE_CUSTOM_TEMPLATE],
        description: `Entry field`
      })
    }
  },
  [MOCK_MULTI_REFERENCE_TEMPLATE]: {
    meta: {},
    style: {},
    fieldRoles: {
      grid_logo_multi_field: constructRole({
        ...allowAsset({
          type: c.ASSET_TYPE_IMAGE,
          subType: c.ASSET_SUBTYPE_LOGO,
          allowFormatting: false,
          maxWidth: '200',
          defaultClasses: 'icon-small icon-center'
        }),
        ...allowMultipleReferences({
          allow: true,
          styleType: c.MULTI_REFERENCE_STYLE_FLEX,
          allowStyle: true,
          contentTypes: ['customTemplate']
        }),
        description: `Multi field`
      })
    }
  }
};
