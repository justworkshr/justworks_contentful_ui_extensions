import React from 'react';
import PropTypes from 'prop-types';
import ErrorList from '../ErrorList';

import { FieldGroup, RadioButtonField } from '@contentful/forma-36-react-components';

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
        const id = `${props.propKey}-radio--${option}--${Date.now()}`;
        return (
          <RadioButtonField
            key={id}
            id={id}
            labelText={getLabel(option)}
            labelIsLight={true}
            name={id}
            value={String(option)}
            checked={props.value === option}
            onChange={e => props.onChange(coerceValue(e.target.value))}
          />
        );
      })}
      <ErrorList errors={props.errors} />
    </FieldGroup>
  );
};

RadioGroup.propTypes = {
  errors: PropTypes.array,
  onChange: PropTypes.func,
  options: PropTypes.array,
  propKey: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};
RadioGroup.defaultProps = {
  errors: [],
  options: []
};

export default RadioGroup;
