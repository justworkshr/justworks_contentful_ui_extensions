import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import Axios from 'axios';
import * as c from '@shared/constants';

import { mockSchemas } from '@shared/__mocks__/mockData';
import ChangelogReader from '@shared/components/ChangelogReader';

import MetaEntryField from './components/MetaEntryField';
import MultiComponentField from './components/MultiComponentField';

import {
  DisplayText,
  Paragraph,
  SectionHeading,
  TextInput,
  Form,
  Select,
  Option,
  HelpText,
  TextLink
} from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';

/**
 * To use this demo create a Content Type with the following fields:
 *  title: Short text
 *  body: Long text
 *  hasAbstract: Boolean
 *  abstract: Long text
 *
 *  See https://github.com/contentful/create-contentful-extension/blob/master/docs/examples/entry-editor-content-model.json for details.
 */

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      schemaData: props.schemas,
      internalName: props.sdk.entry.fields.internalName.getValue() || '',
      meta: props.sdk.entry.fields.meta.getValue(),
      routing: props.sdk.entry.fields.routing.getValue(),
      path: props.sdk.entry.fields.path.getValue(),
      theme: props.sdk.entry.fields.theme.getValue(),
      modules: props.sdk.entry.fields.modules.getValue() || [],

      hydratedEntries: [],
      loadingEntries: true,
      hydratedMeta: null
    };

    this.fetchSchemas = this.fetchSchemas.bind(this);
    this.hydrateEntries = this.hydrateEntries.bind(this);
    this.hydrateMeta = this.hydrateMeta.bind(this);
    this.purgeMissingModules = this.purgeMissingModules.bind(this);
  }

  componentDidMount = async () => {
    await this.fetchSchemas();
    await this.hydrateEntries();
    await this.hydrateMeta();

    // set default values
    if (!this.state.routing) {
      this.onRoutingChangeHandler({ target: { value: 'Default' } });
    }

    // set default values
    if (!this.state.theme) {
      const options = this.props.sdk.entry.fields.theme.validations.find(v => v.in).in;
      if (options.length) {
        this.onThemeChangeHandler({ target: { value: options[0] } }); // selects first option automatically
      }
    }

    if (!this.state.path) {
      this.onPathChangeHandler({
        target: {
          value: this.state.internalName
            .split(' ')
            .join('-')
            .toLowerCase()
        }
      });
    }
  };

  purgeMissingModules = async (hydratedEntryItems, modules = []) => {
    if (!hydratedEntryItems) return;
    const cleanedValue = this.state.modules.reduce((acc, module) => {
      if (hydratedEntryItems.some(hydratedEntry => hydratedEntry.sys.id === module.sys.id)) {
        acc.push(module);
      }
      return acc;
    }, []);

    this.setState({ modules: cleanedValue });
    this.props.sdk.entry.fields.modules.setValue(cleanedValue);
  };

  fetchSchemas = async () => {
    const schemaHost = this.props.debug
      ? 'http://localhost:3000'
      : 'https://justworks-staging-v2.herokuapp.com';

    const auth = `Basic ${btoa('ju$t:w0rks')}`;
    const response = await Axios.get(`${schemaHost}/components.json`, {
      headers: { 'Content-Type': 'application/json', Authorization: auth }
    }).catch(e => {
      console.log(e);
      this.props.sdk.notifier.error(`Could not load schemas: ${e.message}`);
    });

    let schemaData;
    if (response) {
      schemaData = response.data.data;
    } else {
      schemaData = mockSchemas.data;
      this.props.sdk.notifier.success('Using mock schemas. Caution: data may be old.');
    }

    this.setState(
      {
        schemaData
      },
      () => {
        if (this.state.componentId && this.state.internalMapping == '{}') {
          const internalMapping = this.internalMappingFromComponentId(this.state.componentId);
          this.updateInternalMapping(internalMapping, false);
        }
      }
    );
  };

  hydrateMeta = async () => {
    if (this.state.meta) {
      const entry = await this.props.sdk.space.getEntry(this.state.meta.sys.id);
      this.setState({
        hydratedMeta: entry
      });
    } else {
      this.setState({
        hydratedMeta: null
      });
    }
  };

  hydrateEntries = async () => {
    this.setState(
      {
        loadingEntries: true
      },
      async () => {
        const entries = await this.props.sdk.space.getEntries({
          'sys.id[in]': this.state.modules.map(l => l.sys.id).join(',')
        });

        this.setState({
          hydratedEntries: entries.items,
          loadingEntries: false
        });

        // purge missing entries from the page record
        // sometimes a weird bug can occur when deleting module entries and not removing from the page entry.

        this.purgeMissingModules(entries.items, this.state.modules);
      }
    );
  };

  onNameChangeHandler = event => {
    const value = event.target.value;
    this.setState({ internalName: value });
    this.props.sdk.entry.fields.internalName.setValue(value);
  };

  onMetaChangeHandler = value => {
    this.setState({ meta: value }, () => {
      this.props.sdk.entry.fields.meta.setValue(value);
      this.hydrateMeta();
    });
  };

  onRoutingChangeHandler = event => {
    const value = event.target.value;
    this.setState({ routing: value });
    this.props.sdk.entry.fields.routing.setValue(value);
  };

  onPathChangeHandler = event => {
    const value = event.target.value;
    this.setState({ path: value });
    this.props.sdk.entry.fields.path.setValue(value);
  };

  onThemeChangeHandler = event => {
    const value = event.target.value;
    this.setState({ theme: value });
    this.props.sdk.entry.fields.theme.setValue(value);
  };

  onModulesChangeHandler = value => {
    this.setState({ modules: value });
    this.props.sdk.entry.fields.modules.setValue(value);
    this.hydrateEntries();
  };

  render() {
    return (
      <div className="editor">
        <DisplayText className="f36-margin-top--l f36-margin-top--m">Component Page</DisplayText>
        <Paragraph className="f36-margin-bottom--s">
          Create your new page here with the page-builder extension.
        </Paragraph>
        <ChangelogReader />
        <Form className="f36-margin--l">
          <SectionHeading>Internal Name</SectionHeading>
          <TextInput
            testId="field-name"
            onChange={this.onNameChangeHandler}
            value={this.state.internalName}
          />
          <div
            className={`editor__field ${this.props.sdk.entry.fields.meta.required &&
              !this.state.meta &&
              'with-error'}`}>
            <SectionHeading
              className={
                this.props.sdk.entry.fields.meta.required &&
                !this.state.meta &&
                'f36-color--negative'
              }>
              Meta {this.props.sdk.entry.fields.meta.required && '(Required)'}
            </SectionHeading>

            <MetaEntryField
              hydratedEntry={this.state.hydratedMeta}
              onChange={this.onMetaChangeHandler}
              sdk={this.props.sdk}
              value={this.state.meta}
            />
          </div>
          <div
            className={`editor__field ${this.props.sdk.entry.fields.routing.required &&
              !this.state.routing &&
              'with-error'}`}>
            <SectionHeading
              className={
                this.props.sdk.entry.fields.routing.required &&
                !this.state.routing &&
                'f36-color--negative'
              }>
              Routing {this.props.sdk.entry.fields.routing.required && '(Required)'}
            </SectionHeading>
            <Select onChange={this.onRoutingChangeHandler} value={this.state.routing}>
              {this.props.sdk.entry.fields.routing.validations
                .find(v => v.in)
                .in.map(option => {
                  return (
                    <Option key={`routing-option--${option}`} value={option}>
                      {option}
                    </Option>
                  );
                })}
            </Select>
            <HelpText>
              The preset site routing address. Format: https://justworks.com/( routing )/( path )
            </HelpText>
          </div>
          <div
            className={`editor__field ${this.props.sdk.entry.fields.path.required &&
              !this.state.path &&
              'with-error'}`}>
            <SectionHeading
              className={
                this.props.sdk.entry.fields.path.required &&
                !this.state.path &&
                'f36-color--negative'
              }>
              Path {this.props.sdk.entry.fields.path.required && '(Required)'}
            </SectionHeading>
            <TextInput
              testId="field-path"
              onChange={this.onPathChangeHandler}
              value={this.state.path}
            />
            <HelpText>The last part of the URL.</HelpText>
          </div>
          {this.state.schemaData.tokens && (
            <div>
              <SectionHeading>Production URL</SectionHeading>
              <TextLink
                target="_blank"
                href={`https://justworks.com${
                  this.state.schemaData.tokens.routing[this.state.routing]
                }${this.state.path}`}>{`https://justworks.com${
                this.state.schemaData.tokens.routing[this.state.routing]
              }${this.state.path}`}</TextLink>
              <SectionHeading className="f36-margin-top--xs">Staging URL</SectionHeading>
              <TextLink
                target="_blank"
                href={`https://justworks-staging-v2.herokuapp.com${
                  this.state.schemaData.tokens.routing[this.state.routing]
                }${this.state.path}`}>{`https://justworks-staging-v2.herokuapp.com${
                this.state.schemaData.tokens.routing[this.state.routing]
              }${this.state.path}`}</TextLink>
            </div>
          )}
          <div
            className={`editor__field ${this.props.sdk.entry.fields.theme.required &&
              !this.state.theme &&
              'with-error'}`}>
            <SectionHeading
              className={
                this.props.sdk.entry.fields.theme.required &&
                !this.state.theme &&
                'f36-color--negative'
              }>
              Theme {this.props.sdk.entry.fields.theme.required && '(Required)'}
            </SectionHeading>
            <Select onChange={this.onThemeChangeHandler} value={this.state.theme}>
              {this.props.sdk.entry.fields.theme.validations
                .find(v => v.in)
                .in.map(option => {
                  return (
                    <Option key={`theme-option--${option}`} value={option}>
                      {option}
                    </Option>
                  );
                })}
            </Select>
            <HelpText>The theme which affects color scheming and typography.</HelpText>
          </div>

          <div
            className={`editor__field ${this.props.sdk.entry.fields.modules.required &&
              !this.state.modules &&
              'with-error'}`}>
            <SectionHeading>
              Modules {this.props.sdk.entry.fields.modules.required && '(Required)'}
            </SectionHeading>
            {!Object.keys(this.state.schemaData) && <Paragraph>Loading schemas...</Paragraph>}
            <MultiComponentField
              sdk={this.props.sdk}
              schemaData={this.state.schemaData}
              hydratedEntries={this.state.hydratedEntries}
              loadingEntries={this.state.loadingEntries}
              onChange={this.onModulesChangeHandler}
              value={this.state.modules}
            />
          </div>
        </Form>
      </div>
    );
  }
}

init(sdk => {
  const isDev = window.location.href.includes('localhost');

  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(
      <App sdk={sdk} schemas={mockSchemas.data} debug={isDev} />,
      document.getElementById('root')
    );
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
