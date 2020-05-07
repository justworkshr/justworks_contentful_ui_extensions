import React from 'react';
import PropTypes from 'prop-types';

import { TextInput, Paragraph } from '@contentful/forma-36-react-components';
import ErrorList from '../ErrorList';

const ShortTextField = props => {
  return (
    <div>
      <TextInput
        testId={props.testId}
        onChange={e => props.onChange(e.target.value)}
        value={props.value || ''}
        error={props.errors.length}
      />
      <ErrorList errors={props.errors} />
    </div>
  );
};

ShortTextField.propTypes = {
  errors: PropTypes.array,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
ShortTextField.defaultProps = {
  testId: 'short-text-field',
  value: '',
  errors: []
};

export default ShortTextField;
