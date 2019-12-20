import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownList,
  DropdownListItem,
  TextLink
} from '@contentful/forma-36-react-components';

import { displayCamelCaseName } from '../../../../../shared/utilities/elementUtils';
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
        className={this.props.className}
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
            <Dropdown
              position="right"
              submenuToggleLabel="Link entry"
              testId="link-entries-row__dropdown--link-entry-dropdown">
              <DropdownList>
                {this.props.contentTypes.map((contentType, index) => {
                  return (
                    <DropdownListItem
                      key={`dropdown-link-${index}`}
                      testId="link-entries-row__dropdown--link-entry"
                      onClick={() => this.props.onLinkEntryClick(this.props.roleKey, contentType)}>
                      {displayCamelCaseName(contentType)}
                    </DropdownListItem>
                  );
                })}
              </DropdownList>
            </Dropdown>
          )}
          {roleAllowsAssets(this.props.fieldConfigs) && (
            <DropdownListItem
              className="link-entries-row__dropdown--link-asset"
              onClick={() => this.props.onLinkAssetClick(this.props.roleKey)}>
              Link Asset
            </DropdownListItem>
          )}
          {!!this.props.contentTypes.length && (
            <Dropdown
              position="right"
              submenuToggleLabel="Deep copy"
              testId="link-entries-row__dropdown--deep-copy-dropdown">
              <DropdownList>
                {this.props.contentTypes.map((contentType, index) => {
                  return (
                    <DropdownListItem
                      key={`dropdown-deep-copy-${index}`}
                      testId="link-entries-row__dropdown--deep-copy"
                      onClick={() =>
                        this.props.onDeepCopyLinkClick(this.props.roleKey, contentType)
                      }>
                      {displayCamelCaseName(contentType)}
                    </DropdownListItem>
                  );
                })}
              </DropdownList>
            </Dropdown>
          )}
        </DropdownList>
      </Dropdown>
    );
  }
}

LinkExisting.defaultProps = {
  contentTypes: [],
  fieldConfigs: []
};

LinkExisting.propTypes = {
  className: PropTypes.string,
  onLinkAssetClick: PropTypes.func,
  onLinkEntryClick: PropTypes.func,
  onDeepCopyLinkClick: PropTypes.func,
  contentTypes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  roleKey: PropTypes.string,
  fieldConfigs: PropTypes.array
};

export default LinkExisting;
