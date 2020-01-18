import * as c from "../constants";

import * as u from "../utilities";
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
    componentZones: {
      left_section: {
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_TEXT
          })
        ],
        contentTypes: "text",
        description: "A left section"
      },
      right_section: {
        fieldConfigs: [
          u.constructFieldConfig({
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
    componentZones: {
      text_field: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
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
      markdown_field: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
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
    componentZones: {
      image_asset: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE
          })
        ],
        description: `Image asset field`
      }),
      formattable_image_asset: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE
          })
        ],
        description: `Image asset field`
      }),
      logo_asset: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE,
            assetSubType: c.ASSET_SUBTYPE_LOGO,
            styleView: c.STYLE_VIEW_LOGO
          })
        ],
        description: `Logo asset field.`
      })
    }
  },
  [MOCK_ENTRY_TEMPLATE]: {
    meta: {},
    style: {},
    componentZones: {
      entry_field: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_TEXT
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_MEDIA
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_COLLECTION_MODULE,
            allowedCollectionModules: [MOCK_CONTENT_TYPE_1]
          })
        ],
        description: `Entry field`
      }),
      entry_field_with_style: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_TEXT,
            styleView: c.STYLE_VIEW_TITLE,
            defaultStyle: {
              textAlignment: "left",
              textColor: "black"
            }
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_MEDIA
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            contentType: c.CONTENT_TYPE_COLLECTION_MODULE,
            allowedCollectionModules: [MOCK_CONTENT_TYPE_1]
          })
        ],
        description: `Entry field`
      })
    }
  },
  [MOCK_MULTI_REFERENCE_LOGO_TEMPLATE]: {
    meta: {},
    style: {},
    componentZones: {
      grid_logo_multi_field: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            assetType: c.ASSET_TYPE_IMAGE,
            assetSubType: c.ASSET_SUBTYPE_LOGO,
            styleView: c.STYLE_VIEW_FLEX_ROW,
            assetStyleView: c.STYLE_VIEW_LOGO,
            contentType: [c.CONTENT_TYPE_COLLECTION_MODULE],
            assetDefaultStyle: {
              assetStyle: "assetStyleValue"
            }
          })
        ],
        description: `Multi field`
      }),
      no_style_multi_field: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            assetType: c.ASSET_TYPE_IMAGE,
            assetSubType: c.ASSET_SUBTYPE_LOGO,
            styleView: c.STYLE_VIEW_FLEX_ROW,
            assetStyleView: c.STYLE_VIEW_LOGO,
            contentType: [c.CONTENT_TYPE_COLLECTION_MODULE],
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
      ...u.defaultStyleTypes()
    },
    componentZones: {}
  }
};
