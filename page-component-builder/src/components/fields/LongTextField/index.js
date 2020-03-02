import React from 'react';
import PropTypes from 'prop-types';

import { Textarea } from '@contentful/forma-36-react-components';

const LongTextField = props => {
  return (
    <Textarea
      testId="long-text-field"
      onChange={e => props.onChange(e.target.value)}
      value={props.value}
    />
  );
};

LongTextField.propTypes = {
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
LongTextField.defaultProps = {
  value: ''
};

export default LongTextField;
