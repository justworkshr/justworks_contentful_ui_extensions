import * as c from "./constants";
import {
  constructStyleView,
  constructStyleSection
} from "./constants/styleViews";

export const constructRole = ({
  description = "",
  fieldTypes = [],
  assetTypes = [],
  assetSubType = undefined,
  contentTypes = [],
  allowedCustomTemplates = [],
  multiReferenceStyleView = undefined,
  defaultStyle = undefined,
  assetDefaultStyle = undefined,
  required = true
} = {}) => {
  return {
    description,
    fieldTypes,
    assetTypes,
    assetSubType,
    contentTypes,
    allowedCustomTemplates,
    multiReferenceStyleView,
    defaultStyle,
    assetDefaultStyle,
    required
  };
};

export const constructField = ({
  type,
  styleView = undefined,
  assetStyleView = undefined,
  contentType = undefined,
  assetTypes = undefined,
  assetSubType = undefined
} = {}) => {
  if (!type) throw new Error("'type' is required in 'constructField'");
  return {
    type,
    styleView,
    assetStyleView,
    contentType,
    assetTypes,
    assetSubType
  };
};

export const defaultStyleTypes = () => {
  return {
    template_style: templateStyleProperty({
      styleView: constructStyleView({
        styleSections: [
          constructStyleSection({
            componentType: c.STYLE_VIEW_COMPONENT_COLOR,
            styleProperty: c.STYLE_PROPERTY_BACKGROUND_COLOR,
            helpText: "The background color for this module."
          })
        ]
      })
    })
  };
};

export const templateStyleProperty = ({ styleView = {} } = {}) => {
  return Object.assign(
    {},
    ...styleView.styleSections.map(section => {
      return {
        [section.styleProperty.key]: styleView
      };
    })
  );
};

export const allowAsset = ({
  type = c.ASSET_TYPE_IMAGE,
  subType = undefined,
  allowFormatting = false,
  maxWidth = "2000",
  defaultStyle = ""
} = {}) => {
  return {
    asset: {
      type,
      subType,
      defaultStyle,
      formatting: {
        allow: allowFormatting,
        maxWidth: String(maxWidth)
      }
    }
  };
};
