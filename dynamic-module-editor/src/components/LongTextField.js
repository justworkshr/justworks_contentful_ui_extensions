import React from 'react';
import PropTypes from 'prop-types';

import { SectionHeading, Textarea } from '@contentful/forma-36-react-components';

const LongTextField = props => {
  if (props.value === null) return null;
  return (
    <div className="long-text-field max-width-600">
      <SectionHeading>{props.heading}</SectionHeading>
      <Textarea testId={props.testId} onChange={props.onChange} value={props.value} />
    </div>
  );
};

LongTextField.propTypes = {
  heading: PropTypes.string,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
LongTextField.defaultProps = {
  heading: '',
  testId: '',
  value: ''
};

export default LongTextField;
