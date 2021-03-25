import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import Axios from 'axios';
import * as c from '@shared/constants';

import { mockSchemas } from '@shared/__mocks__/mockData';
import ChangelogReader from '@shared/components/ChangelogReader';

import MetaEntryField from './components/MetaEntryField';
import MultiComponentField from './components/MultiComponentField';
import MarkdownField from './components/MarkdownField';

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

const convertCamelToSentence = text => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    console.log('hello', props.sdk.entry.fields);
    this.TITLE = ((props.sdk.parameters || {}).instance || {}).title || 'Component Page Builder';
    this.MODULE_CONTENT_TYPE_ID =
      ((props.sdk.parameters || {}).instance || {}).moduleContentType || 'video';
    this.PRODUCTION_URL =
      ((props.sdk.parameters || {}).installation || {}).productionUrl || 'https://justworks.com';
    this.STAGING_URL =
      ((props.sdk.parameters || {}).installation || {}).stagingUrl ||
      'https://justworks-staging-v2.herokuapp.com';

    this.getDefaultTypeValue = this.getDefaultTypeValue.bind(this);
    const initialValues = Object.assign(
      {},
      ...Object.keys(props.sdk.entry.fields).map(key => {
        return {
          [key]:
            props.sdk.entry.fields[key].getValue() ||
            this.getDefaultTypeValue(props.sdk.entry.fields[key].type)
        };
      })
    );

    this.state = {
      schemaData: props.schemas,

      ...initialValues,
      hydratedEntries: [],
      loadingEntries: true,
      hydratedMeta: null
    };

    this.fetchSchemas = this.fetchSchemas.bind(this);
    this.hydrateEntries = this.hydrateEntries.bind(this);
    this.hydrateMeta = this.hydrateMeta.bind(this);
    this.purgeMissingModules = this.purgeMissingModules.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount = async () => {
    await this.fetchSchemas();
    await this.hydrateEntries();
    await this.hydrateMeta();

    // set default values
    if (!!this.props.sdk.entry.fields.routing && !this.state.routing) {
      this.onRoutingChangeHandler({ target: { value: 'Default' } });
    }

    // set default values
    if (!!this.props.sdk.entry.fields.theme && !this.state.theme) {
      const options = this.props.sdk.entry.fields.theme.validations.find(v => v.in).in;
      if (options.length) {
        this.onThemeChangeHandler({ target: { value: options[0] } }); // selects first option automatically
      }
    }

    if (!!this.props.sdk.entry.fields.path && !this.state.path) {
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

  getDefaultTypeValue = type => {
    if (type === 'Array') {
      return [];
    } else {
      return null;
    }
  };

  purgeMissingModules = async (hydratedEntryItems, modules = []) => {
    if (!hydratedEntryItems || !this.state.modules) return;
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
    const schemaHost = this.props.debug ? 'http://localhost:3000' : this.STAGING_URL;

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
        if (!this.state.modules) return;
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

  handleFieldChange = (value, fieldId) => {
    this.setState({ [fieldId]: value }, () => {
      this.props.sdk.entry.fields[fieldId].setValue(value);
    });
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
    console.log(this.state);
    return (
      <div className="editor">
        <DisplayText className="f36-margin-top--l f36-margin-top--m">{this.TITLE}</DisplayText>
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
          {this.props.sdk.entry.fields.meta && (
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
          )}
          {this.props.sdk.entry.fields.routing && (
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
                The preset site routing address. Format: {this.PRODUCTION_URL}/( routing )/( path )
              </HelpText>
            </div>
          )}
          {this.props.sdk.entry.fields.path && (
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
              <HelpText>
                The last part of the URL. Enter {'{{ root }}'} if you want this part to be blank.
              </HelpText>
            </div>
          )}

          {this.props.sdk.entry.fields.path && this.state.schemaData.tokens && (
            <div>
              <SectionHeading>Production URL</SectionHeading>
              <TextLink
                target="_blank"
                href={`${this.PRODUCTION_URL}${
                  this.state.schemaData.tokens.routing[this.state.routing]
                }${this.state.path === '{{ root }}' ? '' : this.state.path}`}>{`${
                this.PRODUCTION_URL
              }${this.state.schemaData.tokens.routing[this.state.routing]}${
                this.state.path === '{{ root }}' ? '' : this.state.path
              }`}</TextLink>
              <SectionHeading className="f36-margin-top--xs">Staging URL</SectionHeading>
              <TextLink
                target="_blank"
                href={`${this.STAGING_URL}${
                  this.state.schemaData.tokens.routing[this.state.routing]
                }${this.state.path === '{{ root }}' ? '' : this.state.path}`}>{`${
                this.STAGING_URL
              }${this.state.schemaData.tokens.routing[this.state.routing]}${
                this.state.path === '{{ root }}' ? '' : this.state.path
              }`}</TextLink>
            </div>
          )}

          {this.props.sdk.entry.fields.theme && (
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
          )}

          {Object.keys(this.props.sdk.entry.fields)
            .map(field => {
              // skip over old fields which already have markup
              if (field.id === 'internalName') return null;
              if (field.id === 'meta') return null;
              if (field.id === 'routing') return null;
              if (field.id === 'theme') return null;
              if (field.id === 'modules') return null;

              // Symbol = short text
              // Text = long text
              if (this.props.sdk.entry.fields[field].type === 'Text') {
                return (
                  <>
                    <SectionHeading
                      className={
                        this.props.sdk.entry.fields[field].required &&
                        !this.state.theme &&
                        'f36-color--negative'
                      }>
                      {convertCamelToSentence(field)}{' '}
                      {this.props.sdk.entry.fields[field].required && '(Required)'}
                    </SectionHeading>

                    <MarkdownField
                      sdk={this.props.sdk}
                      value={this.state[field]}
                      onChange={value => this.handleFieldChange(value, field)}
                    />
                  </>
                );
              }
            })
            .filter(e => e)}
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
              contentTypeId={this.MODULE_CONTENT_TYPE_ID}
              schemaData={this.state.schemaData}
              hydratedEntries={this.state.hydratedEntries}
              loadingEntries={this.state.loadingEntries}
              onChange={this.onModulesChangeHandler}
              value={this.state.modules || []}
            />
          </div>
        </Form>
      </div>
    );
  }
}

init(sdk => {
  console.log('INIT');
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
