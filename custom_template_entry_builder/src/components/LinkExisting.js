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
        className="link-entries-row__button"
        toggleElement={
          <TextLink icon="Link" linkType="primary">
            Link existing
          </TextLink>
        }
        onClick={this.toggleDropdown}
        isOpen={this.state.isOpen}>
        <DropdownList>
          <DropdownListItem isTitle>Actions</DropdownListItem>
          {!!this.props.contentTypes.length && (
            <DropdownListItem
              onClick={() =>
                this.props.onLinkEntryClick(this.props.roleKey, this.props.contentTypes)
              }>
              Link Entry
            </DropdownListItem>
          )}
          {this.props.linkAsset && (
            <DropdownListItem onClick={() => this.props.onLinkAssetClick(this.props.roleKey)}>
              Link Asset
            </DropdownListItem>
          )}
          {!!this.props.contentTypes.length && (
            <DropdownListItem
              onClick={() =>
                this.props.onDeepCloneLinkClick(this.props.roleKey, this.props.contentTypes)
              }>
              Deep copy
            </DropdownListItem>
          )}
        </DropdownList>
      </Dropdown>
    );
  }
}

LinkExisting.defaultProps = {
  contentTypes: [],
  linkAsset: false
};

LinkExisting.propTypes = {
  onLinkAssetClick: PropTypes.func,
  onLinkEntryClick: PropTypes.func,
  onDeepCloneLinkClick: PropTypes.func,
  contentTypes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  linkAsset: PropTypes.bool,
  roleKey: PropTypes.string
};

export default LinkExisting;
