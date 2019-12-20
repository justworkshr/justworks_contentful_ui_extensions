import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../customModules/constants';

import { getSectionedClassName, getSectionValue } from '../utils/styleEditorUtils';

import { FormLabel, RadioButtonField, TextLink } from '@contentful/forma-36-react-components';

const StyleEditorFieldGroup = props => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

StyleEditorFieldGroup.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onClear: PropTypes.func,
  onChange: PropTypes.func,
  section: PropTypes.string,
  sectionLabel: PropTypes.string,
  styleKey: PropTypes.string,
  styleValues: PropTypes.array,
  helpText: PropTypes.string
};

export default StyleEditorFieldGroup;
