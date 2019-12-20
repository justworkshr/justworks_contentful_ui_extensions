import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownList,
  DropdownListItem,
  TextLink
} from '@contentful/forma-36-react-components';
import * as c from '../../../../../customModules/constants';
import { roleAllowsAssets } from '../utils';
import { displayCamelCaseName } from '../../../../../shared/utilities/elementUtils';

// TODO - refactor to use react hooks
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

  renderAssetDropdownItem() {
    return (
      <DropdownListItem
        testId="create-new-link__dropdown-asset"
        onClick={() =>
          this.props.onAddEntryClick({
            roleKey: this.props.roleKey,
            type: 'asset'
          })
        }>
        asset
      </DropdownListItem>
    );
  }

  renderMultipleContentTypes() {
    return (
      <Dropdown
        className={this.props.className}
        toggleElement={
          <TextLink icon="Plus" linkType="primary">
            Create new
          </TextLink>
        }
        onClick={this.toggleDropdown}
        isOpen={this.state.isOpen}>
        <DropdownList>
          <DropdownListItem isTitle>Types</DropdownListItem>
          {roleAllowsAssets(this.props.fieldConfigs) && this.renderAssetDropdownItem()}
          {this.props.contentTypes.map((contentType, index) => {
            return contentType === c.CONTENT_TYPE_CUSTOM_TEMPLATE &&
              !!this.props.allowedCustomTemplates.length ? (
              <Dropdown
                testId="create-new-link__dropdown-custom-type"
                key={`dropdown-${index}`}
                position="right"
                submenuToggleLabel={displayCamelCaseName(contentType)}>
                <DropdownList>
                  {this.props.allowedCustomTemplates.map((allowedTemplate, index) => {
                    return (
                      <DropdownListItem
                        key={`allowed-${index}`}
                        testId="create-new-link__custom-type"
                        onClick={() =>
                          this.props.onAddEntryClick({
                            roleKey: this.props.roleKey,
                            contentType,
                            template: allowedTemplate
                          })
                        }>
                        {allowedTemplate}
                      </DropdownListItem>
                    );
                  })}
                </DropdownList>
              </Dropdown>
            ) : (
              <DropdownListItem
                key={`dropdown-${contentType}`}
                testId="create-new-link__dropdown-content-type"
                onClick={() =>
                  this.props.onAddEntryClick({ roleKey: this.props.roleKey, contentType })
                }>
                {displayCamelCaseName(contentType)}
              </DropdownListItem>
            );
          })}
        </DropdownList>
      </Dropdown>
    );
  }

  renderSingleContentTypeAndAsset() {
    return (
      <Dropdown
        className={this.props.className}
        toggleElement={
          <TextLink icon="Plus" linkType="primary">
            Create new
          </TextLink>
        }
        onClick={this.toggleDropdown}
        isOpen={this.state.isOpen}>
        <DropdownList>
          <DropdownListItem isTitle>Types</DropdownListItem>
          {this.renderAssetDropdownItem()}
          <DropdownListItem
            testId="create-new-link__dropdown-content-type"
            onClick={() =>
              this.props.onAddEntryClick({
                roleKey: this.props.roleKey,
                contentType: this.props.contentTypes
              })
            }>
            {this.props.contentTypes}
          </DropdownListItem>
        </DropdownList>
      </Dropdown>
    );
  }

  render() {
    if (Array.isArray(this.props.contentTypes)) {
      return this.renderMultipleContentTypes();
    } else if (!!this.props.contentTypes && roleAllowsAssets(this.props.fieldConfigs)) {
      return this.renderSingleContentTypeAndAsset();
    } else if (this.props.contentTypes) {
      return (
        <TextLink
          icon="Plus"
          linkType="primary"
          className={this.props.className}
          onClick={() =>
            this.props.onAddEntryClick({
              roleKey: this.props.roleKey,
              contentType: this.props.contentTypes
            })
          }>
          Create new entry
        </TextLink>
      );
    } else if (roleAllowsAssets(this.props.fieldConfigs)) {
      return (
        <TextLink
          icon="Plus"
          linkType="primary"
          className={this.props.className}
          onClick={() =>
            this.props.onAddEntryClick({
              roleKey: this.props.roleKey,
              contentType: this.props.contentTypes,
              type: 'asset'
            })
          }>
          Create new asset
        </TextLink>
      );
    } else {
      return null;
    }
  }
}

CreateNewLink.defaultProps = {
  allowedCustomTemplates: []
};

CreateNewLink.propTypes = {
  onAddEntryClick: PropTypes.func,
  className: PropTypes.string,
  contentTypes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  roleKey: PropTypes.string,
  allowedCustomTemplates: PropTypes.array,
  fieldConfigs: PropTypes.array.isRequired
};

export default CreateNewLink;
