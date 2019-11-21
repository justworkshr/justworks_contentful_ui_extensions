import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../custom_templates/constants';

import { Icon, SectionHeading } from '@contentful/forma-36-react-components';
import BackgroundColorStyle from '../BackgroundColorStyle';
const TemplateStyleEditor = props => {
  const [open, toggleOpen] = useState(false);

  console.log(props.templateStyleClasses);
  const renderStyle = props => {
    return Object.keys(props.templateStyleObject).map(styleKey => {
      switch (styleKey) {
        case c.STYLE_TYPE_BACKGROUND_COLOR:
          return (
            <BackgroundColorStyle
              key={`template-style--${styleKey}`}
              classString={props.templateStyleClasses}
              onChange={props.updateStyleExclusive}
            />
          );
      }
    });
  };

  return (
    <div className="style-editor">
      <div className="style-editor__heading" onClick={() => toggleOpen(!open)}>
        <Icon className="style-editor__heading--icon" icon="Code" size="large" />
        <SectionHeading className="style-editor__heading--header" element="h1">
          {props.title}
        </SectionHeading>
        <Icon
          className="style-editor__heading--toggle"
          icon={open ? 'ChevronDown' : 'ChevronUp'}
          size="small"
        />
      </div>
      <div className="style-editor__heading" onClick={() => toggleOpen(!open)} />
      {open && <div>{renderStyle(props)}</div>}
    </div>
  );
};

TemplateStyleEditor.propTypes = {
  title: PropTypes.string,
  updateStyleExclusive: PropTypes.func,
  templateStyleObject: PropTypes.object,
  templateStyleClasses: PropTypes.string
};

TemplateStyleEditor.defaultProps = {
  templateStyleObject: {},
  templateStyleClasses: ''
};

export default TemplateStyleEditor;
