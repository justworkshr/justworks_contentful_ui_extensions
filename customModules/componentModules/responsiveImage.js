import * as u from "../utilities";
import * as c from "../constants";

export const responsiveImage = {
  [c.COMPONENT_RESPONSIVE_IMAGE]: {
    meta: {
      componentName: c.COMPONENT_RESPONSIVE_IMAGE,
      description: "",
      imageUrl: ""
    },
    properties: {
      asset: u.constructComponentProperty({
        description: "Image asset.",
        fieldConfigs: [
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE
          })
        ]
      })
    }
  }
};
