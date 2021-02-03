import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Card, TextLink, SectionHeading } from '@contentful/forma-36-react-components';

import './style.scss';
import { parse_underscore } from '../../../utilities/copyUtils';

class PaletteItem extends React.Component {
  constructor(props) {
    super(props);
    this.STAGING_URL =
      ((props.sdk.parameters || {}).installation || {}).stagingUrl ||
      'https://justworks-staging-v2.herokuapp.com';
    this.uuid =
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36);

    this.state = {
      isOpen: false
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
      isOpen: false
    });
  }

  render() {
    return (
      <div
        className="palette-item click-wrapper"
        data-test-id={`palette-item--${this.props.testId}`}
        data-uuid={this.uuid}>
        <Card
          testId={this.props.testId}
          className={this.props.className}
          selected={this.props.selected}
          onClick={() => this.setState(oldState => ({ isOpen: !oldState.isOpen }))}>
          {this.props.title}
        </Card>
        {this.state.isOpen && (
          <div className="palette-item__dropdown">
            <div>
              <TextLink
                linkType="positive"
                onClick={() => this.props.selectItem(this.props.schema)}>
                Select
              </TextLink>
            </div>
            {!!this.props.schema.pattern_variations.length && (
              <div>
                <SectionHeading className="f36-margin-top--s f36-margin-bottom--s">
                  Pattern Variations
                </SectionHeading>
                {this.props.schema.pattern_variations.map(variation => {
                  return (
                    <div
                      key={`palette-item-variation--${variation.name}`}
                      className="d-flex-row-center-start f36-margin-bottom--xs">
                      <TextLink
                        linkType="positive"
                        onClick={() => this.props.selectItem(this.props.schema, variation)}>
                        {parse_underscore(variation.name)}
                      </TextLink>
                      <a
                        href={`${this.STAGING_URL}/render-component?component=${this.props.schema.meta.id}&pattern_variation=${variation.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="f36-margin-left--xs">
                        <TextLink icon="ExternalLink">Preview</TextLink>
                      </a>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="f36-margin-top--s">
              <TextLink
                href={`${this.STAGING_URL}${this.props.schema.meta.styleguide_path}`}
                target="_blank">
                Styleguide Link
              </TextLink>
            </div>
            <TextLink
              href={`${this.STAGING_URL}/render-component?component=${this.props.schema.meta.id}&example=default`}
              target="_blank">
              Preview Example
            </TextLink>
            <br />
            {!!this.props.extensions.length && (
              <div className="palette-item__extensions">
                <SectionHeading>Extensions</SectionHeading>
                <hr />
                {this.props.extensions.map(extension => {
                  return (
                    <TextLink
                      key={`extension-link--${extension.meta.id}`}
                      linkType="positive"
                      onClick={() => this.props.selectItem(extension)}>
                      {extension.meta.title || extension.meta.id}
                    </TextLink>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

PaletteItem.propTypes = {
  className: PropTypes.string,
  extensions: PropTypes.array,
  sdk: PropTypes.object,
  selected: PropTypes.bool,
  selectItem: PropTypes.func,
  schema: PropTypes.object,
  testId: PropTypes.string,
  title: PropTypes.string
};
PaletteItem.defaultProps = {
  extensions: [],
  selected: PropTypes.bool
};

export default PaletteItem;
