import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {
  DisplayText,
  Paragraph,
  SectionHeading,
  Form
} from '@contentful/forma-36-react-components';

import * as c from '../../custom_templates/constants';

import TemplateTypePalette from './components/TemplateTypePalette';
import EntryBuilder from './components/EntryBuilder';
import ShortTextField from './components/ShortTextField';
import LongTextField from './components/LongTextField';

import { init, locations } from 'contentful-ui-extensions-sdk';

import { customTemplates, templatePlaceholder } from '../../custom_templates/';
import { linkFromMapping } from './utils';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const type = props.sdk.entry.fields.type ? props.sdk.entry.fields.type.getValue() : null;
    const loadingEntries = this.getLoadingEntries(
      props.sdk.entry.fields.entries.getValue() || [],
      []
    );
    this.state = {
      name: props.sdk.entry.fields.name ? props.sdk.entry.fields.name.getValue() : null,
      type,
      templateConfig:
        props.customTemplates[type && type.toLowerCase()] || props.templatePlaceholder,
      isValid: props.sdk.entry.fields.isValid ? props.sdk.entry.fields.isValid.getValue() : null,
      internalMapping: props.sdk.entry.fields.internalMapping
        ? props.sdk.entry.fields.internalMapping.getValue()
        : null,
      loadingEntries,
      hydratedEntries: []
    };

    this.setInvalid = this.setInvalid.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.getHydratedEntries = this.getHydratedEntries.bind(this);
    this.getLoadingEntries = this.getLoadingEntries.bind(this);
  }

  componentDidMount() {
    this.setState(async prevState => {
      return {
        hydratedEntries: await this.getHydratedEntries(prevState.loadingEntries, [])
      };
    });
  }

  onNameChangeHandler = event => {
    const value = event.target.value;
    this.setState({ name: value });
    this.props.sdk.entry.fields.name.setValue(value);
  };

  onTypeChangeHandler = value => {
    this.setState({ type: value });
    if (value) {
      this.props.sdk.entry.fields.type.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }

    this.updateEntryData(value);
  };

  updateEntryData(type) {
    this.setState({
      templateConfig:
        this.props.customTemplates[type && type.toLowerCase()] || props.templatePlaceholder
    });
  }

  onInternalMappingChangeHandler = event => {
    const value = event.target.value;
    this.setState({ internalMapping: value });
    this.props.sdk.entry.fields.internalMapping.setValue(value);
  };

  onIsValidChangeHandler = event => {
    const isValid = event.target.value === 'yes';
    this.setState({ isValid });
    this.props.sdk.entry.fields.isValid.setValue(isValid);
  };

  setInvalid = isInvalid => {
    this.props.sdk.entry.fields.isValid.setValue(isInvalid ? 'Yes' : 'No');
  };

  updateEntry = async internalMappingJson => {
    // parse JSON
    // get all entry links []
    // get all asset links []
    // get all loadingEntries []
    // get all hydratedEntries []
    const entryEntries = this.props.sdk.entry.fields.entries.getValue() || [];
    const entryAssets = this.props.sdk.entry.fields.assets.getValue() || [];
    let entryLinks = [];
    let assetLinks = [];

    const parsedJSON = JSON.parse(internalMappingJson);
    const fieldRoles = parsedJSON.fieldRoles;

    Object.keys(fieldRoles).forEach(roleKey => {
      const roleMappingObject = fieldRoles[roleKey];
      if (roleMappingObject.type === c.FIELD_TYPE_ENTRY) {
        entryLinks.push(linkFromMapping(roleMappingObject));
      } else if (roleMappingObject.type === c.FIELD_TYPE_ASSET) {
        assetLinks.push(linkFromMapping(roleMappingObject));
      } else if (roleMappingObject.type === c.FIELD_TYPE_MULTI_REFERENCE) {
        roleMappingObject.value.forEach(mapping => {
          if (mapping.type === c.FIELD_TYPE_ENTRY) {
            entryLinks.push(linkFromMapping(mapping));
          } else if (mapping.type === c.FIELD_TYPE_ASSET) {
            assetLinks.push(linkFromMapping(mapping));
          }
        });
      }
    });

    // If new entries or assets need to be added
    if (entryLinks.length !== entryEntries.length || assetLinks.length !== entryAssets.length) {
      const entries = (entryLinks = []) => {
        return { entries: { 'en-US': entryLinks } };
      };

      const assets = (assetLinks = []) => {
        return { assets: { 'en-US': assetLinks } };
      };

      const newEntry = {
        sys: {
          ...this.props.sdk.entry.getSys()
        },
        fields: Object.assign(
          {},
          ...Object.keys(this.props.sdk.entry.fields).map(key => {
            return {
              [key]: { 'en-US': this.props.sdk.entry.fields[key].getValue() },
              ...entries(entryLinks),
              ...assets(assetLinks),
              internalMapping: { 'en-US': internalMappingJson }
              // isValid: {
              //   'en-US': isValid ? 'Yes' : 'No'
              // }
            };
          })
        )
      };

      await this.props.sdk.space.updateEntry(newEntry);

      let loadingEntries = this.getLoadingEntries(
        this.props.sdk.entry.fields.entries.getValue() || [],
        this.state.hydratedEntries || []
      );

      this.setState(
        {
          internalMapping: internalMappingJson,
          loadingEntries
        },
        () => {
          const existingEntries = this.state.hydratedEntries.filter(entry =>
            (this.props.sdk.entry.fields.entries.getValue() || []).some(
              e => e.sys.id === entry.sys.id
            )
          );
          this.getHydratedEntries(this.state.loadingEntries, existingEntries);
        }
      );
    } else {
      // Only update internalJSON otherwise
      this.setState({ internalMapping: internalMappingJson });
      this.props.sdk.entry.fields.internalMapping.setValue(internalMappingJson);
    }
  };

  getHydratedEntries = async (loadingEntries, existingEntries = []) => {
    const hydratedEntries = await this.props.sdk.space.getEntries({
      'sys.id[in]': loadingEntries.join(',')
    });
    this.setState({
      hydratedEntries: [...existingEntries, ...(hydratedEntries.items || [])],
      loadingEntries: []
    });
  };

  getLoadingEntries = (currentEntryLinks = [], entriesToCheck = []) => {
    return currentEntryLinks
      .filter(link => !entriesToCheck.some(e => e.sys.id === link.sys.id))
      .map(link => link.sys.id);
  };

  render() {
    console.log(this.props.setInternalMapping);
    console.log('ENTRIES', this.props.sdk.entry.fields.entries.getValue());
    console.log('ASSETS', this.props.sdk.entry.fields.assets.getValue());
    console.log('IM', this.props.sdk.entry.fields.internalMapping.getValue());
    console.log('LOADING', this.state.loadingEntries);
    console.log('HYDRATED', this.state.hydratedEntries);

    return (
      <Form className="f36-margin--l">
        <DisplayText>Entry extension demo</DisplayText>
        <Paragraph>
          This demo uses a single UI Extension to render the whole editor for an entry.
        </Paragraph>
        <ShortTextField
          heading="Name"
          testId="field-name"
          onChange={this.onNameChangeHandler}
          value={this.state.name}
        />

        {this.state.type !== null && (
          <div>
            <SectionHeading>Type</SectionHeading>
            <TemplateTypePalette
              customTemplates={customTemplates}
              templatePlaceholder={templatePlaceholder}
              sdk={this.props.sdk}
              onChange={this.onTypeChangeHandler}
              value={this.state.type}
            />
          </div>
        )}

        {this.state.internalMapping !== null && this.state.internalMapping !== null && (
          <div>
            <SectionHeading>Type</SectionHeading>
            <EntryBuilder
              customTemplates={customTemplates}
              templatePlaceholder={templatePlaceholder}
              sdk={this.props.sdk}
              onChange={this.onTypeChangeHandler}
              type={this.state.type}
              templateConfig={this.state.templateConfig}
              internalMappingJson={this.state.internalMapping}
              setInvalid={this.setInvalid}
              setInternalMapping={this.updateEntry}
              hydratedEntries={this.state.hydratedEntries}
              loadingEntries={this.state.loadingEntries}
            />
          </div>
        )}

        <LongTextField
          heading="Internal Mapping"
          testId="field-internal-mapping"
          onChange={this.onInternalMappingChangeHandler}
          value={this.state.internalMapping}
        />
        <ShortTextField
          heading="Is Valid?"
          testId="field-internal-mapping"
          onChange={this.onIsValidChangeHandler}
          value={this.state.isValid}
        />
      </Form>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(
      <App sdk={sdk} customTemplates={customTemplates} templatePlaceholder={templatePlaceholder} />,
      document.getElementById('root')
    );
  }
});
