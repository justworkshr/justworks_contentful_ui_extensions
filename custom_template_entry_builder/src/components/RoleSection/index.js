import React from 'react';
import PropTypes from 'prop-types';

import {
  FormLabel,
  HelpText,
  ValidationMessage,
  IconButton,
  SectionHeading
} from '@contentful/forma-36-react-components';

import { isDirectField, displaySnakeCaseName } from '../../utils';

const RoleSection = props => {
  return (
    <div className="role-section">
      <div className="role-section__header-section ">
        <FormLabel
          className="role-section__heading"
          htmlFor=""
          required={props.roleConfigObject.required}>
          <SectionHeading>{displaySnakeCaseName(props.roleKey)}</SectionHeading>
        </FormLabel>
        {!!props.roleConfigObject.field && isDirectField(props.roleConfigObject.field.type) && (
          <IconButton
            className="role-section__remove-field"
            iconProps={{ icon: 'Close', size: 'large' }}
            buttonType="negative"
            label="Remove Field"
            onClick={() => props.onRemoveFieldClick(props.roleKey)}
          />
        )}
      </div>
      <HelpText>{props.roleConfigObject.description}</HelpText>
      {props.renderEntryFields(
        props.roleKey,
        props.roleConfigObject,
        props.roleMappingObject,
        props.entry
      )}

      {!!(props.stateErrors[props.roleKey] || {}).length &&
        props.stateErrors[props.roleKey].map((error, index) => {
          return (
            <ValidationMessage key={`error-${props.roleKey}-${index}`}>
              {error.message}
            </ValidationMessage>
          );
        })}
    </div>
  );
};

RoleSection.propTypes = {
  entry: PropTypes.object,
  roleMappingObject: PropTypes.object,
  roleKey: PropTypes.string,
  roleConfigObject: PropTypes.object,
  renderEntryFields: PropTypes.func,
  stateErrors: PropTypes.object,
  onRemoveFieldClick: PropTypes.func
};

RoleSection.defaultProps = {
  entry: undefined,
  roleConfigObject: {},
  roleMappingObject: {},
  stateErrors: {}
};

export default RoleSection;
