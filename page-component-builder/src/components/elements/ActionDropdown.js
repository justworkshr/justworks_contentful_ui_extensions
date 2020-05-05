import React from 'react';
import PropTypes from 'prop-types';

import { DropdownList, DropdownListItem } from '@contentful/forma-36-react-components';

const ActionDropdown = props => {
  if (!(props.handleEditClick || props.handleRemoveClick)) return null;
  return (
    <DropdownList testId="hydrated-entry-actions">
      <DropdownListItem isTitle>Actions</DropdownListItem>
      {props.handleEditClick && (
        <DropdownListItem
          testId="action-dropdown--edit"
          className="entry-card__action--edit"
          onClick={props.handleEditClick}>
          Edit
        </DropdownListItem>
      )}
      {props.handleRemoveClick && (
        <DropdownListItem
          testId="action-dropdown--remove"
          className="entry-card__action--remove"
          onClick={props.handleRemoveClick}>
          Remove
        </DropdownListItem>
      )}
    </DropdownList>
  );
};

ActionDropdown.propTypes = {
  handleEditClick: PropTypes.func,
  handleRemoveClick: PropTypes.func
};
ActionDropdown.defaultProps = {};

export default ActionDropdown;
