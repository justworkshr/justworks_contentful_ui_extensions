import * as cu from "./constructUtils";
import * as c from "../constants";

// TITLE
export const constructTitleRole = ({
  defaultStyle,
  required,
  description = "Title above the module."
} = {}) => {
  return cu.constructRoleConfig({
    fieldConfigs: [
      cu.constructFieldConfig({
        type: c.FIELD_TYPE_ENTRY,
        contentType: c.CONTENT_TYPE_GENERIC_TEXT,
        styleView: c.STYLE_VIEW_TITLE,
        defaultStyle
      }),
      cu.constructFieldConfig({
        type: c.FIELD_TYPE_TITLE,
        styleView: c.STYLE_VIEW_TITLE,
        defaultStyle
      })
    ],
    description,
    required
  });
};

export const constructGenericTextRole = ({
  defaultStyle,
  required,
  description = ""
} = {}) => {
  return cu.constructRoleConfig({
    fieldConfigs: [
      cu.constructFieldConfig({
        type: c.FIELD_TYPE_TEXT,
        defaultStyle
      }),
      cu.constructFieldConfig({
        type: c.FIELD_TYPE_ENTRY,
        contentTypes: [c.CONTENT_TYPE_GENERIC_TEXT],
        defaultStyle
      })
    ],
    description,
    required
  });
};

export const constructSubcopyRole = ({
  defaultStyle,
  required,
  description = "Title above the module."
} = {}) => {
  return cu.constructRoleConfig({
    fieldConfigs: [
      cu.constructFieldConfig({
        type: c.FIELD_TYPE_ENTRY,
        contentType: c.CONTENT_TYPE_GENERIC_MARKDOWN,
        styleView: c.STYLE_VIEW_MARKDOWN,
        defaultStyle
      }),
      cu.constructFieldConfig({
        type: c.FIELD_TYPE_MARKDOWN,
        styleView: c.STYLE_VIEW_MARKDOWN,
        defaultStyle
      })
    ],
    description,
    required
  });
};

// LOGO

export const constructLogoRole = ({
  defaultStyle = c.defaultStyleLogoDefaultComfortable,
  required = false,
  description = "Logo image asset"
} = {}) => {
  return cu.constructRoleConfig({
    fieldConfigs: [
      cu.constructFieldConfig({
        type: c.FIELD_TYPE_ASSET,
        assetType: c.ASSET_TYPE_IMAGE,
        assetSubType: c.ASSET_SUBTYPE_LOGO,
        styleView: c.STYLE_VIEW_LOGO,
        defaultStyle
      })
    ],
    description,
    required
  });
};
