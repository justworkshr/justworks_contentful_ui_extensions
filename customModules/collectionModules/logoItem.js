import * as u from "../utilities";
import * as c from "../constants";

export const logoItem = {
  [c.LOGO_ITEM]: {
    meta: {
      hidden: true,
      description: "copy pending",
      imageUrl: ""
    },
    fieldRoles: {
      title: u.constructTitleRole({
        defaultStyle: c.defaultStyleTitleSectionSmall
      }),
      logo_asset: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE,
            assetSubType: c.ASSET_SUBTYPE_LOGO
          })
        ],
        description: `Logo image asset`,
        required: true
      }),
      subcopy: c.defaultRoleMarkdownSubcopy
    }
  }
};
