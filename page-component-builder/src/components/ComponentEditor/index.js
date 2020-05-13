import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../constants';

import {
  HelpText,
  TextLink,
  Paragraph,
  Subheading,
  FormLabel
} from '@contentful/forma-36-react-components';

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
import EditorSections from '../EditorSections';

const ComponentEditor = props => {
  const [errors, setErrors] = useState({});
  const [openFields, setOpenFields] = useState([]);

  const isShortTextField = property => {
    return (
      property.type === c.TEXT_PROPERTY &&
      property.editor_type === c.SHORT_TEXT_EDITOR &&
      !(property.options && property.options.length)
    );
  };

  const isNumberField = property => {
    return property.type === c.NUMBER_PROPERTY && !property.options;
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
      property.editor_type === c.RADIO_EDITOR &&
      property.options &&
      !!property.options.length
    );
  };

  const isDropdownTextField = property => {
    return (
      ((property.type === c.TEXT_PROPERTY && property.editor_type === c.SHORT_TEXT_EDITOR) ||
        property.type === c.NUMBER_PROPERTY) &&
      property.options &&
      !!property.options.length
    );
  };

  const isDropdownWithCustomField = property => {
    return (
      property.type === c.TEXT_PROPERTY &&
      property.editor_type === c.DROPDOWN_WITH_CUSTOM_EDITOR &&
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

  const updatePropertyValue = (propKey, value, timeout = true, singletonErrors = {}) => {
    props.internalMappingInstance.updateValue(propKey, value);
    const newErrors = props.internalMappingInstance.errors;
    const allErrors = { ...newErrors, ...singletonErrors };

    setErrors(allErrors);
    props.updateInternalMapping(props.internalMappingInstance.asJSON(), timeout, allErrors);
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
            errors={errors[propKey]}
          />
          <EntryField
            sdk={props.sdk}
            contentTypes={property.content_types}
            entry={fetchHydratedEntry(value)}
            onChange={value => updatePropertyValue(propKey, value, false)}
            replaceHydratedEntry={props.replaceHydratedEntry}
            isLoading={!!value && !fetchHydratedEntry(value)}
            errors={errors[propKey]}
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
          errors={errors[propKey]}
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
          errors={errors[propKey]}
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
          errors={errors[propKey]}
        />
      );
    } else if (value && value.sys && value.sys.linkType === c.ASSET_LINK_TYPE) {
      return (
        <AssetField
          sdk={props.sdk}
          asset={fetchHydratedAsset(value)}
          onChange={value => updatePropertyValue(propKey, value, false)}
          replaceHydratedAsset={props.replaceHydratedAsset}
          errors={errors[propKey]}
        />
      );
    }
  };

  const onOpen = propKey => {
    console.log(propKey);
    const arr = [...openFields];
    arr.push(propKey);
    setOpenFields(arr);
  };

  const onClose = propKey => {
    const index = openFields.indexOf(propKey);
    const arr = [...openFields];
    setOpenFields([...arr.slice(0, index), ...arr.slice(index + 1)]);
  };

  const renderPropertyField = propKey => {
    const property = props.schema.properties[propKey];
    const value = ((props.internalMappingInstance.properties || {})[propKey] || {}).value;
    const id = `editor-field--${propKey}`;

    return (
      <div
        id={id}
        key={`component-editor-field--${propKey}`}
        data-test-id={id}
        className={`component-editor__field f36-margin-bottom--l ${
          openFields.includes(propKey) ? 'field-open' : ''
        } ${errors[propKey] && errors[propKey].length ? 'with-error' : ''}`}>
        <div className="component-editor__field-heading">
          <FormLabel
            className="component-editor__field-label"
            required={property.required}
            htmlFor={id}>
            {parse_underscore(propKey) || '<label missing>'}
          </FormLabel>
          {!property.required && property.type === c.TEXT_PROPERTY && (
            <TextLink
              className="f36-margin-left--xs"
              onClick={() => updatePropertyValue(propKey, null, false)}>
              Clear
            </TextLink>
          )}
        </div>
        {isShortTextField(property) && (
          <ShortTextField
            onChange={value => updatePropertyValue(propKey, value, true)}
            errors={errors[propKey]}
            type="text"
            value={value}
          />
        )}
        {isNumberField(property) && (
          <ShortTextField
            onChange={value => updatePropertyValue(propKey, value, true)}
            errors={errors[propKey]}
            type="number"
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
            errors={errors[propKey]}
          />
        )}
        {isBoolProperty(property) && (
          <DropdownField
            propKey={propKey}
            required={property.required}
            options={property.options}
            onChange={value => updatePropertyValue(propKey, value, true)}
            value={value}
            withCustomText={false}
            errors={errors[propKey]}
          />
        )}
        {isDropdownTextField(property) && (
          <DropdownField
            propKey={propKey}
            required={property.required}
            options={property.options}
            onChange={value => updatePropertyValue(propKey, value, true)}
            value={value}
            withCustomText={false}
            errors={errors[propKey]}
          />
        )}
        {isDropdownWithCustomField(property) && (
          <DropdownField
            propKey={propKey}
            required={property.required}
            options={property.options}
            onChange={value => updatePropertyValue(propKey, value, true)}
            value={value}
            withCustomText={true}
            errors={errors[propKey]}
          />
        )}
        {isRadioTextField(property) && (
          <RadioGroup
            propKey={propKey}
            options={property.options}
            onChange={value => updatePropertyValue(propKey, value, true)}
            value={value}
            errors={errors[propKey]}
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
            errors={errors[propKey]}
          />
        )}
        {isComponentProperty(property) && (
          <ComponentField
            sdk={props.sdk}
            schemas={props.schemas}
            propKey={propKey}
            hydratedAssets={props.hydratedAssets}
            hydratedEntries={props.hydratedEntries}
            replaceHydratedEntry={props.replaceHydratedEntry}
            replaceHydratedAsset={props.replaceHydratedAsset}
            property={property}
            entry={fetchHydratedEntry(value)}
            internalMappingInstance={
              isComponentPropertySingleton(value)
                ? new InternalMapping(value.componentId, value.properties, props.schema, false)
                : null
            }
            onChange={(value, timeout = false, singletonErrors) =>
              updatePropertyValue(propKey, value, timeout, singletonErrors)
            }
            isLoading={!!value && !fetchHydratedEntry(value)}
            useConfigObjects={property.type === c.CONFIG_PROPERTY}
            errors={errors[propKey]}
            onOpen={() => onOpen(propKey)}
            onClose={() => onClose(propKey)}
          />
        )}
        {isMultiComponentProperty(property) && (
          <MultiComponentField
            sdk={props.sdk}
            propKey={propKey}
            options={property.options}
            presets={property.presets}
            hydratedEntries={props.hydratedEntries}
            schemas={props.schemas}
            loadingEntries={props.loadingEntries}
            onChange={(value, timeout, singletonErrors) =>
              updatePropertyValue(propKey, value, timeout, singletonErrors)
            }
            replaceHydratedEntry={props.replaceHydratedEntry}
            replaceHydratedAsset={props.replaceHydratedAsset}
            useConfigObjects={property.type === c.MULTI_CONFIG_PROPERTY}
            value={value}
            errors={errors[propKey]}
            onOpen={() => onOpen(propKey)}
            onClose={() => onClose(propKey)}
          />
        )}
        {isConfigProperty(property) && (
          <ComponentField
            sdk={props.sdk}
            schemas={props.schemas}
            propKey={propKey}
            hydratedAssets={props.hydratedAssets}
            hydratedEntries={props.hydratedEntries}
            replaceHydratedEntry={props.replaceHydratedEntry}
            replaceHydratedAsset={props.replaceHydratedAsset}
            property={property}
            entry={fetchHydratedEntry(value)}
            internalMappingInstance={
              isComponentPropertySingleton(value)
                ? new InternalMapping(value.componentId, value.properties, props.schema, true)
                : null
            }
            onChange={(value, timeout = false, singletonErrors) =>
              updatePropertyValue(propKey, value, timeout, singletonErrors)
            }
            isLoading={
              fetchHydratedEntry(value)
                ? props.loadingEntries[(fetchHydratedEntry(value).sys || {}).id]
                : null
            }
            useConfigObjects={property.type === c.CONFIG_PROPERTY}
            errors={errors[propKey]}
            onOpen={() => onOpen(propKey)}
            onClose={() => onClose(propKey)}
          />
        )}
        {isMultiConfigProperty(property) && (
          <MultiComponentField
            sdk={props.sdk}
            propKey={propKey}
            options={[property.related_to]}
            presets={property.presets}
            schemas={props.schemas}
            hydratedEntries={props.hydratedEntries}
            loadingEntries={props.loadingEntries}
            onChange={(value, timeout, singletonErrors) =>
              updatePropertyValue(propKey, value, timeout, singletonErrors)
            }
            replaceHydratedEntry={props.replaceHydratedEntry}
            useConfigObjects={property.type === c.MULTI_CONFIG_PROPERTY}
            value={value}
            errors={errors[propKey]}
            onOpen={() => onOpen(propKey)}
            onClose={() => onClose(propKey)}
          />
        )}
        <HelpText className="component-editor__hint f36-margin-top--xs">
          {property.description || 'help text'}
        </HelpText>
      </div>
    );
  };

  const styleProperties = properties => {
    return Object.keys(properties).reduce((accumulator, propKey) => {
      if (props.schema.properties[propKey].editor_category === c.STYLE_CATEGORY) {
        accumulator[propKey] = properties[propKey];
      }

      return accumulator;
    }, {});
  };

  const advancedProperties = properties => {
    return Object.keys(properties).reduce((accumulator, propKey) => {
      if (props.schema.properties[propKey].editor_category === c.ADVANCED_CATEGORY) {
        accumulator[propKey] = properties[propKey];
      }

      return accumulator;
    }, {});
  };

  const defaultProperties = properties => {
    return Object.keys(properties).reduce((accumulator, propKey) => {
      if (
        props.schema.properties[propKey].editor_category !== c.STYLE_CATEGORY &&
        props.schema.properties[propKey].editor_category !== c.ADVANCED_CATEGORY
      ) {
        accumulator[propKey] = properties[propKey];
      }

      return accumulator;
    }, {});
  };

  return (
    <div className="component-editor">
      <div className="f36-margin-bottom--l">
        <Subheading>
          {props.title}{' '}
          {props.schema.meta && (
            <HelpText className="d-inline-block">
              <TextLink
                target="_blank"
                href={`https://justworks-staging-v2.herokuapp.com${props.schema.meta.styleguide_path}`}>
                Styleguide link
              </TextLink>
            </HelpText>
          )}
        </Subheading>
        <Paragraph>{props.schema.meta.description}</Paragraph>
      </div>

      <div className="component-editor__fields">
        {/* style properties */}

        <EditorSections
          selectedTab="DEFAULT"
          styleFields={Object.keys(styleProperties(props.schema.properties))
            .filter(propKey => !props.schema.properties[propKey].hidden)
            .map(propKey => {
              return renderPropertyField(propKey);
            })}
          advancedFields={Object.keys(advancedProperties(props.schema.properties))
            .filter(propKey => !props.schema.properties[propKey].hidden)
            .map(propKey => {
              return renderPropertyField(propKey);
            })}
          defaultFields={Object.keys(defaultProperties(props.schema.properties))
            .filter(propKey => !props.schema.properties[propKey].hidden)
            .map(propKey => {
              return renderPropertyField(propKey);
            })}
        />
      </div>
    </div>
  );
};

ComponentEditor.propTypes = {
  sdk: PropTypes.object,
  schemas: PropTypes.array,
  hydratedAssets: PropTypes.array,
  hydratedEntries: PropTypes.array,
  loadingEntries: PropTypes.object,
  internalMappingInstance: PropTypes.object,
  updateInternalMapping: PropTypes.func,
  replaceHydratedEntry: PropTypes.func,
  replaceHydratedAsset: PropTypes.func,
  schema: PropTypes.object, // schema of current component
  title: PropTypes.string
};
ComponentEditor.defaultProps = {
  hydratedAssets: [],
  hydratedEntries: [],
  loadingEntries: {},
  internalMappingInstance: {},
  schemas: [],
  schema: {
    properties: {},
    meta: {}
  }
};

export default ComponentEditor;
