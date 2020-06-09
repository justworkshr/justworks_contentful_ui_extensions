import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '@shared/constants';

import { EntryCard } from '@contentful/forma-36-react-components';
import ComponentEditor from '../../ComponentEditor';
import ActionDropdown from '../../elements/ActionDropdown';
import { constructLink, createEntry } from '@shared/utilities/index';

import './style.scss';
import { newInternalMappingFromSchema } from '../../../../../shared/utilities';
import { parse_underscore } from '../../../utilities/copyUtils';

const SingletonField = props => {
  const [singletonCardOpen, toggleSingletonCard] = useState(false);

  const contentTypeLabel = contentType => {
    let schema = {};

    schema = props.schemas.find(
      schema => schema.meta.id === props.internalMappingInstance.componentId
    );

    if (!schema) return '';

    return `${contentType} | ${(schema.meta || {}).title || (schema.meta || {}).id}`;
  };

  const convertToEntry = async e => {
    e.preventDefault();
    e.stopPropagation();

    const fields = {
      componentId: {
        'en-US': props.internalMappingInstance.componentId
      },
      internalMapping: {
        'en-US': props.internalMappingInstance.asJSON()
      },
      entries: {
        'en-US': props.internalMappingInstance.entries
      },
      assets: {
        'en-US': props.internalMappingInstance.assets
      }
    };
    const newEntry = await createEntry(props.sdk.space, c.CONTENT_TYPE_VIEW_COMPONENT, fields);

    const navigator = await props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    const newEntryLink = constructLink(newEntry);
    props.onChange(JSON.stringify(newEntryLink));
  };

  const switchVariation = variationName => {
    const variation = props.schema.pattern_variations.find(v => v.name === variationName);
    if (!variation) return;
    const newValue = newInternalMappingFromSchema({
      schema: props.schema,
      presetObject: variation
    });

    props.onChange(newValue.asJSON());
  };

  const getTitle = () => {
    const schema = props.schemas.find(
      schema => schema.meta.id === props.internalMappingInstance.componentId
    );

    if (!schema) return '';

    const autoTitlePropKey = Object.keys(schema.properties).find(prop => {
      return schema.properties[prop].auto_title;
    });
    // auto_title value, or preset_name value, or meta title
    return parse_underscore(
      (props.internalMappingInstance.properties[autoTitlePropKey] || {}).value ||
        (props.internalMappingInstance.properties.preset_name || {}).value ||
        props.schema.meta.title
    );
  };

  return (
    <div className="component-field-singleton" data-test-id="component-field-singleton">
      <div
        className={`component-field-singleton__editor ${
          props.indent ? 'f36-padding-left--xl' : ''
        }`}>
        <EntryCard
          className={`f36-margin-top--s f36-margin-bottom--m ${props.className}`}
          testId="singleton-entry-card"
          loading={false}
          title={getTitle()}
          contentType={contentTypeLabel('Singleton')}
          // description={props.schema.meta.description}
          size="small"
          statusIcon={singletonCardOpen ? 'ChevronDown' : 'ChevronUp'}
          onClick={() => {
            if (singletonCardOpen) {
              toggleSingletonCard(false);
              props.onClose();
            } else {
              toggleSingletonCard(true);
              props.onOpen();
            }
          }}
          dropdownListElements={
            <ActionDropdown
              patternVariations={(props.schema || {}).pattern_variations}
              switchVariation={switchVariation}
              convertToEntry={convertToEntry}
              handleDuplicateClick={props.handleDuplicateClick}
              handleRemoveClick={props.handleRemoveClick}
            />
          }
          draggable={props.draggable}
          withDragHandle={props.draggable}
          isDragActive={props.isDragActive}
          onMouseDown={props.onDragStart ? () => props.onDragStart(props.index) : null}
          onDragStart={props.onDragStart ? () => props.onDragStart(props.index) : null}
          onDragOver={props.onDragOver ? () => props.onDragOver(props.index) : null}
          onDragEnd={props.onDragEnd}
        />
        {!!singletonCardOpen && (
          <ComponentEditor
            sdk={props.sdk}
            schemas={props.schemas}
            updateInternalMapping={(value, timeout, errors) =>
              props.onChange(value, timeout, errors)
            }
            hydratedAssets={props.hydratedAssets}
            hydratedEntries={props.hydratedEntries}
            replaceHydratedAsset={props.replaceHydratedAsset}
            replaceHydratedEntry={props.replaceHydratedEntry}
            internalMappingInstance={props.internalMappingInstance}
            schema={props.schema}
            isOpen={singletonCardOpen}
            tokens={props.tokens}
          />
        )}
      </div>
    </div>
  );
};

SingletonField.propTypes = {
  className: PropTypes.string,
  sdk: PropTypes.object,
  schema: PropTypes.object,
  schemas: PropTypes.array,
  onChange: PropTypes.func,
  hydratedAssets: PropTypes.array,
  hydratedEntries: PropTypes.array,
  replaceHydratedEntry: PropTypes.func,
  replaceHydratedAsset: PropTypes.func,
  handleRemoveClick: PropTypes.func,
  handleDuplicateClick: PropTypes.func,
  internalMappingInstance: PropTypes.object,
  draggable: PropTypes.bool,
  isDragActive: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
  index: PropTypes.number,
  indent: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  tokens: PropTypes.object
};
SingletonField.defaultProps = {
  tokens: {},
  schemas: [],
  onOpen: () => {}
};

export default SingletonField;
