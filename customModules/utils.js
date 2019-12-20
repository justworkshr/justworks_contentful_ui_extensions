import * as c from "./constants";
import {
  constructStyleView,
  constructStyleSection
} from "./constants/styleViews";

export const constructRoleConfig = ({
  description = "",
  fieldConfigs = [],
  required = true
} = {}) => {
  if (!Array.isArray(fieldConfigs) || !fieldConfigs.length) {
    throw new Error(
      "Must include an array of field configs in constructRoleConfig"
    );
  }

  if (
    fieldConfigs.some(fc => fc.type === c.FIELD_TYPE_MULTI_REFERENCE) &&
    fieldConfigs.length > 1
  ) {
    throw new Error(
      `A role with fieldConfig of type '${c.FIELD_TYPE_MULTI_REFERENCE}' cannot include any other field configs`
    );
  }
  return {
    description,
    fieldConfigs,
    required
  };
};

export const constructFieldConfig = ({
  type, // *string - use FIELD_TYPE constants to designate
  styleView = undefined, // *string - style editor type - use STYLE_VIEW constants to designate
  assetStyleView = undefined, // *string - only for multi-reference asset editing - use STYLE_VIEW constants
  contentType = undefined, // *string or array - use single string for single-reference entry to designate the link. use Array for multi-reference if multiple types allowed.
  assetType = undefined, // *string - only if FIELD_TYPE is ASSET. use ASSET_TYPE constants
  assetSubType = undefined, // *string - only if FIELD_TYPE is ASSET. use ASSET_SUBTYPE constants
  defaultStyle, // *object - passes this style object when a custom editor is applied to the field
  assetDefaultStyle, // *object - only in multi-reference fields, passes this object to all assets when custom field is applied
  allowedCustomTemplates // *array - use CUSTOM_TEMPLATE constants to specific which are allowed
} = {}) => {
  if (!type) {
    throw new Error("'type' is required in 'constructFieldConfig'");
  }
  if (
    type === c.FIELD_TYPE_MULTI_REFERENCE &&
    contentType &&
    !Array.isArray(contentType)
  ) {
    throw new Error(
      `'contentType' must be an array when type is ${c.FIELD_TYPE_MULTI_REFERENCE}`
    );
  }

  if (type === c.FIELD_TYPE_ASSET && !assetType) {
    throw new Error(
      `Must include an 'assetType when type is ${c.FIELD_TYPE_ASSET}`
    );
  }
  return {
    type,
    styleView,
    assetStyleView,
    contentType,
    assetType,
    assetSubType,
    defaultStyle,
    assetDefaultStyle,
    allowedCustomTemplates
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
