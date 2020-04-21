import React from 'react';
import PropTypes from 'prop-types';

import { FieldGroup, RadioButtonField, RadioButton } from '@contentful/forma-36-react-components';

const RadioGroup = props => {
  const getLabel = value => {
    // coerce booleans
    if (value === true) return 'True';
    if (value === false) return 'False';
    return value;
  };

  const coerceValue = value => {
    // coerce booleans
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  };

  return (
    <FieldGroup className="radio-group">
      {props.options.map(option => {
        const id = `${props.propKey}-radio--${option}`;
        return (
          <RadioButtonField
            key={id}
            id={id}
            labelText={getLabel(option)}
            labelIsLight={true}
            name={id}
            value={String(option)}
            checked={props.value === option}
            onChange={e => props.onChange(coerceValue(e.target.value))}></RadioButtonField>
        );
      })}
    </FieldGroup>
  );
};

RadioGroup.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  propKey: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};
RadioGroup.defaultProps = {
  options: []
};

export default RadioGroup;
