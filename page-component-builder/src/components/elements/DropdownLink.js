import React from 'react';
import PropTypes from 'prop-types';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

import { getDropdownOptions, getExtensions, getLabel } from '../../utilities';

class DropdownLink extends React.Component {
  constructor(props) {
    super(props);
    this.uuid =
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36);

    this.state = {
      dropdownOpen: false
    };

    this.closeAllLinks = this.closeAllLinks.bind(this);
  }
  componentDidMount() {
    window.addEventListener('click', this.closeAllLinks);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeAllLinks);
  }

  closeAllLinks(e) {
    // don't fire if this element was the one clicked
    const uuidEl = e.target.closest('.click-wrapper');
    if (uuidEl && uuidEl.dataset.uuid === this.uuid) return;

    this.setState({
      dropdownOpen: false
    });
  }

  render() {
    return (
      <span className="click-wrapper" data-uuid={this.uuid}>
        <Dropdown
          testId={this.props.testId}
          toggleElement={
            <TextLink className="f36-margin-right--s">{this.props.toggleText}</TextLink>
          }
          onClick={() => this.setState(oldState => ({ dropdownOpen: !oldState.dropdownOpen }))}
          isOpen={this.state.dropdownOpen}>
          <DropdownList>
            <DropdownListItem isTitle>Options</DropdownListItem>
            {getDropdownOptions(this.props.options, this.props.schemas).map((option, index) => {
              const schema = this.props.schemas.find(s => s.meta.id === option);
              if (getExtensions(option, this.props.schemas).length) {
                // extensions dropdown
                return (
                  <Dropdown
                    key={`dropdown-link-menu-extension--${option}`}
                    position="right"
                    submenuToggleLabel={getLabel(option, this.props.schemas)}>
                    <DropdownList>
                      <DropdownListItem isTitle>Extensions</DropdownListItem>
                      <DropdownListItem
                        testId={`dropdown-link-extension--${option}`}
                        key={`dropdown-link-extension--${option}`}
                        onClick={() => this.props.handleLinkClick(option)}>
                        {getLabel(option, this.props.schemas)}
                      </DropdownListItem>
                      {getExtensions(option, this.props.schemas).map(schema => {
                        return (
                          <DropdownListItem
                            testId={`dropdown-link-option-extension--${schema.meta.id}`}
                            key={`dropdown-link-option-extension--${schema.meta.id}`}
                            onClick={() => this.props.handleLinkClick(schema.meta.id)}>
                            {getLabel(schema.meta.id, this.props.schemas)}
                          </DropdownListItem>
                        );
                      })}
                    </DropdownList>
                  </Dropdown>
                );
              } else {
                // standard link
                return (
                  <DropdownListItem
                    testId={`dropdown-link-type--${option}`}
                    key={`dropdown-link-type--${option}`}
                    onClick={() => this.props.handleLinkClick(option)}>
                    {getLabel(option, this.props.schemas)}
                  </DropdownListItem>
                );
              }
            })}
          </DropdownList>
        </Dropdown>
      </span>
    );
  }
}

DropdownLink.propTypes = {
  options: PropTypes.array,
  handleLinkClick: PropTypes.func,
  toggleText: PropTypes.string,
  testId: PropTypes.string,
  schemas: PropTypes.array
};

DropdownLink.defaultProps = {
  options: [],
  toggleText: 'Link entry',
  testId: 'dropdown-link',
  schemas: []
};

export default DropdownLink;
