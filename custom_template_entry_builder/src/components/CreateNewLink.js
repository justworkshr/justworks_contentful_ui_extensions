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
            return contentType === 'customTemplate' &&
              !!this.props.allowedCustomTemplates.length ? (
              <Dropdown key={`dropdown-${index}`} position="right" submenuToggleLabel={contentType}>
                <DropdownList>
                  {this.props.allowedCustomTemplates.map((allowedTemplate, index) => {
                    return (
                      <DropdownListItem
                        key={`allowed-${index}`}
                        onClick={() =>
                          this.props.onAddEntryClick(
                            this.props.roleKey,
                            contentType,
                            allowedTemplate
                          )
                        }>
                        {allowedTemplate}
                      </DropdownListItem>
                    );
                  })}
                </DropdownList>
              </Dropdown>
            ) : (
              <DropdownListItem
                key={`dropdown-${index}`}
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

CreateNewLink.defaultProps = {
  allowedCustomTemplates: []
};

CreateNewLink.propTypes = {
  onAddEntryClick: PropTypes.func,
  contentTypes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  roleKey: PropTypes.string,
  allowedCustomTemplates: PropTypes.array
};

export default CreateNewLink;
