import React from 'react';
import PropTypes from 'prop-types';

import { TextInput } from '@contentful/forma-36-react-components';
import ErrorList from '../ErrorList';

const ShortTextField = props => {
  return (
    <div>
      <TextInput
        testId={props.testId}
        type={props.type}
        onChange={e => props.onChange(e.target.value)}
        value={props.value || ''}
        error={!!props.errors.length}
        placeholder={props.placeholder}
      />
      <ErrorList errors={props.errors} />
    </div>
  );
};

ShortTextField.propTypes = {
  errors: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  testId: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
};
ShortTextField.defaultProps = {
  testId: 'short-text-field',
  type: 'text',
  value: '',
  errors: []
};

export default ShortTextField;
