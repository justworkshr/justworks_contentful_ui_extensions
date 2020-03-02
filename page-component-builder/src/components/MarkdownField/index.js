import React from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';

import { TextInput } from '@contentful/forma-36-react-components';

const MarkdownField = props => {
  return (
    <TextInput
      testId="short-text-field"
      onChange={e => props.onChange(e.target.value)}
      value={props.value}
    />
  );
};

MarkdownField.propTypes = {
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
MarkdownField.defaultProps = {
  value: ''
};

export default MarkdownField;
