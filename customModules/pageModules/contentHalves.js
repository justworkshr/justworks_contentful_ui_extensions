import * as u from "../utilities";
import * as c from "../constants";

export const contentHalves = {
  [c.CONTENT_HALVES]: {
    meta: {
      description: "",
      imageUrl: ""
    },
    componentZones: {
      left_content: u.constructComponentZone({
        componentOptions: [
          c.COMPONENT_TITLED_LIST,
          c.COMPONENT_RESPONSIVE_IMAGE
        ]
      }),
      right_content: u.constructComponentZone({
        componentOptions: [
          c.COMPONENT_TITLED_LIST,
          c.COMPONENT_RESPONSIVE_IMAGE
        ]
      })
    }
  }
};
