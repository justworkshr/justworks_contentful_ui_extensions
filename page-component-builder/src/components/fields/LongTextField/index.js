import React from 'react';
import PropTypes from 'prop-types';

import { Textarea } from '@contentful/forma-36-react-components';
import ErrorList from '../ErrorList';

const LongTextField = props => {
  return (
    <div>
      <Textarea
        testId="long-text-field"
        onChange={e => props.onChange(e.target.value)}
        value={props.value}
      />
      <ErrorList errors={props.errors} />
    </div>
  );
};

LongTextField.propTypes = {
  errors: PropTypes.array,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
LongTextField.defaultProps = {
  errors: [],
  value: ''
};

export default LongTextField;
