import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../../../custom_templates/constants';

import { Icon, Subheading } from '@contentful/forma-36-react-components';

import StyleView from '../StyleView';
import classnames from 'classnames';

import './style.css';

const FieldStyleEditor = props => {
  const [open, toggleOpen] = useState(props.open);
  if (!props.roleMappingObject.style) return null;

  const renderFieldStyle = props => {
    if (props.styleView) {
      return (
        <StyleView
          styleView={props.styleView}
          onClear={styleKey => props.clearStyleField(props.roleKey, styleKey)}
          onChange={(styleKey, value) => props.updateStyle(props.roleKey, styleKey, value)}
          styleObject={props.roleMappingObject.style.value}
        />
      );
    } else {
      return null;
    }
  };

  const renderTitleStyle = styleObject => {
    return (
      <StyleView
        styleView={c.STYLE_VIEW_TITLE}
        onClear={styleKey => props.clearStyleField(props.roleKey, styleKey)}
        onChange={(styleKey, value) => props.updateStyle(props.roleKey, styleKey, value)}
        styleObject={styleObject}
      />
    );
  };

  const renderLogoStyle = styleObject => {
    return (
      <StyleView
        styleView={c.STYLE_VIEW_LOGO}
        onClear={styleKey => props.clearStyleField(props.roleKey, styleKey)}
        onChange={(styleKey, value) => props.updateStyle(props.roleKey, styleKey, value)}
        styleObject={styleObject}
      />
    );
  };

  const renderMarkdownStyle = styleObject => {
    return (
      <StyleView
        styleView={c.STYLE_VIEW_MARKDOWN}
        onClear={styleKey => props.clearStyleField(props.roleKey, styleKey)}
        onChange={(styleKey, value) => props.updateStyle(props.roleKey, styleKey, value)}
        styleObject={styleObject}
      />
    );
  };

  const renderMultiReferenceStyle = (styleObject, roleConfigObject) => {
    return (
      <StyleView
        styleView={roleConfigObject.multiReferenceStyleView}
        onClear={styleKey => props.clearStyleField(props.roleKey, styleKey)}
        onChange={(styleKey, value) => props.updateStyle(props.roleKey, styleKey, value)}
        styleObject={styleObject}
      />
    );
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
  styleView: PropTypes.object,
  updateStyle: PropTypes.func,
  updateAssetFormatting: PropTypes.func,
  type: PropTypes.string
};

FieldStyleEditor.defaultProps = {
  open: false,
  roleKey: '',
  roleConfig: {},
  roleMappingObject: {},
  styleView: undefined,
  type: undefined
};

export default FieldStyleEditor;
