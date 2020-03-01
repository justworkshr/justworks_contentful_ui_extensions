import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../constants';

import {
  Button,
  Card,
  Modal,
  ToggleButton,
  SectionHeading
} from '@contentful/forma-36-react-components';
import './style.scss';

const ComponentPalette = props => {
  const [isShown, toggleShown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagClick = value => {
    if (selectedTags.some(tag => tag === value)) {
      setSelectedTags(selectedTags.filter(tag => tag !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  };

  const handleSchemaClick = value => {
    console.log(value);
    props.onChange(value.meta.id);
    toggleShown(false);
  };

  return (
    <div className="component-palette">
      <Button onClick={() => toggleShown(!isShown)}>Change Component</Button>
      <Modal
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
              <SectionHeading className="f36-margin-bottom--s">Component Tags</SectionHeading>
              {props.tags.component &&
                props.tags.component.map(tag => {
                  return (
                    <ToggleButton
                      testId="palette-tag"
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
                props.tags.content.map(tag => {
                  return (
                    <ToggleButton
                      testId="palette-tag"
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
                props.tags.location.map(tag => {
                  return (
                    <ToggleButton
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
          <div className="component-palette__collection">
            {props.schemas
              .filter(schema => schema.meta.editor_role === c.PATTERN_ROLE)
              .map(schema => {
                return (
                  <Card
                    testId="palette-schema"
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
