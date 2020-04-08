import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../constants';

import {
  Button,
  Card,
  Modal,
  SectionHeading,
  TextInput,
  ToggleButton
} from '@contentful/forma-36-react-components';
import './style.scss';

const ComponentPalette = props => {
  const [isShown, toggleShown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleOnChange = e => setSearchText(e.target.value);

  const filterBySearch = schemas => {
    return searchText ? schemas.filter(schema => schema.meta.id.includes(searchText)) : schemas;
  };

  const filterByTag = schemas => {
    return selectedTags.length
      ? schemas.filter(schema => schema.meta.tags.some(tag => selectedTags.includes(tag)))
      : schemas;
  };

  const filterByPattern = schemas => {
    return schemas.filter(schema => schema.meta.editor_role === c.PATTERN_ROLE);
  };

  const filterSchemas = schemas => {
    return filterBySearch(filterByTag(filterByPattern(schemas)));
  };

  const handleTagClick = value => {
    if (selectedTags.some(tag => tag === value)) {
      setSelectedTags(selectedTags.filter(tag => tag !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  };

  const handleSchemaClick = value => {
    props.onChange(value.meta.id);
    toggleShown(false);
  };
  return (
    <div className="component-palette" data-test-id="component-palette">
      <Button testId="component-palette__button" onClick={() => toggleShown(!isShown)}>
        Change Component
      </Button>
      <Modal
        testId="component-palette__modal"
        className="component-palette__modal"
        isShown={isShown}
        onClose={() => toggleShown(false)}
        title="Component Palette"
        size="zen"
        allowHeightOverflow={true}
        position="top"
        topOffset="0px">
        <div className="component-palette__wrapper">
          <div className="component-palette__sidebar f36-background-color--element-dark">
            <div className="f36-padding--s f36-background-color--element-light">
              <SectionHeading className="f36-margin-bottom--s">Search</SectionHeading>
              <TextInput
                data-test-id="component-palette__search-input"
                type="text"
                onChange={handleOnChange}
                width="large"
                value=""
              />
            </div>
            <div className="f36-padding--s f36-background-color--element-light">
              <SectionHeading className="f36-margin-bottom--s">Component Tags</SectionHeading>
              {props.tags.component &&
                props.tags.component.map((tag, index) => {
                  return (
                    <ToggleButton
                      key={`component-tag--${index}`}
                      testId={`palette-tag--${tag}`}
                      className="component-palette__pill"
                      isActive={selectedTags.some(t => t === tag)}
                      onClick={() => handleTagClick(tag)}>
                      {tag}
                    </ToggleButton>
                  );
                })}
            </div>
            <div className="f36-padding--s f36-background-color--element-light">
              <SectionHeading className="f36-margin-bottom--s">Content Tags</SectionHeading>
              {props.tags.content &&
                props.tags.content.map((tag, index) => {
                  return (
                    <ToggleButton
                      key={`content-tag--${index}`}
                      testId={`palette-tag--${tag}`}
                      className="component-palette__pill"
                      isActive={selectedTags.some(t => t === tag)}
                      onClick={() => handleTagClick(tag)}>
                      {tag}
                    </ToggleButton>
                  );
                })}
            </div>

            <div className="f36-padding--s f36-background-color--element-light">
              <SectionHeading className="f36-margin-bottom--s">Location Tags</SectionHeading>
              {props.tags.location &&
                props.tags.location.map((tag, index) => {
                  return (
                    <ToggleButton
                      key={`location-tag--${index}`}
                      testId="palette-tag"
                      className="component-palette__pill"
                      isActive={selectedTags.some(t => t === tag)}
                      onClick={() => handleTagClick(tag)}>
                      {tag}
                    </ToggleButton>
                  );
                })}
            </div>
          </div>
          <div
            className="component-palette__collection"
            data-test-id="component-palette-collection">
            {filterSchemas(props.schemas).map((schema, index) => {
              return (
                <Card
                  key={`palette-schema--${index}`}
                  testId={`palette-card--${schema.meta.id}`}
                  className="component-palette__schema"
                  selected={schema.meta.id === props.componentId}
                  onClick={() => handleSchemaClick(schema)}>
                  {schema.meta.id || 'Schema'}
                </Card>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

ComponentPalette.propTypes = {
  componentId: PropTypes.string,
  onChange: PropTypes.func,
  schemas: PropTypes.array,
  tags: PropTypes.object
};
ComponentPalette.defaultProps = {
  schemas: [],
  tags: {
    component: [],
    content: [],
    location: []
  }
};

export default ComponentPalette;
