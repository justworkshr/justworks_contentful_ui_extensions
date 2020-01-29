import * as u from "../utilities";
import * as c from "../constants";

import { headedList } from "../componentModules/headedList";
import { responsiveImage } from "../componentModules/responsiveImage";

export const contentSplit = {
  [c.CONTENT_SPLIT]: {
    meta: {
      patternName: c.CONTENT_SPLIT,
      description: "",
      imageUrl: ""
    },
    componentZones: {
      leftContent: u.constructComponentZone({
        componentOptions: { ...headedList, ...responsiveImage }
      }),
      rightContent: u.constructComponentZone({
        componentOptions: { ...headedList, ...responsiveImage }
      })
    }
  }
};
