import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

import { createEntry, constructLink, newInternalMappingFromSchema } from '../../../utilities/index';
import HydratedEntryCard from '../../cards/HydratedEntryCard';
import SelectComponentModal from '../../SelectComponentModal';
import ComponentEditor from '../../ComponentEditor';

const ComponentField = props => {
  const [singletonOpen, toggleSingleton] = useState(false);
  const [createOpen, toggleCreate] = useState(false);
  const [linkOpen, toggleLink] = useState(false);
  const [linkModalOpen, toggleLinkModal] = useState(false);
  const [modalOptions, setModalOptions] = useState(props.options);

  const updateEntry = (value, timeout = false) => {
    props.onChange(value, timeout);
  };

  const updateSingletonEntry = (value, timeout = false) => {
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
    const newEntry = await createEntry(
      props.sdk.space,
      c.CONTENT_TYPE_VIEW_COMPONENT,
      null,
      componentId
    );

    const navigator = await props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    if (navigator.navigated) {
      updateEntry(constructLink(navigator.entity));
    }
  };

  const handleCreateSingletonClick = componentId => {
    const schema = props.schemas.find(s => s.meta.id === componentId);
    const componentInternalMapping = newInternalMappingFromSchema(schema);
    updateEntry(componentInternalMapping);
  };

  const handleEditClick = async () => {
    const navigation = await props.sdk.navigator.openEntry(props.entry.sys.id, {
      slideIn: { waitForClose: true }
    });

    // updates entry in parent if editing applied
    if (navigation.navigated) {
      props.replaceHydratedEntry(navigation.entity);
    }
  };

  const renderElement = () => {
    if (props.entry.fields) {
      return (
        <HydratedEntryCard
          contentType={c.CONTENT_TYPE_VIEW_COMPONENT}
          entry={props.entry}
          isLoading={props.isLoading}
          onClick={handleEditClick}
          handleEditClick={handleEditClick}
          handleRemoveClick={() => updateEntry(null)}
        />
      );
    } else if (props.internalMappingInstance) {
      return (
        <div className="component-field-singleton" data-test-id="component-field-singleton">
          <TextLink className="f36-margin-bottom--l" onClick={() => updateEntry(null)}>
            Clear singleton
          </TextLink>
          <div className="component-field-singleton__editor f36-padding-left--xl">
            <ComponentEditor
              sdk={props.sdk}
              schemas={props.schemas}
              updateInternalMapping={updateSingletonEntry}
              hydratedAssets={props.hydratedAssets}
              hydratedEntries={props.hydratedEntries}
              replaceHydratedAsset={props.replaceHydratedAsset}
              replaceHydratedEntry={props.replaceHydratedEntry}
              internalMappingInstance={props.internalMappingInstance}
              schema={props.schemas.find(
                s => s.meta.id === props.internalMappingInstance.componentId
              )}
            />
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
          />
          <Dropdown
            toggleElement={<TextLink className="f36-margin-right--s">Create singleton</TextLink>}
            onClick={() => toggleSingleton(!singletonOpen)}
            isOpen={singletonOpen}>
            <DropdownList>
              <DropdownListItem isTitle>Options</DropdownListItem>
              {props.options.map((option, index) => {
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
          <Dropdown
            toggleElement={<TextLink className="f36-margin-right--s">Create entry</TextLink>}
            onClick={() => toggleCreate(!createOpen)}
            isOpen={createOpen}>
            <DropdownList>
              <DropdownListItem isTitle>Options</DropdownListItem>
              {props.options.map((option, index) => {
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
              {props.options.map((option, index) => {
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
  options: PropTypes.array,
  entry: PropTypes.object,
  internalMappingInstance: PropTypes.object,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  sdk: PropTypes.object
};
ComponentField.defaultProps = {
  hydratedAssets: [],
  hydratedEntries: [],
  schemas: [],
  options: [],
  entry: {},
  internalMappingInstance: null,
  sdk: {}
};

export default ComponentField;
