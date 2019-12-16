import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../custom_templates/constants';

import { Icon, SectionHeading, Subheading } from '@contentful/forma-36-react-components';
import BackgroundColorStyle from '../BackgroundColorStyle';

import { displaySnakeCaseName, addExclusiveClassName } from '../../utils';
import classnames from 'classnames';

import { capitalize } from '../../../../../../shared/utilities/elementUtils';

const TemplateStyleEditor = props => {
  const [open, toggleOpen] = useState(false);

  const onChangeExclusive = (value, classString, valuesArray) => {
    classString = addExclusiveClassName(value, classString, valuesArray);
    const templateStyleObject = { ...props.mappingStyleObject, styleClasses: classString };
    props.updateStyle(props.styleSectionKey, templateStyleObject);
  };

  const onClearStyleSection = classArray => {
    if (classArray[0].className) {
      // if passed an array of classObjects instead of strings
      classArray = classArray.map(el => el.className);
    }

    const classString = props.mappingStyleObject.styleClasses
      .split(' ')
      .filter(e => e)
      .filter(cl => !classArray.includes(cl))
      .join(' ');
    const templateStyleObject = { ...props.mappingStyleObject, styleClasses: classString };
    props.updateStyle(props.styleSectionKey, templateStyleObject);
  };

  const renderStyle = props => {
    return Object.keys(props.templateStyleObject).map(styleKey => {
      switch (props.templateStyleObject[styleKey].type) {
        case c.STYLE_TYPE_BACKGROUND_COLOR:
          return (
            <BackgroundColorStyle
              key={`template-style--${styleKey}`}
              title={displaySnakeCaseName(styleKey)}
              classString={(props.mappingStyleObject || {}).styleClasses}
              helpText={props.templateStyleObject[styleKey].description}
              onChange={(value, classString, valuesArray) =>
                onChangeExclusive(value, classString, valuesArray)
              }
              roleKey={props.styleSectionKey + styleKey}
              onClear={onClearStyleSection}
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
  mappingStyleObject: {
    styleClasses: ''
  },
  templateStyleObject: {}
};

export default TemplateStyleEditor;
