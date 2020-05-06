import React from 'react';
import PropTypes from 'prop-types';

import { TextInput } from '@contentful/forma-36-react-components';

const ShortTextField = props => {
  return (
    <TextInput
      testId={props.testId}
      onChange={e => props.onChange(e.target.value)}
      value={props.value || ''}
    />
  );
};

ShortTextField.propTypes = {
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
ShortTextField.defaultProps = {
  testId: 'short-text-field',
  value: ''
};

export default ShortTextField;
