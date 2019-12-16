import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../../../custom_templates/constants';

import { Icon, Subheading } from '@contentful/forma-36-react-components';

import TextStyle from '../TextStyle';
import ImageStyle from '../ImageStyle';
import LogoStyle from '../LogoStyle';
import MultiReferenceStyle from '../MultiReferenceStyle';
import { getMarkdownSections } from '../utils/styleEditorUtils';

import classnames from 'classnames';

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
      case c.FIELD_TYPE_MARKDOWN:
        return renderMarkdownStyle(
          props.roleMappingObject.styleClasses,
          props.roleMappingObject.value
        );
      case c.FIELD_TYPE_TEXT:
        return renderTextStyle(props.roleMappingObject.styleClasses);
      case c.FIELD_TYPE_ASSET:
        if (
          props.roleConfig.asset.type === c.ASSET_TYPE_IMAGE &&
          props.roleConfig.asset.subType === c.ASSET_SUBTYPE_LOGO
        ) {
          const styleClasses = props.useReferenceStyleClasses
            ? props.roleMappingObject.value[0].styleClasses
            : props.roleMappingObject.styleClasses;
          return renderLogoStyle(styleClasses);
        }
        break;
      case c.MULTI_REFERENCE_STYLE_FLEX:
        return renderMultiReferenceStyle(props.roleMappingObject.styleClasses);
    }
  };

  const renderTextStyle = entryStyleClasses => {
    return (
      <TextStyle
        onClear={classArray => props.clearStyleField(props.roleKey, classArray)}
        entryStyleClasses={entryStyleClasses}
        updateStyleExclusive={updateStyleExclusive}
        styleType={c.FIELD_TYPE_TEXT}
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
        styleType={c.FIELD_TYPE_MARKDOWN}
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
    <div className={classnames('style-editor', props.className)}>
      <div className="sub-section__heading" onClick={() => toggleOpen(!open)}>
        <Icon className="sub-section__heading--icon" icon="Code" size="large" />
        <Subheading className="sub-section__heading--header" element="h1">
          {props.title}
        </Subheading>
        <Icon
          className="style-editor__heading--toggle"
          icon={open ? 'ChevronDown' : 'ChevronUp'}
          size="large"
        />
      </div>
      {!!open && renderFieldStyle(props)}
      {!!open && // When mapping allows for asset formatting
        !!props.type === c.FIELD_TYPE_ASSET &&
        !!props.roleConfig.asset.type === c.ASSET_TYPE_IMAGE &&
        !!props.roleConfig.asset.allowFormatting &&
        renderFormattingStyle(props.roleMappingObject.formatting)}
    </div>
  );
};

FieldStyleEditor.propTypes = {
  clearStyleField: PropTypes.func,
  title: PropTypes.string,
  roleKey: PropTypes.string,
  roleConfig: PropTypes.object,
  roleMappingObject: PropTypes.object,
  updateStyle: PropTypes.func,
  updateAssetFormatting: PropTypes.func,
  useReferenceStyleClasses: PropTypes.bool,
  type: PropTypes.string,
  entry: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

FieldStyleEditor.defaultProps = {
  entry: {},
  roleKey: '',
  roleConfig: {},
  roleMappingObject: {},
  type: c.FIELD_TYPE_TEXT
};

export default FieldStyleEditor;
