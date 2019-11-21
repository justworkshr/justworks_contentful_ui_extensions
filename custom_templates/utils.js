import * as c from './constants'

export const constructRole = ({
  contentType = '',
  linkAsset = false,
  description = '',
  allowedCustomTemplates = [],
  required = true,
  fieldType = ''
} = {}) => {
  return {
    contentType,
    linkAsset,
    description,
    allowedCustomTemplates,
    required,
    fieldType
  };
};


export const defaultStyleTypes = () => {
  return {
    'backgroundColor': {
      type: c.STYLE_TYPE_BACKGROUND_COLOR,
      description: 'The background color for this template.'
    }
  }
}
