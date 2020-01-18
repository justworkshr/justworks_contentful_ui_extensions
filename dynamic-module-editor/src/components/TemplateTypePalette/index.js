import React from 'react';
import PropTypes from 'prop-types';
import { Button, DisplayText, EmptyState } from '@contentful/forma-36-react-components';

import TemplateDisplay from './components/TemplateDisplay';

import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export default class TemplateTypePalette extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
    customTemplates: PropTypes.object,
    templatePlaceholder: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.string
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      templateConfig: props.customTemplates[props.value] || props.templatePlaceholder,
      displayingTemplates: !props.customTemplates[props.value]
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSwitchButtonClick = this.onSwitchButtonClick.bind(this);
  }

  onSwitchButtonClick = async () => {
    if (this.state.displayingTemplates) return this.toggleDisplay();
    if (this.props.customTemplates[this.state.value]) {
      const confirm = await this.props.sdk.dialogs.openConfirm({
        title: 'Warning',
        message: 'Switching templates will clear the entry.',
        confirmLabel: 'Ok',
        cancelLabel: 'Cancel',
        intent: 'negative'
      });

      if (confirm) {
        this.toggleDisplay();
      }
    } else {
      this.toggleDisplay();
    }
  };

  toggleDisplay = () => {
    this.setState(prevState => ({
      templateConfig:
        this.props.customTemplates[this.props.value] || this.props.templatePlaceholder,
      displayingTemplates: !prevState.displayingTemplates
    }));
  };

  onTemplateCardClick = async templateName => {
    const confirm = await this.props.sdk.dialogs.openConfirm({
      title: 'Proceed?',
      message: `Are you sure you want to choose ${templateName}?`,
      confirmLabel: 'Yes',
      cancelLabel: 'No',
      intent: 'positive'
    });

    if (confirm) {
      this.handleChange(templateName);
      this.toggleDisplay();
    }
  };

  handleChange(value) {
    this.setState({
      value
    });
    this.props.onChange(value);
  }

  render() {
    if (!!this.state.value && !this.state.templateConfig)
      return <DisplayText>No "{this.state.value}" template found.</DisplayText>;

    return this.state.displayingTemplates ? (
      <div>
        <TemplateDisplay
          currentTemplateKey={this.state.value}
          onTemplateCardClick={this.onTemplateCardClick}
          templates={this.props.customTemplates}
        />
        <Button
          className="palette__switch-button"
          size="small"
          buttonType="muted"
          onClick={this.onSwitchButtonClick}>
          Cancel
        </Button>
      </div>
    ) : (
      <div className="custom-template__palette  max-width-900">
        {this.state.templateConfig.meta.imageUrl && (
          <img
            className="palette__example-image"
            src={this.state.templateConfig.meta.imageUrl + '?w=800'}
            alt="Template example."
          />
        )}

        <EmptyState
          className="palette__meta"
          headingProps={{ text: this.state.value }}
          descriptionProps={{ text: this.state.templateConfig.meta.description }}
        />
        <hr />
        <Button
          buttonType="primary"
          className="palette__switch-button"
          size="small"
          onClick={this.onSwitchButtonClick}>
          Switch Template
        </Button>
      </div>
    );
  }
}

TemplateTypePalette.defaultProps = {
  value: ''
};
