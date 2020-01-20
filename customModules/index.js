// PAGE PATTERNS
import { logoRow } from "./pageModules/logoRow";
import { contentHalves } from "./pageModules/contentHalves";

// COLLECTION MODULES
import { logoItem } from "./collectionModules/logoItem";

// COMPONENT MODULES

import { titledList } from "./componentModules/titledList";
import { responsiveImage } from "./componentModules/responsiveImage";

/////////////////
// Instructions
////////////////
// Add all new template internal mappings here.
// Use the ./constants file to save custom template string names.
// Ensure all template names are downcased.
// Warning 1) NEVER change a role name without changing the corresponding mapping in the template.
// Warning 2) NEVER change a content type name without changing the name here too.
////////////////

export const componentModule = {
  ...titledList,
  ...responsiveImage
};

export const pageModule = {
  ...contentHalves
};

export const collectionModule = {
  ...logoItem
};

export const templatePlaceholder = {
  meta: {
    description: ""
  },
  componentZones: {}
};

export const componentTemplatePlaceholder = {
  meta: {},
  properties: {}
};
