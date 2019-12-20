import * as u from "../utilities";

import * as c from "./index";

// MARKDOWN
export const defaultFieldConfigMarkdownEntry = u.constructFieldConfig({
  type: c.FIELD_TYPE_ENTRY,
  contentType: c.CONTENT_TYPE_GENERIC_MARKDOWN,
  styleView: c.STYLE_VIEW_MARKDOWN,
  defaultStyle: c.defaultStyleMarkdownLeft
});

export const defaultFieldConfigMarkdownField = u.constructFieldConfig({
  type: c.FIELD_TYPE_MARKDOWN,
  styleView: c.STYLE_VIEW_MARKDOWN,
  defaultStyle: c.defaultStyleMarkdownLeft
});
