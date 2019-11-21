import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, SectionHeading } from '@contentful/forma-36-react-components';

import InternalMapping from '../../utils/InternalMapping';
import TextStyle from '../TextStyle';

import { getMarkdownSections } from '../utils/styleEditorUtils';

import './style.css';

const FieldStyleEditor = props => {
  const [open, toggleOpen] = useState(false);

  const updateStyleExclusive = (value, entryStyleClasses, valuesArray) => {
    entryStyleClasses = entryStyleClasses
      .split(' ')
      .filter(e => e)
      .filter(className => !valuesArray.some(classObject => classObject.className === className));

    entryStyleClasses = [...entryStyleClasses, value].join(' ');

    props.updateStyle(props.roleKey, entryStyleClasses);
  };

  const renderStyle = props => {
    switch (props.type) {
      case InternalMapping.MARKDOWN:
        return renderMarkdownStyle(props.entryStyleClasses, props.entryValue);
      case InternalMapping.TEXT:
        return renderTextStyle(props.entryStyleClasses);
    }
  };

  const renderTextStyle = entryStyleClasses => {
    return (
      <TextStyle
        entryStyleClasses={entryStyleClasses}
        updateStyleExclusive={updateStyleExclusive}
      />
    );
  };

  const renderMarkdownStyle = (entryStyleClasses, entryValue) => {
    const sections = getMarkdownSections(entryValue);

    return (
      <TextStyle
        entryStyleClasses={entryStyleClasses}
        sections={sections}
        updateStyleExclusive={updateStyleExclusive}
      />
    );
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
      {!!open && renderStyle(props)}
    </div>
  );
};

FieldStyleEditor.propTypes = {
  title: PropTypes.string,
  roleKey: PropTypes.string,
  updateStyle: PropTypes.func,
  type: PropTypes.string,
  entryStyleClasses: PropTypes.string,
  entryValue: PropTypes.string
};

FieldStyleEditor.defaultProps = {
  entryStyleClasses: '',
  entryValue: '',
  roleKey: '',
  type: InternalMapping.TEXT
};

export default FieldStyleEditor;
