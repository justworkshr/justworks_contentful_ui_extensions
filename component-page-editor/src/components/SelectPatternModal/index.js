import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as c from '@shared/constants';

import {
  Button,
  Modal,
  ToggleButton,
  Checkbox,
  TextInput,
  EntryCard,
  SectionHeading
} from '@contentful/forma-36-react-components';
// import HydratedEntryCard from '../cards/HydratedEntryCard';
import { getLabel, getStatus } from '@shared/utilities';

import './style.scss';

const SelectPatternModal = props => {
  const [isLoading, setLoading] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [matchingEntries, setMatchingEntries] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [componentIdRegex, setComponentIdRegex] = useState('patterns/');

  React.useEffect(() => {
    handleInputChange(inputValue);
  }, [componentIdRegex]);

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
    setSearchTimeout(setTimeout(async () => await performQuery(value, componentIdRegex), 150));
  };

  const clearSearchTimeout = () => {
    clearTimeout(searchTimeout);
    setSearchTimeout(null);
  };

  const performQuery = async (searchText = '') => {
    setCompleted(false);
    setLoading(true);

    const response = await props.sdk.space.getEntries({
      content_type: props.contentTypeId || c.CONTENT_TYPE_VIEW_COMPONENT,
      'fields.componentId[match]': componentIdRegex,
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

  const handleTagClick = value => {
    if (selectedTags.some(tag => tag === value)) {
      setSelectedTags(selectedTags.filter(tag => tag !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  };

  const tagsInUse = tags => {
    return tags.filter(tag =>
      props.schemaData.components
        .filter(s => s.meta.editor_role === c.PATTERN_ROLE)
        .some(component => component.meta.tags.includes(tag))
    );
  };

  const filterResultsByTag = (results = []) => {
    if (selectedTags.length) {
      return results.filter(e => {
        const componentId = e.fields.componentId['en-US'];
        const schema = props.schemaData.components.find(schema => schema.meta.id === componentId);

        return selectedTags.every(tag => schema.meta.tags.includes(tag));
      });
    } else {
      return results;
    }
  };

  const handleRawHtmlClick = () => {
    if (componentIdRegex == 'patterns/') {
      setComponentIdRegex('elements/raw_html');
    } else {
      setComponentIdRegex('patterns/');
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
        <p>Search for an entry:</p>
        <TextInput
          className="f36-margin-bottom--m"
          type="text"
          width="full"
          onChange={e => handleInputChange(e.target.value)}
          value={inputValue}
        />
        <div className="tags">
          <div className="tag-section f36-margin-bottom--s">
            {tagsInUse(props.schemaData.tags['component']).map(tag => {
              return (
                <ToggleButton
                  className="tag f36-margin-bottom--xs f36-margin-right--xs"
                  isActive={selectedTags.some(t => t === tag)}
                  onClick={() => handleTagClick(tag)}>
                  {tag}
                </ToggleButton>
              );
            })}
          </div>
          <div className="tag-section f36-margin-bottom--s">
            {tagsInUse(props.schemaData.tags['location']).map(tag => {
              return (
                <ToggleButton
                  className="tag f36-margin-bottom--xs f36-margin-right--xs"
                  isActive={selectedTags.some(t => t === tag)}
                  onClick={() => handleTagClick(tag)}>
                  {tag}
                </ToggleButton>
              );
            })}
          </div>
          <SectionHeading>Special</SectionHeading>
          <div className="tag-section f36-margin-bottom--s">
            <ToggleButton
              className="tag f36-margin-bottom--xs f36-margin-right--xs"
              isActive={componentIdRegex === 'elements/raw_html'}
              onClick={handleRawHtmlClick}>
              {'Raw HTML elements'}
            </ToggleButton>
          </div>
          {/* <div className="tag-section f36-margin-bottom--l">
            {tagsInUse(props.schemaData.tags['content']).map(tag => {
              return (
                <ToggleButton
                  className="tag f36-margin-bottom--xs f36-margin-right--xs"
                  isActive={selectedTags.some(t => t === tag)}
                  onClick={() => handleTagClick(tag)}>
                  {tag}
                </ToggleButton>
              );
            })}
          </div> */}
        </div>
      </div>
      <div className="select-component-modal__results">
        {filterResultsByTag(matchingEntries)
          .filter(e => !e.sys.archivedAt)
          .map((entry, index) => {
            return (
              <EntryCard
                key={`modal-result--${index}`}
                className="f36-margin-bottom--s"
                contentType={entry.fields.componentId['en-US']}
                entry={entry}
                isLoading={false}
                size="small"
                onClick={() => getOnClickFunction()(entry)}
                selected={selected.includes(entry)}
                title={(entry.fields.name || {})['en-US']}
                status={getStatus(entry)}
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

SelectPatternModal.propTypes = {
  sdk: PropTypes.object,
  type: PropTypes.oneOf(['single', 'multiple']),
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  isShown: PropTypes.bool,
  options: PropTypes.array,
  useConfigObjects: PropTypes.bool,
  schemas: PropTypes.array,
  contentTypeId: PropTypes.string
};
SelectPatternModal.defaultProps = {
  type: 'single',
  isShown: false,
  options: [],
  schemas: [],
  contentTypeId: 'viewComponent'
};

export default SelectPatternModal;
