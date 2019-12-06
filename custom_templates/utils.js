import * as c from './constants'

export const constructRole = ({
  contentType = '',
  asset = null,
  description = '',
  allowMultipleReferences = false,
  allowMultipleReferenceStyle = false,
  allowedCustomTemplates = [],
  defaultClasses,
  required = true,
  field = null
} = {}) => {
  return {
    contentType,
    asset,
    description,
    allowMultipleReferences,
    allowMultipleReferenceStyle,
    allowedCustomTemplates,
    defaultClasses,
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
      ...styleProperty({label: 'background_color', type: c.STYLE_TYPE_BACKGROUND_COLOR, description: 'The background color for this template.', defaultClasses: 'bg-color-white'})
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

export const allowAsset = ({type=c.ASSET_TYPE_IMAGE, subType=undefined, allowFormatting = false, maxWidth='2000', defaultClasses=''}={}) => {
  return ({
    asset: {
      type,
      subType,
      defaultClasses,
      formatting: {
        allow: allowFormatting,
        maxWidth: String(maxWidth)
      }
    },
  })
}

export const allowMultipleReferences = ({allow=true, allowStyle=false, contentTypes=[]}={}) => {
  return ({
    allowMultipleReferences: allow,
    allowMultipleReferenceStyle: allowStyle,
    contentType: contentTypes
  })
}
