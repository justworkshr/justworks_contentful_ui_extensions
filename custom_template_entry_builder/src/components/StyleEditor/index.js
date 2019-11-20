import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, SectionHeading } from '@contentful/forma-36-react-components';
import InternalMapping from '../../utils/InternalMapping';

import './style.css';

const StyleEditor = props => {
  const [open, toggleOpen] = useState(false);

  const renderStyle = type => {
    switch (type) {
      case InternalMapping.MARKDOWN:
        return renderMarkdownStyle();
      case InternalMapping.TEXT:
        return renderTextStyle();
    }
  };

  const renderTextStyle = () => {
    return <h1>Text Style</h1>;
  };

  const renderMarkdownStyle = () => {
    return <h1>Markdown Style</h1>;
  };

  return (
    <div className="style-editor">
      <div className="style-editor__heading" onClick={() => toggleOpen(!open)}>
        <Icon className="style-editor__heading--icon" icon="Code" size="large" />
        <SectionHeading className="style-editor__heading--header" element="h1">
          {props.title}
        </SectionHeading>
        <Icon
          className="style-editor__heading--toggle"
          icon={open ? 'ChevronDown' : 'ChevronUp'}
          size="small"
        />
      </div>
      {!!open && renderStyle(props.type)}
    </div>
  );
};

StyleEditor.propTypes = {
  title: PropTypes.string,
  onAddStyleClick: PropTypes.func,
  onRemoveStyleClick: PropTypes.func,
  type: PropTypes.string
};

StyleEditor.defaultProps = {
  type: InternalMapping.TEXT
};

export default StyleEditor;
