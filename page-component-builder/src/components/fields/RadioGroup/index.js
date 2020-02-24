import React from 'react';
import PropTypes from 'prop-types';

import { FieldGroup, RadioButtonField, RadioButton } from '@contentful/forma-36-react-components';

const RadioGroup = props => {
  return (
    <FieldGroup className="radio-group">
      {props.options.map(option => {
        const id = `${props.propKey}-radio--${option}`;
        return (
          <RadioButtonField
            key={id}
            id={id}
            labelText={option}
            labelIsLight={true}
            name={option}
            value={option}
            checked={props.value === option}
            onChange={e => props.onChange(e.target.value)}></RadioButtonField>
        );
      })}
    </FieldGroup>
  );
};

RadioGroup.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  propKey: PropTypes.string,
  value: PropTypes.string
};
RadioGroup.defaultProps = {
  options: []
};

export default RadioGroup;
