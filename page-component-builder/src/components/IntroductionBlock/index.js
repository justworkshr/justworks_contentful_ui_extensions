import React from 'react';
import PropTypes from 'prop-types';

import {
  Heading,
  Subheading,
  Paragraph,
  Button,
  TextLink
} from '@contentful/forma-36-react-components';

import './style.scss';

const IntroductionBlock = props => {
  const STAGING_URL =
    ((props.sdk.parameters || {}).installation || {}).stagingUrl ||
    'https://justworks-staging-v2.herokuapp.com';
  return (
    <div className="introduction-block">
      <div className="f36-margin-bottom--xl">
        <Heading className="f36-margin-bottom--m">Your new pattern</Heading>
        <Paragraph>
          Click the button to open the Pattern Library and choose a pattern to edit.
        </Paragraph>
      </div>
      <Subheading>Helpful Links</Subheading>
      <ul>
        <li>
          <TextLink target="_blank" href={`${STAGING_URL}/styleguide`}>
            Marketing Styleguide
          </TextLink>
        </li>
        <li>
          <TextLink target="_blank" href={`${STAGING_URL}/`}>
            Staging Website
          </TextLink>
        </li>
      </ul>

      <div className="introduction-block__cta f36-margin-top--l">
        <Button buttonType="positive" onClick={props.toggleShown}>
          {' '}
          + New Pattern
        </Button>
      </div>
    </div>
  );
};

IntroductionBlock.propTypes = {
  sdk: PropTypes.string,
  toggleShown: PropTypes.func
};
IntroductionBlock.defaultProps = {};

export default IntroductionBlock;
