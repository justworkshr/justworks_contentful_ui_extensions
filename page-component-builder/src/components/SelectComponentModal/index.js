import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as c from '@shared/constants';

import { Button, Modal, TextInput } from '@contentful/forma-36-react-components';
import HydratedEntryCard from '../cards/HydratedEntryCard';
import { getLabel } from '../../utilities';

import './style.scss';

const SelectComponentModal = props => {
  const [isLoading, setLoading] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [matchingEntries, setMatchingEntries] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState([]);

  const onClose = () => {
    setCompleted(false);
    setLoading(false);
    setMatchingEntries([]);
    setSelected([]);
    props.handleClose();
  };

  const handleInputChange = async value => {
    setMatchingEntries([]);
    setInputValue(value);

    clearSearchTimeout();
    setSearchTimeout(setTimeout(async () => await performQuery(value), 250));
  };

  const clearSearchTimeout = () => {
    clearTimeout(searchTimeout);
    setSearchTimeout(null);
  };

  const performQuery = async (searchText = '') => {
    setCompleted(false);
    setLoading(true);

    const response = await props.sdk.space.getEntries({
      content_type: c.CONTENT_TYPE_VIEW_COMPONENT,
      'fields.componentId[in]': props.options.join(','),
      'fields.configObject': props.useConfigObjects,
      'fields.name[match]': searchText
    });

    setMatchingEntries(response.items);
    setLoading(false);
    setCompleted(true);
  };

  if (props.isShown && !isCompleted && !isLoading && !inputValue) {
    performQuery(inputValue);
    setCompleted(false);
  }

  const getOnClickFunction = () => {
    if (props.type === 'single') {
      return value => {
        props.handleSubmit(value);
        onClose();
      };
    } else if (props.type === 'multiple') {
      return value => {
        if (selected.includes(value)) {
          setSelected(selected.filter(e => e.sys.id !== value.sys.id));
        } else {
          setSelected([...selected, value]);
        }
      };
    }
  };

  return (
    <Modal
      testId="select-component-modal"
      className="select-component-modal"
      onClose={onClose}
      isShown={props.isShown}
      title="Insert existing view components"
      size="large">
      <div className="select-component-modal__top f36-padding-bottom--m">
        <p>
          Filtering by:{' '}
          <b>{props.options.map(option => getLabel(option, props.schemas)).join(', ')}</b>
        </p>
        <p>Search for an entry:</p>
        <TextInput
          className="f36-margin-bottom--m"
          type="text"
          width="full"
          onChange={e => handleInputChange(e.target.value)}
          value={inputValue}
        />
      </div>
      <div className="select-component-modal__results">
        {matchingEntries.map((entry, index) => {
          return (
            <HydratedEntryCard
              key={`modal-result--${index}`}
              testId={`result-card--${index}`}
              className="f36-margin-bottom--s"
              contentType={entry.fields.componentId['en-US']}
              entry={entry}
              isLoading={false}
              onClick={() => getOnClickFunction()(entry)}
              selected={selected.includes(entry)}
            />
          );
        })}
      </div>
      {props.type === 'multiple' && (
        <div className="select-component-modal__actions">
          <Button
            className="f36-margin-right--m"
            testId="select-component--submit"
            buttonType="positive"
            onClick={() => {
              props.handleSubmit(selected);
              onClose();
            }}>
            Submit
          </Button>
          <Button buttonType="muted" onClick={onClose}>
            Cancel
          </Button>
        </div>
      )}
    </Modal>
  );
};

SelectComponentModal.propTypes = {
  sdk: PropTypes.object,
  type: PropTypes.oneOf(['single', 'multiple']),
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  isShown: PropTypes.bool,
  options: PropTypes.array,
  useConfigObjects: PropTypes.bool,
  schemas: PropTypes.array
};
SelectComponentModal.defaultProps = {
  type: 'single',
  isShown: false,
  options: [],
  schemas: []
};

export default SelectComponentModal;
