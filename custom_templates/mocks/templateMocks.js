import {
  allowMultipleReferences,
  constructRole,
  fieldObject,
  allowAsset
} from "../utils";
import * as c from "../constants";

import { defaultStyleTypes } from "../utils";

export const MOCK_TEMPLATE_NAME = "mock 1";
export const MOCK_FIELDS_TEMPLATE = "fields mock";
export const MOCK_ASSETS_TEMPLATE = "assets mock";
export const MOCK_ENTRY_TEMPLATE = "entry mock";
export const MOCK_MULTI_REFERENCE_TEMPLATE = "multi-reference mock";
export const MOCK_TEMPLATE_STYLE_ENTRY = "template style mock";

export const mockCustomTemplates = {
  [MOCK_TEMPLATE_NAME]: {
    meta: {},
    style: {},
    fieldRoles: {
      left_section: {
        fieldTypes: [c.FIELD_TYPE_ENTRY],
        contentTypes: "text",
        description: "A left section"
      },
      right_section: {
        fieldTypes: [c.FIELD_TYPE_ENTRY],
        contentTypes: "text",
        description: "A left section"
      }
    }
  },
  [MOCK_FIELDS_TEMPLATE]: {
    meta: {},
    style: {},
    fieldRoles: {
      text_field: constructRole({
        fieldTypes: [c.FIELD_TYPE_TITLE],
        defaultClasses: {
          textAlignment: "left",
          textColor: "black"
        },
        description: `Text Field.`,
        required: true
      }),
      markdown_field: constructRole({
        fieldTypes: [c.FIELD_TYPE_MARKDOWN],
        defaultClasses: {
          textAlignment: "left",
          textColor: "black"
        },
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
        fieldTypes: [c.FIELD_TYPE_ASSET],
        assetTypes: [c.ASSET_TYPE_IMAGE],
        description: `Image asset field`
      }),
      formattable_image_asset: constructRole({
        fieldTypes: [c.FIELD_TYPE_ASSET],
        assetTypes: [c.ASSET_TYPE_IMAGE],
        description: `Image asset field`
      }),
      logo_asset: constructRole({
        fieldTypes: [c.FIELD_TYPE_ASSET],
        assetTypes: [c.ASSET_TYPE_IMAGE],
        assetSubType: c.ASSET_SUBTYPE_LOGO,
        description: `Logo asset field.`
      })
    }
  },
  [MOCK_ENTRY_TEMPLATE]: {
    meta: {},
    style: {},
    fieldRoles: {
      entry_field: constructRole({
        fieldTypes: [c.FIELD_TYPE_ENTRY],
        contentTypes: [c.CONTENT_TYPE_MEDIA, c.CONTENT_TYPE_CUSTOM_TEMPLATE],
        description: `Entry field`
      })
    }
  },
  [MOCK_MULTI_REFERENCE_TEMPLATE]: {
    meta: {},
    style: {},
    fieldRoles: {
      grid_logo_multi_field: constructRole({
        fieldTypes: [c.FIELD_TYPE_ASSET, c.FIELD_TYPE_MULTI_REFERENCE],
        ...allowMultipleReferences({
          allow: true,
          styleType: c.MULTI_REFERENCE_STYLE_FLEX,
          allowStyle: true,
          contentTypes: ["customTemplate"]
        }),
        description: `Multi field`
      }),
      no_style_multi_field: constructRole({
        fieldTypes: [c.FIELD_TYPE_ASSET, c.FIELD_TYPE_MULTI_REFERENCE],
        ...allowMultipleReferences({
          allow: true,
          allowStyle: false,
          contentTypes: ["customTemplate"]
        }),
        description: `Multi field`
      })
    }
  },
  [MOCK_TEMPLATE_STYLE_ENTRY]: {
    meta: {},
    style: {
      ...defaultStyleTypes()
    },
    fieldRoles: {}
  }
};
