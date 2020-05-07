import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';
import ErrorList from '../ErrorList';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

import HydratedEntryCard from '../../cards/HydratedEntryCard';
import { constructLink, getEntryContentTypeId, createEntry } from '../../../utilities/index';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const MultiLinkField = props => {
  const [createOpen, toggleCreate] = useState(false);
  const [linkOpen, toggleLink] = useState(false);
  const [dragged, setDragged] = useState(undefined);
  const [draggedOver, setDraggedOver] = useState(undefined);

  const onDragStart = entry => {
    setDragged(entry);
  };

  const onDragOver = entry => {
    setDraggedOver(entry);
  };

  const onDragEnd = e => {
    e.preventDefault();
    // checks if a dragged and a draggedOver exist and ensures dragged isn't same as draggedOver
    if (
      (dragged !== 0 && !dragged) ||
      (draggedOver !== 0 && !draggedOver) ||
      dragged === draggedOver
    ) {
      return resetDrag();
    }

    // flip by index
    const links = props.entries;
    const draggedEntry = props.entries[dragged];
    links[dragged] = links[draggedOver];
    links[draggedOver] = draggedEntry;
    props.onChange(links.map(entry => constructLink(entry)));
    resetDrag();
  };

  const resetDrag = () => {
    setDragged(undefined);
    setDraggedOver(undefined);
  };

  const getContentType = entry => {
    if (!entry) return;
    return (entry.sys || {}).contentType ? getEntryContentTypeId(entry) : null;
  };

  const updateEntry = (entries = []) => {
    if (entries.length) {
      const links = entries.map(entry => constructLink(entry));
      props.onChange(links);
    } else {
      props.onChange([]);
    }
  };

  const handleLinkClick = async option => {
    const entries = await props.sdk.dialogs.selectMultipleEntries({
      contentTypes: [option]
    });
    updateEntry([...props.entries, ...entries]);
  };

  const handleEditClick = async entry => {
    const navigation = await props.sdk.navigator.openEntry(entry.sys.id, {
      slideIn: { waitForClose: true }
    });

    // updates entry in parent if editing applied
    if (navigation.navigated) {
      props.replaceHydratedEntry(navigation.entity);
    }
  };

  const handleRemoveClick = entry => {
    const entries = props.entries.filter(e => e.sys.id !== entry.sys.id);
    updateEntry(entries);
  };

  const handleCreateClick = async contentType => {
    const newEntry = await createEntry(props.sdk.space, contentType);

    const navigator = await props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    if (navigator.navigated) {
      updateEntry([...props.entries, navigator.entity]);
    }
  };

  const renderEntryCards = () => {
    return props.entries.map((entry, index) => {
      return (
        <HydratedEntryCard
          key={`${props.propKey}-entries--${index}`}
          index={index}
          className="f36-margin-bottom--xs"
          contentType={getContentType(entry)}
          isLoading={!(entry && entry.fields)}
          onClick={() => handleEditClick(entry)}
          handleEditClick={() => handleEditClick(entry)}
          handleRemoveClick={() => handleRemoveClick(entry)}
          draggable={true}
          isDragActive={index === dragged || index === draggedOver}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          entry={entry}
        />
      );
    });
  };
  return (
    <div className="multi-link-field" data-test-id="multi-link-field">
      <div data-test-id="multi-link-field--links">{renderEntryCards()}</div>
      <div data-test-id="action-row" className="link-row">
        <Dropdown
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
      <ErrorList errors={props.errors} />
    </div>
  );
};

MultiLinkField.propTypes = {
  contentTypes: PropTypes.array,
  entries: PropTypes.array,
  onChange: PropTypes.func,
  sdk: PropTypes.object,
  replaceHydratedEntry: PropTypes.func,
  propKey: PropTypes.string,
  errors: PropTypes.array
};

MultiLinkField.defaultProps = {
  contentTypes: [],
  entries: [],
  errors: []
};

export default MultiLinkField;
