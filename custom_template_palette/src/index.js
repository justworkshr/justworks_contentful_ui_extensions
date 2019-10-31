import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Button, DisplayText, EmptyState } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import { customTemplates, templatePlaceholder } from '../../custom_templates';

import TemplateDisplay from './components/TemplateDisplay';

import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);

    const value = props.sdk.field.getValue() || '';
    this.state = {
      value: value,
      templateMapping: customTemplates[value.toLowerCase()] || templatePlaceholder,
      displayingTemplates: false
    };

    this.onSwitchButtonClick = this.onSwitchButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    if (value) {
      this.setState({
        value,
        templateMapping: customTemplates[value.toLowerCase()] || templatePlaceholder
      });
    }
  };

  onChange = e => {
    const value = e.currentTarget.value;
    this.setState({ value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  onSwitchButtonClick = async () => {
    if (this.state.displayingTemplates) return this.toggleDisplay();
    const confirm = await this.props.sdk.dialogs.openConfirm({
      title: 'Warning',
      message:
        'Selecting a new template in the next screen will remove all entries that are linked to this template below. They will not be archived or deleted.',
      confirmLabel: 'Ok',
      cancelLabel: 'Cancel',
      intent: 'negative'
    });

    if (confirm) {
      this.toggleDisplay();
    }
  };

  toggleDisplay = () => {
    this.setState(prevState => ({
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
      this.props.sdk.field.setValue(templateName);
      this.toggleDisplay();
    }
  };

  render() {
    if (!!this.state.value && !this.state.templateMapping)
      return <DisplayText>No "{this.state.value}" template found.</DisplayText>;

    return this.state.displayingTemplates ? (
      <div>
        <TemplateDisplay
          currentTemplateKey={this.state.value.toLowerCase()}
          onTemplateCardClick={this.onTemplateCardClick}
          templates={customTemplates}
        />
        <Button
          className="palette__switch-button"
          isFullWidth={true}
          size="small"
          buttonType="muted"
          onClick={this.onSwitchButtonClick}>
          Cancel
        </Button>
      </div>
    ) : (
      <div className="custom-template__palette">
        {this.state.templateMapping.meta.imageUrl && (
          <img
            className="palette__example-image"
            src={this.state.templateMapping.meta.imageUrl + '?w=800'}
            alt="Template example."
            onLoad={() => this.props.sdk.window.updateHeight()}
          />
        )}

        <EmptyState
          className="palette__meta"
          headingProps={{ text: this.props.sdk.field.getValue() }}
          descriptionProps={{ text: this.state.templateMapping.meta.description }}
        />
        <hr />
        <Button
          buttonType="primary"
          className="palette__switch-button"
          size="small"
          isFullWidth={true}
          onClick={this.onSwitchButtonClick}>
          Switch Template
        </Button>
      </div>
    );
    // return (
    //   <TextInput
    //     width="large"
    //     type="text"
    //     id="my-field"
    //     testId="my-field"
    //     value={this.state.value}
    //     onChange={this.onChange}
    //   />
    // );
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
