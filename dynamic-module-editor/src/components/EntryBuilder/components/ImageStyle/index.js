import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../custom_templates/constants';

import { FormLabel, HelpText, TextInput } from '@contentful/forma-36-react-components';

const ImageStyle = props => {
  const handleInputChange = e => {
    const target = e.currentTarget;
    const formattingObject = props.formattingObject;
    const objectKey = target.name;

    props.onChange(props.roleKey, { ...formattingObject, [objectKey]: target.value });
  };

  return (
    <div className="image-style style-editor__section">
      <div className="style-editor__field-group">
        <FormLabel htmlFor="">Width (pixels)</FormLabel>
        <HelpText>
          Setting this to higher than the natural image width will have no effect.
        </HelpText>
        <TextInput
          name="w"
          onChange={handleInputChange}
          type="number"
          value={String(props.formattingObject.w)}
        />
      </div>
      <div className="style-editor__field-group">
        <FormLabel htmlFor="">Height (pixels)</FormLabel>
        <HelpText>
          Setting this to higher than the natural image height will have no effect.
        </HelpText>
        <TextInput
          name="h"
          onChange={handleInputChange}
          type="number"
          value={String(props.formattingObject.h)}
        />
      </div>
    </div>
  );
};

ImageStyle.propTypes = {
  formattingObject: PropTypes.object,
  roleKey: PropTypes.object,
  onChange: PropTypes.func
};

ImageStyle.defaultProps = {
  formattingObject: {}
};

export default ImageStyle;
