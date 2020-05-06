import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EntryCard } from '@contentful/forma-36-react-components';
import ComponentEditor from '../../ComponentEditor';
import ActionDropdown from '../../elements/ActionDropdown';
import { schemaTitle } from '../../../utilities/copyUtils';

const Component = props => {
  const [singletonCardOpen, toggleSingletonCard] = useState(false);

  const contentTypeLabel = contentType => {
    let schema = {};

    schema = props.schemas.find(
      schema => schema.meta.id === props.internalMappingInstance.componentId
    );

    if (!schema) return '';

    return `${contentType} | ${(schema.meta || {}).title || (schema.meta || {}).id}`;
  };

  return (
    <div className="component-field-singleton" data-test-id="component-field-singleton">
      <div
        className={`component-field-singleton__editor ${
          props.indent ? 'f36-padding-left--xl' : ''
        }`}>
        <EntryCard
          className="f36-margin-top--s f36-margin-bottom--m"
          testId="singleton-entry-card"
          loading={false}
          title={schemaTitle(props.schema)}
          contentType={contentTypeLabel('Singleton')}
          description={props.schema.meta.description}
          size="default"
          statusIcon={singletonCardOpen ? 'ChevronDown' : 'ChevronUp'}
          onClick={() => toggleSingletonCard(!singletonCardOpen)}
          dropdownListElements={<ActionDropdown handleRemoveClick={props.handleRemoveClick} />}
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
            updateInternalMapping={props.onChange}
            hydratedAssets={props.hydratedAssets}
            hydratedEntries={props.hydratedEntries}
            replaceHydratedAsset={props.replaceHydratedAsset}
            replaceHydratedEntry={props.replaceHydratedEntry}
            internalMappingInstance={props.internalMappingInstance}
            schema={props.schema}
          />
        )}
      </div>
    </div>
  );
};

Component.propTypes = {
  sdk: PropTypes.object,
  schema: PropTypes.object,
  schemas: PropTypes.array,
  onChange: PropTypes.func,
  hydratedAssets: PropTypes.array,
  hydratedEntries: PropTypes.array,
  replaceHydratedEntry: PropTypes.func,
  replaceHydratedAsset: PropTypes.func,
  handleRemoveClick: PropTypes.func,
  internalMappingInstance: PropTypes.object,
  draggable: PropTypes.bool,
  isDragActive: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
  index: PropTypes.number,
  indent: PropTypes.bool
};
Component.defaultProps = {};

export default Component;
