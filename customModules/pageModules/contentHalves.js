import * as u from "../utilities";
import * as c from "../constants";

import { titledList } from "../componentModules/titledList";
import { responsiveImage } from "../componentModules/responsiveImage";

export const contentHalves = {
  [c.CONTENT_HALVES]: {
    meta: {
      patternName: c.CONTENT_HALVES,
      description: "",
      imageUrl: ""
    },
    componentZones: {
      leftContent: u.constructComponentZone({
        componentOptions: { ...titledList, ...responsiveImage }
      }),
      rightContent: u.constructComponentZone({
        componentOptions: { ...titledList, ...responsiveImage }
      })
    }
  }
};
