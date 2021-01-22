import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  EntryCard,
  TextLink,
  DropdownList,
  DropdownListItem,
  Paragraph
} from '@contentful/forma-36-react-components';
import * as c from '@shared/constants';

import { createEntry, constructLink, getStatus } from '@shared/utilities/index.js';
import SelectPatternModal from '../SelectPatternModal';

import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';

import './style.css';

const MultiComponentField = props => {
  const [linkModalOpen, toggleLinkModal] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);

  const [dragged, setDragged] = useState(undefined);
  const [draggedOver, setDraggedOver] = useState(undefined);

  const handleModalSubmit = (modalValue = []) => {
    const newValue = [...props.value, ...modalValue.map(l => constructLink(l))];
    props.onChange(newValue);
  };

  const onDragStart = index => {
    setDragged(index);
  };

  const onDragOver = index => {
    setDraggedOver(index);
  };

  const onDragEnd = e => {
    e.preventDefault();
    const newValue = orderedLinks();
    props.onChange(newValue);

    resetDrag();
  };

  const orderedLinks = () => {
    // checks if a dragged and a draggedOver exist and ensures dragged isn't same as draggedOver
    if (
      (dragged !== 0 && !dragged) ||
      (draggedOver !== 0 && !draggedOver) ||
      dragged === draggedOver
    ) {
      resetDrag();
      return props.value;
    }
    // sorts links
    const links = props.value;
    const draggedEntry = props.value[dragged];
    // links[dragged] = links[draggedOver];

    if (dragged > draggedOver) {
      // dragged higher in the list, pushes things down

      for (let i = dragged; i > draggedOver; i--) {
        links[i] = links[i - 1];
      }
    } else if (dragged < draggedOver) {
      // dragged lower in the list, pulls things up

      for (let i = dragged; i < draggedOver; i++) {
        links[i] = links[i + 1];
      }
    }
    links[draggedOver] = draggedEntry;
    return links;
  };

  const resetDrag = () => {
    setDragged(undefined);
    setDraggedOver(undefined);
  };
  const draggedOverClass = index => {
    if (draggedOver < dragged && index >= draggedOver) return 'dragged-over--down';
    if (draggedOver > dragged && index <= draggedOver) return 'dragged-over--up';
  };

  const handleCreate = async () => {
    const pageName = props.sdk.entry.fields.internalName.getValue();
    const newEntry = await createEntry(props.sdk.space, c.CONTENT_TYPE_VIEW_COMPONENT, {
      name: {
        'en-US': `${pageName} - Component`
      }
    });
    const newValue = [...props.value, constructLink(newEntry)];
    props.onChange(newValue);

    const navigator = await props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    if (navigator.navigated) {
      props.onChange([...props.value, constructLink(navigator.entity)]);
    }
  };

  const handleLink = () => {
    toggleLinkModal(true);
  };

  const handleEditClick = async index => {
    const entry = props.value[index];
    try {
      const navigation = await props.sdk.navigator.openEntry(entry.sys.id, {
        slideIn: { waitForClose: true }
      });

      props.onChange(props.value);
    } catch (error) {
      // entity deleted
      const index = props.value.findIndex(e => (e.sys || {}).id === entry.sys.id);
      handleRemoveClick(index);
    }
  };

  const handleDuplicateEntryClick = async (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const entry = props.value[index];
      const hydratedEntry = props.hydratedEntries.find(e => e.sys.id === entry.sys.id);

      const fields = {
        ...hydratedEntry.fields,
        name: { 'en-US': hydratedEntry.fields.name['en-US'] + ' (duplicate)' }
      };

      const newEntry = await createEntry(props.sdk.space, c.CONTENT_TYPE_VIEW_COMPONENT, fields);
      const entries = [...props.value, constructLink(newEntry)];

      props.onChange(entries);
      props.sdk.notifier.success('Entry duplicated successfully.');
    } catch (error) {
      props.sdk.notifier.error(`Error in duplication: "${error.message}"`);
    }
  };

  const handleRemoveClick = index => {
    let newValue = [...props.value.slice(0, index), ...props.value.slice(index + 1)];
    props.onChange(newValue);
  };

  const getTitle = entry => {
    const componentId = (entry.fields.componentId || {})['en-US'];
    const schema = props.schemaData.components.find(schema => schema.meta.id === componentId);
    if (schema) {
      return schema.meta.title || schema.meta.id;
    } else {
      return '< unconfigured >';
    }
  };
  return (
    <div className={`multi-component-field ${linkModalOpen ? 'full-height' : ''}`}>
      <SelectPatternModal
        sdk={props.sdk}
        type="multiple"
        handleClose={() => toggleLinkModal(false)}
        handleSubmit={handleModalSubmit}
        isShown={linkModalOpen}
        options={['patterns/']}
        schemaData={props.schemaData}
      />
      <div data-test-id="multi-component-field--links">
        {!!props.hydratedEntries.length &&
          props.value
            .map((e, index) => {
              const entry = props.hydratedEntries.find(he => he.sys.id === e.sys.id);
              if (!entry) return null;
              return (
                <EntryCard
                  key={`entry--${index}`}
                  className={`f36-margin-bottom--xs ${draggedOverClass(index)}`}
                  title={(entry.fields.name || {})['en-US']}
                  loading={false}
                  contentType={getTitle(entry)}
                  status={getStatus(entry)}
                  size="small"
                  onClick={() => handleEditClick(index)}
                  draggable={true}
                  withDragHandle={true}
                  isDragActive={index === dragged}
                  onMouseDown={() => onDragStart(index)}
                  onDragStart={() => onDragStart(index)}
                  onDragOver={() => onDragOver(index)}
                  onDragEnd={onDragEnd}
                  dropdownListElements={
                    <DropdownList>
                      <DropdownListItem isTitle>Actions</DropdownListItem>
                      <DropdownListItem
                        testId="action-dropdown--edit"
                        className="entry-card__action--edit"
                        onClick={e => handleDuplicateEntryClick(e, index)}>
                        Duplicate
                      </DropdownListItem>
                      <DropdownListItem
                        testId="action-dropdown--edit"
                        className="entry-card__action--edit"
                        onClick={() => handleEditClick(index)}>
                        Edit
                      </DropdownListItem>

                      <DropdownListItem
                        testId="action-dropdown--remove"
                        className="entry-card__action--remove"
                        onClick={() => handleRemoveClick(index)}>
                        Remove
                      </DropdownListItem>
                    </DropdownList>
                  }
                />
              );
            })
            .filter(e => e)}
      </div>
      {!!props.loadingEntries && <Paragraph>Loading entries...</Paragraph>}
      {!props.loadingEntries && (
        <div className="action-row f36-margin-top--s">
          <TextLink className="f36-margin-right--xs" onClick={handleCreate}>
            Create new
          </TextLink>
          <TextLink onClick={handleLink}>Link existing</TextLink>
        </div>
      )}
    </div>
  );
};

MultiComponentField.propTypes = {
  sdk: PropTypes.object,
  schemaData: PropTypes.object,
  loadingEntries: PropTypes.bool,
  hydratedEntries: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.array
};
MultiComponentField.defaultProps = {
  schemaData: {
    tags: {},
    components: []
  },
  sdk: {},
  hydratedEntries: [],
  loadingEntries: false,
  value: []
};

export default MultiComponentField;
