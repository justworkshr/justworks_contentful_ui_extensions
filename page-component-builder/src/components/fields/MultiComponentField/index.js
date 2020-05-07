import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';

import SelectComponentModal from '../../SelectComponentModal';
import HydratedEntryCard from '../../cards/HydratedEntryCard';
import DropdownCreate from '../../elements/DropdownCreate';
import DropdownLink from '../../elements/DropdownLink';
import SingletonField from '../SingletonField';
import InternalMapping from '../../../classes/InternalMapping';

import { constructLink, createEntry, newInternalMappingFromSchema } from '../../../utilities/index';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const MultiComponentField = props => {
  const [linkModalOpen, toggleLinkModal] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);

  const [dragged, setDragged] = useState(undefined);
  const [draggedOver, setDraggedOver] = useState(undefined);

  const onDragStart = index => {
    setDragged(index);
  };

  const onDragOver = index => {
    setDraggedOver(index);
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
    const links = props.value;
    const draggedEntry = props.value[dragged];
    links[dragged] = links[draggedOver];
    links[draggedOver] = draggedEntry;

    props.onChange(parseEntries(links));

    resetDrag();
  };
  const resetDrag = () => {
    setDragged(undefined);
    setDraggedOver(undefined);
  };

  const parseEntries = entries => {
    // parses link or singletons
    return entries
      .filter(f => f)
      .map(entry => {
        // pass singleton object or link
        if (entry.sys) {
          return constructLink(entry);
        } else if (entry.componentId) {
          return entry;
        }
      })
      .filter(f => f);
  };

  const updateEntry = (entries = [], timeout = false) => {
    if (entries.length) {
      const parsedEntries = parseEntries(entries);

      props.onChange(
        parsedEntries.filter(e => e),
        timeout
      );
    } else {
      props.onChange([], timeout);
    }

    resetDrag();
  };

  const handleModalSubmit = (entries = []) => {
    if (entries.length) {
      updateEntry([...props.value, ...entries]);
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
    let entries = [...props.value.slice(0, index), ...props.value.slice(index + 1)];
    updateEntry(entries);
  };

  const handleCreateSingletonClick = (componentId, presetObject = null) => {
    const schema = props.schemas.find(s => s.meta.id === componentId);
    const componentInternalMapping = newInternalMappingFromSchema({
      schema,
      presetObject,
      configObject: false
    });
    const entries = [...props.value, JSON.parse(componentInternalMapping.asJSON())];

    updateEntry(entries);
  };

  const updateSingletonEntry = (value, timeout = false, index) => {
    // pass internal mapping json as raw object
    const entries = props.value;
    entries[index] = JSON.parse(value);
    updateEntry(entries, timeout);
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
      const entries = [...props.value, navigator.entity];
      updateEntry(entries);
    }
  };

  const renderEntryCards = () => {
    return props.value
      .filter(e => e)
      .map((linkOrSingleton, index) => {
        if (linkOrSingleton.sys) {
          // linked entry
          let schema;
          const entry = props.hydratedEntries.find(
            e => ((e && e.sys) || {}).id === linkOrSingleton.sys.id
          );
          if (entry) {
            schema = props.schemas.find(s => s.meta.id === entry.fields.componentId['en-US']);
          }
          return (
            <HydratedEntryCard
              key={`${props.propKey}-entries--${index}`}
              index={index}
              className="f36-margin-bottom--xs"
              contentType={`${
                entry ? (entry.fields.componentId || {})['en-US'] : c.CONTENT_TYPE_VIEW_COMPONENT
              }`}
              description={schema ? schema.meta.description : null}
              isLoading={props.loadingEntries[linkOrSingleton.sys.id]}
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
        } else if (linkOrSingleton.componentId) {
          // singleton

          const schema = props.schemas.find(s => s.meta.id === linkOrSingleton.componentId);
          return (
            <SingletonField
              key={`${props.propKey}-entries--${index}`}
              sdk={props.sdk}
              schemas={props.schemas}
              onChange={(value, timeout) => updateSingletonEntry(value, timeout, index)}
              // hydratedAssets={props.hydratedAssets}
              hydratedEntries={props.hydratedEntries}
              replaceHydratedAsset={props.replaceHydratedAsset}
              replaceHydratedEntry={props.replaceHydratedEntry}
              internalMappingInstance={
                new InternalMapping(
                  linkOrSingleton.componentId,
                  linkOrSingleton.properties,
                  schema,
                  props.useConfigObjects
                )
              }
              schema={schema}
              handleRemoveClick={() => handleRemoveClick(index)}
              draggable={true}
              isDragActive={index === dragged || index === draggedOver}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
              index={index}
              indent={false}
            />
          );
        }
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
        {!props.useConfigObjects && (
          <DropdownCreate
            testId="dropdown-create-singleton"
            handleCreateClick={handleCreateSingletonClick}
            toggleText="Create singleton"
            options={props.options}
            presets={props.presets}
          />
        )}
        <DropdownCreate
          handleCreateClick={handleCreateClick}
          options={props.options}
          presets={props.presets}
        />
        <DropdownLink handleLinkClick={handleLinkClick} options={props.options} />
      </div>
    </div>
  );
};

MultiComponentField.propTypes = {
  options: PropTypes.array,
  presets: PropTypes.array,
  hydratedEntries: PropTypes.array,
  loadingEntries: PropTypes.object,
  onChange: PropTypes.func,
  schemas: PropTypes.array,
  sdk: PropTypes.object,
  replaceHydratedAsset: PropTypes.func,
  replaceHydratedEntry: PropTypes.func,
  propKey: PropTypes.string,
  useConfigObjects: PropTypes.bool,
  value: PropTypes.array
};

MultiComponentField.defaultProps = {
  options: [],
  presets: [],
  hydratedEntries: [],
  schemas: [],
  useConfigObjects: false,
  loadingEntries: {},
  value: []
};

export default MultiComponentField;
