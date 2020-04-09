import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../constants';

import { Modal, TextInput } from '@contentful/forma-36-react-components';
import HydratedEntryCard from '../cards/HydratedEntryCard';

import './style.scss';

const SelectComponentModal = props => {
  const [isLoading, setLoading] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [matchingEntries, setMatchingEntries] = useState([]);

  const onClose = () => {
    setCompleted(false);
    setLoading(false);
    setMatchingEntries([]);
    props.handleClose();
  };

  const performQuery = async () => {
    setCompleted(false);
    setLoading(true);
    const response = await props.sdk.space.getEntries({
      content_type: c.CONTENT_TYPE_VIEW_COMPONENT,
      'fields.componentId[in]': props.options.join(','),
      'fields.configObject': props.useConfigObjects
    });

    setMatchingEntries(response.items);
    setLoading(false);
    setCompleted(true);
  };
  if (props.isShown && !isCompleted && !isLoading) {
    performQuery();
    setCompleted(false);
  }

  const getOnClickFunction = () => {
    if (props.type === 'single') {
      return value => {
        props.handleSubmit(value);
        onClose();
      };
    }
  };

  return (
    <Modal
      className="select-component-modal"
      onClose={onClose}
      isShown={props.isShown}
      title={'Select an existing view component'}
      size="large">
      <div className="select-component-modal__top f36-padding-bottom--m">
        <p>
          Filtering by: <b>{props.options.join(', ')}</b>
        </p>
        <p>Search for an entry:</p>
        <TextInput
          className="f36-margin-bottom--m"
          type="text"
          width="full"
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      <div className="select-component-modal__results">
        {matchingEntries.map((entry, index) => {
          return (
            <HydratedEntryCard
              key={`modal-result--${index}`}
              className="f36-margin-bottom--s"
              contentType={entry.fields.componentId['en-US']}
              entry={entry}
              onClick={() => getOnClickFunction()(entry)}
            />
          );
        })}
      </div>
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
  useConfigObjects: PropTypes.bool
};
SelectComponentModal.defaultProps = {
  type: 'single',
  isShown: false,
  options: []
};

export default SelectComponentModal;
