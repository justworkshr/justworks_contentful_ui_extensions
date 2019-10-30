import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownList,
  DropdownListItem,
  TextLink
} from '@contentful/forma-36-react-components';

class LinkExisting extends React.Component {
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
    return (
      <Dropdown
        toggleElement={
          <TextLink icon="Link" linkType="primary">
            Link existing entry
          </TextLink>
        }
        onClick={this.toggleDropdown}
        isOpen={this.state.isOpen}>
        <DropdownList>
          <DropdownListItem isTitle>Method</DropdownListItem>
          <DropdownListItem
            onClick={() =>
              this.props.onLinkEntryClick(this.props.roleKey, this.props.contentTypes)
            }>
            Link
          </DropdownListItem>
          <DropdownListItem
            onClick={() =>
              this.props.onDeepCloneLinkClick(this.props.roleKey, this.props.contentTypes)
            }>
            Deep clone
          </DropdownListItem>
        </DropdownList>
      </Dropdown>
    );
  }
}

LinkExisting.propTypes = {
  onLinkEntryClick: PropTypes.func,
  onDeepCloneLinkClick: PropTypes.func,
  contentTypes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  roleKey: PropTypes.string
};

export default LinkExisting;
