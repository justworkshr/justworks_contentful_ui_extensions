import React from 'react';
import PropTypes from 'prop-types';
import {
  DisplayText,
  Paragraph,
  SectionHeading,
  TextInput,
  Textarea,
  Button,
  Modal,
  FieldGroup,
  RadioButtonField,
  Form
} from '@contentful/forma-36-react-components';

const ComponentEditor = props => {
  console.log(props.schema.properties);
  return (
    <div className="component-editor">
      <div className="component-editor__fields">
        {Object.keys(props.schema.properties)
          .filter(propKey => !props.schema.properties[propKey].hidden)
          .map(propKey => {
            return (
              <div testId="editor-field" className="component-editor__field">
                <SectionHeading className="f36-margin-bottom--l">{propKey}</SectionHeading>
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
