import * as u from "../utilities";
import * as c from "../constants";

export const logoRow = {
  [c.LOGO_ROW]: {
    meta: {
      hidden: true,
      description: "copy pending",
      imageUrl: ""
    },
    fieldRoles: {
      title: u.constructRoleConfig({
        description: "Template title.",
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_TITLE,
            styleView: c.STYLE_VIEW_TITLE
          }),
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ENTRY,
            styleView: c.STYLE_VIEW_TITLE,
            contentType: c.CONTENT_TYPE_GENERIC_TEXT,
            defaultStyle: {
              textAlignment: "center",
              textTransform: "uppercase",
              textColor: "navy",
              titleSize: "section-small"
            }
          })
        ],
        required: false
      }),
      items: u.constructRoleConfig({
        description: "Grid items.",
        required: false,
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            styleView: c.STYLE_VIEW_FLEX_ROW,
            assetStyleView: c.STYLE_VIEW_LOGO,
            assetType: c.ASSET_TYPE_IMAGE,
            assetSubType: c.ASSET_SUBTYPE_LOGO,
            contentType: [c.CONTENT_TYPE_COLLECTION_MODULE],
            defaultStyle: {
              flexRowPreset: "4-2-2"
            },
            assetDefaultStyle: {
              paddedContainer: "default",
              logoSize: "default"
            },
            allowedCustomTemplates: [c.LOGO_ITEM]
          })
        ],
        multiReferenceStyleView: c.STYLE_VIEW_FLEX_ROW
      })
    }
  }
};
