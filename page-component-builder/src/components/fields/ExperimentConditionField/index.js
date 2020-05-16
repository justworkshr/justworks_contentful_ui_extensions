import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormLabel, TextLink, Card, HelpText, Icon } from '@contentful/forma-36-react-components';

import ShortTextInput from '../ShortTextField';
import DropdownField from '../DropdownField';

const SubmitActionField = props => {
  const [isOpen, setOpen] = useState(false);

  const updateValue = newValue => {
    props.onChange(JSON.stringify(newValue), true);
  };

  const renderActionValueField = (action, index) => {
    return (
      <DropdownField
        onChange={value => handleObjectChange(value, action, index)}
        options={['param', 'hash', '{{ justworks_cookie }}', '{{ lead_storage }}']}
        value={action.object}
      />
    );
  };

  const handleObjectChange = value => {
    const newValue = props.value;
    newValue.object = value;

    if (value === 'hash') {
      newValue.condition = undefined;
      newValue.attribute = undefined;
    }
    updateValue(newValue);
  };

  const handleAttributeChange = value => {
    const newValue = props.value;
    newValue.attribute = value;
    updateValue(newValue);
  };

  const handleConditionChange = value => {
    const newValue = props.value;
    newValue.condition = value;
    updateValue(newValue);
  };

  const handleValueChange = value => {
    const newValue = props.value;
    newValue.value = value;
    updateValue(newValue);
  };

  const renderLogicEditor = action => {
    return (
      <div className="logic-editor">
        <div className="logic-editor__row">
          <span className="logic-editor__field">
            <FormLabel>Show component when</FormLabel>
            <div></div>
          </span>
          <span className="logic-editor__field">
            <FormLabel>Object</FormLabel>
            {renderActionValueField(action)}
          </span>
          {props.value.object !== 'hash' && (
            <span className="logic-editor__field">
              <FormLabel>attribute</FormLabel>
              <DropdownField
                withCustomText={true}
                onChange={value => handleAttributeChange(value)}
                options={props.tokens.input_names}
                value={props.value.attribute}
              />
            </span>
          )}
          {props.value.object !== 'hash' && (
            <span className="logic-editor__field">
              <FormLabel>comparison</FormLabel>
              <DropdownField
                onChange={value => handleConditionChange(value)}
                options={['equals', 'matches', 'gte', 'lte']}
                value={props.value.condition}
              />
            </span>
          )}
          <span className="logic-editor__field">
            <FormLabel>value</FormLabel>
            <ShortTextInput
              onChange={value => handleValueChange(value)}
              value={props.value.value}
            />
          </span>
        </div>
      </div>
    );
  };

  const cardTitle = () => {
    if (!props.value.object) return `Blank Condition`;
    return `Show component when ${props.value.object || ''} ${props.value.attribute || ''} ${props
      .value.condtion || ''} = ${props.value.value || ''}`.trim();
  };
  return (
    <div className="submit-action-field">
      <Card className="logic-editor__card" onClick={!isOpen ? () => setOpen(!isOpen) : null}>
        {isOpen && (
          <Icon
            className="logic-editor__close"
            color="muted"
            icon="ArrowUp"
            onClick={() => setOpen(!isOpen)}
          />
        )}
        {!isOpen && (
          <Icon
            className="logic-editor__open"
            color="muted"
            icon="ArrowDown"
            onClick={() => setOpen(true)}
          />
        )}
        {!isOpen && cardTitle(props.value)}
        {isOpen && renderLogicEditor(props.value)}
      </Card>
    </div>
  );
};

SubmitActionField.propTypes = {
  onChange: PropTypes.func,
  tokens: PropTypes.object,
  value: PropTypes.object
};
SubmitActionField.defaultProps = {
  tokens: {},
  value: []
};

export default SubmitActionField;
