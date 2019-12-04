import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../custom_templates/constants';

import ColorStyle from '../ColorStyle';

import {
  Tabs,
  Tab,
  FormLabel,
  RadioButtonField,
  TextLink
} from '@contentful/forma-36-react-components';

import {
  getSectionLabel,
  getSectionedClassName,
  isGlobalSection,
  getSectionValue
} from '../utils/styleEditorUtils';

const TextStyle = props => {
  const sections = ['', ...props.sections.filter(e => e)]; // adds blank section for global
  const [selected, setSelected] = useState(sections[0]);

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
                <div className="style-editor__field-group">
                  <FormLabel htmlFor="">Text Alignment ({sectionLabel})</FormLabel>
                  <TextLink
                    className="style-editor__clear-link"
                    icon="Close"
                    onClick={() =>
                      props.onClear(
                        c.TEXT_ALIGNMENT_CLASSES.map(classObject =>
                          getSectionedClassName(section, classObject.className)
                        )
                      )
                    }>
                    Clear
                  </TextLink>
                  <div className="style-editor__inline-input-section">
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
                                getSectionValue(e, section),
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
                </div>
              )}
              <div className="style-editor__field-group">
                <FormLabel htmlFor="">Text Transform ({sectionLabel})</FormLabel>
                <TextLink
                  className="style-editor__clear-link"
                  icon="Close"
                  onClick={() =>
                    props.onClear(
                      c.TEXT_TRANSFORM_CLASSES.map(classObject =>
                        getSectionedClassName(section, classObject.className)
                      )
                    )
                  }>
                  Clear
                </TextLink>
                <div className="style-editor__inline-input-section">
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
                              getSectionValue(e, section),
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
              </div>
              <div className="style-editor__field-group">
                <FormLabel htmlFor="">Text Weight ({sectionLabel})</FormLabel>
                <TextLink
                  className="style-editor__clear-link"
                  icon="Close"
                  onClick={() =>
                    props.onClear(
                      c.TEXT_WEIGHT_CLASSES.map(classObject =>
                        getSectionedClassName(section, classObject.className)
                      )
                    )
                  }>
                  Clear
                </TextLink>
                <div className="style-editor__inline-input-section">
                  {c.TEXT_WEIGHT_CLASSES.map((classObject, index) => {
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
                              getSectionValue(e, section),
                              props.entryStyleClasses,
                              c.TEXT_WEIGHT_CLASSES.map(classObject => ({
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
              </div>
              <div className="style-editor__field-group">
                <FormLabel htmlFor="">Text Color ({sectionLabel})</FormLabel>
                <TextLink
                  className="style-editor__clear-link"
                  icon="Close"
                  onClick={() =>
                    props.onClear(
                      c.TEXT_COLOR_CLASSES.map(classObject =>
                        getSectionedClassName(section, classObject.className)
                      )
                    )
                  }>
                  Clear
                </TextLink>
                <ColorStyle
                  colorClassType="text"
                  onChange={props.updateStyleExclusive}
                  classString={props.entryStyleClasses}
                  section={section}
                  roleKey={props.roleKey}
                />
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

TextStyle.propTypes = {
  onChange: PropTypes.func,
  entryStyleClasses: PropTypes.string,
  sections: PropTypes.array,
  roleKey: PropTypes.string,
  updateStyleExclusive: PropTypes.func
};

TextStyle.defaultProps = {
  sections: ['']
};

export default TextStyle;
