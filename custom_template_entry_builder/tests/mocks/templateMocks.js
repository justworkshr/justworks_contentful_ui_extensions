import { constructRole, fieldObject } from '../../../custom_templates/utils';
import * as c from '../../../custom_templates/constants';

export const MOCK_TEMPLATE_NAME = 'mock 1';
export const MOCK_FIELDS_TEMPLATE = 'fields mock';

export const mockCustomTemplates = {
  [MOCK_TEMPLATE_NAME]: {
    meta: {},
    style: {},
    fieldRoles: {
      left_section: {
        contentType: 'text',
        description: 'A left section'
      },
      right_section: {
        contentType: 'text',
        description: 'A left section'
      }
    }
  },
  [MOCK_FIELDS_TEMPLATE]: {
    meta: {},
    style: {},
    fieldRoles: {
      text_field: constructRole({
        field: fieldObject({ type: c.FIELD_TYPE_TEXT }),
        defaultClasses: 'text-left text-black',
        description: `Text Field.`,
        required: true
      }),
      markdown_field: constructRole({
        field: fieldObject({ type: c.FIELD_TYPE_MARKDOWN }),
        defaultClasses: 'text-left text-black',
        description: `Markdown Field.`,
        required: false
      })
    }
  }
};
