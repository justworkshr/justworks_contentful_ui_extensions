import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';

import SelectComponentModal from '../../SelectComponentModal';
import HydratedEntryCard from '../../cards/HydratedEntryCard';
import DropdownCreate from '../../elements/DropdownCreate';
import DropdownLink from '../../elements/DropdownLink';
import SingletonField from '../SingletonField';
import InternalMapping from '../../../classes/InternalMapping';
import ErrorList from '../ErrorList';

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

    const links = orderedLinks();
    props.onChange(parseEntries(links));

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

  const updateEntry = (entries = [], timeout = false, singletonErrors) => {
    if (entries.length) {
      const parsedEntries = parseEntries(entries);

      props.onChange(
        parsedEntries.filter(e => e),
        timeout,
        singletonErrors
      );
    } else {
      props.onChange([], timeout, singletonErrors);
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
    } catch (error) {
      // entity deleted
      const index = props.value.findIndex(e => (e.sys || {}).id === entry.sys.id);
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

  const updateSingletonEntry = (value, timeout = false, index, errors = {}) => {
    if (Object.keys(errors).length) {
      const errorMessage = 'Please correct all errors in this singleton.';
      errors = { [props.propKey]: [errorMessage] };
    } else {
      errors = { [props.propKey]: [] };
    }

    // pass internal mapping json as raw object
    const entries = props.value;
    entries[index] = JSON.parse(value);
    updateEntry(entries, timeout, errors);
  };

  const handleCreateClick = async (componentId, presetObject = null) => {
    const schema = props.schemas.find(s => s.meta.id === componentId);

    const name = presetObject ? presetObject.name : '';
    const internalMapping = newInternalMappingFromSchema({
      schema,
      presetObject,
      configObject: props.useConfigObjects
    }).asJSON();

    const newEntry = await createEntry(props.sdk.space, c.CONTENT_TYPE_VIEW_COMPONENT, {
      name: {
        'en-US': name
      },
      componentId: {
        'en-US': componentId
      },
      configObject: {
        'en-US': props.useConfigObjects
      },
      internalMapping: {
        'en-US': internalMapping
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

  const isSingleton = linkOrSingleton => {
    return linkOrSingleton.componentId;
  };

  const draggedOverClass = index => {
    if (draggedOver < dragged && index >= draggedOver) return 'dragged-over--down';
    if (draggedOver > dragged && index <= draggedOver) return 'dragged-over--up';
  };

  const renderEntryCards = () => {
    return props.value
      .filter(e => e)
      .map((linkOrSingleton, index) => {
        if (linkOrSingleton.sys) {
          // linked entry
          const entry = props.hydratedEntries.find(
            e => ((e && e.sys) || {}).id === linkOrSingleton.sys.id
          );

          return (
            <HydratedEntryCard
              key={`${props.propKey}-entries--${index}`}
              index={index}
              className={`f36-margin-bottom--xs ${draggedOverClass(index)}`}
              contentType={`${
                entry ? (entry.fields.componentId || {})['en-US'] : c.CONTENT_TYPE_VIEW_COMPONENT
              }`}
              // description={schema ? schema.meta.description : null}
              isLoading={props.loadingEntries[linkOrSingleton.sys.id]}
              onClick={() => handleEditClick(entry)}
              handleEditClick={() => handleEditClick(entry)}
              handleRemoveClick={() => handleRemoveClick(index)}
              draggable={true}
              isDragActive={index === dragged}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
              entry={entry}
            />
          );
        } else if (isSingleton(linkOrSingleton)) {
          // singleton

          const schema = props.schemas.find(s => s.meta.id === linkOrSingleton.componentId);
          return (
            <SingletonField
              key={`${props.propKey}-entries--${index}`}
              className={`${draggedOverClass(index)}`}
              sdk={props.sdk}
              schemas={props.schemas}
              onChange={(value, timeout, errors) =>
                updateSingletonEntry(value, timeout, index, errors)
              }
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
              isDragActive={index === dragged}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
              index={index}
              indent={false}
              onOpen={props.onOpen}
              onClose={props.onClose}
              tokens={props.tokens}
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
        schemas={props.schemas}
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
            schemas={props.schemas}
          />
        )}
        <DropdownCreate
          handleCreateClick={handleCreateClick}
          options={props.options}
          presets={props.presets}
          schemas={props.schemas}
        />
        <DropdownLink
          handleLinkClick={handleLinkClick}
          options={props.options}
          schemas={props.schemas}
        />
      </div>
      <ErrorList errors={props.errors} />
    </div>
  );
};

MultiComponentField.propTypes = {
  errors: PropTypes.array,
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
  value: PropTypes.array,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  tokens: PropTypes.object
};

MultiComponentField.defaultProps = {
  errors: [],
  options: [],
  presets: [],
  hydratedEntries: [],
  schemas: [],
  useConfigObjects: false,
  loadingEntries: {},
  value: [],
  tokens: {}
};

export default MultiComponentField;
