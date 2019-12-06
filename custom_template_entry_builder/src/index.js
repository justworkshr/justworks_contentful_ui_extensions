import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as c from '../../custom_templates/constants';

import {
  Button,
  FormLabel,
  HelpText,
  ValidationMessage,
  IconButton,
  SectionHeading,
  DisplayText
} from '@contentful/forma-36-react-components';

import EntryField from './components/EntryField';
import TemplateStyleEditor from './components/TemplateStyleEditor';
import FieldStyleEditor from './components/FieldStyleEditor';
import EntryActionRow from './components/EntryActionRow';

import { init } from 'contentful-ui-extensions-sdk';

import { customTemplates, templatePlaceholder } from '../../custom_templates/';
import InternalMapping from './utils/InternalMapping';

import {
  removeByIndex,
  constructLink,
  groupByContentType,
  createEntry,
  createAsset,
  constructEntryName,
  displaySnakeCaseName,
  getContentTypeArray,
  getEntryOrField,
  cleanStyleClasses,
  selectAssetEntries,
  getRolesToFetch
} from './utils';

import { addStateAsset, addStateEntry, removeStateEntry } from './utils/stateUtils';

import { updateEntry } from './utils/sdkUtils';

import {
  validateLinkedEntry,
  validateLinkedAsset,
  templateIsValid,
  getTemplateErrors
} from './utils/validations';

import { cloneEntry } from '../../shared/utilities/deepCopy';

