import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../custom_templates/constants';

import {
  Tabs,
  Tab,
  FieldGroup,
  FormLabel,
  RadioButtonField
} from '@contentful/forma-36-react-components';

import { getSectionLabel, getSectionedClassName, isGlobalSection } from '../utils';

const TextStyle = props => {
  const sections = ['', ...props.sections.filter(e => e)]; // adds blank section for global
  const [selected, setSelected] = useState(sections[0]);
  const getValue = (e, section) => {
    const targetValue = e.target.value;
    const prefix = isGlobalSection(section) ? '' : `${section}-`;
    return prefix + targetValue;
  };

  return (
    <div className="text-style">
      <Tabs withDivider={true}>
        {sections.map(section => {
          const sectionLabel = getSectionLabel(section);

          return (
            <Tab
              key={`tab-${section}`}
              id={section}
              selected={selected === section}
              onSelect={() => {
                setSelected(section);
              }}>
              {sectionLabel}
            </Tab>
          );
        })}
      </Tabs>

      {sections.map(section => {
        const sectionLabel = getSectionLabel(section);
        return (
          selected === section && (
            <div key={`section-${section}`} className="style-editor__section">
              {isGlobalSection(section) && ( // only use text alignment for global section
                <FieldGroup>
                  <FormLabel htmlFor="">Text Alignment ({sectionLabel})</FormLabel>
                  <div className="style-editor__input-section">
                    {c.TEXT_ALIGNMENT_CLASSES.map((classObject, index) => {
                      const fieldId = `radio-${classObject.className}`;
                      return (
                        <div
                          className="style-editor__radio-section"
                          key={`text-alignment-section-${index}`}>
                          <RadioButtonField
                            id={fieldId}
                            className="style-editor__radio-field"
                            checked={props.entryStyleClasses
                              .split(' ')
                              .filter(e => e)
                              .includes(getSectionedClassName(section, classObject.className))}
                            labelText={classObject.label}
                            value={classObject.className}
                            labelIsLight={true}
                            onChange={e =>
                              props.updateStyleExclusive(
                                getValue(e, section),
                                props.entryStyleClasses,
                                c.TEXT_ALIGNMENT_CLASSES.map(classObject => ({
                                  ...classObject,
                                  className: getSectionedClassName(section, classObject.className)
                                }))
                              )
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </FieldGroup>
              )}
              <FieldGroup>
                <FormLabel htmlFor="">Text Transform ({sectionLabel})</FormLabel>
                <div className="style-editor__input-section">
                  {c.TEXT_TRANSFORM_CLASSES.map((classObject, index) => {
                    const fieldId = `radio-${classObject.className}`;
                    return (
                      <div
                        className="style-editor__radio-section"
                        key={`text-transform-section-${index}`}>
                        <RadioButtonField
                          id={fieldId}
                          className="style-editor__radio-field"
                          checked={props.entryStyleClasses
                            .split(' ')
                            .filter(e => e)
                            .includes(getSectionedClassName(section, classObject.className))}
                          labelText={classObject.label}
                          value={classObject.className}
                          labelIsLight={true}
                          onChange={e =>
                            props.updateStyleExclusive(
                              getValue(e, section),
                              props.entryStyleClasses,
                              c.TEXT_TRANSFORM_CLASSES.map(classObject => ({
                                ...classObject,
                                className: getSectionedClassName(section, classObject.className)
                              }))
                            )
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </FieldGroup>
              <FieldGroup>
                <FormLabel htmlFor="">Text Color ({sectionLabel})</FormLabel>
                <div className="style-editor__input-section">
                  {c.TEXT_COLOR_CLASSES.map((classObject, index) => {
                    const color = c.COLORS.find(color => color.label === classObject.label);
                    const fieldId = `radio-${classObject.className}`;
                    return (
                      <div
                        className="style-editor__radio-section"
                        key={`text-color-section-${index}`}>
                        <RadioButtonField
                          id={fieldId}
                          className="style-editor__radio-field style-editor__color-radio"
                          checked={props.entryStyleClasses
                            .split(' ')
                            .filter(e => e)
                            .includes(getSectionedClassName(section, classObject.className))}
                          helpText={color.hexValue}
                          labelText={classObject.label}
                          value={classObject.className}
                          labelIsLight={true}
                          onChange={e =>
                            props.updateStyleExclusive(
                              getValue(e, section),
                              props.entryStyleClasses,
                              c.TEXT_COLOR_CLASSES.map(classObject => ({
                                ...classObject,
                                className: getSectionedClassName(section, classObject.className)
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
              </FieldGroup>
            </div>
          )
        );
      })}
    </div>
  );
};

TextStyle.propTypes = {
  entryStyleClasses: PropTypes.string,
  sections: PropTypes.array,
  updateStyleExclusive: PropTypes.func
};

TextStyle.defaultProps = {
  sections: ['']
};

export default TextStyle;
