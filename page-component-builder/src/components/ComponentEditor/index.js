import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../../constants';

import { HelpText, TextLink, Subheading, FormLabel } from '@contentful/forma-36-react-components';

import ShortTextField from '../fields/ShortTextField';
import LongTextField from '../fields/LongTextField';
import MarkdownField from '../fields/MarkdownField';

import RadioGroup from '../fields/RadioGroup';
import DropdownField from '../fields/DropdownField';
import AssetField from '../fields/AssetField';
import EntryField from '../fields/EntryField';
import MultiLinkField from '../fields/MultiLinkField';

import ComponentField from '../fields/ComponentField';
import MultiComponentField from '../fields/MultiComponentField';

import { isComponentPropertySingleton } from '../../utilities/index';
import { parse_underscore } from '../../utilities/copyUtils';

import InternalMapping from '../../classes/InternalMapping';

import './style.scss';

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

  const isRadioTextField = property => {
    return (
      property.type === c.TEXT_PROPERTY &&
      property.editor_type === c.SHORT_TEXT_EDITOR &&
      property.options &&
      !!property.options.length
    );
  };

  const isDropdownTextField = property => {
    return (
      property.type === c.TEXT_PROPERTY &&
      property.editor_type === c.DROPDOWN_EDITOR &&
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

  const isMultiLinkProperty = property => {
    return (
      property.type === c.MULTI_LINK_PROPERTY &&
      ((property.content_types && !!property.content_types.length) ||
        (property.asset_types && !!property.asset_types.length))
    );
  };

  const isComponentProperty = property => {
    return property.type === c.COMPONENT_PROPERTY && property.options && !!property.options.length;
  };

  const isMultiComponentProperty = property => {
    return (
      property.type === c.MULTI_COMPONENT_PROPERTY && property.options && !!property.options.length
    );
  };

  const isConfigProperty = property => {
    return property.type === c.CONFIG_PROPERTY && !!property.related_to;
  };

  const isMultiConfigProperty = property => {
    return property.type === c.MULTI_CONFIG_PROPERTY && !!property.related_to;
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

  const renderLinkableField = (propKey, property, value) => {
    if (!value && isAssetLink(property) && isEntryLink(property)) {
      return (
        <div>
          <AssetField
            sdk={props.sdk}
            asset={fetchHydratedAsset(value)}
            onChange={value => updatePropertyValue(propKey, value, false)}
            replaceHydratedAsset={props.replaceHydratedAsset}
          />
          <EntryField
            sdk={props.sdk}
            contentTypes={property.content_types}
            entry={fetchHydratedEntry(value)}
            onChange={value => updatePropertyValue(propKey, value, false)}
            replaceHydratedEntry={props.replaceHydratedEntry}
            isLoading={!!value && !fetchHydratedEntry(value)}
          />
        </div>
      );
    } else if (!value && isAssetLink(property)) {
      return (
        <AssetField
          sdk={props.sdk}
          asset={fetchHydratedAsset(value)}
          onChange={value => updatePropertyValue(propKey, value, false)}
          replaceHydratedAsset={props.replaceHydratedAsset}
        />
      );
    } else if (!value && isEntryLink(property)) {
      return (
        <EntryField
          sdk={props.sdk}
          contentTypes={property.content_types}
          entry={fetchHydratedEntry(value)}
          onChange={value => updatePropertyValue(propKey, value, false)}
          replaceHydratedEntry={props.replaceHydratedEntry}
          isLoading={!!value && !fetchHydratedEntry(value)}
        />
      );
    } else if (value && value.sys && value.sys.linkType === c.ENTRY_LINK_TYPE) {
      return (
        <EntryField
          sdk={props.sdk}
          contentTypes={property.content_types}
          entry={fetchHydratedEntry(value)}
          onChange={value => updatePropertyValue(propKey, value, false)}
          replaceHydratedEntry={props.replaceHydratedEntry}
          isLoading={!!value && !fetchHydratedEntry(value)}
        />
      );
    } else if (value && value.sys && value.sys.linkType === c.ASSET_LINK_TYPE) {
      return (
        <AssetField
          sdk={props.sdk}
          asset={fetchHydratedAsset(value)}
          onChange={value => updatePropertyValue(propKey, value, false)}
          replaceHydratedAsset={props.replaceHydratedAsset}
        />
      );
    }
  };

  return (
    <div className="component-editor">
      <div className="f36-margin-bottom--l">
        <Subheading>{props.title}</Subheading>
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
                <div className="component-editor__field-heading">
                  <FormLabel className="component-editor__field-label" required={property.required}>
                    {parse_underscore(propKey) || '<label missing>'}
                  </FormLabel>
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
                {isRadioTextField(property) && (
                  <RadioGroup
                    propKey={propKey}
                    options={property.options}
                    onChange={value => updatePropertyValue(propKey, value, true)}
                    value={value}
                  />
                )}
                {isDropdownTextField(property) && (
                  <DropdownField
                    propKey={propKey}
                    options={property.options}
                    onChange={value => updatePropertyValue(propKey, value, true)}
                    value={value}
                  />
                )}
                {/* in some cases, a field can link assets OR entries */}
                {(isEntryLink(property) || isAssetLink(property)) &&
                  renderLinkableField(propKey, property, value)}
                {isMultiLinkProperty(property) && (
                  <MultiLinkField
                    sdk={props.sdk}
                    propKey={propKey}
                    contentTypes={property.content_types}
                    entries={(value || []).map(entry => {
                      return fetchHydratedEntry(entry);
                    })}
                    onChange={value => updatePropertyValue(propKey, value, false)}
                    replaceHydratedEntry={props.replaceHydratedEntry}
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
                    property={property}
                    entry={fetchHydratedEntry(value)}
                    internalMappingInstance={
                      isComponentPropertySingleton(value)
                        ? new InternalMapping(value.componentId, value.properties)
                        : null
                    }
                    onChange={(value, timeout = false) =>
                      updatePropertyValue(propKey, value, timeout)
                    }
                    isLoading={!!value && !fetchHydratedEntry(value)}
                  />
                )}
                {isMultiComponentProperty(property) && (
                  <MultiComponentField
                    sdk={props.sdk}
                    propKey={propKey}
                    options={property.options}
                    entries={(value || []).map(entry => {
                      return fetchHydratedEntry(entry);
                    })}
                    onChange={value => updatePropertyValue(propKey, value, false)}
                    replaceHydratedEntry={props.replaceHydratedEntry}
                    useConfigObjects={false}
                  />
                )}
                {isConfigProperty(property) && (
                  <ComponentField
                    sdk={props.sdk}
                    schemas={props.schemas}
                    hydratedAssets={props.hydratedAssets}
                    hydratedEntries={props.hydratedEntries}
                    replaceHydratedEntry={props.replaceHydratedEntry}
                    replaceHydratedAsset={props.replaceHydratedAsset}
                    property={property}
                    entry={fetchHydratedEntry(value)}
                    internalMappingInstance={
                      isComponentPropertySingleton(value)
                        ? new InternalMapping(value.componentId, value.properties)
                        : null
                    }
                    onChange={(value, timeout = false) =>
                      updatePropertyValue(propKey, value, timeout)
                    }
                    isLoading={!!value && !fetchHydratedEntry(value)}
                    useConfigObjects={true}
                  />
                )}
                {isMultiConfigProperty(property) && (
                  <MultiComponentField
                    sdk={props.sdk}
                    propKey={propKey}
                    options={[property.related_to]}
                    entries={(value || []).map(entry => {
                      return fetchHydratedEntry(entry);
                    })}
                    onChange={value => updatePropertyValue(propKey, value, false)}
                    replaceHydratedEntry={props.replaceHydratedEntry}
                    useConfigObjects={true}
                  />
                )}
                <HelpText className="component-editor__hint f36-margin-top--xs">
                  {property.description || 'help text'}
                </HelpText>
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
  replaceHydratedAsset: PropTypes.func,
  schema: PropTypes.object,
  title: PropTypes.string
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
