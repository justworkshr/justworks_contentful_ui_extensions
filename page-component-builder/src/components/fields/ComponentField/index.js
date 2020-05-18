import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';

import { createEntry, constructLink, newInternalMappingFromSchema } from '../../../utilities/index';

import HydratedEntryCard from '../../cards/HydratedEntryCard';
import SelectComponentModal from '../../SelectComponentModal';
import SingletonField from '../SingletonField';
import DropdownCreate from '../../elements/DropdownCreate';
import DropdownLink from '../../elements/DropdownLink';
import ErrorList from '../ErrorList';

const ComponentField = props => {
  const [linkModalOpen, toggleLinkModal] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);

  const updateEntry = (value, timeout = false, singletonErrors) => {
    props.onChange(value, timeout, singletonErrors);
  };

  const updateSingletonEntry = (value, timeout = false, errors = {}) => {
    // convert errors into single prop key message
    if (Object.keys(errors).length) {
      const errorMessage = 'Please correct all errors in this singleton.';
      errors = { [props.propKey]: [errorMessage] };
    } else {
      errors = { [props.propKey]: [] };
    }
    // pass internal mapping json as raw object
    updateEntry(JSON.parse(value), timeout, errors);
  };

  const handleModalSubmit = entry => {
    if (entry) {
      updateEntry(constructLink(entry));
    }
  };

  const handleLinkClick = componentId => {
    setModalOptions([componentId]);
    toggleLinkModal(true);
  };

  const handleCreateClick = async componentId => {
    const schema = props.schemas.find(s => s.meta.id === componentId);
    const newEntry = await createEntry(props.sdk.space, c.CONTENT_TYPE_VIEW_COMPONENT, {
      componentId: {
        'en-US': componentId
      },
      configObject: {
        'en-US': props.useConfigObjects
      },
      internalMapping: {
        'en-US': newInternalMappingFromSchema({
          schema,
          configObject: props.useConfigObjects
        }).asJSON()
      }
    });

    const navigator = await props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    if (navigator.navigated) {
      updateEntry(constructLink(navigator.entity));
    }
  };

  const handleCreateSingletonClick = (componentId, presetObject = null) => {
    const schema = props.schemas.find(s => s.meta.id === componentId);
    const componentInternalMapping = newInternalMappingFromSchema({
      schema,
      presetObject,
      configObject: false
    });
    updateEntry(componentInternalMapping);
  };

  const handleEditClick = async () => {
    try {
      const navigation = await props.sdk.navigator.openEntry(props.entry.sys.id, {
        slideIn: { waitForClose: true }
      });

      // updates entry in parent if editing applied
      if (navigation.navigated) {
        props.replaceHydratedEntry(navigation.entity);
      }
    } catch (e) {
      // entity deleted
      updateEntry(null);
    }
  };

  const getOptions = () => {
    let options = [];
    if (props.useConfigObjects) {
      options = [props.property.related_to];
    } else {
      options = props.property.options;
    }

    return options || [];
  };

  const contentTypeLabel = contentType => {
    let schema = {};
    if (props.entry.fields) {
      schema = props.schemas.find(
        schema => schema.meta.id === props.entry.fields.componentId['en-US']
      );
    } else if (props.internalMappingInstance) {
      schema = props.schemas.find(
        schema => schema.meta.id === props.internalMappingInstance.componentId
      );
    }

    if (!schema) return '';

    return `${contentType} | ${(schema.meta || {}).title || (schema.meta || {}).id}`;
  };

  const isSingleton = () => {
    return !!props.internalMappingInstance;
  };

  const renderElement = () => {
    if (props.entry.fields) {
      return (
        <HydratedEntryCard
          contentType={contentTypeLabel(c.CONTENT_TYPE_VIEW_COMPONENT)}
          entry={props.entry}
          isLoading={props.isLoading}
          onClick={handleEditClick}
          handleEditClick={handleEditClick}
          handleRemoveClick={() => updateEntry(null)}
        />
      );
    } else if (isSingleton()) {
      const schema = props.schemas.find(
        s => s.meta.id === props.internalMappingInstance.componentId
      );
      return (
        <SingletonField
          sdk={props.sdk}
          schema={schema}
          schemas={props.schemas}
          hydratedAssets={props.hydratedAssets}
          hydratedEntries={props.hydratedEntries}
          replaceHydratedAsset={props.replaceHydratedAsset}
          replaceHydratedEntry={props.replaceHydratedEntry}
          onChange={(value, timeout, errors) => updateSingletonEntry(value, timeout, errors)}
          internalMappingInstance={props.internalMappingInstance}
          handleRemoveClick={() => updateEntry(null)}
          indent={false}
          onOpen={props.onOpen}
          onClose={props.onClose}
          tokens={props.tokens}
        />
      );
    } else {
      return (
        <div data-test-id="component-field-blank" className="link-row">
          <SelectComponentModal
            sdk={props.sdk}
            handleClose={() => toggleLinkModal(false)}
            handleSubmit={handleModalSubmit}
            isShown={linkModalOpen}
            options={modalOptions}
            useConfigObjects={props.useConfigObjects}
            schemas={props.schemas}
          />
          {!props.useConfigObjects && (
            <DropdownCreate
              testId="dropdown-create-singleton"
              handleCreateClick={handleCreateSingletonClick}
              toggleText="Create singleton"
              options={getOptions()}
              presets={props.property.presets}
              schemas={props.schemas}
            />
          )}
          <DropdownCreate
            schemas={props.schemas}
            handleCreateClick={handleCreateClick}
            options={getOptions()}
            presets={props.property.presets}
          />
          <DropdownLink
            handleLinkClick={handleLinkClick}
            options={getOptions()}
            schemas={props.schemas}
          />
        </div>
      );
    }
  };
  return (
    <div className="component-field" data-test-id="component-field">
      {renderElement()}
      <ErrorList errors={props.errors} />
    </div>
  );
};

ComponentField.propTypes = {
  errors: PropTypes.array,
  schemas: PropTypes.array,
  hydratedAssets: PropTypes.array,
  hydratedEntries: PropTypes.array,
  replaceHydratedAsset: PropTypes.func,
  replaceHydratedEntry: PropTypes.func,
  property: PropTypes.object,
  entry: PropTypes.object,
  internalMappingInstance: PropTypes.object,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  sdk: PropTypes.object,
  useConfigObjects: PropTypes.bool,
  propKey: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  tokens: PropTypes.object
};
ComponentField.defaultProps = {
  errors: [],
  hydratedAssets: [],
  hydratedEntries: [],
  schemas: [],
  property: {},
  entry: {},
  internalMappingInstance: null,
  sdk: {},
  useConfigObjects: false,
  tokens: {}
};

export default ComponentField;
