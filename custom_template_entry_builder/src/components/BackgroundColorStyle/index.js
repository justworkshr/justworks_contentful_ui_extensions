import React from 'react';
import PropTypes from 'prop-types';

import { FormLabel } from '@contentful/forma-36-react-components';
import ColorStyle from '../ColorStyle';

const BackgroundColorStyle = props => {
  return (
    <div className="background-color-style">
      <FormLabel htmlFor="">Background Color</FormLabel>
      <ColorStyle
        colorClassType="background"
        onChange={props.onChange}
        classString={props.classString}
      />
    </div>
  );
};

BackgroundColorStyle.propTypes = {
  classString: PropTypes.string,
  onChange: PropTypes.func
};

export default BackgroundColorStyle;
