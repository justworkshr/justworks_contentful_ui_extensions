import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  SectionHeading,
  FieldGroup,
  FormLabel,
  RadioButtonField,
  Paragraph
} from '@contentful/forma-36-react-components';
import InternalMapping from '../../utils/InternalMapping';
import * as c from '../../../../custom_templates/constants';

import './style.css';

const StyleEditor = props => {
  const [open, toggleOpen] = useState(false);

  const updateStyleExclusive = (e, entryStyleClasses, valuesArray) => {
    const value = e.target.value;

    entryStyleClasses = entryStyleClasses
      .split(' ')
      .filter(e => e)
      .filter(className => !valuesArray.some(co => co.className === className));

    entryStyleClasses = [...entryStyleClasses, value].join(' ');

    props.updateStyle(props.roleKey, entryStyleClasses);
  };

  const renderStyle = props => {
    switch (props.type) {
      case InternalMapping.MARKDOWN:
        return renderMarkdownStyle(props.entryStyleClasses);
      case InternalMapping.TEXT:
        return renderTextStyle(props.entryStyleClasses);
    }
  };

  const renderTextStyle = entryStyleClasses => {
    return <h1>Text Style</h1>;
  };

  const renderMarkdownStyle = entryStyleClasses => {
    return (
      <div>
        <div className="style-editor__section">
          <FieldGroup>
            <FormLabel htmlFor="">Text Alignment</FormLabel>
            <div className="style-editor__input-section">
              {c.TEXT_ALIGNMENT_CLASSES.map((classObject, index) => {
                const fieldId = `radio-${classObject.className}`;
                return (
                  <div
                    className="style-editor__radio-section"
                    key={`text-alignment-section-${index}`}>
                    <RadioButtonField
                      id={fieldId}
                      checked={entryStyleClasses
                        .split(' ')
                        .filter(e => e)
                        .includes(classObject.className)}
                      labelText={classObject.label}
                      value={classObject.className}
                      labelIsLight={true}
                      onChange={e =>
                        updateStyleExclusive(e, entryStyleClasses, c.TEXT_ALIGNMENT_CLASSES)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </FieldGroup>
          <FieldGroup>
            <FormLabel htmlFor="">Text Transform</FormLabel>
            <div className="style-editor__input-section">
              {c.TEXT_TRANSFORM_CLASSES.map((classObject, index) => {
                const fieldId = `radio-${classObject.className}`;
                return (
                  <div
                    className="style-editor__radio-section"
                    key={`text-transform-section-${index}`}>
                    <RadioButtonField
                      id={fieldId}
                      checked={entryStyleClasses
                        .split(' ')
                        .filter(e => e)
                        .includes(classObject.className)}
                      labelText={classObject.label}
                      value={classObject.className}
                      labelIsLight={true}
                      onChange={e =>
                        updateStyleExclusive(e, entryStyleClasses, c.TEXT_TRANSFORM_CLASSES)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </FieldGroup>
          <FieldGroup>
            <FormLabel htmlFor="">Text Color</FormLabel>
            <div className="style-editor__input-section">
              {c.TEXT_COLOR_CLASSES.map((classObject, index) => {
                const color = c.COLORS.find(color => color.label === classObject.label);
                const fieldId = `radio-${classObject.className}`;
                return (
                  <div className="style-editor__radio-section" key={`text-color-section-${index}`}>
                    <RadioButtonField
                      id={fieldId}
                      className="style-editor__color-radio"
                      checked={entryStyleClasses
                        .split(' ')
                        .filter(e => e)
                        .includes(classObject.className)}
                      helpText={color.hexValue}
                      labelText={classObject.label}
                      value={classObject.className}
                      labelIsLight={true}
                      onChange={e =>
                        updateStyleExclusive(e, entryStyleClasses, c.TEXT_COLOR_CLASSES)
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
      </div>
    );
  };

  return (
    <div className="style-editor">
      <div className="style-editor__heading" onClick={() => toggleOpen(!open)}>
        <Icon className="style-editor__heading--icon" icon="Code" size="large" />
        <SectionHeading className="style-editor__heading--header" element="h1">
          {props.title}
        </SectionHeading>
        <Icon
          className="style-editor__heading--toggle"
          icon={open ? 'ChevronDown' : 'ChevronUp'}
          size="small"
        />
      </div>
      {!!open && renderStyle(props)}
    </div>
  );
};

StyleEditor.propTypes = {
  title: PropTypes.string,
  roleKey: PropTypes.string,
  updateStyle: PropTypes.func,
  type: PropTypes.string,
  entryStyleClasses: PropTypes.string
};

StyleEditor.defaultProps = {
  entryStyleClasses: '',
  roleKey: '',
  type: InternalMapping.TEXT
};

export default StyleEditor;
