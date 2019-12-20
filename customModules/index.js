// PAGE MODULES
import { cardBlock } from "./pageModules/cardBlock";
import { textMedia } from "./pageModules/textMedia";
import { logoRow } from "./pageModules/logoRow";

// COLLECTION MODULES
import { logoItem } from "./collectionModules/logoItem";

/////////////////
// Instructions
////////////////
// Add all new template internal mappings here.
// Use the ./constants file to save custom template string names.
// Ensure all template names are downcased.
// Warning 1) NEVER change a role name without changing the corresponding mapping in the template.
// Warning 2) NEVER change a content type name without changing the name here too.
////////////////

export const pageModule = {
  ...cardBlock,
  ...textMedia,
  ...logoRow
};

export const collectionModule = {
  ...logoItem
};

export const templatePlaceholder = {
  meta: {
    description: ""
  },
  fieldRoles: {}
};
