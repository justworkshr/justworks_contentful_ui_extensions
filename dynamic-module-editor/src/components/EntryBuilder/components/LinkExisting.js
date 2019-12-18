import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownList,
  DropdownListItem,
  TextLink
} from '@contentful/forma-36-react-components';

import { roleAllowsAssets } from '../utils';

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
              className="link-entries-row__dropdown--link-entry"
              onClick={() =>
                this.props.onLinkEntryClick(this.props.roleKey, this.props.contentTypes)
              }>
              Link Entry
            </DropdownListItem>
          )}
          {roleAllowsAssets(this.props.fieldTypes) && (
            <DropdownListItem
              className="link-entries-row__dropdown--link-asset"
              onClick={() => this.props.onLinkAssetClick(this.props.roleKey)}>
              Link Asset
            </DropdownListItem>
          )}
          {!!this.props.contentTypes.length && (
            <DropdownListItem
              className="link-entries-row__dropdown--deep-copy"
              onClick={() =>
                this.props.onDeepCopyLinkClick(this.props.roleKey, this.props.contentTypes)
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
  fieldTypes: []
};

LinkExisting.propTypes = {
  onLinkAssetClick: PropTypes.func,
  onLinkEntryClick: PropTypes.func,
  onDeepCopyLinkClick: PropTypes.func,
  contentTypes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  roleKey: PropTypes.string,
  fieldTypes: PropTypes.array
};

export default LinkExisting;
