import { cardBlock } from "./pageModules/cardBlock";
import { textMedia } from "./pageModules/textMedia";
import { logoItem } from "./pageModules/logoItem";
import { logoGrid } from "./pageModules/logoGrid";

/////////////////
// Instructions
////////////////
// Add all new template internal mappings here.
// Use the ./constants file to save custom template string names.
// Ensure all template names are downcased.
// Warning 1) NEVER change a role name without changing the corresponding mapping in the template.
// Warning 2) NEVER change a content type name without changing the name here too.
////////////////

export const customTemplates = {
  ...cardBlock,
  ...textMedia,
  ...logoItem,
  ...logoGrid
};

export const templatePlaceholder = {
  meta: {
    description: ""
  },
  fieldRoles: {}
};
