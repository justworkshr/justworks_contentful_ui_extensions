import * as c from "./constants";
import {
  constructStyleView,
  constructStyleSection
} from "./constants/styleViews";

export const constructRole = ({
  contentType = "",
  asset = null,
  description = "",
  allowMultipleReferences = false,
  allowMultiReferenceStyle = false,
  multipleReferenceStyle = undefined,
  allowedCustomTemplates = [],
  defaultClasses,
  required = true,
  field = null
} = {}) => {
  return {
    contentType,
    asset,
    description,
    allowMultipleReferences,
    allowMultiReferenceStyle,
    multipleReferenceStyle,
    allowedCustomTemplates,
    defaultClasses,
    required,
    field
  };
};

export const fieldObject = ({ type, defaultClasses = "" } = {}) => {
  return {
    type,
    defaultClasses
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
  defaultClasses = ""
} = {}) => {
  return {
    asset: {
      type,
      subType,
      defaultClasses,
      formatting: {
        allow: allowFormatting,
        maxWidth: String(maxWidth)
      }
    }
  };
};

export const allowMultipleReferences = ({
  allow = true,
  allowStyle = true,
  styleType = undefined,
  contentTypes = []
} = {}) => {
  return {
    allowMultipleReferences: allow,
    allowMultiReferenceStyle: allowStyle,
    multipleReferenceStyle: styleType,
    contentType: contentTypes
  };
};
