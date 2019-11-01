import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {
  Button,
  SectionHeading,
  Heading,
  Paragraph,
  HelpText,
  ValidationMessage,
  TextLink,
  IconButton
} from '@contentful/forma-36-react-components';

import CreateNewLink from './components/CreateNewLink';
import LinkExisting from './components/LinkExisting';
import EntryField from './components/EntryField';
import { init } from 'contentful-ui-extensions-sdk';

import { customTemplates, templatePlaceholder } from '../../custom_templates/';
import InternalMapping from './utils/InternalMapping';

import {
  constructLink,
  groupByContentType,
  createEntry,
  constructEntryName,
  displayContentType,
  displayRoleName,
  getContentTypeArray,
  getEntryOrField,
  constructFieldEntry
} from './utils';

import { validateLinkedEntry, templateIsValid, getTemplateErrors } from './utils/validations';

import { cloneEntry } from '../../shared/utilities/deepCopy';

import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
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
      entryInternalMapping: new InternalMapping(internalMappingJson),
      templateMapping: templateMapping,
      template,
      value: props.sdk.field.getValue() || '',
      rolesNavigatedTo: []
    };

    this.sendUpdateRequestTimeout = undefined;

    this.versionAttempts = 0;
    this.MAX_VERSION_ATTEMPTS = 3;
    this.fetchNavigatedTo = this.fetchNavigatedTo.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  componentDidMount = async () => {
    this.props.sdk.window.startAutoResizer();
    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
    this.props.sdk.entry.fields.template.onValueChanged(this.onTemplateChange);
    this.props.sdk.entry.onSysChanged(this.onSysChanged);
    await this.loadEntries();
  };

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    this.setState({
      value
    });
  };

  onSysChanged = sysValue => {
    const template = this.props.sdk.entry.fields.template.getValue();
    const internalMappingJson = this.props.sdk.entry.fields.internalMapping.getValue();
    if (!internalMappingJson) return;
    this.setState(
      {
        template,
        entryInternalMapping: new InternalMapping(internalMappingJson),
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
              this.state.templateMapping.roles,
              JSON.parse(this.props.sdk.entry.fields.internalMapping.getValue()),
              this.state.entries
            )
          )
        ) {
          this.props.sdk.field.setInvalid(false);
        } else {
          this.props.sdk.field.setInvalid(true);
        }
      }
    );
  };

  getRolesToFetch(newInternalMapping, oldEntries) {
    // if newInternalMapping has more keys than oldEntries, return those extra keys
    return newInternalMapping.keys().filter(key => !Object.keys(oldEntries).some(k => k === key));
  }

  onTemplateChange = template => {
    this.setState({
      template,
      templateMapping:
        this.props.customTemplates[template && template.toLowerCase()] ||
        this.prpos.templatePlaceholder
    });
  };

  onAddFieldClick = (roleKey, fieldType) => {
    const updatedInternalMapping = this.state.entryInternalMapping;
    switch (fieldType) {
      case InternalMapping.TEXT:
        updatedInternalMapping.addTextField(roleKey);
        break;
      case InternalMapping.MARKDOWN:
        updatedInternalMapping.addMarkdownField(roleKey);
        break;
      default:
        break;
    }

    const updatedEntries = {
      ...this.state.entries,
      [roleKey]: constructFieldEntry(updatedInternalMapping.getType(roleKey))
    };

    this.setState({ entries: updatedEntries, entryInternalMapping: updatedInternalMapping }, () =>
      this.updateEntry(
        this.props.sdk.entry.fields.entries.getValue(),
        updatedInternalMapping.asJSON()
      )
    );
  };

  onRemoveFieldClick = roleKey => {
    const updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.removeEntry(roleKey);

    const updatedEntries = {
      ...this.state.entries,
      [roleKey]: undefined
    };

    this.setState({ entries: updatedEntries, entryInternalMapping: updatedInternalMapping }, () =>
      this.updateEntry(
        this.props.sdk.entry.fields.entries.getValue(),
        updatedInternalMapping.asJSON()
      )
    );
  };

  onAddEntryClick = async (roleKey, contentType, template = undefined) => {
    const newEntryName = constructEntryName(this.props.sdk.entry.fields.name.getValue(), roleKey);
    const newEntry = await createEntry(this.props.sdk.space, contentType, newEntryName, template);

    await this.linkEntryToTemplate(newEntry, roleKey);
    this.props.sdk.navigator.openEntry(newEntry.sys.id, { slideIn: true });
  };

  onLinkEntryClick = async (roleKey, contentType) => {
    const entry = await this.props.sdk.dialogs.selectSingleEntry({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    if (!entry) return;
    const linkedEntryValidation = validateLinkedEntry(
      entry,
      roleKey,
      this.props.sdk.entry.getSys().id,
      this.state.templateMapping.roles
    );
    if (linkedEntryValidation) {
      return this.props.sdk.notifier.error(linkedEntryValidation);
    }
    this.linkEntryToTemplate(entry, roleKey);
  };

  linkEntryToTemplate = (entry, roleKey) => {
    const entriesFieldValue = this.props.sdk.entry.fields.entries.getValue() || [];
    const updatedEntryList = [...entriesFieldValue, constructLink(entry)];
    const updatedInternalMapping = this.state.entryInternalMapping;
    updatedInternalMapping.addEntry(roleKey, entry.sys.id);

    this.updateEntry(updatedEntryList, updatedInternalMapping.asJSON());
  };

  onDeepCloneLinkClick = async (roleKey, contentType) => {
    this.setState(prevState => ({
      loadingEntries: { ...prevState.loadingEntries, [roleKey]: true }
    }));
    const entry = await this.props.sdk.dialogs.selectSingleEntry({
      locale: 'en-US',
      contentTypes: getContentTypeArray(contentType)
    });

    const linkedEntryValidation = validateLinkedEntry(
      entry,
      roleKey,
      this.props.sdk.entry.getSys().id,
      this.state.templateMapping.roles
    );
    if (linkedEntryValidation) {
      return this.props.sdk.notifier.error(linkedEntryValidation);
    }

    if (entry) {
      const clonedEntry = await cloneEntry(
        this.props.sdk.space,
        entry,
        `${this.props.sdk.entry.fields.name.getValue()} ${roleKey}`
      );

      await this.linkEntryToTemplate(clonedEntry, roleKey);
      this.props.sdk.notifier.success('Deep copy completed. New entry is now linked.');
    }
  };

  onEditClick = async entry => {
    if (!entry) return null;
    await this.props.sdk.navigator.openEntry(entry.sys.id, { slideIn: true });
    const rolesNavigatedTo = [
      ...this.props.sdk.entry.fields.entries
        .getValue()
        .filter(e => e.sys.id === entry.sys.id)
        .map(e =>
          Object.keys(this.state.entries).find(key => this.state.entries[key].sys.id === e.sys.id)
        )
    ];

    this.setState(prevState => ({
      rolesNavigatedTo: [...prevState.rolesNavigatedTo, ...rolesNavigatedTo]
    }));
  };

  onRemoveClick = roleKey => {
    if (!roleKey) return null;
    this.removeEntry(roleKey);
  };

  removeEntry = roleKey => {
    const thisEntry = this.props.sdk.entry;
    const entry = this.state.entries[roleKey] || {};
    const updatedEntryList = thisEntry.fields.entries
      .getValue()
      .filter(e => e)
      .filter(e => e.sys.id !== (entry.sys || {}).id);

    const internalMapping = this.state.entryInternalMapping;
    internalMapping.removeEntry(roleKey);

    const updatedInternalMapping = internalMapping.asJSON();
    this.setState(
      prevState => {
        const prevStateLoadingEntries = { ...prevState.loadingEntries };
        const prevStateEntries = { ...prevState.entries };
        delete prevStateLoadingEntries[roleKey];
        delete prevStateEntries[roleKey];
        return { loadingEntries: prevStateLoadingEntries, entries: prevStateEntries };
      },
      () => this.updateEntry(updatedEntryList, updatedInternalMapping)
    );
  };

  updateEntry = async (updatedEntryList, updatedInternalMappingJson, version = 0) => {
    // Clones sys and fields object
    // adds new Entry list
    // adds new internalMapping JSON
    const errors = getTemplateErrors(
      this.state.templateMapping.roles,
      JSON.parse(updatedInternalMappingJson),
      this.state.entries
    );
    const isValid = templateIsValid(errors);

    const newEntry = {
      sys: {
        ...this.props.sdk.entry.getSys(),
        version: version ? version : this.props.sdk.entry.getSys().version
      },
      fields: Object.assign(
        {},
        ...Object.keys(this.props.sdk.entry.fields).map(key => ({
          [key]: { 'en-US': this.props.sdk.entry.fields[key].getValue() },
          entries: {
            'en-US': updatedEntryList
          },
          internalMapping: { 'en-US': updatedInternalMappingJson },
          isValid: {
            'en-US': isValid ? 'Yes' : 'No'
          }
        }))
      )
    };

    try {
      await this.props.sdk.space.updateEntry(newEntry);
      this.versionAttempts = 0;
      this.setState({
        errors
      });
    } catch (err) {
      console.log(err);
      if (err.code === 'VersionMismatch') {
        if (this.versionAttempts < this.MAX_VERSION_ATTEMPTS) {
          this.versionAttempts += 1;
          await this.updateEntry(
            updatedEntryList,
            updatedInternalMappingJson,
            version ? version + 1 : this.props.sdk.entry.getSys().version + 1
          );
        } else {
          this.props.sdk.notifier.error(
            'This entry needs to be refreshed. Please refresh the page.'
          );

          this.props.sdk.dialogs.openAlert({
            title: 'Please refresh the page.',
            message: 'This entry needs to be refreshed. Please refresh the page.'
          });
        }
      } else {
        this.props.sdk.notifier.error('An error occured. Please try again.');
        await this.loadEntries();
      }
    }
  };

  loadEntries = async () => {
    await Promise.all(
      await this.state.entryInternalMapping.keys().map(async roleKey => {
        await this.fetchEntryByRoleKey(roleKey);
      })
    );

    await this.validateTemplate();
  };

  validateTemplate = async () => {
    const errors = await getTemplateErrors(
      this.state.templateMapping.roles,
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
          this.props.sdk.field.setInvalid(false);
        } else {
          this.props.sdk.field.setInvalid(true);
        }
      }
    );
  };

  fetchEntryByRoleKey = async roleKey => {
    this.setState(prevState => ({
      loadingEntries: { ...prevState.loadingEntries, [roleKey]: true }
    }));

    const entry = await getEntryOrField(
      this.props.sdk.space,
      this.state.entryInternalMapping,
      roleKey
    ).catch(err => {
      if (err.code === 'NotFound') {
        this.removeEntry(roleKey);
      }
    });

    if (entry) {
      this.setState(prevState => ({
        entries: { ...prevState.entries, [roleKey]: entry },
        loadingEntries: { ...prevState.loadingEntries, [roleKey]: false }
      }));
    }

    return entry;
  };

  fetchNavigatedTo = () => {
    if (!this.state.rolesNavigatedTo.length) return;
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
    const value = e.currentTarget.value;
    this.setState({ value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  onFieldChange = (e, roleKey) => {
    const value = e.currentTarget.value;
    if (typeof value === 'string') {
      let updatedInternalMapping = this.state.entryInternalMapping;
      updatedInternalMapping[roleKey] = value;

      const updatedEntries = {
        ...this.state.entries,
        [roleKey]: constructFieldEntry(updatedInternalMapping.getType(roleKey), value)
      };

      this.setState(
        { entries: updatedEntries, entryInternalMapping: updatedInternalMapping },
        () => {
          clearTimeout(this.sendUpdateRequestTimeout);
          this.sendUpdateRequestTimeout = setTimeout(
            () =>
              this.updateEntry(
                this.props.sdk.entry.fields.entries.getValue(),
                updatedInternalMapping.asJSON()
              ),
            1000
          );
        }
      );
    }
  };

  onDragStart = (e, roleKey, id) => {
    console.log('START', id);

    this.setState({
      draggingObject: { roleKey, id }
    });
  };

  onDragEnd = e => {
    console.log('END');
    this.setState({
      draggingObject: undefined
    });
  };

  onDragEnter = (e, roleKey, id) => {
    if ((this.state.draggingObject || {}).id === id) return null;
    console.log(this.state.draggingObject, this.state.dragTargetObject);
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      dragTargetObject: { roleKey, id }
    });
  };

  onDragLeave = (e, id) => {
    if ((this.state.draggingObject || {}).id === id) return null;
    console.log('LEAVE', id, this.state.draggingObject);
    this.setState({
      dragTargetObject: undefined
    });
  };

  onDrop = e => {
    console.log('DROP');
    if (this.state.draggingObject && this.state.dragTargetObject) {
      this.swapElements(this.state.draggingObject, this.state.dragTargetObject);
      this.setState({
        draggingObject: undefined,
        dragTargetObject: undefined
      });
    }
  };

  swapElements = (element1, element2) => {
    console.log('SWAP: ', element1, element2);
  };

  render() {
    const contentTypeGroups = groupByContentType(
      (this.state.templateMapping || {}).roles,
      this.state.entries
    );

    return (
      <div className="custom-template-entry-builder" onClick={this.fetchNavigatedTo}>
        <Button
          buttonType="muted"
          className="extension__refresh"
          onClick={this.loadEntries}
          size="small">
          Refresh List
        </Button>
        {Object.keys(contentTypeGroups).map((groupKey, index) => {
          return (
            <div className="entry-group" key={`group--${index}`}>
              <div className="entry-group__header-section">
                <Heading>{displayContentType(groupKey)}</Heading>
                <Paragraph>({Object.keys(contentTypeGroups[groupKey]).length})</Paragraph>
              </div>
              <div className="entry-container">
                {Object.keys(contentTypeGroups[groupKey])
                  .sort((a, b) => (!this.state.templateMapping.roles[b] || {}).required)
                  .map((roleKey, index) => {
                    const entry = contentTypeGroups[groupKey][roleKey];
                    const internalMappingObject = this.state.templateMapping.roles[roleKey] || {};
                    return (
                      <div
                        key={index}
                        className={classnames('role-section', {
                          highlighted:
                            !!this.state.draggingObject &&
                            this.state.templateMapping.roles[this.state.draggingObject.roleKey]
                              .contentType ===
                              this.state.templateMapping.roles[roleKey].contentType,
                          unhighlighted:
                            !!this.state.draggingObject &&
                            this.state.templateMapping.roles[this.state.draggingObject.roleKey]
                              .contentType !== this.state.templateMapping.roles[roleKey].contentType
                        })}>
                        <div className="role-section__header-section ">
                          <SectionHeading className="role-section__heading" element="h1">
                            {displayRoleName(roleKey)}
                            {internalMappingObject.required ? (
                              <span className="required-text">* (Required)</span>
                            ) : (
                              <span className="optional-text"> (optional)</span>
                            )}
                          </SectionHeading>
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
                        {!!this.state.entries[roleKey] || this.state.loadingEntries[roleKey] ? (
                          <EntryField
                            entry={entry}
                            isLoading={!!this.state.loadingEntries[roleKey]}
                            isDragActive={
                              entry ? this.state.draggingObject === entry.sys.id : false
                            }
                            roleKey={roleKey}
                            onEditClick={this.onEditClick}
                            onRemoveClick={this.onRemoveClick}
                            onFieldChange={this.onFieldChange}
                          />
                        ) : (
                          <div className="link-entries-row">
                            {!!this.state.templateMapping.roles[roleKey].fieldType && (
                              <TextLink
                                icon="Quote"
                                linkType="primary"
                                className="link-entries-row__button"
                                onClick={() =>
                                  this.onAddFieldClick(
                                    roleKey,
                                    this.state.templateMapping.roles[roleKey].fieldType
                                  )
                                }>
                                Add field
                              </TextLink>
                            )}
                            <CreateNewLink
                              allowedCustomTemplates={
                                this.state.templateMapping.roles[roleKey].allowedCustomTemplates
                              }
                              onAddEntryClick={this.onAddEntryClick}
                              contentTypes={this.state.templateMapping.roles[roleKey].contentType}
                              roleKey={roleKey}
                            />
                            <LinkExisting
                              onLinkEntryClick={this.onLinkEntryClick}
                              onDeepCloneLinkClick={this.onDeepCloneLinkClick}
                              contentTypes={this.state.templateMapping.roles[roleKey].contentType}
                              roleKey={roleKey}
                            />
                          </div>
                        )}
                        <HelpText>{internalMappingObject.description}</HelpText>
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

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
