import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../../constants';

import {
  DisplayText,
  Paragraph,
  HelpText,
  SectionHeading,
  TextInput,
  Textarea,
  Button,
  Modal,
  FieldGroup,
  RadioButtonField,
  Form
} from '@contentful/forma-36-react-components';

import ShortTextField from '../fields/ShortTextField';
import LongTextField from '../fields/LongTextField';

import RadioGroup from '../fields/RadioGroup';
import AssetField from '../fields/AssetField';
import EntryField from '../fields/EntryField';

const ComponentEditor = props => {
  const isShortTextField = property => {
    return (
      property.type === c.TEXT_PROPERTY &&
      property.editor_type === c.SHORT_TEXT_EDITOR &&
      !(property.options && property.options.length)
    );
  };

  const isLongTextField = property => {
    return (
      property.type === c.TEXT_PROPERTY &&
      property.editor_type === c.LONG_TEXT_EDITOR &&
      !(property.options && property.options.length)
    );
  };

  const isMarkdownTextField = property => {
    return (
      property.type === c.TEXT_PROPERTY &&
      property.editor_type === c.MARKDOWN_EDITOR &&
      !(property.options && !!property.options.length)
    );
  };

  const isOptionTextField = property => {
    return (
      property.type === c.TEXT_PROPERTY &&
      property.editor_type === c.SHORT_TEXT_EDITOR &&
      property.options &&
      !!property.options.length
    );
  };

  const isAssetLink = property => {
    return (
      property.type === c.LINK_PROPERTY && property.asset_types && !!property.asset_types.length
    );
  };

  const isEntryLink = property => {
    return (
      property.type === c.LINK_PROPERTY && property.content_types && !!property.content_types.length
    );
  };

  const updatePropertyValue = (propKey, value, timeout = true) => {
    props.internalMappingInstance.updateValue(propKey, value);
    props.updateInternalMapping(props.internalMappingInstance.asJSON(), timeout);
  };

  const fetchHydratedAsset = value => {
    if (!value) return;
    return props.hydratedAssets.find(e => e.sys.id === (value.sys || {}).id);
  };

  const fetchHydratedEntry = value => {
    if (!value) return;
    return props.hydratedEntries.find(e => e.sys.id === (value.sys || {}).id);
  };

  return (
    <div className="component-editor">
      <div className="component-editor__fields">
        {Object.keys(props.schema.properties)
          .filter(propKey => !props.schema.properties[propKey].hidden)
          .map(propKey => {
            const property = props.schema.properties[propKey];
            const value = ((props.internalMappingInstance.properties || {})[propKey] || {}).value;
            return (
              <div
                key={`component-editor-field--${propKey}`}
                data-test-id="editor-field"
                className="component-editor__field f36-margin-bottom--l">
                <div className="component-editor__field-heading f36-margin-bottom--s">
                  <SectionHeading>{propKey}</SectionHeading>
                  <HelpText>{property.description || 'help text'}</HelpText>
                </div>
                {isShortTextField(property) && (
                  <ShortTextField
                    onChange={value => updatePropertyValue(propKey, value, true)}
                    value={value}
                  />
                )}
                {isLongTextField(property) && (
                  <LongTextField
                    onChange={value => updatePropertyValue(propKey, value, true)}
                    value={value}
                  />
                )}
                {isMarkdownTextField(property) && (
                  <ShortTextField
                    onChange={value => updatePropertyValue(propKey, value, true)}
                    value={value}
                  />
                )}
                {isOptionTextField(property) && (
                  <RadioGroup
                    propKey={propKey}
                    options={property.options}
                    onChange={value => updatePropertyValue(propKey, value, true)}
                    value={value}
                  />
                )}
                {isAssetLink(property) && (
                  <AssetField
                    sdk={props.sdk}
                    asset={fetchHydratedAsset(value)}
                    onChange={value => updatePropertyValue(propKey, value, false)}
                    replaceHydratedAsset={props.replaceHydratedAsset}
                  />
                )}
                {isEntryLink(property) && (
                  <EntryField
                    sdk={props.sdk}
                    contentTypes={property.content_types}
                    entry={fetchHydratedEntry(value)}
                    onChange={value => updatePropertyValue(propKey, value, false)}
                    replaceHydratedEntry={props.replaceHydratedEntry}
                    isLoading={!!value && !fetchHydratedEntry(value)}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

ComponentEditor.propTypes = {
  sdk: PropTypes.object,
  hydratedAssets: PropTypes.array,
  hydratedEntries: PropTypes.array,
  internalMappingInstance: PropTypes.object,
  updateInternalMapping: PropTypes.func,
  replaceHydratedEntry: PropTypes.func,
  schema: PropTypes.object
};
ComponentEditor.defaultProps = {
  hydratedAssets: [],
  hydratedEntries: [],
  internalMappingInstance: {},
  schema: {
    properties: {},
    meta: {}
  }
};

export default ComponentEditor;
