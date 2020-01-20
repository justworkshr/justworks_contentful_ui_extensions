import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../customModules/constants';

import { Icon, Subheading } from '@contentful/forma-36-react-components';
import StyleView from '../StyleView';
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
      const styleView = props.templateStyleObject[styleKey];
      return (
        <StyleView
          key={`template-style--${styleKey}`}
          styleView={styleView}
          onChange={onChange}
          onClear={onClearStyleSection}
          styleType={c.PROPERTY_TYPE_MARKDOWN}
          styleObject={props.mappingStyleObject}
          styleKey={styleKey}
          helpText={props.templateStyleObject[styleKey].helpText}
        />
      );
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
      {open && renderStyle(props)}
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
