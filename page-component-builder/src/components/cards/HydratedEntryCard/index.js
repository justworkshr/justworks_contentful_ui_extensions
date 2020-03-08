import React from 'react';
import PropTypes from 'prop-types';

import { DropdownList, DropdownListItem, EntryCard } from '@contentful/forma-36-react-components';

import { getStatus } from '../../../utilities/index';
import classnames from 'classnames';

const HydratedEntryCard = props => {
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
      withDragHandle={false}
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
  isLoading: PropTypes.bool
};
HydratedEntryCard.defaultProps = {
  entry: {}
};

export default HydratedEntryCard;
