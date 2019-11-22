import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../custom_templates/constants';

import { FormLabel, HelpText, TextLink } from '@contentful/forma-36-react-components';
import ColorStyle from '../ColorStyle';

const BackgroundColorStyle = props => {
  return (
    <div className="style-editor__field-group background-color-style">
      <div className="style-editor__field-group">
        <FormLabel htmlFor="">Background Color</FormLabel>
        <TextLink
          className="style-editor__clear-link"
          icon="Close"
          onClick={() => props.onClear(c.BACKGROUND_COLOR_CLASSES)}>
          Clear
        </TextLink>
        {props.helpText && <HelpText>{props.helpText}</HelpText>}
        <ColorStyle
          colorClassType="background"
          onChange={props.onChange}
          classString={props.classString}
        />
      </div>
    </div>
  );
};

BackgroundColorStyle.propTypes = {
  classString: PropTypes.string,
  onClear: PropTypes.func,
  helpText: PropTypes.string,
  onChange: PropTypes.func
};

export default BackgroundColorStyle;
