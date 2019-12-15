import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as c from '../../../../custom_templates/constants';

import { Button, DisplayText } from '@contentful/forma-36-react-components';

import EntryField from './components/EntryField';
import TemplateStyleEditor from './components/TemplateStyleEditor';
import FieldStyleEditor from './components/FieldStyleEditor';
import EntryActionRow from './components/EntryActionRow';
import RoleSection from './components/RoleSection';

import InternalMapping from './utils/InternalMapping';

import {
  groupByContentType,
  displaySnakeCaseName,
  getRolesToFetch,
  fetchEntryByRoleKey
} from './utils';

import {
  renderSingleEntryStyle,
  renderMultiReferenceStyle,
  renderMultiReferenceItemStyle
} from './utils/renderUtils';

import { validateTemplate, templateIsValid, getTemplateErrors } from './utils/validations';

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
  handleFieldChange
} from './utils/eventUtils';

import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export default class EntryBuilder extends React.Component {
  constructor(props) {
    super(props);
    const type = props.type;
    const internalMappingJson = props.internalMappingJson;

    this.state = {
      entries: this.props.entries || {},
      errors: {}, // object { roleKey: array[{message: <string>}]}
      loadingEntries: {}, // object { roleKey: id }
      entryInternalMapping: type
        ? new InternalMapping(internalMappingJson, props.templateConfig)
        : {},
      rolesNavigatedTo: [],
      type
    };

    this.sendUpdateRequestTimeout = undefined;

    this.loadEntries = this.loadEntries.bind(this);
    this.fetchNavigatedTo = this.fetchNavigatedTo.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.updateEntryStyle = this.updateEntryStyle.bind(this);
    this.updateReferencesStyle = this.updateReferencesStyle.bind(this);
    this.updateAssetFormatting = this.updateAssetFormatting.bind(this);
    this.updateTemplateStyle = this.updateTemplateStyle.bind(this);
    this.clearEntryStyleClasses = this.clearEntryStyleClasses.bind(this);
    this.clearReferencesStyle = this.clearReferencesStyle.bind(this);
    this.renderEntryFields = this.renderEntryFields.bind(this);
    this.onLinkAssetClick = this.onLinkAssetClick.bind(this);
  }

  componentDidMount = async () => {
    const sdk = this.props.sdk;

    if (this.state.internalMappingJson) {
      this.timeoutUpdateEntry({ updatedInternalMapping: this.props.entryInternalMapping, ms: 0 });
      await this.loadEntries();
    }
  };

  componentWillUnmount() {}

  onSysChanged = async sysValue => {
    /*
      Updates state with new values and validates template
    */
    const sdk = this.props.sdk;
    const type = this.props.type;
    const internalMappingJson = this.props.internalMappingJson;
    if (!internalMappingJson) return;
    this.props.entryInternalMapping.assignRolesFromMapping(JSON.parse(internalMappingJson));
    this.setState(
      {
        type,
        templateConfig:
          this.props.customTemplates[type && type.toLowerCase()] || this.props.templatePlaceholder
      },
      async () => {
        const rolesToFetch = getRolesToFetch(this.props.entryInternalMapping, this.state.entries);
        await Promise.all(
          await rolesToFetch.map(async roleKey => {
            await fetchEntryByRoleKey({
              sdk: this.props.sdk,
              state: this.state,
              setState: this.setState.bind(this),
              timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
              roleKey
            });
          })
        );
        if (
          Object.keys(this.state.entries).length &&
          internalMappingJson &&
          templateIsValid(
            getTemplateErrors(
              this.props.templateConfig.fieldRoles,
              JSON.parse(this.props.internalMappingJson),
              this.state.entries
            )
          )
        ) {
          this.props.setInvalid(false);
        } else {
          this.props.setInvalid(true);
        }
      }
    );
  };

  onAddFieldClick = (roleKey, field) => {
    handleAddField({
      props: this.props,
      setState: this.setState.bind(this),
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      roleKey,
      field
    });
  };

  onAddEntryClick = async ({ roleKey, contentType, template = undefined, type = 'entry' } = {}) => {
    await handleAddEntry({
      sdk: this.props.sdk,
      props: this.props,
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
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
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      roleKey
    });
  };

  onLinkEntryClick = async (roleKey, contentType) => {
    await handleLinkEntryClick({
      sdk: this.props.sdk,
      props: this.props,
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      roleKey,
      contentType
    });
  };

  onDeepCopyClick = async (roleKey, contentType, entry = undefined) => {
    await handleDeepCopyClick({
      sdk: this.props.sdk,
      props: this.props,
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
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
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      roleKey,
      entryIndex
    });
  };

  timeoutUpdateEntry = async ({ updatedInternalMapping, ms = 150 } = {}) => {
    await this.props.setInternalMapping(updatedInternalMapping.asJSON());
  };

  loadEntries = async () => {
    await Promise.all(
      await this.props.entryInternalMapping.fieldKeys().map(async roleKey => {
        await fetchEntryByRoleKey({
          sdk: this.props.sdk,
          state: this.state,
          setState: this.setState.bind(this),
          timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
          roleKey
        });
      })
    );

    await validateTemplate({
      setInvalid: this.props.setInvalid,
      state: this.state,
      setState: this.setState.bind(this)
    });
  };

  fetchNavigatedTo = () => {
    if (this.state.rolesNavigatedTo && !this.state.rolesNavigatedTo.length) return;
    this.setState(
      {
        rolesNavigatedTo: []
      },
      () => {
        this.loadEntries();
      }
    );
  };

  onFieldChange = (e, roleKey) => {
    handleFieldChange({
      props: this.props,
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      e,
      roleKey
    });
  };

  updateTemplateStyle(templateStyleKey, templateStyleObject) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.style = {
      ...updatedInternalMapping.style,
      [templateStyleKey]: templateStyleObject
    };

    this.timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
  }

  updateEntryStyle(roleKey, styleClasses) {
    handleUpdateEntryStyle({
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      internalMappingObject: this.props.entryInternalMapping,
      roleKey,
      styleClasses
    });
  }

  updateReferencesStyle(roleKey, styleClasses) {
    handleUpdateReferencesStyle({
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      internalMappingObject: this.props.entryInternalMapping,
      roleKey,
      styleClasses
    });
  }

  clearEntryStyleClasses(roleKey, classArray) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.removeStyleClasses(roleKey, classArray);

    this.timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
  }

  clearReferencesStyle(roleKey, classArray) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.removeReferencesStyleClasses(roleKey, classArray);

    this.timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
  }

  updateAssetFormatting(roleKey, formattingObject) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.setImageFormatting(roleKey, formattingObject);

    this.timeoutUpdateEntry({ updatedInternalMapping, ms: 1000 });
  }

  renderEntryFields(roleKey, roleConfigObject, roleMappingObject, entry) {
    // Multi References and with entries
    if (
      roleConfigObject.allowMultipleReferences &&
      roleMappingObject.value &&
      roleMappingObject.value.length
    ) {
      return (
        <div>
          {roleMappingObject.value.map((entry, index) => {
            const e =
              this.props.hydratedEntries.find(he => he.sys.id === entry.value) ||
              this.props.hydratedAssets.find(a => a.sys.id === entry.value);
            return (
              <EntryField
                key={`entryfield-${roleKey}-${index}`}
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
          <EntryActionRow
            allowAsset={!!this.props.templateConfig.fieldRoles[roleKey].asset}
            allowedCustomTemplates={
              this.props.templateConfig.fieldRoles[roleKey].allowedCustomTemplates
            }
            contentTypes={this.props.templateConfig.fieldRoles[roleKey].contentType}
            fieldObject={this.props.templateConfig.fieldRoles[roleKey].field}
            onAddFieldClick={this.onAddFieldClick}
            roleKey={roleKey}
            onAddEntryClick={this.onAddEntryClick}
            onLinkAssetClick={this.onLinkAssetClick}
            onLinkEntryClick={this.onLinkEntryClick}
            onDeepCopyLinkClick={this.onDeepCopyClick}
          />
          {renderMultiReferenceStyle(roleConfigObject) && (
            <FieldStyleEditor
              roleKey={roleKey}
              roleConfig={roleConfigObject}
              roleMappingObject={roleMappingObject}
              updateStyle={this.updateEntryStyle}
              updateAssetFormatting={this.updateAssetFormatting}
              clearStyleField={this.clearEntryStyleClasses}
              entry={entry}
              title={displaySnakeCaseName(roleKey) + ' Collection Style'}
              type={roleConfigObject.multipleReferenceStyle}
            />
          )}
          {renderMultiReferenceItemStyle(roleConfigObject, roleMappingObject) && (
            <FieldStyleEditor
              roleKey={roleKey}
              roleConfig={roleConfigObject}
              roleMappingObject={roleMappingObject}
              updateStyle={this.updateReferencesStyle}
              updateAssetFormatting={this.updateAssetFormatting}
              clearStyleField={this.clearReferencesStyle}
              entry={entry}
              title={displaySnakeCaseName(roleKey) + ' Style'}
              type={c.FIELD_TYPE_ASSET}
              useReferenceStyleClasses={true}
            />
          )}
        </div>
      );
    } else if (this.props.entryInternalMapping && !!this.props.entryInternalMapping[roleKey]) {
      const entry =
        this.props.hydratedEntries.find(
          he => he.sys.id === this.props.entryInternalMapping[roleKey].value
        ) ||
        this.props.hydratedAssets.find(
          a => a.sys.id === this.props.entryInternalMapping[roleKey].value
        );
      return (
        <div>
          <EntryField
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
          {renderSingleEntryStyle(roleMappingObject.type, roleConfigObject) && (
            <FieldStyleEditor
              roleKey={roleKey}
              roleConfig={roleConfigObject}
              roleMappingObject={roleMappingObject}
              updateStyle={this.updateEntryStyle}
              updateAssetFormatting={this.updateAssetFormatting}
              clearStyleField={this.clearEntryStyleClasses}
              entry={entry}
              title={displaySnakeCaseName(roleKey) + ' Style'}
              type={roleMappingObject.type}
            />
          )}
        </div>
      );
    } else {
      return (
        <EntryActionRow
          allowAsset={!!this.props.templateConfig.fieldRoles[roleKey].asset}
          allowedCustomTemplates={
            this.props.templateConfig.fieldRoles[roleKey].allowedCustomTemplates
          }
          contentTypes={this.props.templateConfig.fieldRoles[roleKey].contentType}
          fieldObject={this.props.templateConfig.fieldRoles[roleKey].field}
          onAddFieldClick={this.onAddFieldClick}
          roleKey={roleKey}
          onAddEntryClick={this.onAddEntryClick}
          onLinkAssetClick={this.onLinkAssetClick}
          onLinkEntryClick={this.onLinkEntryClick}
          onDeepCopyLinkClick={this.onDeepCopyClick}
        />
      );
    }
  }

  render() {
    return (
      <div className="custom-template-entry-builder" onClick={this.fetchNavigatedTo}>
        <Button
          buttonType="muted"
          className="extension__refresh"
          onClick={this.loadEntries}
          size="small">
          Refresh
        </Button>
        {this.props.templateConfig.style && (
          <div className="custom-template-entry-builder__section">
            <DisplayText className="style-editor__heading--header" element="h1">
              Styles
            </DisplayText>
            {Object.keys(this.props.templateConfig.style).map(styleSectionKey => {
              return (
                <TemplateStyleEditor
                  key={`style-section-${styleSectionKey}`}
                  updateStyle={this.updateTemplateStyle}
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

              let entry;
              if (roleMappingObject.type === c.FIELD_TYPE_MULTI_REFERENCE) {
                if (!roleMappingObject.value.length) {
                  entry = undefined;
                } else {
                  entry = roleMappingObject.value
                    .map(e => this.props.hydratedEntries.find(entry => entry.sys.id === e.value))
                    .filter(e => e);

                  if (!entry.length) {
                    entry = undefined;
                  }
                }
              } else {
                entry = this.props.hydratedEntries.find(
                  entry => entry.sys.id === roleMappingObject.value
                );
              }

              return (
                <RoleSection
                  key={index}
                  entry={entry}
                  roleKey={roleKey}
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
  setInternalMapping: PropTypes.func
};

EntryBuilder.defaultProps = {
  internalMappingJson: '',
  entryInternalMapping: {},
  type: '',
  hydratedEntries: [],
  loadingEntries: [],
  hydratedAssets: []
};
