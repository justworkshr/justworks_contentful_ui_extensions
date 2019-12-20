import { constructRole, constructFieldConfig } from "../utils";
import * as c from "../constants";

import { defaultStyleTypes } from "../utils";

export const MOCK_CONTENT_TYPE_1 = "ct1";

export const MOCK_TEMPLATE_NAME = "mock 1";
export const MOCK_FIELDS_TEMPLATE = "fields mock";
export const MOCK_ASSETS_TEMPLATE = "assets mock";
export const MOCK_ENTRY_TEMPLATE = "entry mock";
export const MOCK_MULTI_REFERENCE_LOGO_TEMPLATE = "multi-reference mock";
export const MOCK_TEMPLATE_STYLE_ENTRY = "template style mock";

export const mockCustomTemplates = {
  [MOCK_TEMPLATE_NAME]: {
    meta: {},
    style: {},
    fieldRoles: {
      left_section: {
        fieldConfigs: [
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_TEXT
          })
        ],
        contentTypes: "text",
        description: "A left section"
      },
      right_section: {
        fieldConfigs: [
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_TEXT
          })
        ],
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
        fieldConfigs: [
          constructFieldConfig({
            type: c.FIELD_TYPE_TITLE,
            styleView: c.STYLE_VIEW_TITLE,
            defaultStyle: {
              textAlignment: "left",
              textColor: "black"
            }
          })
        ],
        description: `Text Field.`,
        required: true
      }),
      markdown_field: constructRole({
        fieldConfigs: [
          constructFieldConfig({
            type: c.FIELD_TYPE_MARKDOWN,
            styleView: c.STYLE_VIEW_MARKDOWN,
            defaultStyle: {
              textAlignment: "left",
              textColor: "black"
            }
          })
        ],
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
        fieldConfigs: [constructFieldConfig({ type: c.FIELD_TYPE_ASSET })],
        assetTypes: [c.ASSET_TYPE_IMAGE],
        description: `Image asset field`
      }),
      formattable_image_asset: constructRole({
        fieldConfigs: [constructFieldConfig({ type: c.FIELD_TYPE_ASSET })],
        assetTypes: [c.ASSET_TYPE_IMAGE],
        description: `Image asset field`
      }),
      logo_asset: constructRole({
        fieldConfigs: [
          constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            styleView: c.STYLE_VIEW_LOGO
          })
        ],
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
        fieldConfigs: [
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_TEXT
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_MEDIA
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_CUSTOM_TEMPLATE,
            allowedCustomTemplates: [MOCK_CONTENT_TYPE_1]
          })
        ],
        description: `Entry field`
      }),
      entry_field_with_style: constructRole({
        fieldConfigs: [
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_TEXT,
            styleView: c.STYLE_VIEW_TITLE,
            defaultStyle: {
              textAlignment: "left",
              textColor: "black"
            }
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_MEDIA
          }),
          constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_CUSTOM_TEMPLATE,
            allowedCustomTemplates: [MOCK_CONTENT_TYPE_1]
          })
        ],
        description: `Entry field`
      })
    }
  },
  [MOCK_MULTI_REFERENCE_LOGO_TEMPLATE]: {
    meta: {},
    style: {},
    fieldRoles: {
      grid_logo_multi_field: constructRole({
        fieldConfigs: [
          constructFieldConfig({ type: c.FIELD_TYPE_ASSET }),
          constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            assetTypes: [c.ASSET_TYPE_IMAGE],
            assetSubType: c.ASSET_SUBTYPE_LOGO,
            styleView: c.STYLE_VIEW_FLEX_ROW,
            assetStyleView: c.STYLE_VIEW_LOGO,
            contentType: [c.CONTENT_TYPE_CUSTOM_TEMPLATE],
            assetDefaultStyle: {
              assetStyle: "assetStyleValue"
            }
          })
        ],
        description: `Multi field`
      }),
      no_style_multi_field: constructRole({
        fieldConfigs: [
          constructFieldConfig({ type: c.FIELD_TYPE_ASSET }),
          constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            assetTypes: [c.ASSET_TYPE_IMAGE],
            assetSubType: c.ASSET_SUBTYPE_LOGO,
            styleView: c.STYLE_VIEW_FLEX_ROW,
            assetStyleView: c.STYLE_VIEW_LOGO,
            contentType: [c.CONTENT_TYPE_CUSTOM_TEMPLATE],
            assetDefaultStyle: {
              assetStyle: "assetStyleValue"
            }
          })
        ],
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
