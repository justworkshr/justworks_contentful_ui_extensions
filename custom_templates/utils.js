import * as c from './constants'

export const constructRole = ({
  contentType = '',
  asset = null,
  description = '',
  allowedCustomTemplates = [],
  required = true,
  field = null
} = {}) => {
  return {
    contentType,
    asset,
    description,
    allowedCustomTemplates,
    required,
    field
  };
};

export const fieldObject = ({type, defaultClasses=''}={}) => {
  return ({
    type,
    defaultClasses
  })
}

export const defaultStyleTypes = () => {
  return {
    'template_style': {
      ...styleProperty({label: 'background_color', type: c.STYLE_TYPE_BACKGROUND_COLOR, description: 'The background color for this template.'})
    }
  }
}

export const styleProperty = ({label='', type=c.STYLE_TYPE_BACKGROUND_COLOR, description='', defaultClasses=''}={}) => {
  return {
    [label]: {
      type,
      description,
      defaultClasses
    }
  }
}

export const allowAsset = ({type=c.ASSET_TYPE_IMAGE, allowFormatting = false, maxWidth='2000'}={}) => {
  return ({
    asset: {
      type,
      formatting: {
        allow: allowFormatting,
        maxWidth: String(maxWidth)
      }
    },
  })
}
