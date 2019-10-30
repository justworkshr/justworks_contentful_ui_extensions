import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownList,
  DropdownListItem,
  TextLink
} from '@contentful/forma-36-react-components';

class CreateNewLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    return Array.isArray(this.props.contentTypes) ? (
      <Dropdown
        toggleElement={
          <TextLink icon="Plus" linkType="primary">
            Create new entry
          </TextLink>
        }
        onClick={this.toggleDropdown}
        isOpen={this.state.isOpen}>
        <DropdownList>
          <DropdownListItem isTitle>All Content Types</DropdownListItem>
          {this.props.contentTypes.map((contentType, index) => {
            return (
              <DropdownListItem
                key={index}
                onClick={() => this.props.onAddEntryClick(this.props.roleKey, contentType)}>
                {contentType}
              </DropdownListItem>
            );
          })}
        </DropdownList>
      </Dropdown>
    ) : (
      <TextLink
        icon="Plus"
        linkType="primary"
        onClick={() => this.props.onAddEntryClick(this.props.roleKey, this.props.contentTypes)}>
        Create new entry
      </TextLink>
    );
  }
}

CreateNewLink.propTypes = {
  onAddEntryClick: PropTypes.func,
  contentTypes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  roleKey: PropTypes.string
};

export default CreateNewLink;
