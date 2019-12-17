import * as sp from "./styleProperties";

export const STYLE_VIEW_COMPONENT_RADIO = "radio";
export const STYLE_VIEW_COMPONENT_COLOR = "color";

export const constructStyleSection = ({
  componentType = STYLE_VIEW_COMPONENT_RADIO,
  styleProperty = {},
  helpText = "",
  defaultOnly = false
}) => {
  return {
    componentType,
    styleProperty,
    helpText,
    defaultOnly // Whether this style should only appear in the default sub-section or not
  };
};

export const constructStyleView = ({
  styleSections = [],
  subSections = [""]
} = {}) => {
  return {
    styleSections,
    subSections
  };
};

export const STYLE_VIEW_MARKDOWN = constructStyleView({
  subSections: ["header", "subheader", "body"],
  styleSections: [
    constructStyleSection({
      componentType: STYLE_VIEW_COMPONENT_RADIO,
      styleProperty: sp.STYLE_PROPERTY_TEXT_ALIGNMENT,
      defaultOnly: true
    })
  ]
});
