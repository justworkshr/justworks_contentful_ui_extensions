// PAGE PATTERNS
import { logoRow } from "./pageModules/logoRow";
import { contentSplit } from "./pageModules/contentSplit";

// COLLECTION MODULES
import { logoItem } from "./collectionModules/logoItem";

// COMPONENT MODULES

import { headedList } from "./componentModules/headedList";
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
  ...headedList,
  ...responsiveImage
};

export const pageModule = {
  ...contentSplit
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
