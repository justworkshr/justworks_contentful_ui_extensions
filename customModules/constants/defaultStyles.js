import * as u from "../utilities";
import * as c from "./index";
// TITLE

export const defaultStyleTitleDisplay = {
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_TITLE_SIZE,
    value: "display"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_TEXT_COLOR,
    value: "navy"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_TEXT_ALIGNMENT,
    value: "center"
  })
};

export const defaultStyleTitleSectionSmall = {
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_TITLE_SIZE,
    value: "section-small"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_TEXT_TRANSFORM,
    value: "uppercase"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_TEXT_COLOR,
    value: "navy"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_TEXT_ALIGNMENT,
    value: "center"
  })
};

// MARKDOWN
export const defaultStyleMarkdownLeft = {
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_TEXT_ALIGNMENT,
    value: "left"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_HEADER_TEXT_COLOR,
    value: "black"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_SUBHEADER_TEXT_COLOR,
    value: "black"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_BODY_TEXT_COLOR,
    value: "black"
  })
};

export const defaultStyleMarkdownCenter = {
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_TEXT_ALIGNMENT,
    value: "center"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_HEADER_TEXT_COLOR,
    value: "black"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_SUBHEADER_TEXT_COLOR,
    value: "black"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_BODY_TEXT_COLOR,
    value: "black"
  })
};

// Logos

export const defaultStyleLogoDefaultComfortable = {
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_PADDED_CONTAINER,
    value: "comfortable"
  }),
  ...u.constructStyleKeyValue({
    styleProperty: c.STYLE_PROPERTY_LOGO_SIZE,
    value: "default"
  })
};
