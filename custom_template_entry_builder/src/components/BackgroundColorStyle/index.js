import React from 'react';
import PropTypes from 'prop-types';

import { FormLabel, HelpText } from '@contentful/forma-36-react-components';
import ColorStyle from '../ColorStyle';

const BackgroundColorStyle = props => {
  return (
    <div className="style-editor__field-group background-color-style">
      <div className="style-editor__field-group">
        <FormLabel htmlFor="">Background Color</FormLabel>
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
  helpText: PropTypes.string,
  onChange: PropTypes.func
};

export default BackgroundColorStyle;
