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
    <div className="style-editor__field-group">
      <FormLabel htmlFor="">
        {props.label} ({props.sectionLabel})
      </FormLabel>
      <TextLink className="style-editor__clear-link" icon="Close" onClick={() => props.onClear()}>
        Clear
      </TextLink>
      <div className="style-editor__inline-input-section">
        {props.styleValues.map((valueObject, index) => {
          const fieldId = `radio-${props.styleKey}-${valueObject.value}`;
          return (
            <div className="style-editor__radio-section" key={`text-alignment-section-${index}`}>
              <RadioButtonField
                id={fieldId}
                className="style-editor__radio-field"
                checked={props.value === valueObject.value}
                labelText={valueObject.label}
                value={valueObject.value}
                labelIsLight={true}
                onChange={e => {
                  props.onChange(e.target.value);
                }}
              />
              <div className="style-editor__color-section">
                <div
                  className="style-editor__color-box"
                  style={{
                    backgroundColor: c.COLORS.find(color => color.value === valueObject.value)
                      .hexValue
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
  label: PropTypes.string,
  onClear: PropTypes.func,
  onChange: PropTypes.func,
  section: PropTypes.string,
  styleKey: PropTypes.string,
  sectionLabel: PropTypes.string,
  styleValues: PropTypes.array,
  helpText: PropTypes.string
};

ColorStyle.defaultProps = {
  value: '',
  section: ''
};

export default ColorStyle;
