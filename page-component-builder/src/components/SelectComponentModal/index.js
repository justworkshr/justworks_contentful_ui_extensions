import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../constants';

import { Modal, TextInput } from '@contentful/forma-36-react-components';
import HydratedEntryCard from '../cards/HydratedEntryCard';

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
      'fields.componentId[in]': props.options.join(',')
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
    <Modal onClose={onClose} isShown={props.isShown} size="large">
      <div className="select-component-modal">
        <TextInput
          type="text"
          width="full"
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        />
        {matchingEntries.map(entry => {
          return (
            <HydratedEntryCard
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
  options: PropTypes.array
};
SelectComponentModal.defaultProps = {
  type: 'single',
  isShown: false,
  options: []
};

export default SelectComponentModal;
