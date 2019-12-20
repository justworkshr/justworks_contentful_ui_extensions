import * as u from "../utilities";
import * as t from "./types";
import * as sv from "./styleViews";
import * as df from "./defaultFields";

// TITLES
export const defaultRoleTitleDisplay = u.constructRoleConfig({
  fieldConfigs: [
    u.constructFieldConfig({
      type: t.FIELD_TYPE_ENTRY,
      contentType: t.CONTENT_TYPE_GENERIC_TEXT,
      styleView: t.STYLE_VIEW_TITLE,
      defaultStyle: sv.defaultStyleTitleDisplay
    }),
    u.constructFieldConfig({
      type: t.FIELD_TYPE_TITLE,
      styleView: t.STYLE_VIEW_TITLE,
      defaultStyle: sv.defaultStyleTitleDisplay
    })
  ],
  required: false
});

export const defaultRoleTitleSectionSmall = u.constructRoleConfig({
  fieldConfigs: [
    u.constructFieldConfig({
      type: t.FIELD_TYPE_ENTRY,
      contentType: t.CONTENT_TYPE_GENERIC_TEXT,
      styleView: t.STYLE_VIEW_TITLE,
      defaultStyle: {
        ...sv.defaultStyleTitleDisplay
      }
    }),
    u.constructFieldConfig({
      type: t.FIELD_TYPE_TITLE,
      styleView: t.STYLE_VIEW_TITLE,
      defaultStyle: {
        ...sv.defaultStyleTitleDisplay
      }
    })
  ],
  required: false
});

// SUBCOPY

export const defaultRoleMarkdownSubcopy = u.constructRoleConfig({
  fieldConfigs: [
    df.defaultFieldConfigMarkdownEntry,
    df.defaultFieldConfigMarkdownField
  ],
  description: "A markdown field for display text.",
  required: false
});
