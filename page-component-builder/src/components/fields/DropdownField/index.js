import React from 'react';
import PropTypes from 'prop-types';

import { FieldGroup, Option, Select } from '@contentful/forma-36-react-components';

const DropdownField = props => {
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
  const id = `${props.propKey}--select`;
  return (
    <FieldGroup className="select-field">
      <Select
        key={id}
        id={id}
        name={id}
        value={String(props.value)}
        onChange={e => props.onChange(coerceValue(e.target.value))}>
        {props.options.map(option => {
          return (
            <Option key={`${props.propKey}-select-option-${option}`} value={option}>
              {getLabel(option)}
            </Option>
          );
        })}
      </Select>
    </FieldGroup>
  );
};

DropdownField.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  propKey: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};
DropdownField.defaultProps = {
  options: []
};

export default DropdownField;
