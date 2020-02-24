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
  SectionHeading,
  TextInput,
  Textarea,
  Button,
  Modal,
  FieldGroup,
  RadioButtonField,
  Form
} from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import * as c from './constants';

import InternalMapping from './classes/InternalMapping';
import {
  constructLink,
  extractEntries,
  linksToFetch,
  newInternalMappingFromSchema
} from './utilities';

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

    this.state = {
      schemaData: {
        components: [],
        tags: {}
      },
      name: props.sdk.entry.fields.name.getValue(),
      componentId: props.sdk.entry.fields.componentId.getValue(),
      entries: props.sdk.entry.fields.entries.getValue() || [],
      assets: props.sdk.entry.fields.assets.getValue() || [],
      internalMapping: props.sdk.entry.fields.internalMapping.getValue() || JSON.stringify({}),
      isValid: props.sdk.entry.fields.isValid.getValue(),
      hydratedEntries: [],
      hydratedAssets: []
    };

    props.sdk.entry.fields.internalMapping.onValueChanged(this.onInternalMappingChange);
  }

  componentDidMount() {
    this.fetchSchemas();
    this.onInternalMappingChange(this.state.internalMapping);
  }

  fetchSchemas = async () => {
    // const response = await Axios.get('https://justworks.com/components.json');

    this.setState({
      schemaData: mockSchemas.data
    });
  };

  onNameChangeHandler = event => {
    const value = event.target.value;
    this.setState({ name: value });
    this.props.sdk.entry.fields.name.setValue(value);
  };

  onComponentIdChangeHandler = value => {
    this.setState({ componentId: value });
    this.props.sdk.entry.fields.componentId.setValue(value);
    const schema = this.state.schemaData.components.find(s => s.meta.id === value);
    const internalMapping = newInternalMappingFromSchema(schema).asJSON();
    this.onInternalMappingChange(internalMapping);
  };

  onEntriesChangeHandler = value => {
    if (Array.isArray(value)) {
      this.setState({ entries: value });
      this.props.sdk.entry.fields.entries.setValue(value);
    } else {
      console.warn('onEntriesChangeHandler called with non-array value');
    }
  };

  onAssetsChangeHandler = value => {
    if (Array.isArray(value)) {
      this.setState({ assets: value });
      this.props.sdk.entry.fields.assets.setValue(value);
    } else {
      console.warn('onAssetsChangeHandler called with non-array value');
    }
  };

  onInternalMappingChange = async value => {
    let internalMappingObject = this.parseInternalMapping(value);
    const newEntries = extractEntries(internalMappingObject.properties, c.ENTRY_LINK_TYPE) || [];
    const newAssets = extractEntries(internalMappingObject.properties, c.ASSET_LINK_TYPE) || [];

    this.onEntriesChangeHandler(newEntries);
    this.onAssetsChangeHandler(newAssets);

    const entriesToFetch = linksToFetch(this.state.hydratedEntries, newEntries);
    const assetsToFetch = linksToFetch(this.state.hydratedAssets, newAssets);

    const fetchedEntries = !!entriesToFetch.length
      ? await this.props.sdk.space.getEntries({
          'sys.id[in]': entriesToFetch.map(l => l.sys.id).join(',')
        })
      : { items: [] };

    const fetchedAssets = !!assetsToFetch.length
      ? await this.props.sdk.space.getAssets({
          'sys.id[in]': assetsToFetch.map(l => l.sys.id).join(',')
        })
      : { items: [] };

    this.setState(oldState => {
      return {
        ...oldState,
        internalMapping: value,
        hydratedEntries: [...oldState.hydratedEntries, ...fetchedEntries.items],
        hydratedAssets: [...oldState.hydratedAssets, ...fetchedAssets.items]
      };
    });
  };

  updateInternalMapping = value => {
    this.setState({ internalMapping: value });

    clearTimeout(this.updateTimeout);

    this.updateTimeout = setTimeout(
      () => this.props.sdk.entry.fields.internalMapping.setValue(value),
      500
    );
  };

  onIsValidChangeHandler = event => {
    const value = event.target.value;
    this.setState({ isValid: value });

    this.props.sdk.entry.fields.isValid.setValue(value);
  };

  parseInternalMapping = json => {
    let internalMappingObject = {};
    try {
      internalMappingObject = JSON.parse(this.state.internalMapping);
    } catch {
      console.warn('Invalid JSON: ', this.state.internalMapping);
    }

    return internalMappingObject;
  };

  render() {
    return (
      <Form className="f36-margin--l">
        <DisplayText>Entry extension demo</DisplayText>
        <Paragraph>
          This demo uses a single UI Extension to render the whole editor for an entry.
        </Paragraph>
        <SectionHeading>Name</SectionHeading>
        <TextInput
          testId="field-name"
          onChange={this.onNameChangeHandler}
          value={this.state.name}
        />
        <SectionHeading>Component ID</SectionHeading>
        <TextInput
          testId="field-componentId"
          onChange={e => this.onComponentIdChangeHandler(e.target.value)}
          value={this.state.componentId}
        />
        <ComponentPalette
          componentId={this.state.componentId}
          onChange={this.onComponentIdChangeHandler}
          schemas={this.state.schemaData.components}
          tags={this.state.schemaData.tags}
        />
        <SectionHeading>Entries</SectionHeading>
        <Textarea testId="field-entries" value={this.state.entries.map(e => e.sys.id).join(', ')} />

        <SectionHeading>Assets</SectionHeading>
        <Textarea testId="field-assets" value={this.state.assets.map(a => a.sys.id).join(', ')} />
        <SectionHeading>Internal Mapping</SectionHeading>
        <Textarea
          testId="field-internalMapping"
          onChange={e => this.updateInternalMapping(e.target.value)}
          value={this.state.internalMapping}
        />

        <SectionHeading>Is Valid?</SectionHeading>
        <TextInput
          testId="field-isValid"
          onChange={this.onIsValidChangeHandler}
          value={this.state.isValid}
        />
        <ComponentEditor
          updateInternalMapping={this.updateInternalMapping}
          hydratedAssets={this.state.hydratedAssets}
          hydratedEntries={this.state.hydratedEntries}
          internalMappingInstance={
            new InternalMapping(
              this.state.componentId,
              this.parseInternalMapping(this.state.internalMapping).properties
            )
          }
          schema={this.state.schemaData.components.find(
            schema => schema.meta.id === this.state.componentId
          )}
        />
      </Form>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(<PageComponentBuilder sdk={sdk} />, document.getElementById('root'));
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
if (module.hot) {
  module.hot.accept();
}
