import { constructRole, fieldObject } from "../utils";
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
        required: false,
        field: fieldObject({ type: c.FIELD_TYPE_MARKDOWN }),
        defaultStyle: "text-center text-black"
      }),
      items: constructRole({
        description: "Grid items.",
        required: false,
        fieldTypes: [c.FIELD_TYPE_MULTI_REFERENCE, c.FIELD_TYPE_ASSET],
        contentTypes: [c.CONTENT_TYPE_CUSTOM_TEMPLATE],
        assetTypes: [c.ASSET_TYPE_IMAGE],
        assetSubType: c.ASSET_SUBTYPE_LOGO,
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
