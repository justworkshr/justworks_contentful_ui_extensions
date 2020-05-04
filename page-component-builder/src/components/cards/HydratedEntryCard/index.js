import React from 'react';
import PropTypes from 'prop-types';

import { DropdownList, DropdownListItem, EntryCard } from '@contentful/forma-36-react-components';

import { getStatus } from '../../../utilities/index';
import classnames from 'classnames';

const renderMissingEntry = props => {
  return (
    <EntryCard
      loading={false}
      testId="missing-entry-card"
      title="Entry is missing or corrupted. Please remove"
      size="small"
      dropdownListElements={
        !!(props.handleRemoveClick || props.handleEditClick) ? (
          <DropdownList>
            <DropdownListItem isTitle>Actions</DropdownListItem>
            {props.handleRemoveClick && (
              <DropdownListItem
                className="entry-card__action--remove"
                onClick={props.handleRemoveClick}>
                Remove
              </DropdownListItem>
            )}
          </DropdownList>
        ) : null
      }
    />
  );
};

const HydratedEntryCard = props => {
  if (props.isLoading === null) {
    return renderMissingEntry(props);
  }
  return (
    <EntryCard
      loading={props.isLoading}
      testId="hydrated-entry-card"
      className={classnames('entry-card', props.className)}
      size="small"
      title={
        props.entry.fields ? (props.entry.fields.name || {})['en-US'] || 'untitled' : 'Loading...'
      }
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
        !!(props.handleRemoveClick || props.handleEditClick) ? (
          <DropdownList>
            <DropdownListItem isTitle>Actions</DropdownListItem>
            {props.handleEditClick && (
              <DropdownListItem
                className="entry-card__action--edit"
                onClick={props.handleEditClick}>
                Edit
              </DropdownListItem>
            )}
            {props.handleRemoveClick && (
              <DropdownListItem
                className="entry-card__action--remove"
                onClick={props.handleRemoveClick}>
                Remove
              </DropdownListItem>
            )}
          </DropdownList>
        ) : null
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
  selected: PropTypes.bool
};
HydratedEntryCard.defaultProps = {
  entry: {}
};

export default HydratedEntryCard;
