import React from 'react';
import PropTypes from 'prop-types';
import EntryField from '../EntryField';
import RoleStyleSection from '../RoleStyleSection';
import EntryActionRow from '../EntryActionRow';

import {
  FormLabel,
  HelpText,
  ValidationMessage,
  IconButton,
  SectionHeading
} from '@contentful/forma-36-react-components';

import * as c from '../../../../../../customModules/constants';
import { getCustomTemplateFieldConfig } from '../../../../../../shared/utilities/elementUtils';

import {
  isDirectField,
  roleIsMultiReference,
  displaySnakeCaseName,
  getContentTypes
} from '../../utils';

import {
  renderSingleEntryStyle,
  renderMultiReferenceStyle,
  renderMultiReferenceAssetStyle
} from '../../utils/renderUtils';

const RoleSection = props => {
  const renderEntryFields = (roleKey, roleConfigObject, roleMappingObject, fieldConfigObject) => {
    // Multi References and with entries

    const customTemplateFieldConfig = getCustomTemplateFieldConfig(roleConfigObject) || {};

    if (
      roleIsMultiReference(roleConfigObject.fieldConfigs) &&
      roleMappingObject.value &&
      roleMappingObject.value.length
    ) {
      const firstAsset =
        roleMappingObject.value && roleMappingObject.value.length
          ? roleMappingObject.value.find(e => e.type === c.FIELD_TYPE_ASSET)
          : undefined;
      // render multi field
      return (
        <div className="section-row">
          <div className="section-column max-width-600">
            <div className="asset-row">
              {roleMappingObject.value.map((entry, index) => {
                const e =
                  props.hydratedEntries.find(he => he.sys.id === entry.value) ||
                  props.hydratedAssets.find(a => a.sys.id === entry.value);
                return (
                  <EntryField
                    key={`entryfield-${roleKey}-${index}`}
                    className="max-width-600"
                    entry={e}
                    entryIndex={index}
                    fieldType={entry.type}
                    isLoading={e && !!props.loadingEntries.includes((e.sys || {}).id)}
                    roleKey={roleKey}
                    roleConfig={roleConfigObject}
                    onEditClick={props.onEditClick}
                    onDeepCopyClick={props.onDeepCopyClick}
                    onRemoveClick={props.onRemoveClick}
                    onFieldChange={props.onFieldChange}
                    roleMappingObject={roleMappingObject}
                  />
                );
              })}
            </div>
            <EntryActionRow
              allowedCustomTemplates={customTemplateFieldConfig.allowedCustomTemplates}
              className="max-width-600"
              contentTypes={getContentTypes(props.templateConfig.fieldRoles[roleKey])}
              onAddFieldClick={props.onAddFieldClick}
              roleKey={roleKey}
              onAddEntryClick={props.onAddEntryClick}
              onLinkAssetClick={props.onLinkAssetClick}
              onLinkEntryClick={props.onLinkEntryClick}
              onDeepCopyLinkClick={props.onDeepCopyClick}
              fieldConfigs={props.templateConfig.fieldRoles[roleKey].fieldConfigs}
            />
          </div>
          <div className="section-column">
            {renderMultiReferenceStyle(fieldConfigObject) && (
              <RoleStyleSection
                className="max-width-600"
                addCustomStyle={props.addRoleCustomStyle}
                addEntryStyle={props.addRoleEntryStyle}
                clearRoleStyle={props.clearRoleStyle}
                fieldConfigObject={fieldConfigObject}
                styleView={fieldConfigObject.styleView}
                styleEntry={
                  roleMappingObject.style && roleMappingObject.style.type === c.STYLE_TYPE_ENTRY
                    ? props.hydratedEntries.find(e => e.sys.id === roleMappingObject.style.value)
                    : undefined
                }
                roleKey={roleKey}
                roleConfigObject={roleConfigObject}
                roleMappingObject={roleMappingObject}
                updateStyle={props.updateEntryStyle}
                clearStyleField={props.clearEntryStyleKey}
                title={displaySnakeCaseName(roleKey) + ' Style'}
                type={roleMappingObject.type}
              />
            )}
            {renderMultiReferenceAssetStyle(roleMappingObject, fieldConfigObject) && (
              <RoleStyleSection
                className="max-width-600"
                addCustomStyle={props.addRoleReferencesCustomStyle}
                addEntryStyle={props.addRoleReferencesEntryStyle}
                clearRoleStyle={props.clearRoleReferencesStyle}
                fieldConfigObject={fieldConfigObject}
                styleView={fieldConfigObject.assetStyleView}
                styleEntry={
                  firstAsset.style && firstAsset.style.type === c.STYLE_TYPE_ENTRY
                    ? props.hydratedEntries.find(e => e.sys.id === firstAsset.style.value)
                    : undefined
                }
                roleKey={roleKey}
                roleConfigObject={roleConfigObject}
                roleMappingObject={firstAsset}
                updateStyle={props.updateReferencesStyle}
                clearStyleField={props.clearReferencesStyle}
                title={displaySnakeCaseName(roleKey) + ' Asset Style'}
                type={c.FIELD_TYPE_ASSET}
              />
            )}
          </div>
        </div>
      );
    } else if (props.entryInternalMapping && !!props.entryInternalMapping[roleKey]) {
      // Render single field
      const entry =
        props.hydratedEntries.find(he => he.sys.id === props.entryInternalMapping[roleKey].value) ||
        props.hydratedAssets.find(a => a.sys.id === props.entryInternalMapping[roleKey].value);

      return (
        <div className="section-row">
          <EntryField
            className="max-width-600"
            entry={entry}
            fieldType={roleMappingObject.type}
            isLoading={entry ? !!props.loadingEntries.includes(entry.sys.id) : false}
            roleKey={roleKey}
            roleConfig={roleConfigObject}
            onEditClick={props.onEditClick}
            onDeepCopyClick={props.onDeepCopyClick}
            onRemoveClick={props.onRemoveClick}
            onFieldChange={props.onFieldChange}
            roleMappingObject={roleMappingObject}
          />
          {renderSingleEntryStyle(fieldConfigObject) && (
            <RoleStyleSection
              className="max-width-600"
              addCustomStyle={props.addRoleCustomStyle}
              addEntryStyle={props.addRoleEntryStyle}
              clearRoleStyle={props.clearRoleStyle}
              fieldConfigObject={fieldConfigObject}
              styleView={fieldConfigObject.styleView}
              styleEntry={
                roleMappingObject.style && roleMappingObject.style.type === c.STYLE_TYPE_ENTRY
                  ? props.hydratedEntries.find(e => e.sys.id === roleMappingObject.style.value)
                  : undefined
              }
              roleKey={roleKey}
              roleConfigObject={roleConfigObject}
              roleMappingObject={roleMappingObject}
              updateStyle={props.updateEntryStyle}
              clearStyleField={props.clearEntryStyleKey}
              title={displaySnakeCaseName(roleKey) + ' Style'}
              type={roleMappingObject.type}
            />
          )}
        </div>
      );
    } else {
      // Render empty action row
      return (
        <EntryActionRow
          allowedCustomTemplates={customTemplateFieldConfig.allowedCustomTemplates}
          className="max-width-600"
          contentTypes={getContentTypes(props.templateConfig.fieldRoles[roleKey])}
          onAddFieldClick={props.onAddFieldClick}
          roleKey={roleKey}
          onAddEntryClick={props.onAddEntryClick}
          onLinkAssetClick={props.onLinkAssetClick}
          onLinkEntryClick={props.onLinkEntryClick}
          onDeepCopyLinkClick={props.onDeepCopyClick}
          fieldConfigs={props.templateConfig.fieldRoles[roleKey].fieldConfigs}
        />
      );
    }
  };

  return (
    <div className="role-section">
      <div className="role-section__header-section max-width-600">
        <FormLabel
          className="role-section__heading"
          htmlFor=""
          required={props.roleConfigObject.required}>
          <SectionHeading>{displaySnakeCaseName(props.roleKey)}</SectionHeading>
        </FormLabel>
        {isDirectField(props.roleMappingObject.type) && (
          <IconButton
            className="role-section__remove-field"
            iconProps={{ icon: 'Close', size: 'large' }}
            buttonType="negative"
            label="Remove Field"
            onClick={() => props.onRemoveClick(props.roleKey)}
          />
        )}
      </div>
      <HelpText>{props.roleConfigObject.description}</HelpText>
      {renderEntryFields(
        props.roleKey,
        props.roleConfigObject,
        props.roleMappingObject,
        props.fieldConfigObject
      )}

      {!!(props.stateErrors[props.roleKey] || {}).length &&
        props.stateErrors[props.roleKey].map((error, index) => {
          return (
            <ValidationMessage key={`error-${props.roleKey}-${index}`}>
              {error.message}
            </ValidationMessage>
          );
        })}
    </div>
  );
};

