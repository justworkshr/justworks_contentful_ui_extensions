import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from '@contentful/forma-36-react-components';

const ErrorList = props => {
  return (
    <ul className="error-list" data-test-id="error-list">
      {props.errors.map(error => {
        return (
          <li className="f36-color--negative" key={error}>
            <Paragraph className="f36-color--negative">{error}</Paragraph>
          </li>
        );
      })}
    </ul>
  );
};

ErrorList.propTypes = {
  errors: PropTypes.array
};
ErrorList.defaultProps = {
  errors: []
};

export default ErrorList;
