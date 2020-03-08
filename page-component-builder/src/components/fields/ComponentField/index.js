import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

import { createEntry, constructLink } from '../../../utilities/index';
import HydratedEntryCard from '../../cards/HydratedEntryCard';
import SelectComponentModal from '../../SelectComponentModal';

const ComponentField = props => {
  const [createOpen, toggleCreate] = useState(false);
  const [linkOpen, toggleLink] = useState(false);
  const [linkModalOpen, toggleLinkModal] = useState(false);
  const [modalOptions, setModalOptions] = useState(props.options);

  const updateEntry = entry => {
    if (entry) {
      const link = constructLink(entry);
      props.onChange(link);
    } else {
      props.onChange(null);
    }
  };

  const handleModalSubmit = entry => {
    if (entry) {
      updateEntry(entry);
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
      updateEntry(navigator.entity);
    }
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

ComponentField.propTypes = {
  options: PropTypes.array,
  entry: PropTypes.object,
  internalMappingInstance: PropTypes.object,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  sdk: PropTypes.object
};
ComponentField.defaultProps = {
  options: [],
  entry: {},
  internalMappingInstance: null,
  sdk: {}
};

export default ComponentField;
