import * as c from './constants'

export const constructRole = ({
  contentType = '',
  asset = undefined,
  description = '',
  allowedCustomTemplates = [],
  required = true,
  fieldType = ''
} = {}) => {
  return {
    contentType,
    asset,
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

export const allowAsset = ({type=c.ASSET_TYPE_IMAGE, allowFormatting= false, maxWidth=2000}={}) => {
  return ({
    asset: {
      type,
      formatting: {
        allow: allowFormatting,
        maxWidth
      }
    },
  })
}
