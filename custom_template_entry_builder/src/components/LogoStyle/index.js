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

import { getSectionLabel, getSectionedClassName, getSectionValue } from '../utils/styleEditorUtils';

const LogoStyle = props => {
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
              <div className="style-editor__field-group">
                <FormLabel htmlFor="">Logo Size ({sectionLabel})</FormLabel>
                <TextLink
                  className="style-editor__clear-link"
                  icon="Close"
                  onClick={() =>
                    props.onClear(
                      c.LOGO_SIZE_CLASSES.map(classObject =>
                        getSectionedClassName(section, classObject.className)
                      )
                    )
                  }>
                  Clear
                </TextLink>
                <div className="style-editor__inline-input-section">
                  {c.LOGO_SIZE_CLASSES.map((classObject, index) => {
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
                              c.LOGO_SIZE_CLASSES.map(classObject => ({
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

LogoStyle.propTypes = {
  onClear: PropTypes.func,
  updateStyleExclusive: PropTypes.func,
  entryStyleClasses: PropTypes.string,
  sections: PropTypes.array,
  roleKey: PropTypes.string
};

LogoStyle.defaultProps = {
  entryStyleClasses: '',
  sections: ['']
};

export default LogoStyle;
