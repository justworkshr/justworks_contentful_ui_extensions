import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {
  DisplayText,
  Paragraph,
  SectionHeading,
  Form
} from '@contentful/forma-36-react-components';
import InternalMapping from './utils/InternalMapping';

import * as c from '../../customModules/constants';

import TemplateTypePalette from './components/TemplateTypePalette';
import EntryBuilder from './components/EntryBuilder';
import ShortTextField from './components/ShortTextField';
import LongTextField from './components/LongTextField';
import SingleReferenceField from './components/SingleReferenceField';
import { init, locations } from 'contentful-ui-extensions-sdk';

import { templateIsValid, getTemplateErrors } from './components/EntryBuilder/utils/validations';

import * as cm from '../../customModules';
import { linkFromMapping } from './utils';
import { constructLink } from '../../shared/utilities/apiUtils';

import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';
import '../../shared/style.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
    customTemplates: PropTypes.object,
    templatePlaceholder: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.updateTimeout = undefined;
    const internalMappingJson = props.sdk.entry.fields.internalMapping
      ? props.sdk.entry.fields.internalMapping.getValue()
      : null;

    const type = props.sdk.entry.fields.type ? props.sdk.entry.fields.type.getValue() : null;
    const templateConfig =
      props.customTemplates[type && type.toLowerCase()] || props.templatePlaceholder;
    const loadingEntries = this.getLoadingEntries(
      props.sdk.entry.fields.entries.getValue() || [],
      []
    );

    const style = props.sdk.entry.fields.style ? props.sdk.entry.fields.style.getValue() : null;

    this.state = {
      name: props.sdk.entry.fields.name ? props.sdk.entry.fields.name.getValue() : null,
      type,
      templateConfig,
      isValid: props.sdk.entry.fields.isValid ? props.sdk.entry.fields.isValid.getValue() : null,
      internalMapping: internalMappingJson,
      style,
      entryInternalMapping: type ? new InternalMapping(internalMappingJson, templateConfig) : {},
      loadingEntries,
      hydratedEntries: []
    };

    this.setInvalid = this.setInvalid.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.setInternalMappingValue = this.setInternalMappingValue.bind(this);
    this.validateEntry = this.validateEntry.bind(this);
    this.setStateFromJson = this.setStateFromJson.bind(this);
    this.getHydratedEntries = this.getHydratedEntries.bind(this);
    this.getLoadingEntries = this.getLoadingEntries.bind(this);
  }

  componentDidMount() {
    this.setState(async prevState => {
      const hydratedEntries = await this.getHydratedEntries(prevState.loadingEntries, []);
      return {
        hydratedEntries
      };
    });

    if (!this.state.internalMapping) {
      this.setInternalMappingValue(JSON.stringify(InternalMapping.blankMapping));
    }
  }

  onNameChangeHandler = event => {
    const value = event.target.value;
    this.setState({ name: value });
    this.props.sdk.entry.fields.name.setValue(value);
  };

  onTypeChangeHandler = type => {
    this.setState({ type });
    if (type) {
      this.props.sdk.entry.fields.type.setValue(type);
    } else {
      this.props.sdk.field.removeValue();
    }

    // clear internalMapping
    const internalMappingJson = '';
    // clear entries
    this.props.sdk.entry.fields.entries.removeValue();
    // clear assets
    this.props.sdk.entry.fields.assets.removeValue();

    const templateConfig =
      this.props.customTemplates[type && type.toLowerCase()] || this.props.templatePlaceholder;

    this.setState({
      internalMapping: internalMappingJson,
      templateConfig,
      entryInternalMapping: new InternalMapping(internalMappingJson, templateConfig) || {}
    });
  };

  onInternalMappingChangeHandler = event => {
    const value = event.target.value;
    this.setInternalMappingValue(value);
  };

  setInternalMappingValue = internalMappingJson => {
    this.setStateFromJson(internalMappingJson, [], this.validateEntry);
    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(
      () => this.props.sdk.entry.fields.internalMapping.setValue(internalMappingJson),
      500
    );
  };

  onIsValidChangeHandler = event => {
    const isValid = event.target.value === 'yes';
    this.setState({ isValid });
    this.props.sdk.entry.fields.isValid.setValue(isValid);
  };

  setInvalid = isValid => {
    const value = isValid ? 'Yes' : 'No';
    this.setState({ isValid: value });
    this.props.sdk.entry.fields.isValid.setValue(value);
  };

  onSingleReferenceLinkClick = async event => {
    let contentTypes = [];
    if (
      (this.props.sdk.entry.fields.style || {}).validations &&
      this.props.sdk.entry.fields.style.validations.length
    ) {
      const contentTypeValidation = this.props.sdk.entry.fields.style.validations.find(
        v => v.linkContentType
      );
      if (contentTypeValidation) {
        contentTypeValidation.linkContentType.forEach(id => contentTypes.push(id));
      }
    }

    const entry = await this.props.sdk.dialogs.selectSingleEntry({
      contentTypes
    });

    if (entry) {
      this.onStyleChangeHandler(entry);
    }
  };

  onStyleChangeHandler = value => {
    this.setState({ style: value });
    this.props.sdk.entry.fields.style.setValue(constructLink(value));
  };

  updateEntry = async internalMappingJson => {
    // parse JSON
    // get all entry links []
    // get all asset links []
    // get all loadingEntries []
    // get all hydratedEntries []
    // get all hydratedAssets []

    const entryEntries = this.props.sdk.entry.fields.entries.getValue() || [];
    const entryAssets = this.props.sdk.entry.fields.assets.getValue() || [];
    let entryLinks = [];
    let assetLinks = [];

    const parsedJSON = JSON.parse(internalMappingJson);
    const fieldRoles = parsedJSON.fieldRoles;
    Object.keys(fieldRoles).forEach(roleKey => {
      const roleMappingObject = fieldRoles[roleKey];
      /*
        Add all entries and assets which exist as references 
        inside the internal mapping
      */
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

      // link role style entry
      if (roleMappingObject.style && roleMappingObject.style.type === c.STYLE_TYPE_ENTRY) {
        entryLinks.push(linkFromMapping(roleMappingObject.style));
      }

      // link role assets style entry
      if (
        roleMappingObject.type === c.FIELD_TYPE_MULTI_REFERENCE &&
        !!roleMappingObject.value.length
      ) {
        let nonDuplicateEntry;
        roleMappingObject.value.forEach(entry => {
          if (entry.type === c.FIELD_TYPE_ASSET) {
            if (entry.style && entry.style.type === c.FIELD_TYPE_ENTRY) {
              nonDuplicateEntry = linkFromMapping(entry.style);
            }
          }
        });

        entryLinks.push(nonDuplicateEntry);
      }

      entryLinks = entryLinks.filter(e => e);
      assetLinks = assetLinks.filter(e => e);
    });
    // If new entries or assets need to be added
    if (entryLinks.length !== entryEntries.length || assetLinks.length !== entryAssets.length) {
      const entries = (entryLinks = []) => {
        if (!entryLinks.length) {
          entryLinks = undefined;
        }
        return { entries: { 'en-US': entryLinks } };
      };

      const assets = (assetLinks = []) => {
        if (!assetLinks.length) {
          assetLinks = undefined;
        }
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
              internalMapping: { 'en-US': internalMappingJson },
              isValid: {
                'en-US': 'No' // Invalidate so it can be validated later
              }
            };
          })
        )
      };

      try {
        await this.props.sdk.space.updateEntry(newEntry);
      } catch (e) {
        const message = (e || {}).message || e;
        throw new Error(message);
      }

      let loadingEntries = this.getLoadingEntries(
        this.props.sdk.entry.fields.entries.getValue() || [],
        this.state.hydratedEntries || []
      );

      this.setStateFromJson(internalMappingJson, loadingEntries, () => {
        const existingEntries = this.state.hydratedEntries.filter(entry =>
          (this.props.sdk.entry.fields.entries.getValue() || []).some(
            e => e.sys.id === entry.sys.id
          )
        );
        this.getHydratedEntries(this.state.loadingEntries, existingEntries);
        this.validateEntry();
      });
    } else {
      this.props.sdk.entry.fields.internalMapping.setValue(internalMappingJson);
      this.setStateFromJson(internalMappingJson, [], () => {
        this.validateEntry();
      });
    }
  };

  validateEntry() {
    const errors = getTemplateErrors(
      this.state.templateConfig.fieldRoles,
      JSON.parse(this.state.internalMapping),
      this.state.hydratedEntries
    );
    const isValid = templateIsValid(errors);
    this.setInvalid(isValid);
  }

  setStateFromJson = (internalMappingJson, loadingEntries = [], callback = null) => {
    const type = this.state.type;
    const templateConfig =
      this.props.customTemplates[type && type.toLowerCase()] || this.props.templatePlaceholder;

    this.setState(
      {
        loadingEntries,
        internalMapping: internalMappingJson,
        templateConfig,
        entryInternalMapping: new InternalMapping(internalMappingJson, templateConfig) || {}
      },
      () => {
        if (callback) {
          callback();
        }
      }
    );
  };

  getHydratedEntries = async (loadingEntries, existingEntries = []) => {
    // Ensure uniqueness in queries
    try {
      const hydratedEntries = await this.props.sdk.space.getEntries({
        'sys.id[in]': loadingEntries.join(',')
      });

      const assetsValue = this.props.sdk.entry.fields.assets.getValue();
      const assetIds = assetsValue ? assetsValue.map(a => a.sys.id) : [];

      const hydratedAssets = await this.props.sdk.space.getAssets({
        'sys.id[in]': assetIds.join(',')
      });

      this.setState({
        hydratedAssets: hydratedAssets.items,
        hydratedEntries: [...existingEntries, ...(hydratedEntries.items || [])],
        loadingEntries: []
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  getLoadingEntries = (currentEntryLinks = [], entriesToCheck = []) => {
    return currentEntryLinks
      .filter(link => !entriesToCheck.some(e => e.sys.id === link.sys.id))
      .map(link => link.sys.id);
  };

  render() {
    return (
      <Form className="dynamic-module-editor f36-margin--l">
        <DisplayText>{this.props.title}</DisplayText>
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
              customTemplates={this.props.customTemplates}
              templatePlaceholder={this.props.templatePlaceholder}
              sdk={this.props.sdk}
              onChange={this.onTypeChangeHandler}
              value={this.state.type}
            />
          </div>
        )}

        {this.props.sdk.entry.fields.style && (
          <SingleReferenceField
            heading="Section Style"
            value={this.state.style}
            onLinkClick={this.onSingleReferenceLinkClick}
            onRemoveClick={this.onStyleChangeHandler}
            sdk={this.props.sdk}
          />
        )}

        {this.state.internalMapping !== null && this.state.templateConfig !== null && (
          <div>
            <SectionHeading>Type</SectionHeading>
            <EntryBuilder
              sdk={this.props.sdk}
              customTemplates={this.props.customTemplates}
              templatePlaceholder={this.props.templatePlaceholder}
              type={this.state.type}
              templateConfig={this.state.templateConfig}
              entryInternalMapping={this.state.entryInternalMapping}
              internalMappingJson={this.state.internalMapping}
              setInvalid={this.setInvalid}
              updateEntry={this.updateEntry}
              setInternalMappingValue={this.setInternalMappingValue}
              hydratedAssets={this.state.hydratedAssets}
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
  const contentType = sdk.entry.getSys().contentType.sys.id;
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(
      <App
        title={'Module Editor'}
        sdk={sdk}
        customTemplates={cm[contentType]}
        templatePlaceholder={cm.templatePlaceholder}
      />,
      document.getElementById('root')
    );
  }
});
