import React from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';
import ErrorList from '../ErrorList';

const MarkdownField = props => {
  return (
    <div>
      <ReactMde
        testId="markdown-field"
        selectedTab="write"
        onTabChange={() => {}}
        onChange={value => props.onChange(value)}
        value={props.value}
      />
      <ErrorList errors={props.errors} />
    </div>
  );
};

MarkdownField.propTypes = {
  errors: PropTypes.array,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
MarkdownField.defaultProps = {
  errors: [],
  value: ''
};

export default MarkdownField;
