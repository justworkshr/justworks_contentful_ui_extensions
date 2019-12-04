const constructStyleClass = ({className='', label=''}={}) => {
  return {
    className,
    label
  }
}

const constructColor = ({label='', hexValue=''}={}) => {
  return {
    label,
    hexValue
  }
}

export const COLORS = [
  constructColor({label: 'Black', hexValue: '#515151'}),
  constructColor({label: 'White', hexValue: '#ffffff'}),
  constructColor({label: 'Timberwolf', hexValue: '#CDD6DA'}),
  constructColor({label: 'Concrete', hexValue: '#8199A3'}),
  constructColor({label: 'Mist', hexValue: '#EBF8FD'}),
  constructColor({label: 'Cerulean', hexValue: '#39B6E9'}),
  constructColor({label: 'Navy', hexValue: '#243F69'}),
  constructColor({label: 'Strawberry', hexValue: '#EC5453'}),
]

export const TEXT_ALIGNMENT_CLASSES = [
  constructStyleClass({className: 'text-left', label: 'Left'}),
  constructStyleClass({className: 'text-center', label: 'Center'}),
  constructStyleClass({className: 'text-right', label: 'Right'})
]

export const TEXT_TRANSFORM_CLASSES = [
  constructStyleClass({className: 'text-uppercase', label: 'Uppercase'}),
  constructStyleClass({className: 'text-lowercase', label: 'Lowercase'}),
  constructStyleClass({className: 'text-capitalize', label: 'Capitalize'})
]

export const TEXT_COLOR_CLASSES = COLORS.map(color => {
  return constructStyleClass({className: `text-${color.label.toLowerCase()}`, label: color.label})
})

export const BACKGROUND_COLOR_CLASSES = COLORS.map(color => {
  return constructStyleClass({className: `bg-color-${color.label.toLowerCase()}`, label: color.label})
})

export const LOGO_SIZE_CLASSES = [
  constructStyleClass({className: 'logo-small', label: 'Small'}),
  constructStyleClass({className: 'logo-large', label: 'Large'}),
]
