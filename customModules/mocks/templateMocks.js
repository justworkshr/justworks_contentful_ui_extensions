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
      componentTypes: [c.FIELD_TYPE_ENTRY, c.FIELD_TYPE_FIELD],
      componentName: MOCK_TEMPLATE_NAME,
      contentTypes: [c.CONTENT_TYPE_COMPONENT_MODULE]
    },
    properties: {
      left_section: {
        propertyType: c.PROPERTY_TYPE_TEXT
      },
      right_section: {
        propertyType: c.PROPERTY_TYPE_MARKDOWN
      }
    }
  },
  [MOCK_FIELDS_TEMPLATE]: {
    meta: {
      componentTypes: [c.FIELD_TYPE_FIELD]
    },
    properties: {
      text_field: u.constructRoleConfig({
        propertyType: c.PROPERTY_TYPE_TEXT,
        description: `Text Field.`,
        required: true
      }),
      markdown_field: u.constructRoleConfig({
        propertyType: c.PROPERTY_TYPE_MARKDOWN,
        description: `Markdown Field.`,
        required: false
      })
    }
  },
  [MOCK_ASSETS_TEMPLATE]: {
    meta: {
      componentTypes: [c.FIELD_TYPE_ASSET]
    },
    properties: {
      image_asset: u.constructRoleConfig({
        propertyType: c.FIELD_TYPE_ASSET,
        description: `Image asset field`,
        assetType: c.ASSET_TYPE_IMAGE
      })
    }
  },
  [MOCK_ENTRY_TEMPLATE]: {
    meta: {
      componentTypes: [c.FIELD_TYPE_ENTRY]
    },
    properties: {
      entry_field: u.constructRoleConfig({
        propertyType: c.PROPERTY_TYPE_TEXT,
        description: `Entry field`
      }),
      entry_field_with_style: u.constructRoleConfig({
        propertyType: c.PROPERTY_TYPE_MARKDOWN,
        description: `Entry field`
      })
    }
  },
  [MOCK_MULTI_REFERENCE_LOGO_TEMPLATE]: {
    meta: {},
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
    meta: {
      contentTypes: [c.CONTENT_TYPE_COMPONENT_MODULE]
    },
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
