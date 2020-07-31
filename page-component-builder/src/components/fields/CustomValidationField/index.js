import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormLabel, TextLink, Card, HelpText, Icon } from '@contentful/forma-36-react-components';

import ShortTextInput from '../ShortTextField';
import DropdownField from '../DropdownField';

const actionSchema = () => {
  return {
    errorMessage: '',
    condition: '', // (equals | matches | gte | lte)
    value: ''
  };
};

const CustomValidationField = props => {
  const [openCards, setOpen] = useState([]);

  const updateValue = newValue => {
    props.onChange(JSON.stringify(newValue), true);
  };

  const handleAddAction = () => {
    const newValue = [...props.value, actionSchema()];
    updateValue(newValue);
  };

  const handleClearAction = index => {
    const newValue = [...props.value.slice(0, index), ...props.value.slice(index + 1)];
    updateValue(newValue);
  };

  const handleCardClick = index => {
    let cards = [...openCards];

    if (cards.includes(index)) {
      cards = cards.filter(i => i !== index);
    } else {
      cards.push(index);
    }

    setOpen(cards);
  };

  const handleErrorMessageChange = (value, action, index) => {
    action.errorMessage = value;
    const newValue = [...props.value.slice(0, index), action, ...props.value.slice(index + 1)];
    updateValue(newValue);
  };

  const handleConditionChange = (value, action, index) => {
    action.condition = value;
    const newValue = [...props.value.slice(0, index), action, ...props.value.slice(index + 1)];
    updateValue(newValue);
  };

  const handleValueChange = (value, action, index) => {
    action.value = value;
    const newValue = [...props.value.slice(0, index), action, ...props.value.slice(index + 1)];
    updateValue(newValue);
  };

  const renderLogicEditor = (action, index) => {
    return (
      <div className="logic-editor">
        <div className="logic-editor__row">
          <span className="logic-editor__field">
            <FormLabel>Display error message</FormLabel>
            <ShortTextInput
              testId="logic-field__value"
              onChange={value => handleErrorMessageChange(value, action, index)}
              value={action.errorMessage}
            />
          </span>
          <span className="logic-editor__field">
            <FormLabel>if field</FormLabel>{' '}
            <DropdownField
              onChange={value => handleConditionChange(value, action, index)}
              options={['equals', 'matches', 'gte', 'lte']}
              value={action.condition}
            />
          </span>
          <span className="logic-editor__field">
            <FormLabel>value</FormLabel>
            <ShortTextInput
              testId="logic-field__value"
              onChange={value => handleValueChange(value, action, index)}
              value={action.value}
            />
          </span>
        </div>
      </div>
    );
  };

  const cardTitle = (action, index) => {
    if (!action.action && !action.action_value) return `New Action ${index + 1}`;
    if (action.action === 'redirect') {
      return `${action.action || ''} ${action.action_value || ''} if ${action.field ||
        ''} ${action.condtion || ''} = ${action.value || ''}`.trim();
    } else if (action.action === 'event') {
      return `${action.action || ''} ${action.action_value || ''}`;
    }
  };
  return (
    <div className="submit-action-field" data-test-id="submit-action-field">
      {props.value.map((action, index) => {
        return (
          <div key={`submit-action-field--${index}`}>
            <Card
              className="logic-editor__card"
              testId="logic-editor__card"
              onClick={!openCards.includes(index) ? () => handleCardClick(index) : null}>
              {
                <Icon
                  className="logic-editor__clear"
                  color="negative"
                  icon="Close"
                  onClick={() => handleClearAction(index)}
                />
              }
              {openCards.includes(index) && (
                <Icon
                  className="logic-editor__close"
                  color="muted"
                  icon="ArrowUp"
                  onClick={() => handleCardClick(index)}
                />
              )}
              {!openCards.includes(index) && (
                <Icon
                  className="logic-editor__open"
                  color="muted"
                  icon="ArrowDown"
                  onClick={() => setOpen(true)}
                />
              )}
              {!openCards.includes(index) && cardTitle(action, index)}
              {openCards.includes(index) && renderLogicEditor(action, index)}
            </Card>
          </div>
        );
      })}

      <TextLink onClick={handleAddAction}>Add Validation</TextLink>
    </div>
  );
};

CustomValidationField.propTypes = {
  onChange: PropTypes.func,
  tokens: PropTypes.object,
  value: PropTypes.array
};
CustomValidationField.defaultProps = {
  tokens: {},
  value: []
};

export default CustomValidationField;
