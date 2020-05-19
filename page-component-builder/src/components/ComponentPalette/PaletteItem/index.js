import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, TextLink, SectionHeading } from '@contentful/forma-36-react-components';

import './style.scss';

const PaletteItem = props => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);

    // props.selectItem();
  };

  return (
    <div className="palette-item" data-test-id={`palette-item--${props.testId}`}>
      <Card
        testId={props.testId}
        className={props.className}
        selected={props.selected}
        onClick={handleClick}>
        {props.title}
      </Card>
      {isOpen && (
        <div className="palette-item__dropdown">
          <div>
            <TextLink linkType="positive" onClick={() => props.selectItem(props.schema)}>
              Select
            </TextLink>
          </div>
          <div>
            <TextLink
              href={`https://justworks-staging-v2.herokuapp.com${props.schema.meta.styleguide_path}`}
              target="_blank">
              Styleguide Link
            </TextLink>
          </div>
          <div>
            <TextLink
              href={`https://justworks-staging-v2.herokuapp.com/render-component?component=${props.schema.meta.id}&example=default`}
              target="_blank">
              Preview Link
            </TextLink>
          </div>
          <br />
          {!!props.extensions.length && (
            <div className="palette-item__extensions">
              <SectionHeading>Extensions</SectionHeading>
              <hr />
              {props.extensions.map(extension => {
                return (
                  <TextLink linkType="positive" onClick={() => props.selectItem(extension)}>
                    {extension.meta.title || extension.meta.id}
                  </TextLink>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

PaletteItem.propTypes = {
  className: PropTypes.string,
  extensions: PropTypes.array,
  selected: PropTypes.bool,
  selectItem: PropTypes.func,
  schema: PropTypes.object,
  testId: PropTypes.string,
  title: PropTypes.string
};
PaletteItem.defaultProps = {
  extensions: [],
  selected: PropTypes.bool
};

export default PaletteItem;
