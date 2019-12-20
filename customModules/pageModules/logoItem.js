import { constructRole, allowAsset } from "../utils";
import * as c from "../constants";

export const logoItem = {
  [c.LOGO_ITEM]: {
    meta: {
      hidden: true,
      description: "copy pending",
      imageUrl: ""
    },
    fieldRoles: {
      icon_asset: constructRole({
        ...allowAsset({
          type: c.ASSET_TYPE_IMAGE,
          subType: c.ASSET_SUBTYPE_LOGO,
          allowFormatting: false,
          maxWidth: "200",
          defaultStyle: "icon-small icon-center"
        }),
        description: `Logo image asset`,
        required: true
      }),
      label: constructRole({
        defaultStyle: "text-center text-black text-bold",
        required: false,
        description: "Text beneath the logo."
      })
    }
  }
};
