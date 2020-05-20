import React from 'react';
import PropTypes from 'prop-types';

import { EntryCard } from '@contentful/forma-36-react-components';
import ActionDropdown from '../../elements/ActionDropdown';

import { getStatus } from '@shared/utilities/index';
import classnames from 'classnames';

const renderMissingEntry = props => {
  return (
    <EntryCard
      loading={false}
      testId="missing-entry-card"
      title="Entry is missing or inaccessible."
      size="small"
      dropdownListElements={<ActionDropdown handleRemoveClick={props.handleRemoveClick} />}
    />
  );
};

const HydratedEntryCard = props => {
  if (props.isLoading === null) {
    return renderMissingEntry(props);
  }

  const remove = e => {
    e.preventDefault();
    e.stopPropagation();
    props.handleRemoveClick();
  };

  const getTitle = () => {
    if (props.entry.fields) return (props.entry.fields.name || {})['en-US'] || 'untitled';
    return 'Loading...';
  };

  return (
    <EntryCard
      loading={props.isLoading}
      testId="hydrated-entry-card"
      className={classnames('entry-card', props.className)}
      description={props.description}
      size={props.description ? 'default' : 'small'}
      title={getTitle()}
      contentType={props.contentType}
      status={getStatus(props.entry)}
      selected={props.selected}
      draggable={props.draggable}
      withDragHandle={props.draggable}
      isDragActive={props.isDragActive}
      onMouseDown={props.onDragStart ? () => props.onDragStart(props.index) : null}
      onDragStart={props.onDragStart ? () => props.onDragStart(props.index) : null}
      onDragOver={props.onDragOver ? () => props.onDragOver(props.index) : null}
      onDragEnd={props.onDragEnd}
      onClick={props.onClick}
      dropdownListElements={
        <ActionDropdown handleEditClick={props.handleEditClick} handleRemoveClick={remove} />
      }
    />
  );
};

HydratedEntryCard.propTypes = {
  className: PropTypes.string,
  contentType: PropTypes.string,
  entry: PropTypes.object,
  onClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  handleRemoveClick: PropTypes.func,
  isLoading: PropTypes.bool,
  draggable: PropTypes.bool,
  isDragActive: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
  index: PropTypes.number,
  description: PropTypes.string,
  selected: PropTypes.bool
};
HydratedEntryCard.defaultProps = {
  entry: {}
};

export default HydratedEntryCard;
