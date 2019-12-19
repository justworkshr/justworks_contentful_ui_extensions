import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../../../custom_templates/constants';

import classnames from 'classnames';

import FieldStyleEditor from '../FieldStyleEditor';
import {
  EntryCard,
  DropdownList,
  DropdownListItem,
  Subheading,
  TextLink,
  Icon
} from '@contentful/forma-36-react-components';
import { getStatus } from '../../../../../../shared/utilities/elementUtils';

import './style.css';

const RoleStyleSection = props => {
  const renderStyleEditor = () => {
    return (
      <FieldStyleEditor
        clearRoleStyle={props.clearRoleStyle}
        roleKey={props.roleKey}
        roleConfig={props.roleConfigObject}
        roleMappingObject={props.roleMappingObject}
        styleView={props.styleView}
        updateStyle={props.updateStyle}
        clearStyleField={props.clearStyleField}
        title={props.title}
        type={props.type}
      />
    );
  };

  return (
    <div className={classnames('role-style-section', props.className)}>
      <div className="sub-section__heading">
        <Icon className="sub-section__heading--icon" icon="Code" size="large" />
        <Subheading className="sub-section__heading--header">{props.title}</Subheading>
        {props.roleMappingObject.style &&
          props.roleMappingObject.style.type === c.STYLE_TYPE_CUSTOM && (
            <TextLink onClick={() => props.clearRoleStyle(props.roleKey)}>Remove</TextLink>
          )}
      </div>
      {(!props.roleMappingObject.style || !Object.keys(props.roleMappingObject.style).length) && (
        <div className="role-style-section__action-row">
          <TextLink
            className="link-style-section__custom-style-button"
            onClick={() => props.addCustomStyle(props.roleKey)}
            icon="Plus">
            Custom style
          </TextLink>
          <TextLink
            className="link-style-section__link-existing-button"
            onClick={() => props.addEntryStyle(props.roleKey)}
            icon="Link">
            Link existing
          </TextLink>
        </div>
      )}
      {props.roleMappingObject.style &&
        props.roleMappingObject.style.type === c.STYLE_TYPE_CUSTOM &&
        renderStyleEditor()}
      {props.roleMappingObject.style && props.roleMappingObject.style.type === c.STYLE_TYPE_ENTRY && (
        <EntryCard
          loading={!props.styleEntry}
          className="entry-card"
          size="small"
          title={
            props.styleEntry && props.styleEntry.fields
              ? props.styleEntry.fields.name['en-US']
              : 'Loading...'
          }
          contentType={props.styleEntry && props.styleEntry.sys.contentType.sys.id}
          status={getStatus(props.styleEntry)}
          dropdownListElements={
            <DropdownList>
              <DropdownListItem isTitle>Actions</DropdownListItem>

              {props.clearRoleStyle && (
                <DropdownListItem
                  className="role-style-section__action--remove"
                  onClick={() => props.clearRoleStyle(props.roleKey)}>
                  Remove
                </DropdownListItem>
              )}
            </DropdownList>
          }
        />
      )}
    </div>
  );
};

RoleStyleSection.propTypes = {
  addCustomStyle: PropTypes.func,
  addEntryStyle: PropTypes.func,
  clearRoleStyle: PropTypes.func,
  clearStyleField: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  roleKey: PropTypes.string,
  roleConfigObject: PropTypes.object,
  roleMappingObject: PropTypes.object,
  styleView: PropTypes.object,
  updateStyle: PropTypes.func,
  updateAssetFormatting: PropTypes.func,
  type: PropTypes.string,
  styleEntry: PropTypes.object
};

RoleStyleSection.defaultProps = {
  roleKey: '',
  roleConfigObject: {},
  roleMappingObject: {},
  styleView: undefined,
  type: c.FIELD_TYPE_TITLE,
  styleEntry: undefined
};

export default RoleStyleSection;