import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
    customTemplates: PropTypes.object.isRequired,
    templatePlaceholder: PropTypes.object
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    const template = props.sdk.entry.fields.template.getValue();
    const templateMapping =
      props.customTemplates[template && template.toLowerCase()] || props.templatePlaceholder;
    const internalMappingJson = props.sdk.entry.fields.internalMapping.getValue();

    /*
      entries: object {}
      // A mapping of all entry's linked entries & assets assigned to their roles.

      loadingEntries: object { [roleKey]: <boolean>}
      // a mapping of which roles have entries which are loading

      entryInternalMapping: object {}
      // the parsed JSON for this entry's internal mapping field

      templateMapping: object {}
      // the customTemplate object of the current template as defined in ./customTemplates

    */
    this.state = {
      entries: {},
      errors: {}, // object { roleKey: array[{message: <string>}]}
      loadingEntries: {}, // object { roleKey: id }
      entryInternalMapping: template
        ? new InternalMapping(internalMappingJson, templateMapping)
        : {},
      templateMapping: templateMapping,
      rolesNavigatedTo: [],
      template
    };

    this.sendUpdateRequestTimeout = undefined;

    this.loadEntries = this.loadEntries.bind(this);
    this.fetchNavigatedTo = this.fetchNavigatedTo.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.updateEntryStyle = this.updateEntryStyle.bind(this);
    this.updateAssetFormatting = this.updateAssetFormatting.bind(this);
    this.updateTemplateStyle = this.updateTemplateStyle.bind(this);
    this.linkAssetToTemplate = this.linkAssetToTemplate.bind(this);
    this.clearEntryStyleClasses = this.clearEntryStyleClasses.bind(this);
  }

  componentDidMount = async () => {
    const sdk = this.props.sdk;
    sdk.window.startAutoResizer();
    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = sdk.field.onValueChanged(this.onExternalChange);
    sdk.entry.fields.template.onValueChanged(this.onTemplateChange);
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

  onExternalChange = value => {
    // this.setState({
    //   value
    // });
  };

  onSysChanged = async sysValue => {
    /*
      Updates state with new values and validates template
    */
    const sdk = this.props.sdk;
    const template = sdk.entry.fields.template.getValue();
    const internalMappingJson = sdk.entry.fields.internalMapping.getValue();
    if (!internalMappingJson) return;
    this.setState(
      {
        template,
        entryInternalMapping: new InternalMapping(internalMappingJson, this.state.templateMapping),
        templateMapping:
          this.props.customTemplates[template && template.toLowerCase()] ||
          this.props.templatePlaceholder
      },
      async () => {
        const rolesToFetch = getRolesToFetch(this.state.entryInternalMapping, this.state.entries);
        //
        await Promise.all(
          await rolesToFetch.map(async roleKey => {
            await this.fetchEntryByRoleKey(roleKey);
          })
        );
        if (
          Object.keys(this.state.entries).length &&
          internalMappingJson &&
          templateIsValid(
            getTemplateErrors(
              this.state.templateMapping.fieldRoles,
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
    const templateMapping =
      this.props.customTemplates[template && template.toLowerCase()] ||
      this.props.templatePlaceholder;
    if (template !== this.state.template) {
      this.setState({
        template,
        templateMapping,
        entryInternalMapping: template
          ? new InternalMapping(internalMappingJson, templateMapping)
          : {}
      });
    }
  };

  onAddFieldClick = (roleKey, field) => {
    const roleMappingObject = this.state.templateMapping.fieldRoles[roleKey];
    const updatedInternalMapping = this.state.entryInternalMapping;
    switch (field.type) {
      case InternalMapping.TEXT:
        updatedInternalMapping.addTextField({
          key: roleKey,
          styleClasses: roleMappingObject.defaultClasses
        });
        break;
      case InternalMapping.MARKDOWN:
        updatedInternalMapping.addMarkdownField({
          key: roleKey,
          styleClasses: roleMappingObject.defaultClasses
        });
        break;
      default:
        break;
    }

    const updatedEntries = addStateEntry(
      this.state.entries,
      roleKey,
      InternalMapping.entryMapping({ ...updatedInternalMapping[roleKey] })
    );

    this.setState({ entries: updatedEntries, entryInternalMapping: updatedInternalMapping }, () =>
      this.timeoutUpdateEntry({ updatedInternalMapping, ms: 0 })
    );
  };

  onRemoveFieldClick = (roleKey, entryIndex = null) => {
    /*
      Removes fields or assets from internal mapping
    */

    const updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.removeEntry(roleKey, entryIndex);
    const updatedEntryList = removeStateEntry(
      this.state.entries,
      updatedInternalMapping,
      entryIndex
    );
    const updatedAssetList = selectAssetEntries(updatedEntryList).map(asset =>
      constructLink(asset)
    );

    this.setState(
      prevState => {
        const prevStateLoadingEntries = { ...prevState.loadingEntries };
        const prevStateEntries = { ...prevState.entries };

        if (Array.isArray(prevStateEntries[roleKey])) {
          prevStateEntries[roleKey] = removeByIndex(prevStateEntries[roleKey], entryIndex);

          if (!prevStateEntries[roleKey].length) {
            delete prevStateEntries[roleKey];
            delete prevStateLoadingEntries[roleKey];
          }
        } else {
          delete prevStateEntries[roleKey];
          delete prevStateLoadingEntries[roleKey];
        }

        return {
          loadingEntries: prevStateLoadingEntries,
          entries: updatedEntryList,
          entryInternalMapping: updatedInternalMapping
        };
      },
      () => {
        this.timeoutUpdateEntry({
          updatedAssets: updatedAssetList,
          updatedInternalMapping,
          ms: 0
        });
      }
    );

    // this.setState({ entries: updatedEntryList, entryInternalMapping: updatedInternalMapping }, () =>
    //   this.timeoutUpdateEntry({
    //     updatedEntries: updatedEntryList,
    //     updatedAssets: updatedAssetList,
    //     updatedInternalMapping,
    //     ms: 0
    //   })
    // );
  };

  onAddEntryClick = async ({ roleKey, contentType, template = undefined, type = 'entry' } = {}) => {
    const sdk = this.props.sdk;
    if (type === 'asset') {
      const newAsset = await createAsset(sdk.space);

      sdk.navigator.openAsset(newAsset.sys.id, { slideIn: true });
    } else if (type === 'entry') {
      const newEntryName = constructEntryName(sdk.entry.fields.name.getValue(), roleKey);
      const newEntry = await createEntry(sdk.space, contentType, newEntryName, template);

      if (this.state.templateMapping.fieldRoles[roleKey].allowMultipleReferences) {
        this.linkEntriesToTemplate([newEntry], roleKey);
      } else {
        this.linkEntryToTemplate(newEntry, roleKey);
      }
      sdk.navigator.openEntry(newEntry.sys.id, { slideIn: true });
    }
  };

  handleMultipleAssetsLink = async roleKey => {
    const sdk = this.props.sdk;
    const assets = await sdk.dialogs.selectMultipleAssets({
      locale: 'en-US'
    });

    let linkedEntryValidation;
    assets.forEach(asset => {
      linkedEntryValidation = validateLinkedAsset(
        asset,
        this.state.templateMapping.fieldRoles[roleKey]
      );
    });

    if (linkedEntryValidation) {
      return sdk.notifier.error(linkedEntryValidation);
    } else {
      this.linkAssetsToTemplate(assets, roleKey);
    }
  };

  handleSingleAssetLink = async roleKey => {
    const sdk = this.props.sdk;

    const entry = await sdk.dialogs.selectSingleAsset({
      locale: 'en-US'
    });

    if (!entry) return;
    const linkedEntryValidation = validateLinkedAsset(
      entry,
      this.state.templateMapping.fieldRoles[roleKey]
    );
    if (linkedEntryValidation) {
      return sdk.notifier.error(linkedEntryValidation);
    }
    this.linkAssetToTemplate(entry, roleKey);
  };

  onLinkAssetClick = async roleKey => {
    if (this.state.templateMapping.fieldRoles[roleKey].allowMultipleReferences) {
      this.handleMultipleAssetsLink(roleKey);
    } else {
      this.handleSingleAssetLink(roleKey);
    }
  };

  linkAssetsToTemplate = (assets, roleKey) => {
    const updatedEntryList = this.props.sdk.entry.fields.entries.getValue() || [];
    const roleMappingObject = this.state.templateMapping.fieldRoles[roleKey];
    const updatedInternalMapping = this.state.entryInternalMapping;

    // TODO - work
    updatedInternalMapping.addEntriesOrAssets({
      key: roleKey,
      value: assets.map(asset => {
        return InternalMapping.assetMapping({
          type: InternalMapping.ASSET,
          value: asset.sys.id,
          assetUrl: asset.fields.file['en-US'].url,
          assetType: roleMappingObject.asset.type,
          formatting:
            roleMappingObject.asset.type === c.ASSET_TYPE_IMAGE
              ? { fm: 'png', w: roleMappingObject.asset.formatting.maxWidth }
              : {},
          styleClasses: roleMappingObject.asset.defaultClasses
        });
      }),
      styleClasses: (roleMappingObject || {}).defaultClasses
    });

    this.timeoutUpdateEntry({ updatedEntries: updatedEntryList, updatedInternalMapping, ms: 150 });

    this.fetchEntryByRoleKey(roleKey);
  };

  linkAssetToTemplate = (asset, roleKey) => {
    const updatedEntryList = this.props.sdk.entry.fields.entries.getValue() || [];
    const roleMappingObject = this.state.templateMapping.fieldRoles[roleKey];
    const updatedInternalMapping = this.state.entryInternalMapping;

    updatedInternalMapping.addAsset(
      roleKey,
      asset.sys.id,
      asset.fields.file['en-US'].url,
      roleMappingObject.asset.type,
      roleMappingObject.asset.type === c.ASSET_TYPE_IMAGE
        ? { fm: 'png', w: roleMappingObject.asset.formatting.maxWidth }
        : {},
      roleMappingObject.asset.defaultClasses
    );

    const updatedAssetList = addStateAsset(this.state.entries, asset);

    this.timeoutUpdateEntry({
      updatedEntries: updatedEntryList,
      updatedAssets: updatedAssetList,
      updatedInternalMapping,
      ms: 0
    });
  };

  handleSingleEntryLink = async (roleKey, contentType) => {
    const sdk = this.props.sdk;
    const entry = await sdk.dialogs.selectSingleEntry({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    if (!entry) return;
    const linkedEntryValidation = validateLinkedEntry(
      entry,
      roleKey,
      sdk.entry.getSys().id,
      this.state.templateMapping.fieldRoles
    );
    if (linkedEntryValidation) {
      return sdk.notifier.error(linkedEntryValidation);
    }

    this.linkEntryToTemplate(entry, roleKey);
  };

  handleMultipleEntriesLink = async (roleKey, contentType) => {
    const sdk = this.props.sdk;
    const entries = await sdk.dialogs.selectMultipleEntries({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    let linkedEntryValidation;
    entries.forEach(entry => {
      linkedEntryValidation = validateLinkedEntry(
        entry,
        roleKey,
        sdk.entry.getSys().id,
        this.state.templateMapping.fieldRoles
      );

      if (linkedEntryValidation) {
        return sdk.notifier.error(linkedEntryValidation);
      }
    });

    if (!linkedEntryValidation) {
      this.linkEntriesToTemplate(entries, roleKey);
    }
  };

  onLinkEntryClick = (roleKey, contentType) => {
    if (this.state.templateMapping.fieldRoles[roleKey].allowMultipleReferences) {
      this.handleMultipleEntriesLink(roleKey, contentType);
    } else {
      this.handleSingleEntryLink(roleKey, contentType);
    }
  };

  linkEntriesToTemplate = (entries, roleKey) => {
    const entriesFieldValue = this.props.sdk.entry.fields.entries.getValue() || [];
    const updatedEntryList = [...entriesFieldValue, ...entries.map(entry => constructLink(entry))];
    const updatedInternalMapping = this.state.entryInternalMapping;
    const roleMappingObject = this.state.templateMapping.fieldRoles[roleKey];
    updatedInternalMapping.addEntriesOrAssets({
      key: roleKey,
      value: entries.map(entry => entry.sys.id),
      styleClasses: (roleMappingObject || {}).defaultClasses
    });

    this.timeoutUpdateEntry({ updatedEntries: updatedEntryList, updatedInternalMapping, ms: 150 });

    this.fetchEntryByRoleKey(roleKey);
  };

  linkEntryToTemplate = (entry, roleKey) => {
    const entriesFieldValue = this.props.sdk.entry.fields.entries.getValue() || [];

    const updatedEntryList = [...entriesFieldValue, constructLink(entry)];
    const updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.addEntry(roleKey, entry.sys.id);

    this.timeoutUpdateEntry({ updatedEntries: updatedEntryList, updatedInternalMapping, ms: 150 });
  };

  setEntryLoading(roleKey, value) {
    this.setState(prevState => ({
      loadingEntries: { ...prevState.loadingEntries, [roleKey]: value }
    }));
  }

  onDeepCloneLinkClick = async (roleKey, contentType) => {
    const sdk = this.props.sdk;
    this.setEntryLoading(roleKey, true);
    const entry = await sdk.dialogs.selectSingleEntry({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    const linkedEntryValidation = validateLinkedEntry(
      entry,
      roleKey,
      sdk.entry.getSys().id,
      this.state.templateMapping.fieldRoles
    );
    if (linkedEntryValidation) {
      return sdk.notifier.error(linkedEntryValidation);
    }

    if (entry) {
      this.setEntryLoading(roleKey, true);
      const clonedEntry = await cloneEntry(
        sdk.space,
        entry,
        `${sdk.entry.fields.name.getValue()} ${roleKey}`
      );

      await this.linkEntryToTemplate(clonedEntry, roleKey);
      sdk.notifier.success('Deep copy completed. New entry is now linked.');
    }
  };

  onEditClick = async (entry, type = 'entry') => {
    const sdk = this.props.sdk;
    if (!entry) return null;
    if (type === 'entry') {
      await sdk.navigator.openEntry(entry.sys.id, { slideIn: true });
    } else if (type === 'asset') {
      await sdk.navigator.openAsset(entry.sys.id, { slideIn: true });
    }
    const rolesNavigatedTo = [
      ...sdk.entry.fields.entries
        .getValue()
        .filter(e => e.sys.id === entry.sys.id)
        .map(e => {
          return Object.keys(this.state.entries).find(
            key => (this.state.entries[key].sys || {}).id === e.sys.id // may not work for array multi-references
          );
        })
    ];

    this.setState(prevState => ({
      rolesNavigatedTo: [...prevState.rolesNavigatedTo, ...rolesNavigatedTo]
    }));
  };

  onRemoveClick = (roleKey, entryIndex = null) => {
    if (!roleKey) return null;
    const thisEntry = this.props.sdk.entry;
    const entriesValue = thisEntry.fields.entries.getValue();
    const updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.removeEntry(roleKey, entryIndex);
    const updatedEntryList = removeByIndex(entriesValue, entryIndex);

    const updatedStateEntryList = removeStateEntry(
      this.state.entries,
      updatedInternalMapping,
      entryIndex
    );

    this.setState(
      prevState => {
        const prevStateLoadingEntries = { ...prevState.loadingEntries };
        const prevStateEntries = { ...prevState.entries };

        if (Array.isArray(prevStateEntries[roleKey])) {
          prevStateEntries[roleKey] = removeByIndex(prevStateEntries[roleKey], entryIndex);

          if (!prevStateEntries[roleKey].length) {
            delete prevStateEntries[roleKey];
            delete prevStateLoadingEntries[roleKey];
          }
        } else {
          delete prevStateEntries[roleKey];
          delete prevStateLoadingEntries[roleKey];
        }

        return { loadingEntries: prevStateLoadingEntries, entries: updatedStateEntryList };
      },
      () => {
        this.timeoutUpdateEntry({
          updatedEntries: updatedEntryList,
          updatedInternalMapping,
          ms: 0
        });
      }
    );
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
          stateTemplateMapping: this.state.templateMapping,
          loadEntriesFunc: this.loadEntries,
          setStateFunc: this.setState.bind(this)
        }),
      ms
    );
  }

  loadEntries = async () => {
    await Promise.all(
      await this.state.entryInternalMapping.fieldKeys().map(async roleKey => {
        await this.fetchEntryByRoleKey(roleKey);
      })
    );

    await this.validateTemplate();
  };

  validateTemplate = async () => {
    const sdk = this.props.sdk;
    const errors = await getTemplateErrors(
      this.state.templateMapping.fieldRoles,
      this.state.entryInternalMapping,
      this.state.entries
    );

    const isValid = templateIsValid(errors);

    this.setState(
      {
        errors
      },
      () => {
        if (isValid) {
          sdk.field.setInvalid(false);
        } else {
          sdk.field.setInvalid(true);
        }
      }
    );
  };

  fetchEntryByRoleKey = async roleKey => {
    this.setEntryLoading(roleKey, true);

    const entry = await getEntryOrField(
      this.props.sdk.space,
      this.state.entryInternalMapping,
      roleKey
    ).catch(err => {
      if (err.code === 'NotFound') {
        this.onRemoveClick(roleKey);
      }
    });

    if (entry) {
      this.setState(prevState => ({
        entries: { ...prevState.entries, [roleKey]: entry }
      }));
      this.setEntryLoading(roleKey, false);
    }

    return entry;
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
    const value = e.currentTarget.value;
    if (typeof value === 'string') {
      let updatedInternalMapping = this.state.entryInternalMapping;
      updatedInternalMapping[roleKey] = value;

      const styleClasses = cleanStyleClasses(
        updatedInternalMapping[roleKey].styleClasses,
        updatedInternalMapping[roleKey].value
      );

      updatedInternalMapping.setStyleClasses(roleKey, styleClasses);

      const updatedEntries = addStateEntry(
        this.state.entries,
        roleKey,
        InternalMapping.entryMapping({ ...updatedInternalMapping[roleKey], value })
      );

      this.setState(
        { entries: updatedEntries, entryInternalMapping: updatedInternalMapping },
        () => {
          this.timeoutUpdateEntry({ updatedInternalMapping, ms: 1000 });
        }
      );
    }
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
    let updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.setStyleClasses(
      roleKey,
      cleanStyleClasses(styleClasses, updatedInternalMapping[roleKey].value)
    );
    styleClasses = updatedInternalMapping[roleKey].styleClasses;

    this.setState({ entryInternalMapping: updatedInternalMapping }, () => {
      this.timeoutUpdateEntry({ updatedInternalMapping, ms: 150 });
    });
  }

  clearEntryStyleClasses(roleKey, classArray) {
    let updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.removeStyleClasses(roleKey, classArray);

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

  renderEntryFields(roleKey, roleMappingObject, internalMappingObject, entry) {
    if (roleMappingObject.allowMultipleReferences && !!entry) {
      return (
        <div>
          {entry.map((e, index) => {
            return (
              <EntryField
                key={`entryfield-${roleKey}-${index}`}
                entry={e}
                entryIndex={index}
                isLoading={!!this.state.loadingEntries[roleKey]}
                isDragActive={entry ? this.state.draggingObject === e.sys.id : false}
                roleKey={roleKey}
                roleMapping={roleMappingObject}
                onEditClick={this.onEditClick}
                onRemoveClick={this.onRemoveClick}
                onRemoveFieldClick={this.onRemoveFieldClick}
                onFieldChange={this.onFieldChange}
              />
            );
          })}
          <EntryActionRow
            allowAsset={!!this.state.templateMapping.fieldRoles[roleKey].asset}
            allowedCustomTemplates={
              this.state.templateMapping.fieldRoles[roleKey].allowedCustomTemplates
            }
            contentTypes={this.state.templateMapping.fieldRoles[roleKey].contentType}
            fieldObject={this.state.templateMapping.fieldRoles[roleKey].field}
            onAddFieldClick={this.onAddFieldClick}
            roleKey={roleKey}
            onAddEntryClick={this.onAddEntryClick}
            onLinkAssetClick={this.onLinkAssetClick}
            onLinkEntryClick={this.onLinkEntryClick}
            onDeepCloneLinkClick={this.onDeepCloneLinkClick}
          />
          {roleMappingObject.allowMultipleReferenceStyle && (
            <FieldStyleEditor
              roleKey={roleKey}
              roleMapping={roleMappingObject}
              internalMappingObject={internalMappingObject}
              updateStyle={this.updateEntryStyle}
              updateAssetFormatting={this.updateAssetFormatting}
              clearStyleField={this.clearEntryStyleClasses}
              entry={entry}
              title={displaySnakeCaseName(roleKey) + ' Style'}
              type={InternalMapping.MULTI_REFERENCE}
            />
          )}
        </div>
      );
    } else if (!!this.state.entries[roleKey] || !!this.state.loadingEntries[roleKey]) {
      return (
        <div>
          <EntryField
            entry={entry}
            isLoading={!!this.state.loadingEntries[roleKey]}
            isDragActive={entry ? this.state.draggingObject === entry.sys.id : false}
            roleKey={roleKey}
            roleMapping={roleMappingObject}
            onEditClick={this.onEditClick}
            onRemoveClick={this.onRemoveClick}
            onRemoveFieldClick={this.onRemoveFieldClick}
            onFieldChange={this.onFieldChange}
          />
          {((entry && entry.sys.type === 'Field') ||
            (entry &&
              entry.sys.type === 'Asset' &&
              (roleMappingObject.asset.formatting.allow ||
                roleMappingObject.asset.subType === c.ASSET_SUBTYPE_LOGO))) && (
            <FieldStyleEditor
              roleKey={roleKey}
              roleMapping={roleMappingObject}
              internalMappingObject={internalMappingObject}
              updateStyle={this.updateEntryStyle}
              updateAssetFormatting={this.updateAssetFormatting}
              clearStyleField={this.clearEntryStyleClasses}
              entry={entry}
              title={displaySnakeCaseName(roleKey) + ' Style'}
              type={
                entry.sys.type === InternalMapping.ASSETSYS
                  ? InternalMapping.ASSETSYS
                  : entry.fields.type
              }
            />
          )}
        </div>
      );
    } else {
      return (
        <EntryActionRow
          allowAsset={!!this.state.templateMapping.fieldRoles[roleKey].asset}
          allowedCustomTemplates={
            this.state.templateMapping.fieldRoles[roleKey].allowedCustomTemplates
          }
          contentTypes={this.state.templateMapping.fieldRoles[roleKey].contentType}
          fieldObject={this.state.templateMapping.fieldRoles[roleKey].field}
          onAddFieldClick={this.onAddFieldClick}
          roleKey={roleKey}
          onAddEntryClick={this.onAddEntryClick}
          onLinkAssetClick={this.onLinkAssetClick}
          onLinkEntryClick={this.onLinkEntryClick}
          onDeepCloneLinkClick={this.onDeepCloneLinkClick}
        />
      );
    }
  }

  render() {
    const contentTypeGroups = groupByContentType(
      (this.state.templateMapping || {}).fieldRoles,
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
        {this.state.templateMapping.style && (
          <div className="custom-template-entry-builder__section">
            <DisplayText className="style-editor__heading--header" element="h1">
              Styles
            </DisplayText>
            {Object.keys(this.state.templateMapping.style).map(styleSectionKey => {
              return (
                <TemplateStyleEditor
                  key={`style-section-${styleSectionKey}`}
                  updateStyle={this.updateTemplateStyle}
                  templateStyleObject={this.state.templateMapping.style[styleSectionKey]}
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
                    .sort((a, b) => (!this.state.templateMapping.fieldRoles[b] || {}).required)
                    .map((roleKey, index) => {
                      const entry = contentTypeGroups[groupKey][roleKey];
                      const roleMappingObject =
                        this.state.templateMapping.fieldRoles[roleKey] || {};
                      const internalMappingObject = this.state.entryInternalMapping.fieldRoles[
                        roleKey
                      ];

                      return (
                        <div
                          key={index}
                          className={`role-section ${
                            !!this.state.draggingObject &&
                            this.state.templateMapping.fieldRoles[this.state.draggingObject.roleKey]
                              .contentType !==
                              this.state.templateMapping.fieldRoles[roleKey].contentType
                              ? 'unhighlighted'
                              : ''
                          }`}>
                          <div className="role-section__header-section ">
                            <FormLabel
                              className="role-section__heading"
                              htmlFor=""
                              required={roleMappingObject.required}>
                              <SectionHeading>{displaySnakeCaseName(roleKey)}</SectionHeading>
                            </FormLabel>
                            {!!entry && (entry.sys || {}).type === 'Field' && (
                              <IconButton
                                className="role-section__remove-field"
                                iconProps={{ icon: 'Close', size: 'large' }}
                                buttonType="negative"
                                label="Remove Field"
                                onClick={() => this.onRemoveFieldClick(roleKey)}
                              />
                            )}
                          </div>
                          <HelpText>{roleMappingObject.description}</HelpText>
                          {this.renderEntryFields(
                            roleKey,
                            roleMappingObject,
                            internalMappingObject,
                            entry
                          )}

                          {!!(this.state.errors[roleKey] || {}).length &&
                            this.state.errors[roleKey].map((error, index) => {
                              return (
                                <ValidationMessage key={`error-${roleKey}-${index}`}>
                                  {error.message}
                                </ValidationMessage>
                              );
                            })}
                        </div>
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
