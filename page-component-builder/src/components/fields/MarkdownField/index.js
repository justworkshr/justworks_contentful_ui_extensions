import React from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';

const MarkdownField = props => {
  return (
    <ReactMde
      testId="markdown-field"
      selectedTab="write"
      onTabChange={() => {}}
      onChange={value => props.onChange(value)}
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
