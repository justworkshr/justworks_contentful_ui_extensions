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

import StyleEditorFieldGroup from '../StyleEditorFieldGroup';

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
                <StyleEditorFieldGroup
                  label="Text Alignment"
                  entryStyleClasses={props.entryStyleClasses}
                  onClear={props.onClear}
                  updateStyleExclusive={props.updateStyleExclusive}
                  section={section}
                  sectionLabel={sectionLabel}
                  styleClasses={c.TEXT_ALIGNMENT_CLASSES}
                />
              )}
              {isGlobalSection(section) && ( // only use for global section
                <StyleEditorFieldGroup
                  label="Text Weight"
                  entryStyleClasses={props.entryStyleClasses}
                  onClear={props.onClear}
                  updateStyleExclusive={props.updateStyleExclusive}
                  section={section}
                  sectionLabel={sectionLabel}
                  styleClasses={c.TEXT_WEIGHT_CLASSES}
                />
              )}
              <StyleEditorFieldGroup
                label="Text Transform"
                entryStyleClasses={props.entryStyleClasses}
                onClear={props.onClear}
                updateStyleExclusive={props.updateStyleExclusive}
                section={section}
                sectionLabel={sectionLabel}
                styleClasses={c.TEXT_TRANSFORM_CLASSES}
              />
              <StyleEditorFieldGroup
                label="Text Color"
                entryStyleClasses={props.entryStyleClasses}
                onClear={props.onClear}
                updateStyleExclusive={props.updateStyleExclusive}
                section={section}
                sectionLabel={sectionLabel}
                styleClasses={c.TEXT_TRANSFORM_CLASSES}
              />
              <ColorStyle
                classString={props.entryStyleClasses}
                onChange={props.updateStyleExclusive}
                onClear={props.onClear}
                label="Text Color "
                section={section}
                sectionLabel={sectionLabel}
                roleKey={props.roleKey}
                styleClasses={c.TEXT_COLOR_CLASSES}
              />
            </div>
          )
        );
      })}
    </div>
  );
};

TextStyle.propTypes = {
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  entryStyleClasses: PropTypes.string,
  sections: PropTypes.array,
  roleKey: PropTypes.string,
  updateStyleExclusive: PropTypes.func
};

TextStyle.defaultProps = {
  sections: ['']
};

export default TextStyle;
