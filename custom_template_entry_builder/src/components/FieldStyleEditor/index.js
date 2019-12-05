import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../custom_templates/constants';

import { Icon, SectionHeading } from '@contentful/forma-36-react-components';

import InternalMapping from '../../utils/InternalMapping';
import TextStyle from '../TextStyle';
import ImageStyle from '../ImageStyle';
import LogoStyle from '../LogoStyle';
import MultiReferenceStyle from '../MultiReferenceStyle';
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

  const renderFieldStyle = props => {
    switch (props.type) {
      case InternalMapping.MARKDOWN:
        return renderMarkdownStyle(
          props.internalMappingObject.styleClasses,
          props.entry.fields.value
        );
      case InternalMapping.TEXT:
        return renderTextStyle(props.internalMappingObject.styleClasses);
      case InternalMapping.ASSETSYS:
        if (
          props.roleMapping.asset.type === c.ASSET_TYPE_IMAGE &&
          props.roleMapping.asset.subType === c.ASSET_SUBTYPE_LOGO
        ) {
          return renderLogoStyle(props.internalMappingObject.styleClasses);
        }
        break;
      case InternalMapping.MULTI_REFERENCE:
        return props.roleMapping.allowMultipleReferenceStyle
          ? renderMultiReferenceStyle(props.internalMappingObject.styleClasses)
          : null;
    }
  };

  const renderTextStyle = entryStyleClasses => {
    return (
      <TextStyle
        onClear={classArray => props.clearStyleField(props.roleKey, classArray)}
        entryStyleClasses={entryStyleClasses}
        updateStyleExclusive={updateStyleExclusive}
      />
    );
  };

  const renderLogoStyle = entryStyleClasses => {
    return (
      <LogoStyle
        onClear={classArray => props.clearStyleField(props.roleKey, classArray)}
        entryStyleClasses={entryStyleClasses}
        updateStyleExclusive={updateStyleExclusive}
      />
    );
  };

  const renderFormattingStyle = formattingObject => {
    return (
      <ImageStyle
        roleKey={props.roleKey}
        formattingObject={formattingObject}
        onChange={props.updateAssetFormatting}
      />
    );
  };

  const renderMarkdownStyle = (entryStyleClasses, entryValue) => {
    const sections = getMarkdownSections(entryValue);

    return (
      <TextStyle
        onClear={classArray => props.clearStyleField(props.roleKey, classArray)}
        entryStyleClasses={entryStyleClasses}
        sections={sections}
        updateStyleExclusive={updateStyleExclusive}
      />
    );
  };

  const renderMultiReferenceStyle = entryStyleClasses => {
    const sections = ['small', 'medium', 'large'];
    return (
      <MultiReferenceStyle
        onClear={classArray => props.clearStyleField(props.roleKey, classArray)}
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
      {!!open && renderFieldStyle(props)}
      {!!open &&
        !!props.type === InternalMapping.ASSETSYS &&
        !!props.roleMapping.asset.type === c.ASSET_TYPE_IMAGE &&
        !!props.roleMapping.asset.allowFormatting &&
        renderFormattingStyle(props.internalMappingObject.formatting)}
    </div>
  );
};

FieldStyleEditor.propTypes = {
  clearStyleField: PropTypes.func,
  title: PropTypes.string,
  roleKey: PropTypes.string,
  roleMapping: PropTypes.object,
  internalMappingObject: PropTypes.object,
  updateStyle: PropTypes.func,
  updateAssetFormatting: PropTypes.func,
  type: PropTypes.string,
  entry: PropTypes.object
};

FieldStyleEditor.defaultProps = {
  entry: {},
  roleKey: '',
  roleMapping: {},
  internalMappingObject: {},
  type: InternalMapping.TEXT
};

export default FieldStyleEditor;
