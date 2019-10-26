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
  ToggleButton
} from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';

import { internal_mappings } from './internal_mappings';
import { getStatus, constructLink, groupByContentType } from './utils';

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
    this.state = {
      entries: {},
      loadingEntries: {},
      entryInternalMapping: JSON.parse(props.sdk.entry.fields.internalMapping.getValue()),
      internalMapping: internal_mappings[template && template.toLowerCase()] || {},
      template,
      value: props.sdk.field.getValue() || '',
      navigatedTo: []
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

  onSysChanged = sysValue => {
    const template = this.props.sdk.entry.fields.template.getValue();
    this.setState({
      template,
      entryInternalMapping: JSON.parse(this.props.sdk.entry.fields.internalMapping.getValue()),
      internalMapping: internal_mappings[template && template.toLowerCase()] || {}
    });

    // get new entry by deduction if added

    const newEntries = this.props.sdk.entry.fields.entries
      .getValue()
      .filter(
        entry =>
          !Object.keys(this.state.entries).some(
            key => this.state.entries[key].sys.id === entry.sys.id
          )
      );

    newEntries.forEach(entry => {
      this.fetchEntryById(entry.sys.id);
    });
  };

  onExternalChange = value => {
    this.setState({
      value
    });
  };

  onTemplateChange = template => {
    this.setState({
      template,
      internalMapping: internal_mappings[template && template.toLowerCase()] || {}
    });
  };

  onAddEntryClick = async (roleKey, contentType) => {
    const entry = await this.props.sdk.dialogs.selectSingleEntry({ contentTypes: [contentType] });

    const updatedEntryList = [
      ...this.props.sdk.entry.fields.entries.getValue(),
      constructLink(entry)
    ];
    const updatedInternalMapping = JSON.stringify({
      ...this.state.entryInternalMapping,
      [roleKey]: entry.sys.id
    });
    this.updateEntry(updatedEntryList, updatedInternalMapping);
  };

  onEditClick = async entry => {
    if (!entry) return null;
    await this.props.sdk.navigator.openEntry(entry.sys.id, { slideIn: true });
    this.setState(prevState => ({ navigatedTo: [...prevState.navigatedTo, entry.sys.id] }));
  };

  onRemoveClick = entry => {
    if (!entry) return null;
    this.removeEntry(entry);
  };

  removeEntry = entry => {
    const thisEntry = this.props.sdk.entry;
    const roleKey = this.getRoleKeyFromId(entry.sys.id);

    const updatedEntryList = thisEntry.fields.entries
      .getValue()
      .filter(e => e.sys.id !== entry.sys.id);

    const internalMapping = {
      ...this.state.entryInternalMapping
    };

    delete internalMapping[roleKey];
    const updatedInternalMapping = JSON.stringify(internalMapping);

    this.updateEntry(updatedEntryList, updatedInternalMapping).then(() => {
      this.setState(prevState => {
        const prevStateLoadingEntries = { ...prevState.loadingEntries };
        const prevStateEntries = { ...prevState.entries };
        delete prevStateLoadingEntries[roleKey];
        delete prevStateEntries[roleKey];
        return { loadingEntries: prevStateLoadingEntries, entries: prevStateEntries };
      });
    });
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
          internalMapping: { 'en-US': updatedInternalMapping }
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
        }
      } else {
        this.props.sdk.notifier.error('An error occured. Please try again.');
        this.loadEntries();
      }
    }
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

  fetchEntryById = async id => {
    const entryRoleKey = this.getRoleKeyFromId(id);

    return await this.fetchEntryByRoleKey(entryRoleKey);
  };

  getRoleKeyFromId = id => {
    return Object.keys(this.state.entryInternalMapping).find(
      roleKey => this.state.entryInternalMapping[roleKey] === id
    );
  };

  fetchNavigatedTo = () => {
    if (!this.state.navigatedTo.length) return;

    this.state.navigatedTo.forEach(async id => {
      await this.fetchEntryById(id);
      this.setState(prevState => ({
        navigatedTo: prevState.navigatedTo.filter(el => el !== id)
      }));
    });

    return;
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

    console.log(this.state.draggingObject, this.state.dragTargetObject);
  };

  onDragEnter = (e, roleKey, id) => {
    if ((this.state.draggingObject || {}).id === id) return null;
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
                <Paragraph>({contentTypeGroups[groupKey].length})</Paragraph>
              </div>
              <div className="entry-container">
                {contentTypeGroups[groupKey].map((entry, index) => {
                  const roleKey = this.getRoleKeyFromId(entry.sys.id);
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
                      <SectionHeading element="h1">{roleKey}</SectionHeading>
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
                          isDragActive={entry ? this.state.draggingObject === entry.sys.id : false}
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
                              <DropdownListItem onClick={() => this.onRemoveClick(entry)}>
                                Remove
                              </DropdownListItem>
                            </DropdownList>
                          }
                        />
                      ) : (
                        <ToggleButton
                          className="role-section__add-button"
                          onClick={() =>
                            this.onAddEntryClick(
                              roleKey,
                              this.state.internalMapping[roleKey].contentType
                            )
                          }>
                          + Add Entry
                        </ToggleButton>
                      )}
                      <Paragraph element="p">
                        {this.state.internalMapping[roleKey].description}
                      </Paragraph>
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
