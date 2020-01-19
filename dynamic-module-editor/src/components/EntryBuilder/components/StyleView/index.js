import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../customModules/constants';

import ColorStyle from '../ColorStyle';

import { Tabs, Tab } from '@contentful/forma-36-react-components';

import { getSectionLabel, isGlobalSection } from '../utils/styleEditorUtils';
import { displayCamelCaseName } from '../../../../../../shared/utilities/elementUtils';

import StyleEditorFieldGroup from '../StyleEditorFieldGroup';

const StyleView = props => {
  const subSections = ['', ...props.styleView.subSections.filter(e => e)]; // adds blank section for global
  const [selected, setSelected] = useState(subSections[0]);

  const renderSection = (subSection, styleSection) => {
    // Tests if styleProperty key includes the subsection name at the start
    // Example: subsection = "header", key = "headerTextColor" => true
    return new RegExp(`^${subSection}`).test(styleSection.styleProperty.key);
  };

  const renderComponentType = (styleSection, subSection) => {
    const sectionLabel = getSectionLabel(subSection);
    const styleKey = styleSection.styleProperty.key;
    const getValue = styleKey => {
      return props.styleObject[styleKey];
    };
    switch (styleSection.componentTypes) {
      case c.STYLE_VIEW_COMPONENT_COLOR:
        return (
          <ColorStyle
            key={`style-group-${styleKey}`}
            label={displayCamelCaseName(styleKey)}
            value={getValue(styleKey)}
            onClear={() => props.onClear(styleKey)}
            onChange={value => props.onChange(styleKey, value)}
            section={subSection}
            styleKey={styleKey}
            sectionLabel={sectionLabel}
            styleValues={styleSection.styleProperty.values}
          />
        );
      case c.STYLE_VIEW_COMPONENT_RADIO:
        return (
          <StyleEditorFieldGroup
            key={`style-group-${styleKey}`}
            label={displayCamelCaseName(styleKey)}
            value={getValue(styleKey)}
            onClear={() => props.onClear(styleKey)}
            onChange={value => props.onChange(styleKey, value)}
            section={subSection}
            styleKey={styleKey}
            sectionLabel={sectionLabel}
            styleValues={styleSection.styleProperty.values}
          />
        );
    }
  };
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
        return (
          selected === subSection && (
            <div key={`section-${subSection}`} className="style-editor__section">
              {props.styleView.styleSections.map(styleSection => {
                if (isGlobalSection(subSection)) {
                  // Global (default) section
                  if (styleSection.defaultOnly || !styleSection.subSectionOnly) {
                    return renderComponentType(styleSection, subSection);
                  }
                } else {
                  // SubSections
                  if (styleSection.defaultOnly) return null;
                  if (renderSection(subSection, styleSection))
                    return renderComponentType(styleSection, subSection);
                }
              })}
            </div>
          )
        );
      })}
    </div>
  );
};

StyleView.propTypes = {
  styleView: PropTypes.object,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  styleObject: PropTypes.object
};

StyleView.defaultProps = {
  styleView: {},
  styleObject: {}
};

export default StyleView;
