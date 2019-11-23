import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../custom_templates/constants';

import { RadioButtonField } from '@contentful/forma-36-react-components';

import { getSectionedClassName, getSectionValue } from '../utils/styleEditorUtils';

const ColorStyle = props => {
  const colorClasses =
    props.colorClassType === 'text' ? c.TEXT_COLOR_CLASSES : c.BACKGROUND_COLOR_CLASSES;

  return (
    <div className="style-editor__inline-input-section">
      {colorClasses.map((classObject, index) => {
        const color = c.COLORS.find(color => color.label === classObject.label);
        const fieldId = `radio-${props.roleKey}-${props.section}-${classObject.className}`;
        return (
          <div className="style-editor__radio-section" key={`text-color-section-${index}`}>
            <RadioButtonField
              id={fieldId}
              className="style-editor__radio-field style-editor__color-radio"
              checked={props.classString
                .split(' ')
                .filter(e => e)
                .includes(getSectionedClassName(props.section, classObject.className))}
              helpText={color.hexValue}
              labelText={classObject.label}
              value={classObject.className}
              labelIsLight={true}
              onChange={e =>
                props.onChange(
                  getSectionValue(e, props.section),
                  props.classString,
                  colorClasses.map(classObject => ({
                    ...classObject,
                    className: getSectionedClassName(props.section, classObject.className)
                  }))
                )
              }
            />
            <div className="style-editor__color-section">
              <div
                className="style-editor__color-box"
                style={{
                  backgroundColor: color.hexValue
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

ColorStyle.propTypes = {
  section: PropTypes.string,
  onChange: PropTypes.func,
  classString: PropTypes.string,
  colorClassType: PropTypes.string,
  roleKey: PropTypes.string
};

ColorStyle.defaultProps = {
  classString: '',
  section: '',
  colorClassType: 'text'
};

export default ColorStyle;
