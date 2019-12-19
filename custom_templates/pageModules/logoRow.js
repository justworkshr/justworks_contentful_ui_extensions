import { constructRole, constructField } from "../utils";
import * as c from "../constants";

export const logoRow = {
  [c.LOGO_ROW]: {
    meta: {
      hidden: true,
      description: "copy pending",
      imageUrl: ""
    },
    fieldRoles: {
      title: constructRole({
        description: "Template title.",
        fieldTypes: [
          constructField({
            type: c.FIELD_TYPE_TITLE,
            styleView: c.STYLE_VIEW_TITLE
          }),
          constructField({
            type: c.FIELD_TYPE_ENTRY,
            styleView: c.STYLE_VIEW_TITLE,
            contentType: c.CONTENT_TYPE_GENERIC_TEXT
          })
        ],
        contentTypes: [c.CONTENT_TYPE_GENERIC_TEXT],
        required: false,
        defaultStyle: {
          textAlignment: "center",
          textTransform: "uppercase",
          textColor: "navy",
          titleSize: "section-small"
        }
      }),
      items: constructRole({
        description: "Grid items.",
        required: false,
        fieldTypes: [
          constructField({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            styleView: c.STYLE_VIEW_FLEX_ROW,
            assetStyleView: c.STYLE_VIEW_LOGO,
            assetTypes: [c.ASSET_TYPE_IMAGE],
            assetSubType: c.ASSET_SUBTYPE_LOGO
          })
        ],
        contentTypes: [c.CONTENT_TYPE_CUSTOM_TEMPLATE],
        allowedCustomTemplates: [c.LOGO_ITEM],
        multiReferenceStyleView: c.STYLE_VIEW_FLEX_ROW,
        assetDefaultStyle: {
          paddedContainer: "default",
          logoSize: "default"
        },
        defaultStyle: {
          flexRowPreset: "4-2-2"
        }
      })
    }
  }
};
