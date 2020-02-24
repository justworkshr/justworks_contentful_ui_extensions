import React from 'react';
import PropTypes from 'prop-types';

import { SectionHeading, TextInput } from '@contentful/forma-36-react-components';

const ShortTextField = props => {
  return (
    <TextInput
      testId="short-text-field"
      onChange={e => props.onChange(e.target.value)}
      value={props.value}
    />
  );
};

ShortTextField.propTypes = {
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
ShortTextField.defaultProps = {
  value: ''
};

export default ShortTextField;
