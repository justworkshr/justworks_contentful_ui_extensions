import React from 'react';
import PropTypes from 'prop-types';
import EntryField from '../EntryBuilder/components/EntryField';
import RoleStyleSection from '../EntryBuilder/components/RoleStyleSection';
import EntryActionRow from '../EntryBuilder/components/EntryActionRow';

import {
  FormLabel,
  HelpText,
  TextLink,
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

import { isDirectField, roleIsMultiReference, getContentTypes } from '../EntryBuilder/utils';

import {
  renderSingleEntryStyle,
  renderMultiReferenceStyle,
  renderMultiReferenceAssetStyle
} from '../EntryBuilder/utils/renderUtils';

import MultiRow from '../EntryBuilder/components/MultiRow';

const RoleSection = props => {
  const renderEntryFields = (mappingKey, propertyConfigObject, propertyMappingObject) => {
    // Multi References and with entries
    const customTemplateFieldConfig = getCustomTemplateFieldConfig(propertyConfigObject) || {};

    if (
      propertyConfigObject.propertyType === c.FIELD_TYPE_MULTI_REFERENCE &&
      propertyMappingObject.value &&
      propertyMappingObject.value.length
    ) {
      // render multi field
      return (
        <div className="section-row">
          <div className="section-column max-width-600">
            <MultiRow
              roleKey={mappingKey}
              hydratedEntries={props.hydratedEntries}
              hydratedAssets={props.hydratedAssets}
              loadingEntries={props.loadingEntries}
              roleConfigObject={propertyConfigObject}
              roleMappingObject={props.propertyMappingObject}
              onEditClick={props.onEditClick}
              onDeepCopyClick={props.onDeepCopyClick}
              onDuplicateClick={props.onDuplicateClick}
              onRemoveClick={props.onRemoveClick}
              onFieldChange={props.onFieldChange}
              onMultiReferenceDragEnd={props.onMultiReferenceDragEnd}
            />
            <EntryActionRow
              allowAssets={props.templateConfig.properties[mappingKey].fieldTypes.includes(
                c.FIELD_TYPE_ASSET
              )}
              allowEntries={props.templateConfig.properties[mappingKey].fieldTypes.includes(
                c.FIELD_TYPE_ENTRY
              )}
              allowFields={props.templateConfig.properties[mappingKey].fieldTypes.includes(
                c.FIELD_TYPE_FIELD
              )}
              allowedCollectionModules={customTemplateFieldConfig.allowedCollectionModules}
              className="max-width-600"
              contentTypes={getContentTypes(props.templateConfig.properties[mappingKey])}
              fieldType={propertyConfigObject.propertyType}
              onAddFieldClick={props.onAddFieldClick}
              roleKey={mappingKey}
              onAddEntryClick={props.onAddEntryClick}
              onLinkAssetClick={props.onLinkAssetClick}
              onLinkEntryClick={props.onLinkEntryClick}
              onDeepCopyLinkClick={props.onDeepCopyClick}
              onDuplicateClick={props.onDuplicateClick}
            />
          </div>
        </div>
      );
    } else if (props.entryInternalMapping && !!props.entryInternalMapping[mappingKey]) {
      // Render single field
      const entry =
        props.hydratedEntries.find(
          he => he.sys.id === props.entryInternalMapping[mappingKey].value
        ) ||
        props.hydratedAssets.find(a => a.sys.id === props.entryInternalMapping[mappingKey].value);
      return (
        <div className="section-row">
          <EntryField
            className="max-width-600"
            entry={entry}
            propertyType={propertyConfigObject.propertyType}
            isLoading={entry ? !!props.loadingEntries.includes(entry.sys.id) : false}
            roleKey={mappingKey}
            onEditClick={props.onEditClick}
            onDeepCopyClick={props.onDeepCopyClick}
            onRemoveClick={props.onRemoveClick}
            onFieldChange={props.onFieldChange}
            roleMappingObject={propertyMappingObject}
          />
        </div>
      );
    } else {
      // Render empty action row
      return (
        <EntryActionRow
          allowAssets={props.templateConfig.properties[mappingKey].fieldTypes.includes(
            c.FIELD_TYPE_ASSET
          )}
          allowEntries={props.templateConfig.properties[mappingKey].fieldTypes.includes(
            c.FIELD_TYPE_ENTRY
          )}
          allowFields={props.templateConfig.properties[mappingKey].fieldTypes.includes(
            c.FIELD_TYPE_FIELD
          )}
          allowedCollectionModules={customTemplateFieldConfig.allowedCollectionModules}
          className="max-width-600"
          contentTypes={getContentTypes(props.templateConfig.properties[mappingKey])}
          fieldType={propertyConfigObject.propertyType}
          onAddFieldClick={props.onAddFieldClick}
          roleKey={mappingKey}
          onAddEntryClick={props.onAddEntryClick}
          onLinkAssetClick={props.onLinkAssetClick}
          onLinkEntryClick={props.onLinkEntryClick}
          onDeepCopyLinkClick={props.onDeepCopyClick}
          onDuplicateClick={props.onDuplicateClick}
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
          required={props.propertyConfigObject.required}>
          <Subheading>{displayCamelCaseName(props.mappingKey)}</Subheading>
        </FormLabel>
        {isDirectField(props.propertyMappingObject.type) && (
          <IconButton
            className="role-section__remove-field"
            iconProps={{ icon: 'Close', size: 'large' }}
            buttonType="negative"
            label="Remove Field"
            onClick={() => props.onRemoveClick(props.mappingKey)}
          />
        )}
      </div>
      <HelpText>{props.propertyConfigObject.description}</HelpText>
      {renderEntryFields(props.mappingKey, props.propertyConfigObject, props.propertyMappingObject)}

      {!!(props.stateErrors[props.mappingKey] || {}).length &&
        props.stateErrors[props.mappingKey].map((error, index) => {
          return (
            <ValidationMessage key={`error-${props.mappingKey}-${index}`}>
              {error.message}
            </ValidationMessage>
          );
        })}
    </div>
  );
};

RoleSection.propTypes = {
  entry: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propertyMappingObject: PropTypes.object,
  mappingKey: PropTypes.string,
  propertyConfigObject: PropTypes.object,
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
  propertyConfigObject: {},
  roleMappingObject: {},
  stateErrors: {},
  loadingEntries: [],
  entryInternalMapping: {},
  templateConfig: {},
  hydratedAssets: [],
  hydratedEntries: []
};

export default RoleSection;
