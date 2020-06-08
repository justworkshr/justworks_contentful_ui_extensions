import React from 'react';
import PropTypes from 'prop-types';

import {
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

import { getDropdownOptions, getExtensions, getLabel } from '../../utilities';
import { parse_underscore } from '../../utilities/copyUtils';

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
              const schema = this.props.schemas.find(s => s.meta.id === option);

              if (getExtensions(option, this.props.schemas).length) {
                // extensions dropdown
                return (
                  <Dropdown
                    key={`dropdown-create-menu-extension--${option}`}
                    position="right"
                    submenuToggleLabel={getLabel(option, this.props.schemas)}>
                    <DropdownList>
                      <DropdownListItem isTitle>Extensions</DropdownListItem>
                      <DropdownListItem
                        testId={`dropdown-create-extension--${option}`}
                        key={`dropdown-create-extension--${option}`}
                        onClick={() => this.props.handleCreateClick(option)}>
                        {getLabel(option, this.props.schemas)}
                      </DropdownListItem>
                      {getExtensions(option, this.props.schemas).map(schema => {
                        return (
                          <DropdownListItem
                            testId={`dropdown-create-option-extension--${schema.meta.id}`}
                            key={`dropdown-create-option-extension--${schema.meta.id}`}
                            onClick={() => this.props.handleCreateClick(schema.meta.id)}>
                            {getLabel(schema.meta.id, this.props.schemas)}
                          </DropdownListItem>
                        );
                      })}
                    </DropdownList>
                  </Dropdown>
                );
              } else if (schema && schema.pattern_variations.length) {
                return (
                  <Dropdown
                    testId="dropdown-link--variations"
                    submenuToggleLabel={getLabel(option, this.props.schemas)}
                    position="left"
                    onClick={() => this.props.handleCreateClick(option)}>
                    <DropdownList>
                      {schema.pattern_variations.map(variation => {
                        return (
                          <DropdownListItem
                            key={`variation--${variation.name}`}
                            testId="action-dropdown--switch"
                            className="entry-card__action--switch"
                            onClick={() =>
                              this.props.handleCreateClick(variation.component_id, variation)
                            }>
                            {parse_underscore(variation.name)}
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
                    testId={`dropdown-create-type--${option}`}
                    key={`dropdown-create-type--${option}`}
                    onClick={() => this.props.handleCreateClick(option)}>
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
