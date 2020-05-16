import React from 'react';
import PropTypes from 'prop-types';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

import { getDropdownOptions } from '../../utilities';

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

  getLabel(component_id) {
    if (!this.props.schemas.length) return component_id;
    const schema = this.props.schemas.find(schema => schema.meta.id === component_id);

    if (schema) {
      return schema.meta.title;
    } else {
      return component_id;
    }
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
            {!!this.props.presets.length && <DropdownListItem isTitle>Presets</DropdownListItem>}
            {!!this.props.presets.length &&
              this.props.presets.map((preset, index) => {
                return (
                  <DropdownListItem
                    testId={`dropdown-preset-type--${preset.name}`}
                    key={`component-preset--${index}`}
                    onClick={() => this.props.handleCreateClick(preset.component_id, preset)}>
                    {preset.name}
                  </DropdownListItem>
                );
              })}
            <DropdownListItem isTitle>Options</DropdownListItem>
            {getDropdownOptions(this.props.options, this.props.schemas).map((option, index) => {
              return (
                <DropdownListItem
                  testId={`dropdown-create-type--${option}`}
                  key={`component-option--${index}`}
                  onClick={() => this.props.handleCreateClick(option)}>
                  {this.getLabel(option)}
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
  schemas: PropTypes.array,
  presets: PropTypes.array,
  handleCreateClick: PropTypes.func,
  toggleText: PropTypes.string,
  testId: PropTypes.string
};

DropdownCreate.defaultProps = {
  options: [],
  presets: [],
  schemas: [],
  toggleText: 'Create entry',
  testId: 'dropdown-create'
};

export default DropdownCreate;
