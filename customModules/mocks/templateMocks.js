import * as c from "../constants";

import * as u from "../utilities";

export const MOCK_CONTENT_TYPE_1 = "ct1";

export const MOCK_TEMPLATE_NAME = "mock1";
export const MOCK_FIELDS_TEMPLATE = "fieldsMock";
export const MOCK_ASSETS_TEMPLATE = "assetsMock";
export const MOCK_ENTRY_TEMPLATE = "entryMock";
export const MOCK_MULTI_REFERENCE_LOGO_TEMPLATE = "multiReferenceMock";
export const MOCK_TEMPLATE_STYLE_ENTRY = "templateStyleMock";

export const MOCK_PAGE_MODULE_NAME = "pageModule1";

export const mockComponentModuleTemplates = {
  [MOCK_TEMPLATE_NAME]: {
    meta: {
      componentType: c.FIELD_TYPE_ENTRY,
      componentName: MOCK_TEMPLATE_NAME
    },
    style: {},
    properties: {
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
    meta: {
      componentType: c.FIELD_TYPE_ENTRY
    },
    style: {},
    properties: {
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
    properties: {
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
    meta: {
      componentType: c.FIELD_TYPE_ENTRY
    },
    style: {},
    properties: {
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
    properties: {
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
    properties: {}
  }
};

export const mockPageModuleTemplates = {
  [MOCK_PAGE_MODULE_NAME]: {
    meta: {},
    componentZones: {
      left_section: u.constructComponentZone({
        componentOptions: {
          [MOCK_TEMPLATE_NAME]: mockComponentModuleTemplates[MOCK_TEMPLATE_NAME]
        }
      }),
      right_section: u.constructComponentZone({
        componentOptions: {
          [MOCK_TEMPLATE_NAME]: mockComponentModuleTemplates[MOCK_TEMPLATE_NAME]
        }
      })
    }
  }
};
