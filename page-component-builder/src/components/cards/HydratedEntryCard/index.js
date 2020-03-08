import React from 'react';
import PropTypes from 'prop-types';

import { DropdownList, DropdownListItem, EntryCard } from '@contentful/forma-36-react-components';

import { getStatus } from '../../../utilities/index';

const HydratedEntryCard = props => {
  return (
    <EntryCard
      loading={props.isLoading}
      testId="hydrated-entry-card"
      className="entry-card"
      size="small"
      title={
        props.entry.fields ? (props.entry.fields.name || {})['en-US'] || 'untitled' : 'Loading...'
      }
      contentType={props.contentType}
      status={getStatus(props.entry)}
      withDragHandle={false}
      onClick={props.handleEditClick}
      dropdownListElements={
        <DropdownList>
          <DropdownListItem isTitle>Actions</DropdownListItem>
          <DropdownListItem className="entry-card__action--edit" onClick={props.handleEditClick}>
            Edit
          </DropdownListItem>

          <DropdownListItem
            className="entry-card__action--remove"
            onClick={props.handleRemoveClick}>
            Remove
          </DropdownListItem>
        </DropdownList>
      }
    />
  );
};

HydratedEntryCard.propTypes = {
  contentType: PropTypes.string,
  entry: PropTypes.object,
  handleEditClick: PropTypes.func,
  handleRemoveClick: PropTypes.func,
  isLoading: PropTypes.bool
};
HydratedEntryCard.defaultProps = {
  entry: {}
};

export default HydratedEntryCard;
