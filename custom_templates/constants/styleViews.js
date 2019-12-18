import * as sp from "./styleProperties";

export const STYLE_VIEW_COMPONENT_RADIO = "radio";
export const STYLE_VIEW_COMPONENT_COLOR = "color";

export const constructStyleSection = ({
  componentType = STYLE_VIEW_COMPONENT_RADIO,
  styleProperty = {},
  helpText = "",
  defaultOnly = false,
  subSectionOnly = false
}) => {
  return {
    componentType,
    styleProperty,
    helpText,
    defaultOnly, // Whether this style should only appear in the default sub-section or not
    subSectionOnly // Whether this style should only appear in the non-default sub-sections or not
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

export const STYLE_VIEW_TITLE = constructStyleView({
  subSections: [],
  styleSections: [
    constructStyleSection({
      componentType: STYLE_VIEW_COMPONENT_RADIO,
      styleProperty: sp.STYLE_PROPERTY_TEXT_ALIGNMENT
    }),
    constructStyleSection({
      componentType: STYLE_VIEW_COMPONENT_RADIO,
      styleProperty: sp.STYLE_PROPERTY_TEXT_TRANSFORM
    }),
    constructStyleSection({
      componentType: STYLE_VIEW_COMPONENT_COLOR,
      styleProperty: sp.STYLE_PROPERTY_TEXT_COLOR
    })
  ]
});

export const STYLE_VIEW_MARKDOWN = constructStyleView({
  subSections: ["header", "subheader", "body"],
  styleSections: [
    constructStyleSection({
      componentType: STYLE_VIEW_COMPONENT_RADIO,
      styleProperty: sp.STYLE_PROPERTY_TEXT_ALIGNMENT,
      defaultOnly: true
    }),
    constructStyleSection({
      componentType: STYLE_VIEW_COMPONENT_RADIO,
      styleProperty: sp.STYLE_PROPERTY_PADDED_CONTAINER,
      defaultOnly: true
    }),
    constructStyleSection({
      componentType: STYLE_VIEW_COMPONENT_COLOR,
      styleProperty: sp.STYLE_PROPERTY_HEADER_TEXT_COLOR,
      subSectionOnly: true
    }),
    constructStyleSection({
      componentType: STYLE_VIEW_COMPONENT_COLOR,
      styleProperty: sp.STYLE_PROPERTY_SUBHEADER_TEXT_COLOR,
      subSectionOnly: true
    }),
    constructStyleSection({
      componentType: STYLE_VIEW_COMPONENT_COLOR,
      styleProperty: sp.STYLE_PROPERTY_BODY_TEXT_COLOR,
      subSectionOnly: true
    })
  ]
});
