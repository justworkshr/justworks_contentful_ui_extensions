import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { arrayMove } from '@shared/utilities/elementUtils';

import { TextInput, Button, Paragraph } from '@contentful/forma-36-react-components';
import ErrorList from '../ErrorList';

import './style.scss';

//e => props.onChange(e.target.value)

const MultiTextField = props => {
  const [addInputValue, handleAddInputValueChange] = useState('');

  const handleAddItem = e => {
    // only accept "enter" key strokes
    if (!e.keyCode || e.keyCode !== 13) return;
    const newItem = addInputValue;

    if (!newItem) return;
    handleAddInputValueChange('');

    const newValue = [...props.value, newItem];
    props.onChange(newValue);
  };

  const handleMoveItem = (index, direction = 1) => {
    const newValue = arrayMove(props.value, index, index + direction);
    props.onChange(newValue);
  };

  const handleRemoveItem = index => {
    const newValue = [...props.value.slice(0, index), ...props.value.slice(index + 1)];
    props.onChange(newValue);
  };

  const TextItem = (string, index) => {
    return (
      <div className="multi-text-field__item">
        <Paragraph>{string}</Paragraph>
        <div className="multi-text-field__item-menu">
          <Button
            onClick={() => handleMoveItem(index, -1)}
            size="small"
            icon="ArrowUp"
            buttonType="muted"></Button>
          <Button
            onClick={() => handleMoveItem(index, 1)}
            size="small"
            icon="ArrowDown"
            buttonType="muted"></Button>
          <Button
            onClick={() => handleRemoveItem(index)}
            size="small"
            icon="Close"
            buttonType="negative"></Button>
        </div>
      </div>
    );
  };

  return (
    <div className="multi-text-field">
      <div className="multi-text-field__add-row">
        <TextInput
          testId={props.testId}
          type={props.type}
          onChange={e => handleAddInputValueChange(e.target.value)}
          onKeyDown={handleAddItem}
          placeholder={'Add new'}
          value={addInputValue}
          error={!!props.errors.length}
        />
        <Button icon={'Plus'} onClick={handleAddItem} buttonType="positive"></Button>
      </div>
      <ErrorList errors={props.errors} />
      {(props.value || []).map((item, index) => {
        return TextItem(item, index);
      })}
    </div>
  );
};

MultiTextField.propTypes = {
  errors: PropTypes.array,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.string
};
MultiTextField.defaultProps = {
  testId: 'multi-text-field',
  value: [],
  errors: []
};

export default MultiTextField;
