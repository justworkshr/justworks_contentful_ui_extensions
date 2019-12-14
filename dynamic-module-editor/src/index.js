import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {
  DisplayText,
  Paragraph,
  SectionHeading,
  TextInput,
  Textarea,
  FieldGroup,
  RadioButtonField,
  Form
} from '@contentful/forma-36-react-components';

import TemplateTypePalette from './components/TemplateTypePalette';
import ShortTextField from './components/ShortTextField';
import LongTextField from './components/LongTextField';

import { init, locations } from 'contentful-ui-extensions-sdk';

import { customTemplates, templatePlaceholder } from '../../custom_templates/';

import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';
import BooleanRadioField from './components/BooleanRadioField';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      name: props.sdk.entry.fields.name ? props.sdk.entry.fields.name.getValue() : null,
      type: props.sdk.entry.fields.type ? props.sdk.entry.fields.type.getValue() : null,
      isValid: props.sdk.entry.fields.isValid ? props.sdk.entry.fields.isValid.getValue() : null,
      internalMapping: props.sdk.entry.fields.internalMapping
        ? props.sdk.entry.fields.internalMapping.getValue()
        : null
    };
  }

  onNameChangeHandler = event => {
    const value = event.target.value;
    this.setState({ name: value });
    this.props.sdk.entry.fields.name.setValue(value);
  };

  onTypeChangeHandler = value => {
    this.setState({ type: value });
    if (value) {
      this.props.sdk.entry.fields.type.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  onInternalMappingChangeHandler = event => {
    const value = event.target.value;
    console.log(value);
    this.setState({ internalMapping: value });
    this.props.sdk.entry.fields.internalMapping.setValue(value);
  };

  onisValidChangeHandler = event => {
    const isValid = event.target.value === 'yes';
    this.setState({ isValid });
    this.props.sdk.entry.fields.isValid.setValue(isValid);
  };

  render() {
    return (
      <Form className="f36-margin--l">
        <DisplayText>Entry extension demo</DisplayText>
        <Paragraph>
          This demo uses a single UI Extension to render the whole editor for an entry.
        </Paragraph>
        <ShortTextField
          heading="Name"
          testId="field-name"
          onChange={this.onNameChangeHandler}
          value={this.state.name}
        />

        {this.state.type !== null && (
          <div>
            <SectionHeading>Type</SectionHeading>
            <TemplateTypePalette
              customTemplates={customTemplates}
              templatePlaceholder={templatePlaceholder}
              sdk={this.props.sdk}
              onChange={this.onTypeChangeHandler}
              value={this.state.type}
            />
          </div>
        )}

        <LongTextField
          heading="Internal Mapping"
          testId="field-internal-mapping"
          onChange={this.onInternalMappingChangeHandler}
          value={this.state.internalMapping}
        />
        <BooleanRadioField
          heading="Is Valid?"
          testId="field-internal-mapping"
          onChange={this.onisValidChangeHandler}
          value={this.state.isValid}
        />
      </Form>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(<App sdk={sdk} />, document.getElementById('root'));
  }
});
