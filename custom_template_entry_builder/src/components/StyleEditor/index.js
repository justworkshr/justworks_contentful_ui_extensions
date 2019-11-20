import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  SectionHeading,
  FieldGroup,
  FormLabel,
  RadioButtonField
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
            <FormLabel>Text Alignment</FormLabel>
            {c.TEXT_ALIGNMENT_CLASSES.map((classObject, index) => {
              return (
                <RadioButtonField
                  key={`text-alignment-section-${index}`}
                  id={`radio-${classObject.className}`}
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
              );
            })}
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
