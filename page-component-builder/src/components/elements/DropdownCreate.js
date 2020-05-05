import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

const DropdownCreate = props => {
  const [dropdownOpen, toggleDropdown] = useState(false);

  return (
    <Dropdown
      testId={props.testId}
      toggleElement={<TextLink className="f36-margin-right--s">{props.toggleText}</TextLink>}
      onClick={() => toggleDropdown(!dropdownOpen)}
      isOpen={dropdownOpen}>
      <DropdownList>
        <DropdownListItem isTitle>Options</DropdownListItem>
        {props.options.map((option, index) => {
          return (
            <DropdownListItem
              testId={`dropdown-create-type--${option}`}
              key={`component-option--${index}`}
              onClick={() => props.handleCreateClick(option)}>
              {option}
            </DropdownListItem>
          );
        })}
      </DropdownList>
    </Dropdown>
  );
};

DropdownCreate.propTypes = {
  options: PropTypes.array,
  handleCreateClick: PropTypes.func,
  toggleText: PropTypes.string,
  testId: PropTypes.string
};
DropdownCreate.defaultProps = {
  options: [],
  toggleText: 'Create entry',
  testId: 'dropdown-create'
};

export default DropdownCreate;
