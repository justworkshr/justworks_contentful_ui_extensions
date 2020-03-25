import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '../../constants';

import {
  Button,
  Card,
  Modal,
  TextInput,
  ToggleButton,
  SectionHeading
} from '@contentful/forma-36-react-components';
import './style.scss';

const ComponentPalette = props => {
  const [isShown, toggleShown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const handleOnChange = e => {
    let query = e.target.value.length > 1 ? e.target.value.split(' ') : [e.target.value];
    // query = query[query.length - 1];
    console.log('21', typeof query, searchTags);
    setSearchTags(query);

    // let tags = [...selectedTags];
    // let searchTag = searchTags.split(' ')[searchTags.split(' ').length - 1];
    // console.log('@24', searchTag);
    //
    // let filteredTags = tags.filter(tag => tag.some(tag => prevSearchTags.includes(tag)));
    // .filter(schema => schema.meta.tags.some(tag => selectedTags.includes(tag)))
    // tags = [...filteredTags, ...e.target.value.split(' ')];
    // setSelectedTags(tags);
    // setSearchTags(e.target.value);
    // console.log('@L19', e.target.value);
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
              <SectionHeading className="f36-margin-bottom--s">Search</SectionHeading>
              <TextInput type="text" onChange={handleOnChange} width="large" value="" />
            </div>
            <div className="f36-padding--s f36-background-color--element-light">
              <SectionHeading className="f36-margin-bottom--s">Component Tags</SectionHeading>
              {props.tags.component &&
                props.tags.component.map((tag, index) => {
                  return (
                    <ToggleButton
                      key={`component-tag--${index}`}
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
                props.tags.content.map((tag, index) => {
                  return (
                    <ToggleButton
                      key={`content-tag--${index}`}
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
          <div className="component-palette__collection">
            {// selectedTags.length
            //   ? props.schemas
            //       .filter(schema => schema.meta.tags.some(tag => selectedTags.includes(tag)))
            //       .map((schema, index) => {
            //         return (
            //           <Card
            //             key={`palette-schema--${index}`}
            //             testId="palette-schema"
            //             className="component-palette__schema"
            //             selected={schema.meta.id === props.componentId}
            //             onClick={() => handleSchemaClick(schema)}>
            //             {schema.meta.id || 'Schema'}
            //           </Card>
            //         );
            //       })
            searchTags.length && selectedTags.length
              ? props.schemas
                  .filter(
                    schema =>
                      schema.meta.description &&
                      schema.meta.description.split(' ').some(tag => searchTags.includes(tag))
                  )
                  .concat(
                    props.schemas.filter(schema =>
                      schema.meta.tags.some(tag => selectedTags.includes(tag))
                    )
                  )
                  .map((schema, index) => {
                    return (
                      <Card
                        key={`palette-schema--${index}`}
                        testId="palette-schema"
                        className="component-palette__schema"
                        selected={schema.meta.id === props.componentId}
                        onClick={() => handleSchemaClick(schema)}>
                        {schema.meta.id || 'Schema'}
                      </Card>
                    );
                  })
              : props.schemas
                  .filter(schema => schema.meta.editor_role === c.PATTERN_ROLE)
                  .map((schema, index) => {
                    return (
                      <Card
                        key={`palette-schema--${index}`}
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
