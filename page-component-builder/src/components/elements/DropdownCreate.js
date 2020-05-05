import React from 'react';
import PropTypes from 'prop-types';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

class DropdownCreate extends React.Component {
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
            {this.props.options.map((option, index) => {
              return (
                <DropdownListItem
                  testId={`dropdown-create-type--${option}`}
                  key={`component-option--${index}`}
                  onClick={() => this.props.handleCreateClick(option)}>
                  {option}
                </DropdownListItem>
              );
            })}
          </DropdownList>
        </Dropdown>
      </span>
    );
  }
}

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
