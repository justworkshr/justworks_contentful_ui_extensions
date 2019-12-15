import React from 'react';
import PropTypes from 'prop-types';
import { AssetCard, SectionHeading } from '@contentful/forma-36-react-components';

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
                src={
                  (this.props.templates[templateKey].meta.imageUrl ||
                    'https://images.ctfassets.net/mnc2gcng0j8q/75kidbqfOrrZXuzpnxz3dz/2ac73c04f775bae19378a0fd0d32d4c0/JW_MetaImages__LOGO.png') +
                  '?w=300'
                }
              />
            </div>
          );
        })}
      </div>
    );
  }
}

TemplateDisplay.defaultProps = {
  currentTemplateKey: '',
  templates: {}
};

TemplateDisplay.propTypes = {
  currentTemplateKey: PropTypes.string,
  templates: PropTypes.object,
  onTemplateCardClick: PropTypes.func,
  onSwitchButtonClick: PropTypes.func
};

export default TemplateDisplay;