import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../../../../../custom_templates/constants';

import {
  Tabs,
  Tab,
  FormLabel,
  RadioButtonField,
  TextLink
} from '@contentful/forma-36-react-components';

import StyleEditorFieldGroup from '../StyleEditorFieldGroup';

import { getSectionLabel, getSectionedClassName, getSectionValue } from '../utils/styleEditorUtils';

const LogoStyle = props => {
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
                label="Icon Size"
                entryStyleClasses={props.entryStyleClasses}
                onClear={props.onClear}
                updateStyleExclusive={props.updateStyleExclusive}
                section={section}
                sectionLabel={sectionLabel}
                styleClasses={c.ICON_SIZE_CLASSES}
              />
              <StyleEditorFieldGroup
                label="Icon Position"
                entryStyleClasses={props.entryStyleClasses}
                onClear={props.onClear}
                updateStyleExclusive={props.updateStyleExclusive}
                section={section}
                sectionLabel={sectionLabel}
                styleClasses={c.ICON_POSITION_CLASSES}
              />
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
