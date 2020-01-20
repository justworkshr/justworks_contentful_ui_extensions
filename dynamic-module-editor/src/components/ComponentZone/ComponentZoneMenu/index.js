import React from 'react';
import PropTypes from 'prop-types';

import { displayCamelCaseName } from '../../../../../shared/utilities/elementUtils';
import {
  RadioButtonField,
  Subheading,
  Heading,
  TextLink
} from '@contentful/forma-36-react-components';

const ComponentZoneMenu = props => {
  return (
    <div key={`component-zone-menu--${props.componentZoneKey}`}>
      <Heading className="sub-section__heading--header" element="h2">
        {displayCamelCaseName(props.componentZoneKey)}
        {props.zoneMappingObject && (
          <TextLink
            className="style-editor__clear-link"
            icon="Close"
            onClick={() => {
              props.clearComponentZone(props.componentZoneKey);
            }}>
            Clear
          </TextLink>
        )}
      </Heading>

      <div className="style-editor__radio-section">
        {Object.keys(props.zoneConfigObject.componentOptions).map(componentOption => {
          return (
            <RadioButtonField
              key={`${props.componentZoneKey}-component-option--${componentOption}`}
              id={`${props.componentZoneKey}-${componentOption}`}
              name={`${props.componentZoneKey}-${componentOption}`}
              labelText={displayCamelCaseName(componentOption)}
              checked={
                props.zoneMappingObject
                  ? props.zoneMappingObject.componentName === componentOption
                  : false
              }
              value={componentOption}
              onChange={e => {
                props.addComponentZone(props.componentZoneKey, componentOption);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

ComponentZoneMenu.propTypes = {
  zoneMappingObject: PropTypes.object,
  zoneConfigObject: PropTypes.object,
  componentZoneKey: PropTypes.string,
  addComponentZone: PropTypes.func,
  clearComponentZone: PropTypes.func
};

ComponentZoneMenu.defaultProps = {
  zoneConfigObject: {},
  zoneMappingObject: {}
};

export default ComponentZoneMenu;
