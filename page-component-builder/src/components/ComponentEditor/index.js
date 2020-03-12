import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../../constants';

import {
  DisplayText,
  Paragraph,
  HelpText,
  TextLink,
  SectionHeading,
  Subheading,
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
import MarkdownField from '../fields/MarkdownField';

import RadioGroup from '../fields/RadioGroup';
import AssetField from '../fields/AssetField';
import EntryField from '../fields/EntryField';
import ComponentField from '../fields/ComponentField';

import { isComponentPropertySingleton } from '../../utilities/index';
import InternalMapping from '../../classes/InternalMapping';

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

  const isBoolProperty = property => {
    return property.type === c.BOOL_PROPERTY;
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

  const isComponentProperty = property => {
    return property.type === c.COMPONENT_PROPERTY && property.options && !!property.options.length;
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
      <div className="f36-margin-bottom--l">
        <Subheading>{(props.internalMappingInstance || {}).componentId}</Subheading>
        {props.schema.meta && (
          <HelpText>
            <TextLink
              target="_blank"
              href={`https://justworks-staging-v2.herokuapp.com${props.schema.meta.styleguide_path}`}>
              Styleguide link
            </TextLink>
          </HelpText>
        )}
      </div>

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
                  <MarkdownField
                    propKey={propKey}
                    onChange={value => updatePropertyValue(propKey, value, true)}
                    value={value}
                  />
                )}
                {isBoolProperty(property) && (
                  <RadioGroup
                    propKey={propKey}
                    options={[true, false]}
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
                {isComponentProperty(property) && (
                  <ComponentField
                    sdk={props.sdk}
                    schemas={props.schemas}
                    hydratedAssets={props.hydratedAssets}
                    hydratedEntries={props.hydratedEntries}
                    replaceHydratedEntry={props.replaceHydratedEntry}
                    replaceHydratedAsset={props.replaceHydratedAsset}
                    options={property.options}
                    entry={fetchHydratedEntry(value)}
                    internalMappingInstance={
                      isComponentPropertySingleton(value)
                        ? new InternalMapping(value.componentId, value.properties)
                        : null
                    }
                    onChange={(value, timeout = false) =>
                      updatePropertyValue(propKey, value, timeout)
                    }
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
  schemas: PropTypes.array,
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
  schemas: [],
  schema: {
    properties: {},
    meta: {}
  }
};

export default ComponentEditor;
