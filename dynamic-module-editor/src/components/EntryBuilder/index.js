import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../custom_templates/constants';

import { DisplayText } from '@contentful/forma-36-react-components';

import EntryField from './components/EntryField';
import TemplateStyleEditor from './components/TemplateStyleEditor';
import RoleStyleSection from './components/RoleStyleSection';
import EntryActionRow from './components/EntryActionRow';
import RoleSection from './components/RoleSection';

import InternalMapping from '../../utils/InternalMapping';

import {
  roleIsMultiReference,
  displaySnakeCaseName,
  getFieldConfig,
  getContentTypes
} from './utils';

import {
  renderSingleEntryStyle,
  renderMultiReferenceStyle,
  renderMultiReferenceAssetStyle
} from './utils/renderUtils';

import {
  handleRemoveEntry,
  handleAddField,
  handleAddEntry,
  handleLinkAssetClick,
  handleLinkEntryClick,
  handleDeepCopyClick,
  handleUpdateEntryStyle,
  handleUpdateReferencesStyle,
  handleEntryEditClick,
  handleFieldChange,
  handleAddRoleEntryStyle,
  handleAddRoleReferencesEntryStyle
} from './utils/eventUtils';

import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export default class EntryBuilder extends React.Component {
  constructor(props) {
    super(props);
    const type = props.type;
    const internalMappingJson = props.internalMappingJson;

    this.state = {
      errors: {}, // object { roleKey: array[{message: <string>}]}
      loadingEntries: {}, // object { roleKey: id }
      entryInternalMapping: type
        ? new InternalMapping(internalMappingJson, props.templateConfig)
        : {},
      rolesNavigatedTo: [],
      type
    };

    this.fetchNavigatedTo = this.fetchNavigatedTo.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.updateEntryStyle = this.updateEntryStyle.bind(this);
    this.updateReferencesStyle = this.updateReferencesStyle.bind(this);
    this.updateAssetFormatting = this.updateAssetFormatting.bind(this);
    this.updateTemplateStyle = this.updateTemplateStyle.bind(this);
    this.clearTemplateStyle = this.clearTemplateStyle.bind(this);
    this.clearEntryStyleKey = this.clearEntryStyleKey.bind(this);
    this.clearReferencesStyle = this.clearReferencesStyle.bind(this);
    this.renderEntryFields = this.renderEntryFields.bind(this);
    this.onLinkAssetClick = this.onLinkAssetClick.bind(this);
    this.addRoleCustomStyle = this.addRoleCustomStyle.bind(this);
    this.addRoleReferencesCustomStyle = this.addRoleReferencesCustomStyle.bind(this);
    this.addRoleEntryStyle = this.addRoleEntryStyle.bind(this);
    this.addRoleReferencesEntryStyle = this.addRoleReferencesEntryStyle.bind(this);
    this.clearRoleStyle = this.clearRoleStyle.bind(this);
    this.clearRoleReferencesStyle = this.clearRoleReferencesStyle.bind(this);
  }

  onAddFieldClick = (roleKey, fieldType) => {
    handleAddField({
      props: this.props,
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      roleKey,
      fieldType
    });
  };

  onAddEntryClick = async ({ roleKey, contentType, template = undefined, type = 'entry' } = {}) => {
    await handleAddEntry({
      sdk: this.props.sdk,
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      roleKey,
      contentType,
      template,
      type
    });
  };

  onLinkAssetClick = async roleKey => {
    await handleLinkAssetClick({
      sdk: this.props.sdk,
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      roleKey
    });
  };

  onLinkEntryClick = async (roleKey, contentType) => {
    await handleLinkEntryClick({
      sdk: this.props.sdk,
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      roleKey,
      contentType
    });
  };

  onDeepCopyClick = async (roleKey, contentType, entry = undefined) => {
    await handleDeepCopyClick({
      sdk: this.props.sdk,
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      roleKey,
      contentType,
      entry
    });
  };

  onEditClick = async (entry, type = 'entry') => {
    await handleEntryEditClick({
      sdk: this.props.sdk,
      entry,
      type
    });
  };

  onRemoveClick = (roleKey, entryIndex = null) => {
    handleRemoveEntry({
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      roleKey,
      entryIndex
    });
  };

  fetchNavigatedTo = () => {
    if (this.state.rolesNavigatedTo && !this.state.rolesNavigatedTo.length) return;
    this.setState({
      rolesNavigatedTo: []
    });
  };

  onFieldChange = (e, roleKey) => {
    handleFieldChange({
      props: this.props,
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      e,
      roleKey
    });
  };

  updateTemplateStyle(templateStyleKey, styleKey, styleValue) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.setTemplateStyleValue(templateStyleKey, styleKey, styleValue);
    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  clearTemplateStyle(templateStyleKey, styleKey) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.removeTemplateStyleKey(templateStyleKey, styleKey);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  updateEntryStyle(roleKey, styleKey, styleValue) {
    handleUpdateEntryStyle({
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      internalMappingObject: this.props.entryInternalMapping,
      roleKey,
      styleKey,
      styleValue
    });
  }

  updateReferencesStyle(roleKey, styleKey, styleValue) {
    handleUpdateReferencesStyle({
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      internalMappingObject: this.props.entryInternalMapping,
      roleKey,
      styleKey,
      styleValue
    });
  }

  clearEntryStyleKey(roleKey, styleKey) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.removeStyleKey(roleKey, styleKey);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  clearReferencesStyle(roleKey, styleKey) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.removeReferencesStyleKey(roleKey, styleKey);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  updateAssetFormatting(roleKey, formattingObject) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.setAssetFormatting(roleKey, formattingObject);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  addRoleCustomStyle(roleKey, fieldConfigObject) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.addStyleCustom(roleKey, fieldConfigObject);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  addRoleReferencesCustomStyle(roleKey, fieldConfigObject) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.addReferencesStyleCustom(roleKey, fieldConfigObject);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  clearRoleStyle(roleKey) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    const styleType = updatedInternalMapping[roleKey].style.type;
    updatedInternalMapping.clearRoleStyle(roleKey);
    if (styleType === c.STYLE_TYPE_CUSTOM) {
      this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
    } else {
      this.props.updateEntry(updatedInternalMapping.asJSON());
    }
  }

  clearRoleReferencesStyle(roleKey) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    const styleType = updatedInternalMapping[roleKey].value.find(e => e.type === c.FIELD_TYPE_ASSET)
      .style.type;
    updatedInternalMapping.clearRoleReferencesStyle(roleKey);
    if (styleType === c.STYLE_TYPE_CUSTOM) {
      this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
    } else {
      this.props.updateEntry(updatedInternalMapping.asJSON());
    }
  }

  addRoleEntryStyle = roleKey => {
    handleAddRoleEntryStyle({
      sdk: this.props.sdk,
      props: this.props,
      roleKey,
      updateEntry: this.props.updateEntry
    });
  };

  addRoleReferencesEntryStyle = roleKey => {
    handleAddRoleReferencesEntryStyle({
      sdk: this.props.sdk,
      props: this.props,
      roleKey,
      updateEntry: this.props.updateEntry
    });
  };

  renderEntryFields(roleKey, roleConfigObject, roleMappingObject, fieldConfigObject) {
    // Multi References and with entries
    if (
      roleIsMultiReference(roleConfigObject.fieldTypes) &&
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
                  this.props.hydratedEntries.find(he => he.sys.id === entry.value) ||
                  this.props.hydratedAssets.find(a => a.sys.id === entry.value);
                return (
                  <EntryField
                    key={`entryfield-${roleKey}-${index}`}
                    className="max-width-600"
                    entry={e}
                    entryIndex={index}
                    fieldType={entry.type}
                    isLoading={e && !!this.props.loadingEntries.includes((e.sys || {}).id)}
                    roleKey={roleKey}
                    roleConfig={roleConfigObject}
                    onEditClick={this.onEditClick}
                    onDeepCopyClick={this.onDeepCopyClick}
                    onRemoveClick={this.onRemoveClick}
                    onFieldChange={this.onFieldChange}
                    roleMappingObject={roleMappingObject}
                  />
                );
              })}
            </div>
            <EntryActionRow
              allowedCustomTemplates={
                this.props.templateConfig.fieldRoles[roleKey].allowedCustomTemplates
              }
              className="max-width-600"
              contentTypes={getContentTypes(this.props.templateConfig.fieldRoles[roleKey])}
              onAddFieldClick={this.onAddFieldClick}
              roleKey={roleKey}
              onAddEntryClick={this.onAddEntryClick}
              onLinkAssetClick={this.onLinkAssetClick}
              onLinkEntryClick={this.onLinkEntryClick}
              onDeepCopyLinkClick={this.onDeepCopyClick}
              fieldTypes={this.props.templateConfig.fieldRoles[roleKey].fieldTypes}
            />
          </div>
          <div className="section-column">
            {renderMultiReferenceStyle(fieldConfigObject) && (
              <RoleStyleSection
                className="max-width-600"
                addCustomStyle={this.addRoleCustomStyle}
                addEntryStyle={this.addRoleEntryStyle}
                clearRoleStyle={this.clearRoleStyle}
                fieldConfigObject={fieldConfigObject}
                styleView={fieldConfigObject.styleView}
                styleEntry={
                  roleMappingObject.style && roleMappingObject.style.type === c.STYLE_TYPE_ENTRY
                    ? this.props.hydratedEntries.find(
                        e => e.sys.id === roleMappingObject.style.value
                      )
                    : undefined
                }
                roleKey={roleKey}
                roleConfigObject={roleConfigObject}
                roleMappingObject={roleMappingObject}
                updateStyle={this.updateEntryStyle}
                clearStyleField={this.clearEntryStyleKey}
                title={displaySnakeCaseName(roleKey) + ' Style'}
                type={roleMappingObject.type}
              />
            )}
            {renderMultiReferenceAssetStyle(roleMappingObject, fieldConfigObject) && (
              <RoleStyleSection
                className="max-width-600"
                addCustomStyle={this.addRoleReferencesCustomStyle}
                addEntryStyle={this.addRoleReferencesEntryStyle}
                clearRoleStyle={this.clearRoleReferencesStyle}
                fieldConfigObject={fieldConfigObject}
                styleView={fieldConfigObject.assetStyleView}
                styleEntry={
                  firstAsset.style && firstAsset.style.type === c.STYLE_TYPE_ENTRY
                    ? this.props.hydratedEntries.find(e => e.sys.id === firstAsset.style.value)
                    : undefined
                }
                roleKey={roleKey}
                roleConfigObject={roleConfigObject}
                roleMappingObject={firstAsset}
                updateStyle={this.updateReferencesStyle}
                clearStyleField={this.clearReferencesStyle}
                title={displaySnakeCaseName(roleKey) + ' Asset Style'}
                type={c.FIELD_TYPE_ASSET}
              />
            )}
          </div>
        </div>
      );
    } else if (this.props.entryInternalMapping && !!this.props.entryInternalMapping[roleKey]) {
      // Render single field
      const entry =
        this.props.hydratedEntries.find(
          he => he.sys.id === this.props.entryInternalMapping[roleKey].value
        ) ||
        this.props.hydratedAssets.find(
          a => a.sys.id === this.props.entryInternalMapping[roleKey].value
        );

      return (
        <div className="section-row">
          <EntryField
            className="max-width-600"
            entry={entry}
            fieldType={roleMappingObject.type}
            isLoading={entry ? !!this.props.loadingEntries.includes(entry.sys.id) : false}
            isDragActive={entry ? this.state.draggingObject === (entry.sys || {}).id : false}
            roleKey={roleKey}
            roleConfig={roleConfigObject}
            onEditClick={this.onEditClick}
            onDeepCopyClick={this.onDeepCopyClick}
            onRemoveClick={this.onRemoveClick}
            onFieldChange={this.onFieldChange}
            roleMappingObject={roleMappingObject}
          />
          {renderSingleEntryStyle(fieldConfigObject) && (
            <RoleStyleSection
              className="max-width-600"
              addCustomStyle={this.addRoleCustomStyle}
              addEntryStyle={this.addRoleEntryStyle}
              clearRoleStyle={this.clearRoleStyle}
              fieldConfigObject={fieldConfigObject}
              styleView={fieldConfigObject.styleView}
              styleEntry={
                roleMappingObject.style && roleMappingObject.style.type === c.STYLE_TYPE_ENTRY
                  ? this.props.hydratedEntries.find(e => e.sys.id === roleMappingObject.style.value)
                  : undefined
              }
              roleKey={roleKey}
              roleConfigObject={roleConfigObject}
              roleMappingObject={roleMappingObject}
              updateStyle={this.updateEntryStyle}
              clearStyleField={this.clearEntryStyleKey}
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
          allowedCustomTemplates={
            this.props.templateConfig.fieldRoles[roleKey].allowedCustomTemplates
          }
          className="max-width-600"
          contentTypes={getContentTypes(this.props.templateConfig.fieldRoles[roleKey])}
          onAddFieldClick={this.onAddFieldClick}
          roleKey={roleKey}
          onAddEntryClick={this.onAddEntryClick}
          onLinkAssetClick={this.onLinkAssetClick}
          onLinkEntryClick={this.onLinkEntryClick}
          onDeepCopyLinkClick={this.onDeepCopyClick}
          fieldTypes={this.props.templateConfig.fieldRoles[roleKey].fieldTypes}
        />
      );
    }
  }

  render() {
    return (
      <div className="custom-template-entry-builder" onClick={this.fetchNavigatedTo}>
        {this.props.templateConfig.style && (
          <div className="custom-template-entry-builder__section">
            <DisplayText className="style-editor__heading--header" element="h1">
              Styles
            </DisplayText>
            {Object.keys(this.props.templateConfig.style).map(styleSectionKey => {
              return (
                <TemplateStyleEditor
                  className="max-width-600"
                  key={`style-section-${styleSectionKey}`}
                  updateStyle={this.updateTemplateStyle}
                  clearStyle={this.clearTemplateStyle}
                  templateStyleObject={this.props.templateConfig.style[styleSectionKey]}
                  mappingStyleObject={this.props.entryInternalMapping.style[styleSectionKey]}
                  styleSectionKey={styleSectionKey}
                  title={displaySnakeCaseName(styleSectionKey)}
                />
              );
            })}
          </div>
        )}
        <div className="custom-template-entry-builder__section">
          <DisplayText className="style-editor__heading--header" element="h1">
            Fields
          </DisplayText>

          {Object.keys(this.props.templateConfig.fieldRoles)
            .sort((a, b) => (!this.props.templateConfig.fieldRoles[b] || {}).required)
            .map((roleKey, index) => {
              const roleConfigObject = this.props.templateConfig.fieldRoles[roleKey] || {};
              const roleMappingObject = this.props.entryInternalMapping.fieldRoles[roleKey] || {};
              const fieldConfigObject = getFieldConfig(roleConfigObject, roleMappingObject);
              return (
                <RoleSection
                  key={index}
                  roleKey={roleKey}
                  fieldConfigObject={fieldConfigObject}
                  roleConfigObject={roleConfigObject}
                  roleMappingObject={roleMappingObject}
                  renderEntryFields={this.renderEntryFields}
                  stateErrors={this.state.errors}
                  onRemoveClick={this.onRemoveClick}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

EntryBuilder.propTypes = {
  sdk: PropTypes.object.isRequired,
  customTemplates: PropTypes.object.isRequired,
  type: PropTypes.string,
  templatePlaceholder: PropTypes.object,
  entryInternalMapping: PropTypes.object,
  internalMappingJson: PropTypes.string,
  entries: PropTypes.object,
  setInvalid: PropTypes.func,
  hydratedEntries: PropTypes.array,
  hydratedAssets: PropTypes.array,
  updateEntry: PropTypes.func,
  setInternalMappingValue: PropTypes.func,
  templateConfig: PropTypes.object
};

EntryBuilder.defaultProps = {
  internalMappingJson: '',
  entryInternalMapping: {},
  type: '',
  hydratedEntries: [],
  loadingEntries: [],
  hydratedAssets: [],
  templateConfig: {}
};
