import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

const DropdownLink = props => {
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
              testId={`dropdown-link-type--${option}`}
              key={`component-option--${index}`}
              onClick={() => props.handleLinkClick(option)}>
              {option}
            </DropdownListItem>
          );
        })}
      </DropdownList>
    </Dropdown>
  );
};

DropdownLink.propTypes = {
  options: PropTypes.array,
  handleLinkClick: PropTypes.func,
  toggleText: PropTypes.string,
  testId: PropTypes.string
};
DropdownLink.defaultProps = {
  options: [],
  toggleText: 'Link entry',
  testId: 'dropdown-link'
};

export default DropdownLink;
