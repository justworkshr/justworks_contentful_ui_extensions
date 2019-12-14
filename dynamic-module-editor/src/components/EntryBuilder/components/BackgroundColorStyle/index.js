import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../custom_templates/constants';

import { FormLabel, HelpText, TextLink } from '@contentful/forma-36-react-components';
import ColorStyle from '../ColorStyle';

const BackgroundColorStyle = props => {
  return (
    <div className="style-editor__field-group background-color-style">
      <ColorStyle
        classString={props.classString}
        onChange={props.onChange}
        helpText={props.helpText}
        label={props.title}
        roleKey={props.roleKey}
        onClear={props.onClear}
        styleClasses={c.BACKGROUND_COLOR_CLASSES}
      />
    </div>
  );
};

BackgroundColorStyle.propTypes = {
  classString: PropTypes.string,
  onClear: PropTypes.func,
  helpText: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
  roleKey: PropTypes.string
};

BackgroundColorStyle.defaultProps = {
  title: 'Background Color'
};

export default BackgroundColorStyle;
