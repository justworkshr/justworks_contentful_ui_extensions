import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../custom_templates/constants';

import { getSectionedClassName, getSectionValue } from '../utils/styleEditorUtils';

import { FormLabel, RadioButtonField, TextLink } from '@contentful/forma-36-react-components';

const StyleEditorFieldGroup = props => {
  return (
    <div className="style-editor__field-group">
      <FormLabel htmlFor="">
        {props.label} ({props.sectionLabel})
      </FormLabel>
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
      <div className="style-editor__inline-input-section">
        {props.styleClasses.map((classObject, index) => {
          const fieldId = `radio-${classObject.className}`;
          return (
            <div className="style-editor__radio-section" key={`text-alignment-section-${index}`}>
              <RadioButtonField
                id={fieldId}
                className="style-editor__radio-field"
                checked={props.entryStyleClasses
                  .split(' ')
                  .filter(e => e)
                  .includes(getSectionedClassName(props.section, classObject.className))}
                labelText={classObject.label}
                value={classObject.className}
                labelIsLight={true}
                onChange={e =>
                  props.updateStyleExclusive(
                    getSectionValue(e, props.section),
                    props.entryStyleClasses,
                    props.styleClasses.map(classObject => ({
                      ...classObject,
                      className: getSectionedClassName(props.section, classObject.className)
                    }))
                  )
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

StyleEditorFieldGroup.propTypes = {
  entryStyleClasses: PropTypes.string,
  label: PropTypes.string,
  onClear: PropTypes.func,
  updateStyleExclusive: PropTypes.func,
  section: PropTypes.string,
  sectionLabel: PropTypes.string,
  styleClasses: PropTypes.array
};

export default StyleEditorFieldGroup;
