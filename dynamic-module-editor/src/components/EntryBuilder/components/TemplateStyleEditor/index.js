import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../custom_templates/constants';

import { Icon, Subheading } from '@contentful/forma-36-react-components';
import BackgroundColorStyle from '../BackgroundColorStyle';

import { displaySnakeCaseName } from '../../utils';
import classnames from 'classnames';

import { capitalize } from '../../../../../../shared/utilities/elementUtils';

const TemplateStyleEditor = props => {
  const [open, toggleOpen] = useState(false);

  const onChange = (styleKey, value) => {
    props.updateStyle(props.styleSectionKey, styleKey, value);
  };

  const onClearStyleSection = styleKey => {
    props.updateStyle(props.styleSectionKey, styleKey);
  };

  const renderStyle = props => {
    return Object.keys(props.templateStyleObject).map(styleKey => {
      console.log(props.templateStyleObject, c.STYLE_PROPERTY_BACKGROUND_COLOR.key);
      switch (styleKey) {
        case c.STYLE_PROPERTY_BACKGROUND_COLOR.key:
          return (
            <BackgroundColorStyle
              key={`template-style--${styleKey}`}
              title={displaySnakeCaseName(styleKey)}
              value={props.mappingStyleObject[styleKey]}
              helpText={props.templateStyleObject[styleKey].description}
              onChange={value => onChange(styleKey, value)}
              roleKey={props.styleSectionKey + styleKey} // only needed for unique field IDs
              onClear={() => onClearStyleSection(styleKey)}
            />
          );
      }
    });
  };

  return (
    <div className={classnames('style-editor', props.className)}>
      <div className="sub-section__heading" onClick={() => toggleOpen(!open)}>
        <Icon className="sub-section__heading--icon" icon="Code" size="large" />
        <Subheading className="sub-section__heading--header" element="h1">
          {capitalize(props.title)}
        </Subheading>
        <Icon
          className="style-editor__heading--toggle"
          icon={open ? 'ChevronDown' : 'ChevronUp'}
          size="large"
        />
      </div>
      <div className="style-editor__heading" onClick={() => toggleOpen(!open)} />
      {open && <div className="style-editor__section">{renderStyle(props)}</div>}
    </div>
  );
};

TemplateStyleEditor.propTypes = {
  className: PropTypes.string,
  clearStyleField: PropTypes.func,
  title: PropTypes.string,
  updateStyle: PropTypes.func,
  templateStyleObject: PropTypes.object,
  mappingStyleObject: PropTypes.object,
  styleSectionKey: PropTypes.string
};

TemplateStyleEditor.defaultProps = {
  mappingStyleObject: {},
  templateStyleObject: {}
};

export default TemplateStyleEditor;
