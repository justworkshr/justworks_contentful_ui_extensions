import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as c from '../../custom_templates/constants';

import { Button, DisplayText } from '@contentful/forma-36-react-components';

import EntryField from './components/EntryField';
import TemplateStyleEditor from './components/TemplateStyleEditor';
import FieldStyleEditor from './components/FieldStyleEditor';
import EntryActionRow from './components/EntryActionRow';
import RoleSection from './components/RoleSection';

import { init } from 'contentful-ui-extensions-sdk';

import { customTemplates, templatePlaceholder } from '../../custom_templates/';
import InternalMapping from './utils/InternalMapping';

import {
  groupByContentType,
  displaySnakeCaseName,
  getEntryOrField,
  cleanStyleClasses,
  getRolesToFetch,
  fetchEntryByRoleKey
} from './utils';

import {
  renderSingleEntryStyle,
  renderMultiReferenceStyle,
  renderMultiReferenceItemStyle
} from './utils/renderUtils';

import { addStateField, setEntryLoading } from './utils/stateUtils';

import { updateEntry } from './utils/sdkUtils';

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

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
    customTemplates: PropTypes.object.isRequired,
    entries: PropTypes.object,
    templatePlaceholder: PropTypes.object
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    const template = props.sdk.entry.fields.type.getValue();
    const templateConfig =
      props.customTemplates[template && template.toLowerCase()] || props.templatePlaceholder;
    const internalMappingJson = props.sdk.entry.fields.internalMapping.getValue();

    /*
      **** STATE
      **********
      entries: object {}
      // A mapping of all entry's linked entries & assets assigned to their roles.

      loadingEntries: object { [roleKey]: <boolean>}
      // a mapping of which roles have entries which are loading

      entryInternalMapping: object {}
      // the parsed JSON for this entry's internal mapping field

      templateConfig: object {}
      // the customTemplate object of the current template as defined in ./customTemplates

    */
    this.state = {
      entries: this.props.entries || {},
      errors: {}, // object { roleKey: array[{message: <string>}]}
      loadingEntries: {}, // object { roleKey: id }
      entryInternalMapping: template
        ? new InternalMapping(internalMappingJson, templateConfig)
        : {},
      templateConfig: templateConfig,
      rolesNavigatedTo: [],
      template
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
    sdk.window.startAutoResizer();
    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = sdk.field.onValueChanged(this.onExternalChange);
    sdk.entry.fields.type.onValueChanged(this.onTemplateChange);
    sdk.entry.onSysChanged(this.onSysChanged);

    if (this.state.template) {
      this.timeoutUpdateEntry({ updatedInternalMapping: this.state.entryInternalMapping, ms: 0 });
      await this.loadEntries();
    }
  };

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {};

  onSysChanged = async sysValue => {
    /*
      Updates state with new values and validates template
    */
    const sdk = this.props.sdk;
    const template = sdk.entry.fields.type.getValue();
    const internalMappingJson = sdk.entry.fields.internalMapping.getValue();
    if (!internalMappingJson) return;
    this.state.entryInternalMapping.assignRolesFromMapping(JSON.parse(internalMappingJson));
    this.setState(
      {
        template,
        templateConfig:
          this.props.customTemplates[template && template.toLowerCase()] ||
          this.props.templatePlaceholder
      },
      async () => {
        const rolesToFetch = getRolesToFetch(this.state.entryInternalMapping, this.state.entries);
        //
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
              this.state.templateConfig.fieldRoles,
              JSON.parse(sdk.entry.fields.internalMapping.getValue()),
              this.state.entries
            )
          )
        ) {
          sdk.field.setInvalid(false);
        } else {
          sdk.field.setInvalid(true);
        }
      }
    );
  };

  onTemplateChange = async template => {
    const internalMappingJson = this.props.sdk.entry.fields.internalMapping.getValue();
    const templateConfig =
      this.props.customTemplates[template && template.toLowerCase()] ||
      this.props.templatePlaceholder;
    if (template !== this.state.template) {
      this.setState({
        template,
        templateConfig,
        entryInternalMapping: template
          ? new InternalMapping(internalMappingJson, templateConfig)
          : {}
      });
    }
  };

  onAddFieldClick = (roleKey, field) => {
    handleAddField({
      state: this.state,
      setState: this.setState.bind(this),
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      roleKey,
      field
    });
  };

  onAddEntryClick = async ({ roleKey, contentType, template = undefined, type = 'entry' } = {}) => {
    await handleAddEntry({
      sdk: this.props.sdk,
      state: this.state,
      setState: this.setState.bind(this),
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
      state: this.state,
      setState: this.setState.bind(this),
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      roleKey
    });
  };

  onLinkEntryClick = async (roleKey, contentType) => {
    await handleLinkEntryClick({
      sdk: this.props.sdk,
      state: this.state,
      setState: this.setState.bind(this),
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      roleKey,
      contentType
    });
  };

  onDeepCopyClick = async (roleKey, contentType, entry = undefined) => {
    await handleDeepCopyClick({
      sdk: this.props.sdk,
      state: this.state,
      setState: this.setState.bind(this),
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      roleKey,
      contentType,
      entry
    });
  };

  onEditClick = async (entry, type = 'entry') => {
    await handleEntryEditClick({
      sdk: this.props.sdk,
      state: this.state,
      setState: this.setState.bind(this),
      entry,
      type
    });
  };

  onRemoveClick = (roleKey, entryIndex = null) => {
    handleRemoveEntry({
      sdk: this.props.sdk,
      state: this.state,
      setState: this.setState.bind(this),
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      roleKey,
      entryIndex
    });
  };

  timeoutUpdateEntry({ updatedEntries, updatedAssets, updatedInternalMapping, ms = 150 } = {}) {
    clearTimeout(this.sendUpdateRequestTimeout);
    this.sendUpdateRequestTimeout = setTimeout(
      () =>
        updateEntry({
          sdk: this.props.sdk,
          updatedEntries,
          updatedAssets,
          updatedInternalMappingJson: updatedInternalMapping.asJSON(),
          stateEntries: this.state.entries,
          stateTemplateMapping: this.state.templateConfig,
          loadEntriesFunc: this.loadEntries,
          setStateFunc: this.setState.bind(this)
        }),
      ms
    );
  }

  loadEntries = async () => {
    await Promise.all(
      await this.state.entryInternalMapping.fieldKeys().map(async roleKey => {
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
      sdk: this.props.sdk,
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
      state: this.state,
      setState: this.setState.bind(this),
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      e,
      roleKey
    });
  };

  updateTemplateStyle(templateStyleKey, templateStyleObject) {
    let updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.style = {
      ...updatedInternalMapping.style,
      [templateStyleKey]: templateStyleObject
    };

    this.setState({ entryInternalMapping: updatedInternalMapping }, () => {
      this.timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
    });
  }

  updateEntryStyle(roleKey, styleClasses) {
    handleUpdateEntryStyle({
      setState: this.setState.bind(this),
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      internalMappingObject: this.state.entryInternalMapping,
      roleKey,
      styleClasses
    });
  }

  updateReferencesStyle(roleKey, styleClasses) {
    handleUpdateReferencesStyle({
      setState: this.setState.bind(this),
      timeoutUpdateEntry: this.timeoutUpdateEntry.bind(this),
      internalMappingObject: this.state.entryInternalMapping,
      roleKey,
      styleClasses
    });
  }

  clearEntryStyleClasses(roleKey, classArray) {
    let updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.removeStyleClasses(roleKey, classArray);

    this.setState({ entryInternalMapping: updatedInternalMapping }, () => {
      this.timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
    });
  }

  clearReferencesStyle(roleKey, classArray) {
    let updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.removeReferencesStyleClasses(roleKey, classArray);

    this.setState({ entryInternalMapping: updatedInternalMapping }, () => {
      this.timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
    });
  }

  updateAssetFormatting(roleKey, formattingObject) {
    let updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.setImageFormatting(roleKey, formattingObject);

    this.setState({ entryInternalMapping: updatedInternalMapping }, () => {
      this.timeoutUpdateEntry({ updatedInternalMapping, ms: 1000 });
    });
  }

  renderEntryFields(roleKey, roleConfigObject, roleMappingObject, entry) {
    if (roleConfigObject.allowMultipleReferences && !!entry && !!entry.length) {
      return (
        <div>
          {entry.map((e, index) => {
            const entryType = (roleMappingObject.value.find(el => el.value === e.sys.id) || {})
              .type;
            return (
              <EntryField
                key={`entryfield-${roleKey}-${index}`}
                entry={e}
                entryIndex={index}
                fieldType={entryType}
                isLoading={!!this.state.loadingEntries[roleKey]}
                isDragActive={entry ? this.state.draggingObject === e.sys.id : false}
                roleKey={roleKey}
                roleConfig={roleConfigObject}
                onEditClick={this.onEditClick}
                onDeepCopyClick={this.onDeepCopyClick}
                onRemoveClick={this.onRemoveClick}
                onFieldChange={this.onFieldChange}
              />
            );
          })}
          <EntryActionRow
            allowAsset={!!this.state.templateConfig.fieldRoles[roleKey].asset}
            allowedCustomTemplates={
              this.state.templateConfig.fieldRoles[roleKey].allowedCustomTemplates
            }
            contentTypes={this.state.templateConfig.fieldRoles[roleKey].contentType}
            fieldObject={this.state.templateConfig.fieldRoles[roleKey].field}
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
    } else if (!!this.state.entries[roleKey] || !!this.state.loadingEntries[roleKey]) {
      return (
        <div>
          <EntryField
            entry={entry}
            fieldType={roleMappingObject.type}
            isLoading={!!this.state.loadingEntries[roleKey]}
            isDragActive={entry ? this.state.draggingObject === (entry.sys || {}).id : false}
            roleKey={roleKey}
            roleConfig={roleConfigObject}
            onEditClick={this.onEditClick}
            onDeepCopyClick={this.onDeepCopyClick}
            onRemoveClick={this.onRemoveClick}
            onFieldChange={this.onFieldChange}
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
          allowAsset={!!this.state.templateConfig.fieldRoles[roleKey].asset}
          allowedCustomTemplates={
            this.state.templateConfig.fieldRoles[roleKey].allowedCustomTemplates
          }
          contentTypes={this.state.templateConfig.fieldRoles[roleKey].contentType}
          fieldObject={this.state.templateConfig.fieldRoles[roleKey].field}
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
    const contentTypeGroups = groupByContentType(
      (this.state.templateConfig || {}).fieldRoles,
      this.state.entries
    );

    return (
      <div className="custom-template-entry-builder" onClick={this.fetchNavigatedTo}>
        <Button
          buttonType="muted"
          className="extension__refresh"
          onClick={this.loadEntries}
          size="small">
          Refresh
        </Button>
        {this.state.templateConfig.style && (
          <div className="custom-template-entry-builder__section">
            <DisplayText className="style-editor__heading--header" element="h1">
              Styles
            </DisplayText>
            {Object.keys(this.state.templateConfig.style).map(styleSectionKey => {
              return (
                <TemplateStyleEditor
                  key={`style-section-${styleSectionKey}`}
                  updateStyle={this.updateTemplateStyle}
                  templateStyleObject={this.state.templateConfig.style[styleSectionKey]}
                  mappingStyleObject={this.state.entryInternalMapping.style[styleSectionKey]}
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
          {Object.keys(contentTypeGroups).map((groupKey, index) => {
            return (
              <div className="entry-group" key={`group--${index}`}>
                <div className="entry-container">
                  {Object.keys(contentTypeGroups[groupKey])
                    .sort((a, b) => (!this.state.templateConfig.fieldRoles[b] || {}).required)
                    .map((roleKey, index) => {
                      const entry = contentTypeGroups[groupKey][roleKey];
                      const roleConfigObject = this.state.templateConfig.fieldRoles[roleKey] || {};
                      const roleMappingObject = this.state.entryInternalMapping.fieldRoles[roleKey];

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
          })}
        </div>
      </div>
    );
  }
}

init(sdk => {
  ReactDOM.render(
    <App sdk={sdk} customTemplates={customTemplates} templatePlaceholder={templatePlaceholder} />,
    document.getElementById('root')
  );
});
