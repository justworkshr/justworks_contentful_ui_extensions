import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

import HydratedEntryCard from '../../cards/HydratedEntryCard';
import { constructLink, getEntryContentTypeId, createEntry } from '../../../utilities/index';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const EntryField = props => {
  const [createOpen, toggleCreate] = useState(false);
  const [linkOpen, toggleLink] = useState(false);

  const getContentType = () => {
    return (props.entry.sys || {}).contentType ? getEntryContentTypeId(props.entry) : null;
  };

  const updateEntry = entry => {
    if (entry) {
      const link = constructLink(entry);
      props.onChange(link);
    } else {
      props.onChange(null);
    }
  };

  const handleLinkClick = async option => {
    const entry = await props.sdk.dialogs.selectSingleEntry({
      contentTypes: [option]
    });
    updateEntry(entry);
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

  const handleCreateClick = async contentType => {
    const newEntry = await createEntry(props.sdk.space, contentType);

    const navigator = await props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    if (navigator.navigated) {
      updateEntry(navigator.entity);
    }
  };

  const renderEntryCard = () => {
    return (
      <HydratedEntryCard
        contentType={getContentType()}
        isLoading={props.isLoading}
        onClick={handleEditClick}
        handleEditClick={handleEditClick}
        handleRemoveClick={() => updateEntry(null)}
        entry={props.entry}
      />
    );
  };

  const renderElement = () => {
    if (props.entry.fields) {
      return renderEntryCard();
    } else {
      return (
        <div data-test-id="entry-field-blank" className="link-row">
          <Dropdown
            testId="create-entry"
            toggleElement={<TextLink className="f36-margin-right--s">Create entry</TextLink>}
            onClick={() => toggleCreate(!createOpen)}
            isOpen={createOpen}>
            <DropdownList>
              <DropdownListItem isTitle>Options</DropdownListItem>
              {props.contentTypes.map((option, index) => {
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
            testId="link-entry"
            toggleElement={<TextLink className="f36-margin-right--s">Link entry</TextLink>}
            onClick={() => toggleLink(!linkOpen)}
            isOpen={linkOpen}>
            <DropdownList>
              <DropdownListItem isTitle>Options</DropdownListItem>
              {props.contentTypes.map((option, index) => {
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

  console.log(props.entry);
  return (
    <div className="entry-field" data-test-id="entry-field">
      {renderElement()}
    </div>
  );
};

EntryField.propTypes = {
  contentTypes: PropTypes.array,
  entry: PropTypes.object,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  sdk: PropTypes.object,
  replaceHydratedEntry: PropTypes.func
};

EntryField.defaultProps = {
  contentTypes: [],
  isLoading: false,
  entry: {}
};

export default EntryField;