RoleSection.propTypes = {
  entry: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fieldConfigObject: PropTypes.object,
  roleMappingObject: PropTypes.object,
  roleKey: PropTypes.string,
  roleConfigObject: PropTypes.object,
  stateErrors: PropTypes.object,
  loadingEntries: PropTypes.array,
  entryInternalMapping: PropTypes.object,
  templateConfig: PropTypes.object,
  hydratedEntries: PropTypes.array,
  hydratedAssets: PropTypes.array,
  onEditClick: PropTypes.func,
  onDeepCopyClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onFieldChange: PropTypes.func,
  onAddFieldClick: PropTypes.func,
  onAddEntryClick: PropTypes.func,
  onLinkAssetClick: PropTypes.func,
  onLinkEntryClick: PropTypes.func,
  addRoleCustomStyle: PropTypes.func,
  addRoleEntryStyle: PropTypes.func,
  clearRoleStyle: PropTypes.func,
  updateEntryStyle: PropTypes.func,
  clearEntryStyleKey: PropTypes.func,
  addRoleReferencesCustomStyle: PropTypes.func,
  addRoleReferencesEntryStyle: PropTypes.func,
  clearRoleReferencesStyle: PropTypes.func,
  updateReferencesStyle: PropTypes.func,
  clearReferencesStyle: PropTypes.func
};

RoleSection.defaultProps = {
  entry: undefined,
  roleConfigObject: {},
  roleMappingObject: {},
  stateErrors: {},
  loadingEntries: [],
  entryInternalMapping: {},
  templateConfig: {},
  hydratedAssets: [],
  hydratedEntries: []
};

export default RoleSection;
