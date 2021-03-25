import React from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';
import ErrorList from '../ErrorList';
import 'react-mde/lib/styles/css/react-mde-all.css';

import { TextLink } from '@contentful/forma-36-react-components';

const MarkdownField = props => {
  const STAGING_URL =
    ((props.sdk.parameters || {}).installation || {}).stagingUrl ||
    'https://justworks-staging-v2.herokuapp.com';

  return (
    <div>
      <div>
        <TextLink
          target="_blank"
          href={`${STAGING_URL}/styleguide/foundations%2Fmarkdown_cheatsheet`}>
          Markdown Cheatsheet
        </TextLink>
      </div>
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
  value: PropTypes.string,
  sdk: PropTypes.object
};
MarkdownField.defaultProps = {
  errors: [],
  value: ''
};

export default MarkdownField;
