import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../../../custom_templates/constants';

import {
  FormLabel,
  TextLink,
  RadioButtonField,
  HelpText
} from '@contentful/forma-36-react-components';

import { getSectionedClassName, getSectionValue } from '../utils/styleEditorUtils';

const ColorStyle = props => {
  return (
    <div className="style-section">
      <FormLabel htmlFor="">{`${props.label}${
        props.sectionLabel ? '(' + props.sectionLabel + ')' : ''
      }`}</FormLabel>
      <TextLink
        className="style-editor__clear-link"
        icon="Close"
        onClick={() =>
          props.onClear(
            props.styleClasses.map(classObject =>
              getSectionedClassName(props.section, classObject.className)
            )
          )
        }>
        Clear
      </TextLink>
      {props.helpText && <HelpText>{props.helpText}</HelpText>}
      <div className="style-editor__inline-input-section">
        {props.styleClasses.map((classObject, index) => {
          const color = c.COLORS.find(color => color.label === classObject.label);
          const fieldId = `radio-${props.roleKey}-${props.section}-${classObject.className}`;
          return (
            <div className="style-editor__radio-section" key={`text-color-section-${index}`}>
              <RadioButtonField
                id={fieldId}
                className="style-editor__radio-field style-editor__color-radio"
                checked={props.classString
                  .split(' ')
                  .filter(e => e)
                  .includes(getSectionedClassName(props.section, classObject.className))}
                helpText={color.hexValue}
                labelText={classObject.label}
                value={classObject.className}
                labelIsLight={true}
                onChange={e =>
                  props.onChange(
                    getSectionValue(e, props.section),
                    props.classString,
                    props.styleClasses.map(classObject => ({
                      ...classObject,
                      className: getSectionedClassName(props.section, classObject.className)
                    }))
                  )
                }
              />
              <div className="style-editor__color-section">
                <div
                  className="style-editor__color-box"
                  style={{
                    backgroundColor: color.hexValue
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ColorStyle.propTypes = {
  classString: PropTypes.string,
  helpText: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  roleKey: PropTypes.string,
  section: PropTypes.string,
  sectionLabel: PropTypes.string,
  styleClasses: PropTypes.array
};

ColorStyle.defaultProps = {
  classString: '',
  section: ''
};

export default ColorStyle;
