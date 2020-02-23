import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import EntryField from './components/fields/EntryField';
import {
  DisplayText,
  Paragraph,
  SectionHeading,
  TextInput,
  Textarea,
  FieldGroup,
  RadioButtonField,
  Form
} from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import * as c from './constants';

import InternalMapping from './classes/InternalMapping';
import {
  constructLink,
  isEntryLink,
  isAssetLink,
  extractEntries,
  extractAssets
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

    this.state = {
      name: props.sdk.entry.fields.name.getValue(),
      componentId: props.sdk.entry.fields.componentId.getValue(),
      entries: props.sdk.entry.fields.entries.getValue() || [],
      assets: props.sdk.entry.fields.assets.getValue() || [],
      internalMapping: props.sdk.entry.fields.internalMapping.getValue() || JSON.stringify({}),
      isValid: props.sdk.entry.fields.isValid.getValue(),
      hydratedEntries: [],
      hydratedAsets: []
    };

    // this.test();
    // console.log(this.state);
    props.sdk.entry.fields.internalMapping.onValueChanged(this.onInternalMappingChange);
  }

  test = async () => {
    const internalMapping = new InternalMapping(JSON.parse(this.state.internalMapping));
    let entry = await this.props.sdk.dialogs.selectSingleEntry({
      contentTypes: ['viewComponent']
    });

    const link = constructLink(entry);
    internalMapping.addLink('test', link);
    this.updateInternalMapping(internalMapping.asJSON());
  };

  onNameChangeHandler = event => {
    const value = event.target.value;
    this.setState({ name: value });
    this.props.sdk.entry.fields.name.setValue(value);
  };

  onComponentIdChangeHandler = event => {
    const value = event.target.value;
    this.setState({ componentId: value });
    this.props.sdk.entry.fields.componentId.setValue(value);
  };

  addEntry = link => {
    // if (this.state.entries.some(e => e.sys.id === link.sys.id)) {
    //   // Don't add entry if it's already inside
    //   return;
    // }
    const entries = [...this.state.entries, link];
    this.setState({ entries });
    this.props.sdk.entry.fields.entries.setValue(entries);
  };

  addAsset = link => {
    const assets = [...this.state.assets, link];
    this.setState({ assets });
    this.props.sdk.entry.fields.assets.setValue(assets);
  };

  onInternalMappingChange = value => {
    let object;
    try {
      object = JSON.parse(value);
    } catch (err) {
      return console.warn('Invalid JSON: '.value);
    }
    const newEntries = extractEntries(object);
    const newAssets = [];
    console.log(object);

    console.log(newEntries);
  };

  updateInternalMapping = value => {
    this.setState({ internalMapping: value });
    this.props.sdk.entry.fields.internalMapping.setValue(value);
  };

  onIsValidChangeHandler = event => {
    const value = event.target.value;
    this.setState({ isValid: value });
    this.props.sdk.entry.fields.isValid.setValue(value);
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
          testId="field-component-id"
          onChange={this.onComponentIdChangeHandler}
          value={this.state.componentId}
        />
        <SectionHeading>Entries</SectionHeading>
        {this.state.entries.map((entry, index) => {
          <EntryField entry={entry} entryIndex={index} />;
        })}
        <FieldGroup row={false}></FieldGroup>
        <SectionHeading>Assets</SectionHeading>
        <SectionHeading>Internal Mapping</SectionHeading>
        <Textarea
          testId="field-internal-mapping"
          onChange={e => this.updateInternalMapping(e.target.value)}
          value={this.state.internalMapping}
        />
        <TextInput
          testId="field-isValid"
          onChange={this.onIsValidChangeHandler}
          value={this.state.isValid}
        />
        <SectionHeading>Is Valid?</SectionHeading>
        <TextInput
          testId="field-isValid"
          onChange={this.onIsValidChangeHandler}
          value={this.state.isValid}
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
