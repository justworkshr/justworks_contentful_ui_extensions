import * as sp from "./styleProperties";

const constructStyleGroupSection = ({
  styleProperty = {},
  defaultOnly = false
}) => {
  return {
    styleProperty,
    defaultOnly // Whether this style should only appear in the default sub-section or not
  };
};

const constructStyleGroup = ({
  styleSections = [],
  subSections = [""]
} = {}) => {
  return {
    styleSections,
    subSections
  };
};

export const STYLE_VIEW_MARKDOWN = constructStyleGroup({
  subSections: ["header", "subheader", "body"],
  styleSections: [
    constructStyleGroupSection({
      styleProperty: sp.STYLE_PROPERTY_TEXT_ALIGNMENT,
      defaultOnly: true
    })
  ]
});
