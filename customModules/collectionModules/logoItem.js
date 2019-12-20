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
        defaultStyle: c.defaultStyleTitleSectionSmall,
        description: "Title above the logo."
      }),
      logo_asset: u.constructLogoRole({
        required: true
      }),
      subcopy: u.constructSubcopyRole({
        defaultStyle: c.defaultStyleMarkdownCenter,
        description: "Subcopy below the logo."
      })
    }
  }
};
