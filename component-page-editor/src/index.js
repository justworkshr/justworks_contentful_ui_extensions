import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import * as c from '@shared/constants';

import { mockSchemas } from '@shared/__mocks__/mockData';

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
      themeVariant: props.sdk.entry.fields.themeVariant.getValue(),
      modules: props.sdk.entry.fields.modules.getValue(),

      hydratedEntries: [],
      hydratedMeta: null
    };

    this.fetchSchemas = this.fetchSchemas.bind(this);
    this.hydrateEntries = this.hydrateEntries.bind(this);
    this.hydrateMeta = this.hydrateMeta.bind(this);
  }

  componentDidMount() {
    this.hydrateEntries();
    this.hydrateMeta();

    // set default values
    if (!this.state.routing) {
      this.onRoutingChangeHandler({ target: { value: 'Default' } });
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

    if (!this.state.theme) {
      this.onThemeChangeHandler({ target: { value: 'jms__default' } });
    }

    if (!this.state.themeVariant) {
      this.onThemeVariantChangeHandler({ target: { value: 'light' } });
    }
  }

  fetchSchemas = async () => {
    // const response = await Axios.get('https://justworks.com/components.json');

    // props.schemaData for tests
    const schemaData = this.props.schemas || mockSchemas.data;

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
    const entries = await this.props.sdk.space.getEntries({
      'sys.id[in]': this.state.modules.map(l => l.sys.id).join(',')
    });

    this.setState({
      hydratedEntries: entries.items
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

  onThemeVariantChangeHandler = event => {
    const value = event.target.value;
    this.setState({ themeVariant: value });
    this.props.sdk.entry.fields.themeVariant.setValue(value);
  };

  onModulesChangeHandler = value => {
    this.setState({ modules: value });
    this.props.sdk.entry.fields.modules.setValue(value);
  };

  render() {
    console.log(this.state.schemaData);
    return (
      <Form className="editor f36-margin--l">
        <DisplayText>Component Page</DisplayText>
        <Paragraph>A page-builder page.</Paragraph>
        <SectionHeading>Internal Name</SectionHeading>
        <TextInput
          testId="field-name"
          onChange={this.onNameChangeHandler}
          value={this.state.internalName}
        />
        <SectionHeading className={!this.state.meta && 'f36-color--negative'}>
          Meta (required)
        </SectionHeading>
        <MetaEntryField
          hydratedEntry={this.state.hydratedMeta}
          onChange={this.onMetaChangeHandler}
          sdk={this.props.sdk}
          value={this.state.meta}
        />
        <SectionHeading className={!this.state.routing && 'f36-color--negative'}>
          Routing (required)
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

        <SectionHeading className={!this.state.path && 'f36-color--negative'}>
          Path (required)
        </SectionHeading>
        <TextInput
          testId="field-path"
          onChange={this.onPathChangeHandler}
          value={this.state.path}
        />
        <HelpText>The last part of the URL.</HelpText>
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

        <SectionHeading className={!this.state.theme && 'f36-color--negative'}>
          Theme (required)
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

        <SectionHeading className={!this.state.themeVariant && 'f36-color--negative'}>
          Theme Variant (required)
        </SectionHeading>
        <Select onChange={this.onThemeVariantChangeHandler} value={this.state.themeVariant}>
          {this.props.sdk.entry.fields.themeVariant.validations
            .find(v => v.in)
            .in.map(option => {
              return (
                <Option key={`themeVariant-option--${option}`} value={option}>
                  {option}
                </Option>
              );
            })}
        </Select>
        <HelpText>The light / dark mode setting for the theme.</HelpText>
        <SectionHeading>Modules</SectionHeading>
        <MultiComponentField
          sdk={this.props.sdk}
          schemaData={this.state.schemaData}
          hydratedEntries={this.state.hydratedEntries}
          onChange={this.onModulesChangeHandler}
          value={this.state.modules}
        />
      </Form>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(<App sdk={sdk} schemas={mockSchemas.data} />, document.getElementById('root'));
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
