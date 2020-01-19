import React from 'react';
import PropTypes from 'prop-types';
import EntryField from '../EntryBuilder/components/EntryField';
import RoleStyleSection from '../EntryBuilder/components/RoleStyleSection';
import EntryActionRow from '../EntryBuilder/components/EntryActionRow';

import {
  FormLabel,
  HelpText,
  ValidationMessage,
  IconButton,
  SectionHeading,
  Subheading
} from '@contentful/forma-36-react-components';

import * as c from '../../../../customModules/constants';
import {
  getCustomTemplateFieldConfig,
  displayCamelCaseName
} from '../../../../shared/utilities/elementUtils';

import {
  isDirectField,
  roleIsMultiReference,
  getContentTypes,
  pluckFieldType,
  roleAllowsFields,
  roleAllowsAssets,
  roleAllowsLinks
} from '../EntryBuilder/utils';

import {
  renderSingleEntryStyle,
  renderMultiReferenceStyle,
  renderMultiReferenceAssetStyle
} from '../EntryBuilder/utils/renderUtils';

import MultiRow from '../EntryBuilder/components/MultiRow';

const RoleSection = props => {
  const renderEntryFields = (roleKey, roleConfigObject, roleMappingObject, fieldConfigObject) => {
    // Multi References and with entries

    const customTemplateFieldConfig = getCustomTemplateFieldConfig(roleConfigObject) || {};

    if (
      roleIsMultiReference(roleConfigObject.fieldConfigs) &&
      roleMappingObject.value &&
      roleMappingObject.value.length
    ) {
      const fieldConfigs = props.templateConfig.properties[roleKey].fieldConfigs;

      // render multi field
      return (
        <div className="section-row">
          <div className="section-column max-width-600">
            <MultiRow
              roleKey={roleKey}
              hydratedEntries={props.hydratedEntries}
              hydratedAssets={props.hydratedAssets}
              loadingEntries={props.loadingEntries}
              roleConfigObject={roleConfigObject}
              roleMappingObject={props.roleMappingObject}
              onEditClick={props.onEditClick}
              onDeepCopyClick={props.onDeepCopyClick}
              onDuplicateClick={props.onDuplicateClick}
              onRemoveClick={props.onRemoveClick}
              onFieldChange={props.onFieldChange}
              onMultiReferenceDragEnd={props.onMultiReferenceDragEnd}
            />
            <EntryActionRow
              allowAssets={roleAllowsAssets(fieldConfigs)}
              allowEntries={!!getContentTypes(props.templateConfig.properties[roleKey]).length}
              allowFields={roleAllowsFields(fieldConfigs)}
              allowLinks={roleAllowsLinks(fieldConfigs)}
              allowedCollectionModules={customTemplateFieldConfig.allowedCollectionModules}
              className="max-width-600"
              contentTypes={getContentTypes(props.templateConfig.properties[roleKey])}
              fieldType={pluckFieldType(fieldConfigs)}
              onAddFieldClick={props.onAddFieldClick}
              roleKey={roleKey}
              onAddEntryClick={props.onAddEntryClick}
              onLinkAssetClick={props.onLinkAssetClick}
              onLinkEntryClick={props.onLinkEntryClick}
              onDeepCopyLinkClick={props.onDeepCopyClick}
              onDuplicateClick={props.onDuplicateClick}
            />
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
            onEditClick={props.onEditClick}
            onDeepCopyClick={props.onDeepCopyClick}
            onRemoveClick={props.onRemoveClick}
            onFieldChange={props.onFieldChange}
            roleMappingObject={roleMappingObject}
          />
        </div>
      );
    } else {
      const fieldConfigs = props.templateConfig.properties[roleKey].fieldConfigs;

      // Render empty action row
      return (
        <EntryActionRow
          allowAssets={roleAllowsAssets(fieldConfigs)}
          allowEntries={!!getContentTypes(props.templateConfig.properties[roleKey]).length}
          allowFields={roleAllowsFields(fieldConfigs)}
          allowLinks={roleAllowsLinks(fieldConfigs)}
          allowedCollectionModules={customTemplateFieldConfig.allowedCollectionModules}
          className="max-width-600"
          contentTypes={getContentTypes(props.templateConfig.properties[roleKey])}
          fieldType={pluckFieldType(fieldConfigs)}
          onAddFieldClick={props.onAddFieldClick}
          roleKey={roleKey}
          onAddEntryClick={props.onAddEntryClick}
          onLinkAssetClick={props.onLinkAssetClick}
          onLinkEntryClick={props.onLinkEntryClick}
          onDeepCopyLinkClick={props.onDeepCopyClick}
          onDuplicateClick={props.onDuplicateClick}
          fieldConfigs={fieldConfigs}
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
          <Subheading>{displayCamelCaseName(props.roleKey)}</Subheading>
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
  onDuplicateClick: PropTypes.func,
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
  clearReferencesStyle: PropTypes.func,
  onMultiReferenceDragEnd: PropTypes.func
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
