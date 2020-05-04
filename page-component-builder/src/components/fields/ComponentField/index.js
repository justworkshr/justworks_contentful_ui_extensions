import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem,
  EntryCard
} from '@contentful/forma-36-react-components';

import { createEntry, constructLink, newInternalMappingFromSchema } from '../../../utilities/index';
import { schemaTitle } from '../../../utilities/copyUtils';

import HydratedEntryCard from '../../cards/HydratedEntryCard';
import SelectComponentModal from '../../SelectComponentModal';
import ComponentEditor from '../../ComponentEditor';

const ComponentField = props => {
  const [singletonOpen, toggleSingleton] = useState(false);
  const [singletonCardOpen, toggleSingletonCard] = useState(false);

  const [createOpen, toggleCreate] = useState(false);
  const [linkOpen, toggleLink] = useState(false);
  const [linkModalOpen, toggleLinkModal] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);

  const updateEntry = (value, timeout = false) => {
    props.onChange(value, timeout);
  };

  const updateSingletonEntry = (value, timeout = false) => {
    // pass internal mapping json as raw object
    updateEntry(JSON.parse(value), timeout);
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
    const newEntry = await createEntry(props.sdk.space, c.CONTENT_TYPE_VIEW_COMPONENT, {
      componentId: {
        'en-US': componentId
      },
      configObject: {
        'en-US': props.useConfigObjects
      }
    });

    const navigator = await props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    if (navigator.navigated) {
      updateEntry(constructLink(navigator.entity));
    }
  };

  const handleCreateSingletonClick = componentId => {
    const schema = props.schemas.find(s => s.meta.id === componentId);
    const componentInternalMapping = newInternalMappingFromSchema(schema, false);
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
    } else if (props.internalMappingInstance) {
      const schema = props.schemas.find(
        s => s.meta.id === props.internalMappingInstance.componentId
      );
      return (
        <div className="component-field-singleton" data-test-id="component-field-singleton">
          <div className="component-field-singleton__editor f36-padding-left--xl">
            <EntryCard
              className="f36-margin-top--s f36-margin-bottom--m"
              testId="singleton-entry-card"
              loading={false}
              title={schemaTitle(schema)}
              contentType={contentTypeLabel('Singleton')}
              description={schema.meta.description}
              size="default"
              statusIcon={singletonCardOpen ? 'ChevronDown' : 'ChevronUp'}
              onClick={() => toggleSingletonCard(!singletonCardOpen)}
              dropdownListElements={
                <DropdownList>
                  <DropdownListItem isTitle>Options</DropdownListItem>
                  <DropdownListItem
                    key="singleton-option--remove"
                    onClick={() => updateEntry(null)}>
                    Remove
                  </DropdownListItem>
                </DropdownList>
              }
            />
            {!!singletonCardOpen && (
              <ComponentEditor
                sdk={props.sdk}
                schemas={props.schemas}
                updateInternalMapping={updateSingletonEntry}
                hydratedAssets={props.hydratedAssets}
                hydratedEntries={props.hydratedEntries}
                replaceHydratedAsset={props.replaceHydratedAsset}
                replaceHydratedEntry={props.replaceHydratedEntry}
                internalMappingInstance={props.internalMappingInstance}
                schema={schema}
              />
            )}
          </div>
        </div>
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
          />
          {!props.useConfigObjects && (
            <Dropdown
              toggleElement={<TextLink className="f36-margin-right--s">Create singleton</TextLink>}
              onClick={() => toggleSingleton(!singletonOpen)}
              isOpen={singletonOpen}>
              <DropdownList>
                <DropdownListItem isTitle>Options</DropdownListItem>
                {getOptions().map((option, index) => {
                  return (
                    <DropdownListItem
                      key={`component-option--${index}`}
                      onClick={() => handleCreateSingletonClick(option)}>
                      {option}
                    </DropdownListItem>
                  );
                })}
              </DropdownList>
            </Dropdown>
          )}
          <Dropdown
            toggleElement={<TextLink className="f36-margin-right--s">Create entry</TextLink>}
            onClick={() => toggleCreate(!createOpen)}
            isOpen={createOpen}>
            <DropdownList>
              <DropdownListItem isTitle>Options</DropdownListItem>
              {getOptions().map((option, index) => {
                return (
                  <DropdownListItem
                    key={`component-option--${index}`}
                    onClick={() => handleCreateClick(option)}>
                    {option}
                  </DropdownListItem>
                );
              })}
            </DropdownList>
          </Dropdown>
          <Dropdown
            toggleElement={<TextLink className="f36-margin-right--s">Link entry</TextLink>}
            onClick={() => toggleLink(!linkOpen)}
            isOpen={linkOpen}>
            <DropdownList>
              <DropdownListItem isTitle>Options</DropdownListItem>
              {getOptions().map((option, index) => {
                return (
                  <DropdownListItem
                    key={`component-option--${index}`}
                    onClick={() => handleLinkClick(option)}>
                    {option}
                  </DropdownListItem>
                );
              })}
            </DropdownList>
          </Dropdown>
        </div>
      );
    }
  };

  return (
    <div className="component-field" data-test-id="component-field">
      {renderElement()}
    </div>
  );
};

ComponentField.propTypes = {
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
  useConfigObjects: PropTypes.bool
};
ComponentField.defaultProps = {
  hydratedAssets: [],
  hydratedEntries: [],
  schemas: [],
  property: {},
  entry: {},
  internalMappingInstance: null,
  sdk: {},
  useConfigObjects: false
};

export default ComponentField;
