import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../../../custom_templates/constants';

import { Icon, Subheading } from '@contentful/forma-36-react-components';

import StyleView from '../StyleView';
import classnames from 'classnames';
import { roleAllowsAssets } from '../../utils';

import './style.css';

const FieldStyleEditor = props => {
  const [open, toggleOpen] = useState(props.open);
  if (!props.roleMappingObject.style) return null;

  const renderFieldStyle = props => {
    switch (props.type) {
      case c.FIELD_TYPE_MARKDOWN:
        return renderMarkdownStyle(props.roleMappingObject.style.value);
      case c.FIELD_TYPE_TEXT:
        return renderTextStyle(props.roleMappingObject.style.value);
      case c.FIELD_TYPE_ASSET:
        if (
          roleAllowsAssets(props.roleConfig.fieldTypes) &&
          props.roleConfig.assetSubType === c.ASSET_SUBTYPE_LOGO
        ) {
          const styleClasses = props.roleMappingObject.style.value;
          return renderLogoStyle(styleClasses);
        }
        break;
      case c.MULTI_REFERENCE_STYLE_FLEX:
        return renderMultiReferenceStyle(props.roleMappingObject.style.value);
    }
  };

  const renderTextStyle = entryStyleClasses => {
    return;
    // <MarkdownStyle
    //   onClear={classArray => props.clearStyleField(props.roleKey, classArray)}
    //   entryStyleClasses={entryStyleClasses}
    //   onChange={(styleKey, value) => props.updateStyle(props.roleKey, styleKey, value)}
    //   styleType={c.FIELD_TYPE_TEXT}
    // />
  };

  const renderLogoStyle = entryStyleClasses => {
    return;
    // <LogoStyle
    //   onClear={classArray => props.clearStyleField(props.roleKey, classArray)}
    //   entryStyleClasses={entryStyleClasses}
    //   onChange={(styleKey, value) => props.updateStyle(props.roleKey, styleKey, value)}
    // />
  };

  const renderMarkdownStyle = styleObject => {
    return (
      <StyleView
        styleView={c.STYLE_VIEW_MARKDOWN}
        onClear={styleKey => props.clearStyleField(props.roleKey, styleKey)}
        onChange={(styleKey, value) => props.updateStyle(props.roleKey, styleKey, value)}
        styleType={c.FIELD_TYPE_MARKDOWN}
        styleObject={styleObject}
      />
    );
  };

  const renderMultiReferenceStyle = entryStyleClasses => {
    const sections = ['small', 'medium', 'large'];
    return;
    // <MultiReferenceStyle
    //   onClear={classArray => props.clearStyleField(props.roleKey, classArray)}
    //   entryStyleClasses={entryStyleClasses}
    //   sections={sections}
    //   updateStyleExclusive={updateStyleExclusive}
    // />
  };

  return (
    <div className={classnames('style-editor')}>
      <div className="style-editor__heading">
        <div className="sub-section__heading" onClick={() => toggleOpen(!open)}>
          <Icon className="sub-section__heading--icon" icon="Code" size="small" />
          <Subheading className="sub-section__heading--header" element="h1">
            {props.title}
          </Subheading>
          <Icon
            className="style-editor__heading--toggle"
            icon={open ? 'ChevronDown' : 'ChevronUp'}
            size="small"
          />
        </div>
      </div>
      {!!open && renderFieldStyle(props)}
    </div>
  );
};

FieldStyleEditor.propTypes = {
  clearStyleField: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  roleKey: PropTypes.string,
  roleConfig: PropTypes.object,
  roleMappingObject: PropTypes.object,
  updateStyle: PropTypes.func,
  updateAssetFormatting: PropTypes.func,
  type: PropTypes.string
};

FieldStyleEditor.defaultProps = {
  open: false,
  roleKey: '',
  roleConfig: {},
  roleMappingObject: {},
  type: undefined
};

export default FieldStyleEditor;
