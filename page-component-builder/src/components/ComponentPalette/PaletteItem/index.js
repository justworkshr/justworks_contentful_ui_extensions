import React from 'react';
import PropTypes from 'prop-types';

import { Card, TextLink, SectionHeading } from '@contentful/forma-36-react-components';

import './style.scss';

class PaletteItem extends React.Component {
  constructor(props) {
    super(props);
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
            <div>
              <TextLink
                href={`https://justworks-staging-v2.herokuapp.com${this.props.schema.meta.styleguide_path}`}
                target="_blank">
                Styleguide Link
              </TextLink>
            </div>
            <div>
              <TextLink
                href={`https://justworks-staging-v2.herokuapp.com/render-component?component=${this.props.schema.meta.id}&example=default`}
                target="_blank">
                Preview Link
              </TextLink>
            </div>
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
