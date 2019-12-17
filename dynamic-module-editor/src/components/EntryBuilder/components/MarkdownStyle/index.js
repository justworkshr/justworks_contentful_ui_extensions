import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../custom_templates/constants';

import ColorStyle from '../ColorStyle';

import { Tabs, Tab } from '@contentful/forma-36-react-components';

import { getSectionLabel, isGlobalSection } from '../utils/styleEditorUtils';
import { displayCamelCaseName } from '../../../../../../shared/utilities/elementUtils';

import StyleEditorFieldGroup from '../StyleEditorFieldGroup';

const MarkdownStyle = props => {
  const subSections = ['', ...props.styleView.subSections.filter(e => e)]; // adds blank section for global
  const [selected, setSelected] = useState(subSections[0]);
  return (
    <div className="style-section text-style">
      <Tabs className="tabs" withDivider={true}>
        {subSections.map(section => {
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

      {subSections.map(subSection => {
        const sectionLabel = getSectionLabel(subSection);
        return (
          selected === subSection && (
            <div key={`section-${subSection}`} className="style-editor__section">
              {props.styleView.styleSections.map(styleSection => {
                if (isGlobalSection(subSection) && styleSection.defaultOnly) {
                  // only use text alignment for global section
                  return (
                    <StyleEditorFieldGroup
                      key={`style-group- ${styleSection.styleProperty.key}`}
                      label={displayCamelCaseName(styleSection.styleProperty.key)}
                      styleKey={styleSection.styleProperty.key}
                      value={props.roleMappingObject.style.value[styleSection.styleProperty.key]}
                      onClear={props.onClear}
                      onChange={props.onChange}
                      section={subSection}
                      sectionLabel={sectionLabel}
                      styleValues={styleSection.styleProperty.values}
                    />
                  );
                } else {
                  if (!isGlobalSection(subSection) && styleSection.defaultOnly) return null;
                  return (
                    <StyleEditorFieldGroup
                      key={`style-group- ${styleSection.styleProperty.key}`}
                      label={displayCamelCaseName(styleSection.styleProperty.key)}
                      styleKey={styleSection.styleProperty.key}
                      value={props.roleMappingObject.style.value[styleSection.styleProperty.key]}
                      onClear={props.onClear}
                      onChange={props.onChange}
                      section={subSection}
                      sectionLabel={sectionLabel}
                      styleValues={styleSection.styleProperty.values}
                    />
                  );
                }
              })}

              {/* {isGlobalSection(subSection) && props.styleType === c.FIELD_TYPE_TEXT && (
                // only use for global section and non-markdown text
                <StyleEditorFieldGroup
                  label="Text Weight"
                  value={props.value}
                  onClear={props.onClear}
                  onChange={props.onChange}
                  section={subSection}
                  sectionLabel={sectionLabel}
                  styleValues={c.TEXT_WEIGHT_CLASSES}
                />
              )}
              <StyleEditorFieldGroup
                label="Text Transform"
                value={props.value}
                onClear={props.onClear}
                onChange={props.onChange}
                section={subSection}
                sectionLabel={sectionLabel}
                styleValues={c.TEXT_TRANSFORM_CLASSES}
              />
              <ColorStyle
                value={props.value}
                onChange={props.onChange}
                onClear={props.onClear}
                label="Text Color"
                section={subSection}
                sectionLabel={sectionLabel}
                roleKey={props.roleKey}
                styleValues={c.TEXT_COLOR_CLASSES}
              /> */}
            </div>
          )
        );
      })}
    </div>
  );
};

MarkdownStyle.propTypes = {
  styleView: PropTypes.object,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  roleMappingObject: PropTypes.object,
  value: PropTypes.string,
  sections: PropTypes.array,
  roleKey: PropTypes.string,
  onChange: PropTypes.func
};

MarkdownStyle.defaultProps = {
  styleView: {},
  roleMappingObject: {},
  sections: ['']
};

export default MarkdownStyle;
