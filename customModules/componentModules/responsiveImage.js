import * as u from "../utilities";
import * as c from "../constants";

export const responsiveImage = {
  [c.COMPONENT_RESPONSIVE_IMAGE]: {
    meta: {
      componentName: c.COMPONENT_RESPONSIVE_IMAGE,
      componentTypes: [c.LINK_TYPE_SINGLETON],
      description: "",
      imageUrl: "",
      hidden: false
    },
    properties: {
      asset: u.constructComponentProperty({
        description: "Image asset.",
        propertyType: c.PROPERTY_TYPE_ASSET,
        fieldTypes: [c.FIELD_TYPE_ASSET],
        assetType: c.ASSET_TYPE_IMAGE
      })
    }
  }
};
