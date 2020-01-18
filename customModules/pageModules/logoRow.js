import * as u from "../utilities";
import * as c from "../constants";

export const logoRow = {
  [c.LOGO_ROW]: {
    meta: {
      hidden: true,
      description: "copy pending",
      imageUrl: ""
    },
    componentZones: {
      title: u.constructTitleRole({
        defaultStyle: c.defaultStyleTitleSectionSmall
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
              ...u.constructStyleKeyValue({
                styleProperty: c.STYLE_PROPERTY_FLEX_ROW,
                value: "4-2-2"
              })
            },
            assetDefaultStyle: c.defaultStyleLogoDefaultComfortable,
            allowedCollectionModules: [c.LOGO_ITEM]
          })
        ],
        multiReferenceStyleView: c.STYLE_VIEW_FLEX_ROW
      })
    }
  }
};
