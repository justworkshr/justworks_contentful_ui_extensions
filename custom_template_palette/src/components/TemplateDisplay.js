import React from 'react';
import PropTypes from 'prop-types';
import { Button, AssetCard, SectionHeading } from '@contentful/forma-36-react-components';

class TemplateDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="template-display">
        {Object.keys(this.props.templates).map((templateKey, index) => {
          const templateName = templateKey
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          const isCurrent = this.props.currentTemplateKey === templateKey;
          const clickFunction = !isCurrent
            ? () => this.props.onTemplateCardClick(templateName)
            : null;
          return (
            <div
              tabIndex={-1}
              className={`template-display__card ${isCurrent ? 'selected' : ''}`}
              key={`template-${index}`}
              role="button"
              onKeyPress={clickFunction}
              onClick={clickFunction}>
              <SectionHeading>{templateName}</SectionHeading>
              <AssetCard
                size="small"
                title={templateName}
                src={this.props.templates[templateKey].meta.imageUrl + '?w=300'}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

TemplateDisplay.defaultProps = {
  currentTemplateKey: {},
  templates: {}
};

TemplateDisplay.propTypes = {
  currentTemplateKey: PropTypes.object,
  templates: PropTypes.object,
  onTemplateCardClick: PropTypes.func,
  onSwitchButtonClick: PropTypes.func
};

export default TemplateDisplay;
