import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShortFieldText from '../ShortTextField';
import { TextLink, FieldGroup, Option, Select } from '@contentful/forma-36-react-components';
import ErrorList from '../ErrorList';

const DropdownField = props => {
  const [useCustomText, toggleText] = useState(false);

  const getLabel = value => {
    // coerce booleans
    if (value === true) return 'True';
    if (value === false) return 'False';

    // remove token tags if present
    value = value
      .replace('{{', '')
      .replace('}}', '')
      .trim();
    return value || 'Select an option...';
  };

  const coerceValue = value => {
    // coerce booleans
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  };

  const getOptions = () => {
    let options = props.options;
    if (!props.required && !options.includes('')) {
      // add blank value unless required
      options.unshift('');
    }

    return options.sort();
  };

  const id = `${props.propKey}--select`;
  return (
    <FieldGroup className="select-field">
      {props.withCustomText && (
        <TextLink onClick={() => toggleText(!useCustomText)}>
          {useCustomText ? 'Use dropdown selection' : 'Enter custom text'}
        </TextLink>
      )}
      {useCustomText && (
        <ShortFieldText onChange={e => props.onChange(e.target.value)} value={props.value} />
      )}
      {!useCustomText && (
        <Select
          key={id}
          id={id}
          name={id}
          value={String(props.value)}
          onChange={e => props.onChange(coerceValue(e.target.value))}>
          {getOptions().map((option, index) => {
            return (
              <Option key={`${props.propKey}-select-option-${option || index}`} value={option}>
                {getLabel(option)}
              </Option>
            );
          })}
        </Select>
      )}
      <ErrorList errors={props.errors} />
    </FieldGroup>
  );
};

DropdownField.propTypes = {
  errors: PropTypes.array,
  onChange: PropTypes.func,
  options: PropTypes.array,
  propKey: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  withCustomText: PropTypes.bool
};
DropdownField.defaultProps = {
  options: [],
  errors: []
};

export default DropdownField;
