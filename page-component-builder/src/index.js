import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import Axios from 'axios';

import { mockSchemas } from '@shared/__mocks__/mockData';

import ComponentPalette from './components/ComponentPalette';
import ComponentEditor from './components/ComponentEditor';

import {
  Spinner,
  DisplayText,
  Paragraph,
  FormLabel,
  TextInput,
  Textarea,
  Form,
  Icon,
  HelpText
} from '@contentful/forma-36-react-components';

import RadioGroup from './components/fields/RadioGroup';

import { init, locations } from 'contentful-ui-extensions-sdk';
import * as c from '@shared/constants';

import InternalMapping from '@shared/classes/InternalMapping';

import { linksToFetch } from './utilities';

import { extractEntries, newInternalMappingFromSchema } from '@shared/utilities/index.js';

import { schemaTitle } from './utilities/copyUtils';

import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';
import IntroductionBlock from './components/IntroductionBlock';

/**
 * To use this demo create a Content Type with the following fields:
 *  name: Short text
 *  body: Long text
 *  hasAbstract: Boolean
 *  abstract: Long text
 *
 *  See https://github.com/contentful/create-contentful-extension/blob/master/docs/examples/entry-editor-content-model.json for details.
 */

export class PageComponentBuilder extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.updateTimeout = null;
    const blankSchemaData = {
      components: [],
      config_templates: [],
      tags: {}
    };

    const schemaData = props.schemas || blankSchemaData;
    const entries = props.sdk.entry.fields.entries.getValue() || [];
    const assets = props.sdk.entry.fields.assets.getValue() || [];
    const hydratedAssets = props.hydratedAssets || [];
    const hydratedEntries = props.hydratedEntries || [];

    const internalMappingJson =
      props.sdk.entry.fields.internalMapping.getValue() || JSON.stringify({});
    this.state = {
      schemaData,
      name: props.sdk.entry.fields.name.getValue(),
      componentId: props.sdk.entry.fields.componentId.getValue(),
      configObject: props.sdk.entry.fields.configObject.getValue(),
      entries: entries.filter(e => e),
      assets: assets.filter(e => e),
      internalMapping: internalMappingJson,
      isValid: props.sdk.entry.fields.isValid.getValue(),
      loadingEntries: {}, // key: status (false | true | null) = not loading, loading, not found
      hydratedEntries,
      hydratedAssets,
      updatingAssets: false,
      updatingEntries: false,
      paletteOpen: false
    };

    props.sdk.entry.fields.internalMapping.onValueChanged(this.onInternalMappingChange);

    // load initial entries / assets

    this.fetchSchemas = this.fetchSchemas.bind(this);
    this.currentSchema = this.currentSchema.bind(this);
    this.validateInternalMapping = this.validateInternalMapping.bind(this);
    this.onInternalMappingChange = this.onInternalMappingChange.bind(this);
    this.internalMappingFromComponentId = this.internalMappingFromComponentId.bind(this);
    this.togglePalette = this.togglePalette.bind(this);
  }

  componentDidMount = async () => {
    await this.fetchSchemas();
    await this.syncEntriesAssets();
    this.onInternalMappingChange(this.state.internalMapping);
    const internalMappingInstance = new InternalMapping(
      this.state.componentId,
      this.parseInternalMapping().properties,
      this.currentSchema(),
      this.state.configObject
    );

    this.validateInternalMapping(internalMappingInstance.errors);
  };

  togglePalette() {
    this.setState(oldState => {
      return {
        paletteOpen: !oldState.paletteOpen
      };
    });
  }

  syncEntriesAssets = async () => {
    const internalMappingObject = this.parseInternalMapping();
    const newEntries = extractEntries(internalMappingObject, c.ENTRY_LINK_TYPE) || [];
    const newAssets = extractEntries(internalMappingObject, c.ASSET_LINK_TYPE) || [];

    await this.onEntriesChangeHandler(newEntries);
    await this.onAssetsChangeHandler(newAssets);
  };

  validateInternalMapping(errors = {}) {
    if (Object.keys(errors).length) {
      this.props.sdk.entry.fields.isValid.setValue('No');
    } else if (
      this.props.sdk.entry.fields.isValid.getValue() === 'No' ||
      !this.props.sdk.entry.fields.isValid.getValue()
    ) {
      this.props.sdk.entry.fields.isValid.setValue('Yes');
    }
  }

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

  onNameChangeHandler = event => {
    const value = event.target.value;
    this.setState({ name: value });
    this.props.sdk.entry.fields.name.setValue(value);
  };

  onConfigObjectChangeHandler = value => {
    this.setState({ configObject: value });
    this.props.sdk.entry.fields.configObject.setValue(value);
  };

  internalMappingFromComponentId = (componentId, patternVariation = null) => {
    const schema = this.state.schemaData.components.find(s => s.meta.id === componentId);
    const internalMapping = schema
      ? newInternalMappingFromSchema({
          schema,
          presetObject: patternVariation,
          configObject: this.state.configObject
        }).asJSON()
      : JSON.stringify({});

    return internalMapping;
  };

  onComponentIdChangeHandler = async (value, patternVariation = null) => {
    // Completely resets internal mapping w/ new schema and clears all linked entries and assets
    await this.setState(
      oldState => {
        return {
          componentId: value,
          hydratedAssets: [],
          hydratedEntries: [],
          assets: [],
          entries: []
        };
      },
      async () => {
        await this.props.sdk.entry.fields.componentId.setValue(value);
        await this.props.sdk.entry.fields.entries.setValue([]); // clear entries
        await this.props.sdk.entry.fields.assets.setValue([]); // clear assets
        const internalMapping = this.internalMappingFromComponentId(value, patternVariation);

        this.updateInternalMapping(internalMapping, false);
      }
    );
  };

  replaceHydratedAsset = hydratedAsset => {
    // Used on Asset updates to provide updated data to the UI
    if (!hydratedAsset) return;
    this.setState(oldState => ({
      hydratedAssets: [
        ...oldState.hydratedAssets.filter(e => e.sys.id !== hydratedAsset.sys.id),
        hydratedAsset
      ]
    }));
  };

  replaceHydratedEntry = hydratedEntry => {
    // Used on entry updates to provide updated data to the UI
    if (!hydratedEntry) return;
    this.setState(oldState => ({
      hydratedEntries: [
        ...oldState.hydratedEntries.filter(e => e.sys.id !== hydratedEntry.sys.id),
        hydratedEntry
      ]
    }));
  };

  onEntriesChangeHandler = async value => {
    if (Array.isArray(value)) {
      if (!this.state.updatingEntries) {
        this.setState({ updatingEntries: true });
        this.setState({ entries: value.filter(e => e) });
        this.setState({ updatingEntries: false });
      }
      if (!value.length) value = undefined; // contentful prefers 'undefined' instead of empty array
      if (value !== this.props.sdk.entry.fields.entries.getValue()) {
        await this.props.sdk.entry.fields.entries.setValue(value);
      }
    } else {
      console.warn('onEntriesChangeHandler called with non-array value');
    }
  };

  onAssetsChangeHandler = async value => {
    if (Array.isArray(value)) {
      if (!this.state.updatingAssets) {
        this.setState({ updatingAssets: true });
        this.setState({ assets: value.filter(e => e) });
        this.setState({ updatingAssets: false });
      }
      if (!value.length) value = undefined; // contentful prefers 'undefined' instead of empty array
      if (value !== this.props.sdk.entry.fields.assets.getValue()) {
        await this.props.sdk.entry.fields.assets.setValue(value);
      }
    } else {
      console.warn('onAssetsChangeHandler called with non-array value');
    }
  };

  onInternalMappingChange = async value => {
    if (this.updateTimeout) return; // Don't run if the timeout is running with a pending update
    let internalMappingObject = this.parseInternalMapping();
    const newEntries = extractEntries(internalMappingObject, c.ENTRY_LINK_TYPE) || [];
    const newAssets = extractEntries(internalMappingObject, c.ASSET_LINK_TYPE) || [];

    const entriesToFetch = linksToFetch(this.state.hydratedEntries, newEntries) || [];
    const assetsToFetch = linksToFetch(this.state.hydratedAssets, newAssets) || [];
    // set loading
    const loadingEntries = {};
    entriesToFetch.forEach(e => (loadingEntries[(e.sys || {}).id] = true));
    this.setState({ loadingEntries });
    // fetch
    let fetchedEntries = { items: [] };
    let fetchedAssets = { items: [] };
    if (entriesToFetch.length) {
      await this.onEntriesChangeHandler(newEntries);
      fetchedEntries = !!entriesToFetch.length
        ? await this.props.sdk.space.getEntries({
            'sys.id[in]': entriesToFetch.map(l => l.sys.id).join(',')
          })
        : { items: [] };

      // update loading
      Object.keys(loadingEntries).forEach(key => (loadingEntries[key] = null));
      fetchedEntries.items.forEach(e => (loadingEntries[(e.sys || {}).id] = false));
    }

    if (assetsToFetch.length) {
      await this.onAssetsChangeHandler(newAssets);
      fetchedAssets = !!assetsToFetch.length
        ? await this.props.sdk.space.getAssets({
            'sys.id[in]': assetsToFetch.map(l => l.sys.id).join(',')
          })
        : { items: [] };
    }

    await this.validateInternalMapping();

    this.setState(oldState => {
      if (!!this.updateTimeout) return; // Don't run if the timeout is running with a pending update

      return {
        ...oldState,
        internalMapping: value,
        loadingEntries,
        hydratedEntries: [...oldState.hydratedEntries, ...fetchedEntries.items],
        hydratedAssets: [...oldState.hydratedAssets, ...fetchedAssets.items]
      };
    });
  };

  updateInternalMapping = (value, timeout = true, errors = {}) => {
    this.setState({ internalMapping: value });
    clearTimeout(this.updateTimeout);
    if (timeout) {
      this.updateTimeout = setTimeout(() => {
        this.props.sdk.entry.fields.internalMapping.setValue(value);
        this.updateTimeout = null;
      }, 750);
    } else {
      this.props.sdk.entry.fields.internalMapping.setValue(value);
    }

    this.validateInternalMapping(errors);
  };

  onIsValidChangeHandler = event => {
    const value = event.target.value;
    this.setState({ isValid: value });

    this.props.sdk.entry.fields.isValid.setValue(value);
  };

  parseInternalMapping = () => {
    let internalMappingObject = {};
    try {
      internalMappingObject = JSON.parse(this.state.internalMapping);
    } catch {
      console.warn('Invalid JSON: ', this.state.internalMapping);
    }

    return internalMappingObject;
  };

  currentSchema() {
    if (this.state.configObject) {
      return this.state.schemaData.config_templates.find(
        schema => schema.meta.id === this.state.componentId
      );
    } else {
      return this.state.schemaData.components.find(
        schema => schema.meta.id === this.state.componentId
      );
    }
  }

  render() {
    const schema = this.currentSchema();
    return (
      <Form className="editor f36-margin--l">
        <DisplayText>Entry extension demo</DisplayText>
        <Paragraph>
          This demo uses a single UI Extension to render the whole editor for an entry.
        </Paragraph>
        <div className="component-editor__field">
          <FormLabel htmlFor="field-name">Name</FormLabel>
          <TextInput
            id="field-name"
            testId="field-name"
            onChange={this.onNameChangeHandler}
            value={this.state.name}
          />
          <HelpText>Please note what page it lives on and what content is included.</HelpText>
        </div>

        {(this.state.paletteOpen || this.state.componentId) && (
          <div className="component-editor__field">
            <FormLabel htmlFor="field-componentId">Component ID</FormLabel>
            <TextInput
              id="field-componentId"
              testId="field-componentId"
              className="f36-margin-bottom--m d-none"
              disabled={true}
              onChange={e => this.onComponentIdChangeHandler(e.tar2.value)}
              value={this.state.componentId}
            />
            <TextInput disabled={true} value={schema ? schema.meta.title || schema.meta.id : ''} />
            {// Only allow palette when this entry isn't serving as a config object
            !this.state.configObject && (
              <ComponentPalette
                componentId={this.state.componentId}
                onChange={this.onComponentIdChangeHandler}
                schemas={this.state.schemaData.components}
                tags={this.state.schemaData.tags}
                isShown={this.state.paletteOpen}
                toggleShown={this.togglePalette}
              />
            )}
          </div>
        )}
        {this.state.configObject && (
          <div className="component-editor__field d-flex-row-center-start">
            <Icon icon="Settings" className="f36-margin-right--xs" />
            <Paragraph>This is a configuration entry.</Paragraph>
          </div>
        )}
        <div className="component-editor__field d-none">
          <FormLabel htmlFor="field-configObject">Config Object</FormLabel>
          <RadioGroup
            id="field-configObject"
            name="field-configObject"
            options={[true, false]}
            onChange={value => this.onConfigObjectChangeHandler(value)}
            value={this.state.configObject}
          />
        </div>

        <div className="component-editor__field d-none">
          <FormLabel htmlFor="field-entries">Entries</FormLabel>
          <Textarea
            testId="field-entries"
            value={this.state.entries.map(e => e.sys.id).join(', ')}
          />
        </div>

        <div className="component-editor__field d-none">
          <FormLabel htmlFor="field-assets">Assets</FormLabel>
          <Textarea
            id="field-assets"
            testId="field-assets"
            value={this.state.assets.map(a => a.sys.id).join(', ')}
          />
        </div>

        <div className="component-editor__field d-none">
          <FormLabel htmlFor="field-internalMapping">Internal Mapping</FormLabel>
          <Textarea
            id="field-internalMapping"
            testId="field-internalMapping"
            onChange={e => this.updateInternalMapping(e.target.value)}
            value={this.state.internalMapping}
          />
        </div>

        <div className="component-editor__field d-none">
          <FormLabel htmlFor="field-isValid">Is Valid?</FormLabel>
          <TextInput
            id="field-isValid"
            testId="field-isValid"
            onChange={this.onIsValidChangeHandler}
            value={this.state.isValid}
          />
        </div>

        {this.state.componentId && (
          <ComponentEditor
            sdk={this.props.sdk}
            schemas={this.state.schemaData.components}
            tokens={this.state.schemaData.tokens}
            updateInternalMapping={this.updateInternalMapping}
            hydratedAssets={this.state.hydratedAssets}
            hydratedEntries={this.state.hydratedEntries}
            loadingEntries={this.state.loadingEntries}
            replaceHydratedAsset={this.replaceHydratedAsset}
            replaceHydratedEntry={this.replaceHydratedEntry}
            internalMappingInstance={
              new InternalMapping(
                this.state.componentId,
                this.parseInternalMapping().properties,
                schema,
                this.state.configObject
              )
            }
            componentId={this.state.componentId}
            schema={schema}
            title={schemaTitle(schema)}
          />
        )}
        {!this.state.schemaData.components.length && (
          <div>
            <Spinner size="default" /> Loading schemas...
          </div>
        )}
        {!!this.state.schemaData.components.length && !this.state.componentId && (
          <IntroductionBlock toggleShown={this.togglePalette} />
        )}
      </Form>
    );
  }
}

init(sdk => {
  const isDev = window.location.href.includes('localhost');
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(
      <PageComponentBuilder
        hydratedAssets={null}
        hydratedEntries={null}
        schemas={null}
        sdk={sdk}
        debug={isDev}
      />,
      document.getElementById('root')
    );
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
if (module.hot) {
  module.hot.accept();
}
