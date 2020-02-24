import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../../constants';

import {
  DisplayText,
  Paragraph,
  HelpText,
  SectionHeading,
  TextInput,
  Textarea,
  Button,
  Modal,
  FieldGroup,
  RadioButtonField,
  Form
} from '@contentful/forma-36-react-components';

import ShortTextField from '../fields/ShortTextField';
import RadioGroup from '../fields/RadioGroup';

const ComponentEditor = props => {
  const isShortTextField = (type, options = []) => {
    return type === c.TEXT_PROPERTY && !(options && options.length);
  };

  const isOptionTextField = (type, options = []) => {
    return type === c.TEXT_PROPERTY && options && options.length;
  };

  const updatePropertyValue = (propKey, value) => {
    props.internalMappingInstance.updateValue(propKey, value);
    props.updateInternalMapping(props.internalMappingInstance.asJSON());
  };
  return (
    <div className="component-editor">
      <div className="component-editor__fields">
        {Object.keys(props.schema.properties)
          .filter(propKey => !props.schema.properties[propKey].hidden)
          .map(propKey => {
            const property = props.schema.properties[propKey];
            const value = ((props.internalMappingInstance.properties || {})[propKey] || {}).value;
            return (
              <div
                key={`component-editor-field--${propKey}`}
                testId="editor-field"
                className="component-editor__field f36-margin-bottom--l">
                <div className="component-editor__field-heading f36-margin-bottom--s">
                  <SectionHeading>{propKey}</SectionHeading>
                  <HelpText>{property.description || 'help text'}</HelpText>
                </div>
                {isShortTextField(property.type, property.options) && (
                  <ShortTextField
                    className="f36-margin-bottom--l"
                    onChange={value => updatePropertyValue(propKey, value)}
                    value={value}
                  />
                )}
                {isOptionTextField(property.type, property.options) && (
                  <RadioGroup
                    className="f36-margin-bottom--l"
                    propKey={propKey}
                    options={property.options}
                    onChange={value => updatePropertyValue(propKey, value)}
                    value={value}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

ComponentEditor.propTypes = {
  hydratedAssets: PropTypes.array,
  hydratedEntries: PropTypes.array,
  internalMappingInstance: PropTypes.object,
  schema: PropTypes.object
};
ComponentEditor.defaultProps = {
  hydratedAssets: [],
  hydratedEntries: [],
  internalMappingInstance: {},
  schema: {
    properties: {},
    meta: {}
  }
};

export default ComponentEditor;
