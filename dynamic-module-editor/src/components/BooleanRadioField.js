import React from 'react';
import PropTypes from 'prop-types';

import {
  SectionHeading,
  FieldGroup,
  RadioButtonField
} from '@contentful/forma-36-react-components';

const BooleanRadioField = props => {
  if (props.value === null) return null;
  return (
    <div className="boolean-radio-field">
      <SectionHeading>{props.heading}</SectionHeading>
      <FieldGroup row={false}>
        <RadioButtonField
          labelText="Yes"
          checked={props.value === true}
          value="yes"
          onChange={props.onChange}
          name="validOption"
          id="yesCheckbox"
        />
        <RadioButtonField
          labelText="No"
          checked={props.value === false}
          value="no"
          onChange={props.onChange}
          name="validOption"
          id="noCheckbox"
        />
      </FieldGroup>
    </div>
  );
};

BooleanRadioField.propTypes = {
  heading: PropTypes.string,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
BooleanRadioField.defaultProps = {
  heading: '',
  testId: '',
  value: ''
};

export default BooleanRadioField;
