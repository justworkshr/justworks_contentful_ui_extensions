import * as c from "./constants";

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
    template_style: {
      ...styleProperty({
        label: "Background Color",
        styleKey: c.STYLE_KEY_BACKGROUND_COLOR,
        description: "The background color for this template.",
        defaultValue: ""
      })
    }
  };
};

export const styleProperty = ({
  label = "",
  styleKey = c.STYLE_KEY_BACKGROUND_COLOR,
  description = "",
  defaultValue = ""
} = {}) => {
  return {
    [styleKey]: {
      label,
      description,
      defaultValue
    }
  };
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
