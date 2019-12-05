import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../custom_templates/constants';

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
  getSectionValue,
  isGlobalSection
} from '../utils/styleEditorUtils';

const MultiReferenceStyle = props => {
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
              {isGlobalSection(section) && ( // only use for global section
                <div className="style-editor__field-group">
                  <FormLabel htmlFor="">Item Spacing ({sectionLabel})</FormLabel>
                  <TextLink
                    className="style-editor__clear-link"
                    icon="Close"
                    onClick={() =>
                      props.onClear(
                        c.FLEX_ITEM_SPACING_CLASSES.map(classObject =>
                          getSectionedClassName(section, classObject.className)
                        )
                      )
                    }>
                    Clear
                  </TextLink>
                  <div className="style-editor__inline-input-section">
                    {c.FLEX_ITEM_SPACING_CLASSES.map((classObject, index) => {
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
                                c.FLEX_ITEM_SPACING_CLASSES.map(classObject => ({
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
                <FormLabel htmlFor="">Flex Direction ({sectionLabel})</FormLabel>
                <TextLink
                  className="style-editor__clear-link"
                  icon="Close"
                  onClick={() =>
                    props.onClear(
                      c.FLEX_DIRECTION_CLASSES.map(classObject =>
                        getSectionedClassName(section, classObject.className)
                      )
                    )
                  }>
                  Clear
                </TextLink>
                <div className="style-editor__inline-input-section">
                  {c.FLEX_DIRECTION_CLASSES.map((classObject, index) => {
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
                              c.FLEX_DIRECTION_CLASSES.map(classObject => ({
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
                <FormLabel htmlFor="">Items per row/column ({sectionLabel})</FormLabel>
                <TextLink
                  className="style-editor__clear-link"
                  icon="Close"
                  onClick={() =>
                    props.onClear(
                      c.FLEX_ITEM_COUNT_CLASSES.map(classObject =>
                        getSectionedClassName(section, classObject.className)
                      )
                    )
                  }>
                  Clear
                </TextLink>
                <div className="style-editor__inline-input-section">
                  {c.FLEX_ITEM_COUNT_CLASSES.map((classObject, index) => {
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
                              c.FLEX_ITEM_COUNT_CLASSES.map(classObject => ({
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
                <FormLabel htmlFor="">Items Positioning ({sectionLabel})</FormLabel>
                <TextLink
                  className="style-editor__clear-link"
                  icon="Close"
                  onClick={() =>
                    props.onClear(
                      c.FLEX_POSITION_CLASSES.map(classObject =>
                        getSectionedClassName(section, classObject.className)
                      )
                    )
                  }>
                  Clear
                </TextLink>
                <div className="style-editor__inline-input-section">
                  {c.FLEX_POSITION_CLASSES.map((classObject, index) => {
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
                              c.FLEX_POSITION_CLASSES.map(classObject => ({
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
            </div>
          )
        );
      })}
    </div>
  );
};

MultiReferenceStyle.propTypes = {
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  entryStyleClasses: PropTypes.string,
  sections: PropTypes.array,
  roleKey: PropTypes.string,
  updateStyleExclusive: PropTypes.func
};

MultiReferenceStyle.defaultProps = {
  sections: ['']
};

export default MultiReferenceStyle;
