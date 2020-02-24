import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TAGS } from '../../constants';
import { Button, Card, Modal, ToggleButton } from '@contentful/forma-36-react-components';
import './style.scss';
const ComponentPalette = props => {
  console.log(props.schemas);
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
            {TAGS.map(tag => {
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
          <div className="component-palette__collection">
            {props.schemas.map(schema => {
              return (
                <Card
                  testId="palette-schema"
                  className="component-palette__schema"
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
  schemas: PropTypes.array
};
ComponentPalette.defaultProps = {
  schemas: []
};

export default ComponentPalette;
