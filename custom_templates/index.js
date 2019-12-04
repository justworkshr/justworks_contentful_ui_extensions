import { cardBlock } from './templates/cardBlock';
import { textCollection } from './templates/textCollection';
import { textMediaModule } from './templates/textMediaModule';
import { logoItem } from './templates/logoItem';
import { logoGrid } from './templates/logoGrid';

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
  ...textMediaModule,
  ...textCollection,
  ...logoItem,
  ...logoGrid
};

export const templatePlaceholder = {
  meta: {},
  roles: {}
};
