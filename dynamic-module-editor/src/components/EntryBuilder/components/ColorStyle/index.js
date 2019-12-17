import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../../../custom_templates/constants';

import {
  FormLabel,
  TextLink,
  RadioButtonField,
  HelpText
} from '@contentful/forma-36-react-components';

import { getSectionedClassName, getSectionValue } from '../utils/styleEditorUtils';

const ColorStyle = props => {
  return (
    <div className="style-section">
      <FormLabel htmlFor="">{`${props.label}${
        props.sectionLabel ? '(' + props.sectionLabel + ')' : ''
      }`}</FormLabel>
      <TextLink className="style-editor__clear-link" icon="Close" onClick={() => props.onClear()}>
        Clear
      </TextLink>
      {props.helpText && <HelpText>{props.helpText}</HelpText>}
      <div className="style-editor__inline-input-section">
        {props.styleValues.map((valueObject, index) => {
          const color = c.COLORS.find(color => color.label === valueObject.label);
          const fieldId = `radio-${props.roleKey}-${props.section}-${valueObject.value}`;
          return (
            <div className="style-editor__radio-section" key={`text-color-section-${index}`}>
              <RadioButtonField
                id={fieldId}
                className="style-editor__radio-field style-editor__color-radio"
                checked={props.value === getSectionedClassName(props.section, valueObject.value)}
                helpText={color.hexValue}
                labelText={valueObject.label}
                value={valueObject.value}
                labelIsLight={true}
                onChange={e => props.onChange(getSectionValue(e, props.section))}
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
    </div>
  );
};

ColorStyle.propTypes = {
  value: PropTypes.string,
  helpText: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  roleKey: PropTypes.string,
  section: PropTypes.string,
  sectionLabel: PropTypes.string,
  styleValues: PropTypes.array
};

ColorStyle.defaultProps = {
  value: '',
  section: ''
};

export default ColorStyle;
