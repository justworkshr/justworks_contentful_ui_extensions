import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import Axios from 'axios';

import { mockSchemas } from './tests/mockData';

import EntryField from './components/fields/EntryField';
import ComponentPalette from './components/ComponentPalette';
import ComponentEditor from './components/ComponentEditor';

import {
  DisplayText,
  Paragraph,
  FormLabel,
  TextInput,
  Textarea,
  Button,
  Modal,
  FieldGroup,
  RadioButtonField,
  Form
} from '@contentful/forma-36-react-components';

import RadioGroup from './components/fields/RadioGroup';

import { init, locations } from 'contentful-ui-extensions-sdk';
import * as c from './constants';

import InternalMapping from './classes/InternalMapping';
import {
  constructLink,
  extractEntries,
  linksToFetch,
  newInternalMappingFromSchema
} from './utilities';
import { schemaTitle } from './utilities/copyUtils';

import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';

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
      updatingEntries: false
    };

    props.sdk.entry.fields.internalMapping.onValueChanged(this.onInternalMappingChange);

    // load initial entries / assets

    this.fetchSchemas = this.fetchSchemas.bind(this);
    this.currentSchema = this.currentSchema.bind(this);
    this.internalMappingFromComponentId = this.internalMappingFromComponentId.bind(this);
  }

  componentDidMount = async () => {
    await this.syncEntriesAssets();
    this.fetchSchemas();
    this.onInternalMappingChange(this.state.internalMapping);
  };

  syncEntriesAssets = async () => {
    const internalMappingObject = this.parseInternalMapping(this.state.internalMapping);
    const newEntries = extractEntries(internalMappingObject, c.ENTRY_LINK_TYPE) || [];
    const newAssets = extractEntries(internalMappingObject, c.ASSET_LINK_TYPE) || [];
    await this.onEntriesChangeHandler(newEntries);
    await this.onAssetsChangeHandler(newAssets);
  };

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

  onNameChangeHandler = event => {
    const value = event.target.value;
    this.setState({ name: value });
    this.props.sdk.entry.fields.name.setValue(value);
  };

  onConfigObjectChangeHandler = value => {
    this.setState({ configObject: value });
    this.props.sdk.entry.fields.configObject.setValue(value);
  };

  internalMappingFromComponentId = componentId => {
    const schema = this.state.schemaData.components.find(s => s.meta.id === componentId);
    const internalMapping = schema
      ? newInternalMappingFromSchema(schema, this.state.configObject).asJSON()
      : JSON.stringify({});

    return internalMapping;
  };

  onComponentIdChangeHandler = async value => {
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
        const internalMapping = this.internalMappingFromComponentId(value);

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
      await this.props.sdk.entry.fields.entries.setValue(value);
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
      await this.props.sdk.entry.fields.assets.setValue(value);
    } else {
      console.warn('onAssetsChangeHandler called with non-array value');
    }
  };

  onInternalMappingChange = async value => {
    if (!!this.updateTimeout) return; // Don't run if the timeout is running with a pending update
    let internalMappingObject = this.parseInternalMapping(value);
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

  updateInternalMapping = (value, timeout = true) => {
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
        </div>

        <div className="component-editor__field">
          <FormLabel htmlFor="field-componentId">Component ID</FormLabel>
          <TextInput
            id="field-componentId"
            testId="field-componentId"
            className="f36-margin-bottom--m"
            onChange={e => this.onComponentIdChangeHandler(e.target.value)}
            value={this.state.componentId}
          />
          {// Only allow palette when this entry isn't serving as a config object
          !this.state.configObject && (
            <ComponentPalette
              componentId={this.state.componentId}
              onChange={this.onComponentIdChangeHandler}
              schemas={this.state.schemaData.components}
              tags={this.state.schemaData.tags}
            />
          )}
        </div>

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

        <div className="component-editor__field">
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

        <div className="component-editor__field">
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

        <ComponentEditor
          sdk={this.props.sdk}
          schemas={this.state.schemaData.components}
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
          schema={schema}
          title={schemaTitle(schema)}
        />
      </Form>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(
      <PageComponentBuilder
        hydratedAssets={null}
        hydratedEntries={null}
        schemas={null}
        sdk={sdk}
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
