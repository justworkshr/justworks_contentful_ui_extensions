import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';

import SelectComponentModal from '../../SelectComponentModal';
import HydratedEntryCard from '../../cards/HydratedEntryCard';
import DropdownCreate from '../../elements/DropdownCreate';
import DropdownLink from '../../elements/DropdownLink';

import { constructLink, createEntry, newInternalMappingFromSchema } from '../../../utilities/index';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const MultiComponentField = props => {
  const [linkModalOpen, toggleLinkModal] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);

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

  const updateEntry = (entries = []) => {
    if (entries.length) {
      const links = entries.map(entry => constructLink(entry));
      props.onChange(links);
    } else {
      props.onChange([]);
    }

    resetDrag();
  };

  const handleModalSubmit = (entries = []) => {
    if (entries.length) {
      updateEntry([...props.entries, ...entries]);
    }
  };

  const handleLinkClick = componentId => {
    setModalOptions([componentId]);
    toggleLinkModal(true);
  };

  const handleEditClick = async entry => {
    try {
      const navigation = await props.sdk.navigator.openEntry(entry.sys.id, {
        slideIn: { waitForClose: true }
      });
      // updates entry in parent if editing applied
      if (navigation.navigated) {
        props.replaceHydratedEntry(navigation.entity);
      }
    } catch (e) {
      // entity deleted
      const index = props.value.findIndex(e => e.sys.id === entry.sys.id);
      handleRemoveClick(index);
    }
  };

  const handleRemoveClick = index => {
    let entries = [...props.entries.slice(0, index), ...props.entries.slice(index + 1)];
    updateEntry(entries);
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
        'en-US': newInternalMappingFromSchema(schema, props.useConfigObjects).asJSON()
      }
    });

    const navigator = await props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    if (navigator.navigated) {
      const entries = [...props.entries, navigator.entity];
      updateEntry(entries);
    }
  };

  const renderEntryCards = () => {
    return props.value.map((link, index) => {
      const entry = props.entries.find(e => ((e && e.sys) || {}).id === link.sys.id);
      return (
        <HydratedEntryCard
          key={`${props.propKey}-entries--${index}`}
          index={index}
          className="f36-margin-bottom--xs"
          contentType={`${
            entry ? (entry.fields.componentId || {})['en-US'] : c.CONTENT_TYPE_VIEW_COMPONENT
          }`}
          isLoading={props.loadingEntries[link.sys.id]}
          onClick={() => handleEditClick(entry)}
          handleEditClick={() => handleEditClick(entry)}
          handleRemoveClick={() => handleRemoveClick(index)}
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
    <div className="multi-component-field" data-test-id="multi-component-field">
      <SelectComponentModal
        sdk={props.sdk}
        handleClose={() => toggleLinkModal(false)}
        handleSubmit={handleModalSubmit}
        isShown={linkModalOpen}
        options={modalOptions}
        useConfigObjects={props.useConfigObjects}
        type="multiple"
      />
      <div data-test-id="multi-component-field--links">{renderEntryCards()}</div>
      <div data-test-id="action-row" className="link-row">
        <DropdownCreate handleCreateClick={handleCreateClick} options={props.options} />
        <DropdownLink handleLinkClick={handleLinkClick} options={props.options} />
      </div>
    </div>
  );
};

MultiComponentField.propTypes = {
  options: PropTypes.array,
  entries: PropTypes.array,
  loadingEntries: PropTypes.object,
  onChange: PropTypes.func,
  schemas: PropTypes.array,
  sdk: PropTypes.object,
  replaceHydratedEntry: PropTypes.func,
  propKey: PropTypes.string,
  useConfigObjects: PropTypes.bool,
  value: PropTypes.array
};

MultiComponentField.defaultProps = {
  options: [],
  entries: [],
  schemas: [],
  useConfigObjects: false,
  loadingEntries: {},
  value: []
};

export default MultiComponentField;
