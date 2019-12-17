import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../custom_templates/constants';

import ColorStyle from '../ColorStyle';

const BackgroundColorStyle = props => {
  return (
    <div className="style-editor__field-group background-color-style">
      <ColorStyle
        value={props.value}
        onChange={props.onChange}
        helpText={props.helpText}
        label={props.title}
        roleKey={props.roleKey}
        onClear={props.onClear}
        styleValues={c.STYLE_PROPERTY_BACKGROUND_COLOR.values}
      />
    </div>
  );
};

BackgroundColorStyle.propTypes = {
  value: PropTypes.string,
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
