import * as u from "../utilities";
import * as c from "../constants";

export const responsiveImage = {
  asset: u.constructComponentProperty({
    description: "Image asset.",
    fieldConfigs: [
      u.constructFieldConfig({
        type: c.FIELD_TYPE_ASSET,
        assetType: c.ASSET_TYPE_IMAGE
      })
    ]
  })
};
