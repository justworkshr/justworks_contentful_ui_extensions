import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  Button,
  EntityListItem,
  Heading,
  Paragraph,
  ToggleButton
} from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';

import { internal_mappings } from './internal_mappings';

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
      template: template,
      value: props.sdk.field.getValue() || '',
      navigatedTo: []
    };

    this.fetchNavigatedTo = this.fetchNavigatedTo.bind(this);
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
    // debugger;
    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
    this.props.sdk.entry.fields.template.onValueChanged(this.onTemplateChange);

    this.loadEntries();
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    console.log('hiiiii');
    this.setState({ value });
  };

  onTemplateChange = template => {
    this.setState({
      template,
      internalMapping: internal_mappings[template && template.toLowerCase()] || {}
    });
  };

  onEntityClick = async entry => {
    if (!entry) return null;
    await this.props.sdk.navigator.openEntry(entry.sys.id, { slideIn: true });
    this.setState(prevState => ({ navigatedTo: [...prevState.navigatedTo, entry.sys.id] }));
  };

  onAddEntryClick = async (roleKey, contentType) => {
    const entry = await this.props.sdk.dialogs.selectSingleEntry({ contentTypes: [contentType] });
    console.log(entry);
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
    const entryRoleKey = Object.keys(this.state.entryInternalMapping).find(
      roleKey => this.state.entryInternalMapping[roleKey] === id
    );

    return await this.fetchEntryByRoleKey(entryRoleKey);
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

  getStatus = entry => {
    if (!entry) return null;
    if (entry.sys.publishedAt && entry.sys.publishedAt === entry.sys.updatedAt) {
      return 'published';
    } else if (entry.sys.publishedAt && entry.sys.publishedAt !== entry.sys.updatedAt) {
      return 'changed';
    } else if (entry.sys.archivedAt) {
      return 'archived';
    } else {
      return 'draft';
    }
  };

  render() {
    console.log(this.state);
    return (
      <div onClick={this.fetchNavigatedTo}>
        {/* <Button buttonType="muted" onClick={this.loadEntries} size="small">
          Refresh Entries
        </Button> */}
        {Object.keys(this.state.internalMapping).map((roleKey, index) => {
          return (
            <div key={index} className="role-section">
              <Heading element="h1">{roleKey}</Heading>
              {this.state.entryInternalMapping[roleKey] ? (
                <EntityListItem
                  isLoading={!!this.state.loadingEntries[roleKey]}
                  className="role-section__entity"
                  title={
                    !!this.state.entries[roleKey] &&
                    this.state.entries[roleKey].fields.name['en-US']
                  }
                  contentType={
                    !!this.state.entries[roleKey] &&
                    this.state.entries[roleKey].sys.contentType.sys.id
                  }
                  status={this.getStatus(this.state.entries[roleKey])}
                  onClick={() => this.onEntityClick(this.state.entries[roleKey])}
                />
              ) : (
                <ToggleButton
                  className="role-section__add-button"
                  onClick={() =>
                    this.onAddEntryClick(roleKey, this.state.internalMapping[roleKey].contentType)
                  }>
                  + Add Entry
                </ToggleButton>
              )}
              <Paragraph element="p">{this.state.internalMapping[roleKey].description}</Paragraph>
            </div>
          );
        })}
      </div>
    );
    // return (
    //   <TextInput
    //     width="large"
    //     type="text"
    //     id="my-field"
    //     testId="my-field"
    //     value={this.state.value}
    //     onChange={this.onChange}
    //   />
    // );
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
