import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../customModules/constants';

import {
  Tabs,
  Tab,
  FormLabel,
  RadioButtonField,
  TextLink
} from '@contentful/forma-36-react-components';

import { getSectionLabel, getSectionedClassName, getSectionValue } from '../utils/styleEditorUtils';

import StyleEditorFieldGroup from '../StyleEditorFieldGroup';

const MultiReferenceStyle = props => {
  const sections = ['', ...props.sections.filter(e => e)]; // adds blank section for global
  const [selected, setSelected] = useState(sections[0]);

  return (
    <div className="style-section">
      <Tabs className="tabs" withDivider={true}>
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
              <StyleEditorFieldGroup
                label="Horizontal Item Spacing"
                entryStyleClasses={props.entryStyleClasses}
                onClear={props.onClear}
                updateStyleExclusive={props.updateStyleExclusive}
                section={section}
                sectionLabel={sectionLabel}
                styleClasses={c.FLEX_HORIZONAL_ITEM_SPACING_CLASSES}
              />
              <StyleEditorFieldGroup
                label="Vertical Item Spacing"
                entryStyleClasses={props.entryStyleClasses}
                onClear={props.onClear}
                updateStyleExclusive={props.updateStyleExclusive}
                section={section}
                sectionLabel={sectionLabel}
                styleClasses={c.FLEX_VERTICAL_ITEM_SPACING_CLASSES}
              />
              <StyleEditorFieldGroup
                label="Flex Direction"
                entryStyleClasses={props.entryStyleClasses}
                onClear={props.onClear}
                updateStyleExclusive={props.updateStyleExclusive}
                section={section}
                sectionLabel={sectionLabel}
                styleClasses={c.FLEX_DIRECTION_CLASSES}
              />
              <StyleEditorFieldGroup
                label="Items per row"
                entryStyleClasses={props.entryStyleClasses}
                onClear={props.onClear}
                updateStyleExclusive={props.updateStyleExclusive}
                section={section}
                sectionLabel={sectionLabel}
                styleClasses={c.FLEX_ITEM_COUNT_CLASSES}
              />
              <StyleEditorFieldGroup
                label="Vertical Item Positioning"
                entryStyleClasses={props.entryStyleClasses}
                onClear={props.onClear}
                updateStyleExclusive={props.updateStyleExclusive}
                section={section}
                sectionLabel={sectionLabel}
                styleClasses={c.FLEX_ALIGNMENT_CLASSES}
              />
              <StyleEditorFieldGroup
                label="Horizontal Item Positioning"
                entryStyleClasses={props.entryStyleClasses}
                onClear={props.onClear}
                updateStyleExclusive={props.updateStyleExclusive}
                section={section}
                sectionLabel={sectionLabel}
                styleClasses={c.FLEX_JUSTIFY_CLASSES}
              />
            </div>
          )
        );
      })}
    </div>
  );
};

MultiReferenceStyle.propTypes = {
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
