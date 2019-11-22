import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as c from '../../custom_templates/constants';

import {
  Button,
  FormLabel,
  HelpText,
  ValidationMessage,
  TextLink,
  IconButton,
  SectionHeading
} from '@contentful/forma-36-react-components';

import CreateNewLink from './components/CreateNewLink';
import LinkExisting from './components/LinkExisting';
import EntryField from './components/EntryField';
import TemplateStyleEditor from './components/TemplateStyleEditor';
import FieldStyleEditor from './components/FieldStyleEditor';

import { init } from 'contentful-ui-extensions-sdk';

import { customTemplates, templatePlaceholder } from '../../custom_templates/';
import InternalMapping from './utils/InternalMapping';

import {
  constructLink,
  groupByContentType,
  createEntry,
  constructEntryName,
  getUpdatedAssetList,
  displaySnakeCaseName,
  getContentTypeArray,
  getEntryOrField,
  constructFieldEntry,
  cleanStyleClasses,
  selectAssetEntries
} from './utils';

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

    this.versionAttempts = 0;
    this.MAX_VERSION_ATTEMPTS = 3;
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
      this.updateEntry({
        updatedInternalMappingJson: this.state.entryInternalMapping.asJSON()
      });

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
        const rolesToFetch = this.getRolesToFetch(
          this.state.entryInternalMapping,
          this.state.entries
        );
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

  getRolesToFetch(newInternalMapping, oldEntries) {
    // if newInternalMapping has more keys than oldEntries, return those extra keys
    return newInternalMapping
      .fieldKeys()
      .filter(key => !Object.keys(oldEntries).some(k => k === key));
  }

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
    const updatedInternalMapping = this.state.entryInternalMapping;
    switch (field.type) {
      case InternalMapping.TEXT:
        updatedInternalMapping.addTextField({ key: roleKey, styleClasses: field.defaultClasses });
        break;
      case InternalMapping.MARKDOWN:
        updatedInternalMapping.addMarkdownField({
          key: roleKey,
          styleClasses: field.defaultClasses
        });
        break;
      default:
        break;
    }

    const updatedEntries = {
      ...this.state.entries,
      [roleKey]: constructFieldEntry(
        InternalMapping.FIELDSYS,
        InternalMapping.entryMapping({ ...updatedInternalMapping[roleKey] })
      )
    };

    this.setState({ entries: updatedEntries, entryInternalMapping: updatedInternalMapping }, () =>
      this.updateEntry({
        updatedEntryList: this.props.sdk.entry.fields.entries.getValue(),
        updatedInternalMappingJson: updatedInternalMapping.asJSON()
      })
    );
  };

  onRemoveFieldClick = roleKey => {
    const updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.removeEntry(roleKey);

    const removedAsset = this.state.entries[roleKey];
    // Removes key from this.state.entries
    const updatedEntries = Object.assign(
      {},
      ...Object.keys(this.state.entries)
        .filter(key => updatedInternalMapping.fieldKeys().includes(key))
        .map(key => ({ [key]: this.state.entries[key] }))
    );

    const updatedAssetList = selectAssetEntries(updatedEntries).map(asset => constructLink(asset));

    this.setState({ entries: updatedEntries, entryInternalMapping: updatedInternalMapping }, () =>
      this.updateEntry({
        updatedEntryList: this.props.sdk.entry.fields.entries.getValue(),
        updatedAssetList,
        updatedInternalMappingJson: updatedInternalMapping.asJSON()
      })
    );
  };

  onAddEntryClick = async (roleKey, contentType, template = undefined) => {
    const sdk = this.props.sdk;
    const newEntryName = constructEntryName(sdk.entry.fields.name.getValue(), roleKey);
    const newEntry = await createEntry(sdk.space, contentType, newEntryName, template);

    await this.linkEntryToTemplate(newEntry, roleKey);
    sdk.navigator.openEntry(newEntry.sys.id, { slideIn: true });
  };

  onLinkAssetClick = async roleKey => {
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

  linkAssetToTemplate = (entry, roleKey) => {
    const entriesFieldValue = this.props.sdk.entry.fields.entries.getValue() || [];
    const roleMapping = this.state.templateMapping.fieldRoles[roleKey];
    const updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.addAsset(
      roleKey,
      entry.sys.id,
      entry.fields.file['en-US'].url,
      roleMapping.asset.type,
      roleMapping.asset.type === c.ASSET_TYPE_IMAGE
        ? { fm: 'png', w: roleMapping.asset.formatting.maxWidth }
        : {}
    );

    const updatedAssetList = getUpdatedAssetList(this.state.entries, entry);

    this.updateEntry({
      updatedEntryList: entriesFieldValue,
      updatedAssetList,
      updatedInternalMappingJson: updatedInternalMapping.asJSON()
    });
  };

  onLinkEntryClick = async (roleKey, contentType) => {
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

  linkEntryToTemplate = (entry, roleKey) => {
    const entriesFieldValue = this.props.sdk.entry.fields.entries.getValue() || [];

    const updatedEntryList = [...entriesFieldValue, constructLink(entry)];
    const updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.addEntry(roleKey, entry.sys.id);

    this.updateEntry({
      updatedEntryList,
      updatedInternalMappingJson: updatedInternalMapping.asJSON()
    });
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
        .map(e =>
          Object.keys(this.state.entries).find(key => this.state.entries[key].sys.id === e.sys.id)
        )
    ];

    this.setState(prevState => ({
      rolesNavigatedTo: [...prevState.fieldRolesNavigatedTo, ...fieldRolesNavigatedTo]
    }));
  };

  onRemoveClick = roleKey => {
    if (!roleKey) return null;
    const thisEntry = this.props.sdk.entry;
    const entriesValue = thisEntry.fields.entries.getValue();
    const entry = this.state.entries[roleKey] || {};
    const internalMapping = this.state.entryInternalMapping;
    internalMapping.removeEntry(roleKey);

    const firstEntryInstance = entriesValue.find(e => e.sys.id === entry.sys.id);
    const firstEntryIndex = entriesValue.indexOf(firstEntryInstance);
    const updatedEntryList = [
      ...entriesValue.slice(0, firstEntryIndex),
      ...entriesValue.slice(firstEntryIndex + 1, entriesValue.length)
    ];
    const updatedInternalMapping = internalMapping.asJSON();
    this.setState(
      prevState => {
        const prevStateLoadingEntries = { ...prevState.loadingEntries };
        const prevStateEntries = { ...prevState.entries };
        delete prevStateLoadingEntries[roleKey];
        delete prevStateEntries[roleKey];
        return { loadingEntries: prevStateLoadingEntries, entries: prevStateEntries };
      },
      () => {
        this.updateEntry({ updatedEntryList, updatedInternalMappingJson: updatedInternalMapping });
      }
    );
  };

  updateEntry = async ({
    updatedEntryList,
    updatedAssetList,
    updatedInternalMappingJson,
    version = 0
  } = {}) => {
    if (!updatedInternalMappingJson)
      throw new Error('Cannot update entry without internal mapping JSON.');
    const sdk = this.props.sdk;
    // Clones sys and fields object
    // adds new Entry list
    // adds new internalMapping JSON
    const errors = getTemplateErrors(
      this.state.templateMapping.fieldRoles,
      JSON.parse(updatedInternalMappingJson),
      this.state.entries
    );
    const isValid = templateIsValid(errors);

    const entries = updatedEntryList => {
      if (updatedEntryList) return { entries: { 'en-US': updatedEntryList } };
    };

    const assets = updatedAssetList => {
      if (updatedAssetList) return { assets: { 'en-US': updatedAssetList } };
    };

    const newEntry = {
      sys: {
        ...sdk.entry.getSys(),
        version: version ? version : sdk.entry.getSys().version
      },
      fields: Object.assign(
        {},
        ...Object.keys(sdk.entry.fields).map(key => ({
          [key]: { 'en-US': sdk.entry.fields[key].getValue() },
          ...entries(updatedEntryList),
          ...assets(updatedAssetList),
          internalMapping: { 'en-US': updatedInternalMappingJson },
          isValid: {
            'en-US': isValid ? 'Yes' : 'No'
          }
        }))
      )
    };

    try {
      await sdk.space.updateEntry(newEntry);
      this.versionAttempts = 0;
      this.setState({
        errors
      });
    } catch (err) {
      console.log(err);
      if (err.code === 'VersionMismatch') {
        if (this.versionAttempts < this.MAX_VERSION_ATTEMPTS) {
          this.versionAttempts += 1;
          await this.updateEntry({
            updatedEntryList,
            updatedInternalMappingJson,
            version: version ? version + 1 : sdk.entry.getSys().version + 1
          });
        } else {
          sdk.dialogs.openAlert({
            title: 'Please refresh the page.',
            message: 'This entry needs to be refreshed. Please refresh the page.'
          });
        }
      } else {
        sdk.notifier.error('An error occured. Please try again.');
        await this.loadEntries();
      }
    }
  };

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
    if (this.state.fieldRolesNavigatedTo && !this.state.fieldRolesNavigatedTo.length) return;
    this.setState(
      {
        rolesNavigatedTo: []
      },
      () => {
        this.loadEntries();
      }
    );
  };

  onChange = e => {
    const sdk = this.props.sdk;
    const value = e.currentTarget.value;
    this.setState({ value });
    if (value) {
      sdk.field.setValue(value);
    } else {
      sdk.field.removeValue();
    }
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

      const updatedEntries = {
        ...this.state.entries,
        [roleKey]: constructFieldEntry(
          InternalMapping.FIELDSYS,
          InternalMapping.entryMapping({ ...updatedInternalMapping[roleKey], value })
        )
      };

      this.setState(
        { entries: updatedEntries, entryInternalMapping: updatedInternalMapping },
        () => {
          this.timeoutUpdateEntry(updatedInternalMapping, 1000);
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
      this.updateEntry({
        updatedEntryList: this.props.sdk.entry.fields.entries.getValue(),
        updatedInternalMappingJson: updatedInternalMapping.asJSON()
      });
    });
  }

  updateEntryStyle(roleKey, styleClasses) {
    let updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.setStyleClasses(
      roleKey,
      cleanStyleClasses(styleClasses, updatedInternalMapping[roleKey].value)
    );

    styleClasses = updatedInternalMapping[roleKey].styleClasses;

    const updatedEntries = {
      ...this.state.entries,
      [roleKey]: constructFieldEntry(
        InternalMapping.FIELDSYS,
        InternalMapping.entryMapping({ ...updatedInternalMapping[roleKey], styleClasses })
      )
    };

    this.setState({ entries: updatedEntries, entryInternalMapping: updatedInternalMapping }, () => {
      this.timeoutUpdateEntry(updatedInternalMapping, 50);
    });
  }

  updateAssetFormatting(roleKey, formattingObject) {
    let updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.setImageFormatting(roleKey, formattingObject);

    this.setState({ entryInternalMapping: updatedInternalMapping }, () => {
      this.timeoutUpdateEntry(updatedInternalMapping, 1000);
    });
  }

  timeoutUpdateEntry(updatedInternalMapping, milliseconds) {
    clearTimeout(this.sendUpdateRequestTimeout);
    this.sendUpdateRequestTimeout = setTimeout(
      () =>
        this.updateEntry({
          updatedEntryList: this.props.sdk.entry.fields.entries.getValue(),
          updatedInternalMappingJson: updatedInternalMapping.asJSON()
        }),
      milliseconds
    );
  }

  clearEntryStyleClasses(roleKey, classArray) {
    let updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.removeStyleClasses(roleKey, classArray);

    this.setState({ entryInternalMapping: updatedInternalMapping }, () => {
      this.updateEntry({
        updatedEntryList: this.props.sdk.entry.fields.entries.getValue(),
        updatedInternalMappingJson: updatedInternalMapping.asJSON()
      });
    });
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
        {this.state.templateMapping.style &&
          Object.keys(this.state.templateMapping.style).map(styleSectionKey => {
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
        {Object.keys(contentTypeGroups).map((groupKey, index) => {
          return (
            <div className="entry-group" key={`group--${index}`}>
              {/* <div className="entry-group__header-section">
                <Heading>{displayContentType(groupKey)}</Heading>
                <Paragraph>({Object.keys(contentTypeGroups[groupKey]).length})</Paragraph>
              </div> */}
              <div className="entry-container">
                {Object.keys(contentTypeGroups[groupKey])
                  .sort((a, b) => (!this.state.templateMapping.fieldRoles[b] || {}).required)
                  .map((roleKey, index) => {
                    const entry = contentTypeGroups[groupKey][roleKey];
                    const roleMappingObject = this.state.templateMapping.fieldRoles[roleKey] || {};
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
                          {!!entry && entry.sys.type === 'Field' && (
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
                        {!!this.state.entries[roleKey] || this.state.loadingEntries[roleKey] ? (
                          <div>
                            <EntryField
                              entry={entry}
                              isLoading={!!this.state.loadingEntries[roleKey]}
                              isDragActive={
                                entry ? this.state.draggingObject === entry.sys.id : false
                              }
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
                                roleMappingObject.asset.formatting.allow)) && (
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
                        ) : (
                          <div className="link-entries-row">
                            {!!this.state.templateMapping.fieldRoles[roleKey].field && (
                              <TextLink
                                icon="Quote"
                                linkType="primary"
                                className="link-entries-row__button"
                                onClick={() =>
                                  this.onAddFieldClick(
                                    roleKey,
                                    this.state.templateMapping.fieldRoles[roleKey].field
                                  )
                                }>
                                Add field
                              </TextLink>
                            )}
                            <CreateNewLink
                              allowedCustomTemplates={
                                this.state.templateMapping.fieldRoles[roleKey]
                                  .allowedCustomTemplates
                              }
                              onAddEntryClick={this.onAddEntryClick}
                              contentTypes={
                                this.state.templateMapping.fieldRoles[roleKey].contentType
                              }
                              roleKey={roleKey}
                            />
                            <LinkExisting
                              linkAsset={!!this.state.templateMapping.fieldRoles[roleKey].asset}
                              onLinkAssetClick={this.onLinkAssetClick}
                              onLinkEntryClick={this.onLinkEntryClick}
                              onDeepCloneLinkClick={this.onDeepCloneLinkClick}
                              contentTypes={
                                this.state.templateMapping.fieldRoles[roleKey].contentType
                              }
                              roleKey={roleKey}
                            />
                          </div>
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
    );
  }
}

init(sdk => {
  ReactDOM.render(
    <App sdk={sdk} customTemplates={customTemplates} templatePlaceholder={templatePlaceholder} />,
    document.getElementById('root')
  );
});
