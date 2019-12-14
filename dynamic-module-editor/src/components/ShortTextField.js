import React from 'react';
import PropTypes from 'prop-types';

import { SectionHeading, TextInput } from '@contentful/forma-36-react-components';

const ShortTextField = props => {
  if (props.value === null) return null;
  return (
    <div className="short-text-field">
      <SectionHeading>{props.heading}</SectionHeading>
      <TextInput testId={props.testId} onChange={props.onChange} value={props.value} />
    </div>
  );
};

ShortTextField.propTypes = {
  heading: PropTypes.string,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
ShortTextField.defaultProps = {
  heading: '',
  testId: '',
  value: ''
};

export default ShortTextField;
