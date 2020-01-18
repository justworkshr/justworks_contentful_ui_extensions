import * as u from "../utilities";
import * as c from "../constants";

import { titledList } from "../componentModules/titledList";
import { responsiveImage } from "../componentModules/responsiveImage";

export const contentHalves = {
  [c.CONTENT_HALVES]: {
    meta: {
      description: "",
      imageUrl: ""
    },
    componentZones: {
      left_content: u.constructComponentZone({
        componentOptions: { titledList, responsiveImage }
      }),
      right_content: u.constructComponentZone({
        componentOptions: { titledList, responsiveImage }
      })
    }
  }
};
