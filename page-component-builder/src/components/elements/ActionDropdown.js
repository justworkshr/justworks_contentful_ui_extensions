import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, DropdownList, DropdownListItem } from '@contentful/forma-36-react-components';

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
      {props.switchVariation && !!props.patternVariations.length && (
        <Dropdown
          testId="hydrated-entry-actions"
          submenuToggleLabel="Switch Variation"
          position="left">
          <DropdownList>
            {props.patternVariations.map(variation => {
              return (
                <DropdownListItem
                  key={`variation--${variation.name}`}
                  testId="action-dropdown--switch"
                  className="entry-card__action--switch"
                  onClick={() => props.switchVariation(variation.name)}>
                  {variation.name}
                </DropdownListItem>
              );
            })}
          </DropdownList>
        </Dropdown>
      )}
      {props.convertToEntry && (
        <DropdownListItem
          testId="action-dropdown--convert"
          className="entry-card__action--convert"
          onClick={props.convertToEntry}>
          Convert to entry
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
  handleRemoveClick: PropTypes.func,
  convertToEntry: PropTypes.func,
  switchVariation: PropTypes.func,
  patternVariations: PropTypes.array
};
ActionDropdown.defaultProps = {
  patternVariations: []
};

export default ActionDropdown;
