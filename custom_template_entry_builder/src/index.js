import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {
  Button,
  DropdownList,
  DropdownListItem,
  EntryCard,
  SectionHeading,
  Heading,
  Paragraph,
  ToggleButton,
  Icon,
  TextLink
} from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';

import { internal_mappings } from './internal_mappings';
import {
  getStatus,
  constructLink,
  groupByContentType,
  createEntry,
  constructEntryName
} from './utils';

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
    const internalMappingValue = props.sdk.entry.fields.internalMapping.getValue();

    this.state = {
      entries: {},
      loadingEntries: {},
      entryInternalMapping: internalMappingValue
        ? JSON.parse(props.sdk.entry.fields.internalMapping.getValue())
        : {},
      internalMapping: internal_mappings[template && template.toLowerCase()] || {},
      template,
      value: props.sdk.field.getValue() || '',
      rolesNavigatedTo: []
    };

    this.versionAttempts = 0;
    this.MAX_VERSION_ATTEMPTS = 3;
    this.fetchNavigatedTo = this.fetchNavigatedTo.bind(this);
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
    this.props.sdk.entry.fields.template.onValueChanged(this.onTemplateChange);
    this.props.sdk.entry.onSysChanged(this.onSysChanged);
    this.loadEntries();
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    console.log('VAL');
    this.setState({
      value
    });
  };

  onSysChanged = sysValue => {
    console.log('SYS');
    const template = this.props.sdk.entry.fields.template.getValue();
    const internalMappingValue = this.props.sdk.entry.fields.internalMapping.getValue();
    if (!internalMappingValue) return;
    this.setState(
      {
        template,
        entryInternalMapping: internalMappingValue
          ? JSON.parse(this.props.sdk.entry.fields.internalMapping.getValue())
          : {},
        internalMapping: internal_mappings[template && template.toLowerCase()] || {}
      },
      () => {
        const rolesToFetch = this.getRolesToFetch(
          this.state.entryInternalMapping,
          this.state.entries
        );
        //
        rolesToFetch.forEach(roleKey => {
          this.fetchEntryByRoleKey(roleKey);
        });

        if (
          internalMappingValue &&
          this.isValid(JSON.parse(this.props.sdk.entry.fields.internalMapping.getValue()))
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
    return Object.keys(newInternalMapping).filter(
      key => !Object.keys(oldEntries).some(k => k === key)
    );
  }

  onTemplateChange = template => {
    this.setState({
      template,
      internalMapping: internal_mappings[template && template.toLowerCase()] || {}
    });
  };

  onAddEntryClick = async (roleKey, contentType) => {
    const newEntryName = constructEntryName(this.props.sdk.entry.fields.name.getValue(), roleKey);
    const newEntry = await createEntry(this.props.sdk.space, contentType, newEntryName);

    await this.linkEntryToTemplate(newEntry, roleKey);
    this.props.sdk.navigator.openEntry(newEntry.sys.id, { slideIn: true });
  };

  linkEntryToTemplate = (entry, roleKey) => {
    const entriesFieldValue = this.props.sdk.entry.fields.entries.getValue() || [];
    const updatedEntryList = [...entriesFieldValue, constructLink(entry)];
    const updatedInternalMapping = JSON.stringify({
      ...this.state.entryInternalMapping,
      [roleKey]: entry.sys.id
    });

    this.updateEntry(updatedEntryList, updatedInternalMapping);
  };

  onLinkEntryClick = async (roleKey, contentType) => {
    const entry = await this.props.sdk.dialogs.selectSingleEntry({ contentTypes: [contentType] });
    this.linkEntryToTemplate(entry, roleKey);
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
    const entry = this.state.entries[roleKey];
    const updatedEntryList = thisEntry.fields.entries
      .getValue()
      .filter(e => e.sys.id !== entry.sys.id);

    const internalMapping = {
      ...this.state.entryInternalMapping
    };

    delete internalMapping[roleKey];
    const updatedInternalMapping = JSON.stringify(internalMapping);

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

  updateEntry = async (updatedEntryList, updatedInternalMapping, version = 0) => {
    // Clones sys and fields object
    // adds new Entry list
    // adds new internalMapping JSON
    const newEntry = {
      sys: {
        ...this.props.sdk.entry.getSys(),
        version: version ? version : this.props.sdk.entry.getSys().version
      },
      fields: Object.assign(
        {},
        ...Object.keys(this.props.sdk.entry.fields).map(key => ({
          [key]: { 'en-US': this.props.sdk.entry.fields[key].getValue() },
          entries: { 'en-US': updatedEntryList },
          internalMapping: { 'en-US': updatedInternalMapping },
          isValid: { 'en-US': this.returnValidationValue(updatedInternalMapping) }
        }))
      )
    };

    try {
      await this.props.sdk.space.updateEntry(newEntry);
      this.versionAttempts = 0;
    } catch (err) {
      console.log(err);
      if (err.code === 'VersionMismatch') {
        if (this.versionAttempts < this.MAX_VERSION_ATTEMPTS) {
          this.versionAttempts += 1;
          await this.updateEntry(
            updatedEntryList,
            updatedInternalMapping,
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
        this.loadEntries();
      }
    }
  };

  isValid(internalMapping) {
    const missingRequiredRoles = this.missingRequiredRoles(internalMapping);
    return !missingRequiredRoles.length;
  }

  returnValidationValue = internalMappingJson => {
    const internalMapping = JSON.parse(internalMappingJson);
    return this.isValid(internalMapping) ? 'Yes' : 'No';
  };

  missingRequiredRoles = updatedInternalMapping => {
    const missingRequiredRoles = [];
    Object.keys(this.state.internalMapping).forEach(roleKey => {
      const internalMappingEntry = this.state.internalMapping[roleKey] || {};
      if (!!internalMappingEntry.required && !updatedInternalMapping[roleKey]) {
        missingRequiredRoles.push(roleKey);
      }
    });

    return missingRequiredRoles;
  };

  loadEntries = () => {
    Object.keys(this.state.entryInternalMapping).forEach(roleKey => {
      this.fetchEntryByRoleKey(roleKey);
    });
  };

  fetchEntryByRoleKey = async roleKey => {
    this.setState(prevState => ({
      loadingEntries: { ...prevState.loadingEntries, [roleKey]: true }
    }));

    const entry = await this.props.sdk.space.getEntry(this.state.entryInternalMapping[roleKey]);
    if (entry) {
      this.setState(prevState => ({
        entries: { ...prevState.entries, [roleKey]: entry },
        loadingEntries: { ...prevState.loadingEntries, [roleKey]: false }
      }));
    }
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
    const contentTypeGroups = groupByContentType(this.state.internalMapping, this.state.entries);
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
                <Heading>{groupKey}</Heading>
                <Paragraph>({Object.keys(contentTypeGroups[groupKey]).length})</Paragraph>
              </div>
              <div className="entry-container">
                {Object.keys(contentTypeGroups[groupKey])
                  .sort((a, b) => (this.state.internalMapping[b] || {}).required)
                  .map((roleKey, index) => {
                    const entry = contentTypeGroups[groupKey][roleKey];
                    const internalMappingObject = this.state.internalMapping[roleKey] || {};
                    return (
                      <div
                        key={index}
                        className={classnames('role-section', {
                          highlighted:
                            !!this.state.draggingObject &&
                            this.state.internalMapping[this.state.draggingObject.roleKey]
                              .contentType === this.state.internalMapping[roleKey].contentType,
                          unhighlighted:
                            !!this.state.draggingObject &&
                            this.state.internalMapping[this.state.draggingObject.roleKey]
                              .contentType !== this.state.internalMapping[roleKey].contentType
                        })}>
                        <SectionHeading element="h1">
                          {roleKey}
                          {internalMappingObject.required && (
                            <span className="required-text">* (Required)</span>
                          )}
                        </SectionHeading>
                        {this.state.entryInternalMapping[roleKey] ? (
                          <EntryCard
                            draggable
                            loading={!!this.state.loadingEntries[roleKey]}
                            className={classnames('role-section__entity')}
                            size="small"
                            title={entry ? entry.fields.name['en-US'] : 'Loading...'}
                            contentType={entry ? entry.sys.contentType.sys.id : null}
                            status={getStatus(entry)}
                            withDragHandle={true}
                            isDragActive={
                              entry ? this.state.draggingObject === entry.sys.id : false
                            }
                            onDragStart={e => this.onDragStart(e, roleKey, entry.sys.id)}
                            onDragEnd={e => this.onDragEnd(e)}
                            onDragEnter={e => this.onDragEnter(e, roleKey, entry.sys.id)}
                            onDragOver={e => this.onDragEnter(e, roleKey, entry.sys.id)}
                            onDragLeave={e => this.onDragLeave(e, entry.sys.id)}
                            onDrop={e => this.onDrop(e)}
                            onClick={() => this.onEditClick(entry)}
                            dropdownListElements={
                              <DropdownList>
                                <DropdownListItem isTitle>Actions</DropdownListItem>
                                <DropdownListItem onClick={() => this.onEditClick(entry)}>
                                  Edit
                                </DropdownListItem>
                                <DropdownListItem onClick={() => this.onRemoveClick(roleKey)}>
                                  Remove
                                </DropdownListItem>
                              </DropdownList>
                            }
                          />
                        ) : (
                          <div>
                            <TextLink
                              className="role-section__add-button"
                              icon="Plus"
                              linkType="primary"
                              onClick={() =>
                                this.onAddEntryClick(
                                  roleKey,
                                  this.state.internalMapping[roleKey].contentType
                                )
                              }>
                              Create new entry
                            </TextLink>
                            <TextLink
                              className="role-section__add-button"
                              icon="Link"
                              linkType="primary"
                              onClick={() =>
                                this.onLinkEntryClick(
                                  roleKey,
                                  this.state.internalMapping[roleKey].contentType
                                )
                              }>
                              Link existing entry
                            </TextLink>
                          </div>
                        )}
                        <Paragraph element="p">{internalMappingObject.description}</Paragraph>
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
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
