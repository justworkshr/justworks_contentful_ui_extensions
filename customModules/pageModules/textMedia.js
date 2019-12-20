import * as u from "../utilities";
import * as c from "../constants";

export const textMedia = {
  [c.TEXT_MEDIA_MODULE]: {
    meta: {
      description: "copy pending",
      imageUrl:
        "https://images.ctfassets.net/mnc2gcng0j8q/3xn8AvsyundHautmUuOKhJ/b7f3bd11eb55910ca7b3e34920099f39/Screenshot_from_2019-10-30_12-49-03.png"
    },
    style: {
      ...u.defaultStyleTypes()
    },
    fieldRoles: {
      title: u.constructTitleRole({ defaultStyle: c.defaultStyleTitleDisplay }),
      left_content: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE
          }),
          c.defaultFieldConfigMarkdownEntry,
          c.defaultFieldConfigMarkdownField
        ],

        description: `Can either be an image or display text.`,
        required: true
      }),
      right_content: u.constructRoleConfig({
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE
          }),
          c.defaultFieldConfigMarkdownEntry,
          c.defaultFieldConfigMarkdownField
        ],
        description: `Can either be an image or display text.`,
        required: true
      })
    }
  }
};
