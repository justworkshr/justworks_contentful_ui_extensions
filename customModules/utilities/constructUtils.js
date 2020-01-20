import * as c from "../constants";

export const constructComponentZone = ({
  description = "",
  componentOptions = {},
  required = true
} = {}) => {
  if (!Object.keys(componentOptions).length) {
    throw new Error("Must include an a component option");
  }

  return {
    description,
    componentOptions,
    required
  };
};

export const constructComponentConfig = ({
  moduleType = "component",
  moduleName = "",
  properties = undefined
} = {}) => {
  return {
    moduleType,
    moduleName,
    properties: properties || getComponentProps(moduleName)
  };
};

export const constructComponentProperty = ({
  description = {},
  propertyType,
  fieldTypes,
  assetType
} = {}) => {
  return {
    description,
    propertyType,
    fieldTypes,
    assetType
  };
};

export const constructRoleConfig = ({
  description = "",
  propertyType,
  required = true
} = {}) => {
  return {
    description,
    propertyType,
    required
  };
};

export const constructFieldConfig = ({
  type, // *string - use FIELD_TYPE constants to designate
  contentType = undefined, // *string or array - use single string for single-reference entry to designate the link. use Array for multi-reference if multiple types allowed.
  assetType = undefined, // *string - only if FIELD_TYPE is ASSET. use ASSET_TYPE constants
  assetSubType = undefined, // *string - only if FIELD_TYPE is ASSET. use ASSET_SUBTYPE constants
  styleView = undefined, // *string - style editor type - use STYLE_VIEW constants to designate
  assetStyleView = undefined, // *string - only for multi-reference asset editing - use STYLE_VIEW constants
  defaultStyle, // *object - passes this style object when a custom editor is applied to the field
  assetDefaultStyle, // *object - only in multi-reference fields, passes this object to all assets when custom field is applied
  allowedCollectionModules // *array - use CUSTOM_TEMPLATE constants to specific which are allowed
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
    allowedCollectionModules
  };
};

export const defaultStyleTypes = () => {
  return {
    template_style: templateStyleProperty({
      styleView: c.constructStyleView({
        styleSections: [
          c.constructStyleSection({
            componentTypes: c.STYLE_VIEW_COMPONENT_COLOR,
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

export const constructStyleKeyValue = ({ styleProperty, value } = {}) => {
  return {
    [styleProperty.key]: styleProperty.values.find(v => v.value === value).value
  };
};
