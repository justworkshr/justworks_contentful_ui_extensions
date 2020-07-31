import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '@shared/constants';
import { schemaTitle } from '../../utilities/copyUtils';

import PaletteItem from './PaletteItem';

import {
  Button,
  Modal,
  SectionHeading,
  TextInput,
  ToggleButton
} from '@contentful/forma-36-react-components';
import './style.scss';

const ComponentPalette = props => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleOnChange = e => setSearchText(e.target.value);

  const filterBySearch = schemas => {
    return searchText
      ? schemas.filter(schema => {
          const titleText = schema.meta.title
            ? schema.meta.title.toLowerCase()
            : schema.meta.id.toLowerCase();
          return titleText.includes(searchText.toLowerCase());
        })
      : schemas;
  };

  const filterByTag = schemas => {
    return selectedTags.length
      ? schemas.filter(schema =>
          selectedTags.every(selectedTag => schema.meta.tags.includes(selectedTag))
        )
      : schemas;
  };

  const patternSchemas = schemas => {
    return schemas
      .filter(schema => schema.meta.editor_role === c.PATTERN_ROLE) // patterns only
      .filter(schema => !schema.meta.extension_of) // non-extensions only
      .sort((a, b) => {
        // alphabetical sort
        if (a.meta.title < b.meta.title) {
          return -1;
        }
        if (a.meta.title > b.meta.title) {
          return 1;
        }
        return 0;
      });
  };

  const filterSchemas = schemas => {
    return filterBySearch(filterByTag(patternSchemas(schemas)));
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
      patternSchemas(props.schemas).some(component => component.meta.tags.includes(tag))
    );
  };

  const handleSchemaClick = (value, patternVariation = null) => {
    props.onChange(value.meta.id, patternVariation);
    props.toggleShown(false);
  };

  return (
    <div className="component-palette" data-test-id="component-palette">
      <Button
        testId="component-palette__button"
        className="f36-margin-top--s"
        onClick={() => props.toggleShown(!props.isShown)}
        disabled={!props.schemas.length}>
        {props.schemas.length ? 'Change Component' : 'Loading...'}
      </Button>
      <Modal
        testId="component-palette__modal"
        className="component-palette__modal"
        isShown={props.isShown}
        onClose={() => props.toggleShown(false)}
        title="Pattern Library"
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
                tagsInUse(props.tags.component).map((tag, index) => {
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
            {/* <div className="f36-padding--s f36-background-color--element-light">
              <SectionHeading className="f36-margin-bottom--s">Content Tags</SectionHeading>
              {props.tags.content &&
                tagsInUse(props.tags.content).map((tag, index) => {
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
            </div> */}

            <div className="f36-padding--s f36-background-color--element-light">
              <SectionHeading className="f36-margin-bottom--s">Location Tags</SectionHeading>
              {props.tags.location &&
                tagsInUse(props.tags.location).map((tag, index) => {
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
                <PaletteItem
                  key={`palette-schema--${index}`}
                  testId={`palette-card--${schema.meta.id}`}
                  className="component-palette__schema"
                  extensions={props.schemas.filter(s => s.meta.extension_of === schema.meta.id)}
                  selected={schema.meta.id === props.componentId}
                  selectItem={handleSchemaClick}
                  schema={schema}
                  title={schemaTitle(schema)}
                />
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
  tags: PropTypes.object,
  isShown: PropTypes.bool,
  toggleShown: PropTypes.func
};
ComponentPalette.defaultProps = {
  isShown: false,
  schemas: [],
  tags: {
    component: [],
    content: [],
    location: []
  }
};

export default ComponentPalette;
