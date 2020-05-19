import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as c from '@shared/constants';
import { Tabs, Tab, TabPanel } from '@contentful/forma-36-react-components';

import './style.scss';

const EditorSections = props => {
  const [selectedTab, setSelectedTab] = useState(props.selectedTab);

  return (
    <div className="editor-section">
      <Tabs withDivider={true} className="f36-margin-bottom--l">
        <Tab
          id="DEFAULT"
          disabled={!props.defaultFields.length}
          selected={selectedTab === 'DEFAULT'}
          onSelect={id => {
            if (!props.defaultFields.length) return;
            setSelectedTab(id);
          }}>
          FIELDS
        </Tab>
        <Tab
          id={c.STYLE_CATEGORY}
          disabled={!props.styleFields.length}
          selected={selectedTab === c.STYLE_CATEGORY}
          onSelect={id => {
            if (!props.styleFields.length) return;
            setSelectedTab(id);
          }}>
          {c.STYLE_CATEGORY.toUpperCase()}
        </Tab>
        <Tab
          id={c.ADVANCED_CATEGORY}
          disabled={!props.advancedFields.length}
          selected={selectedTab === c.ADVANCED_CATEGORY}
          onSelect={id => {
            if (!props.advancedFields.length) return;
            setSelectedTab(id);
          }}>
          {c.ADVANCED_CATEGORY.toUpperCase()}
        </Tab>
      </Tabs>
      {selectedTab === 'DEFAULT' && <TabPanel id="default">{props.defaultFields}</TabPanel>}
      {selectedTab === c.STYLE_CATEGORY && (
        <TabPanel id={c.STYLE_CATEGORY}>{props.styleFields}</TabPanel>
      )}
      {selectedTab === c.ADVANCED_CATEGORY && (
        <TabPanel id={c.ADVANCED_CATEGORY}>{props.advancedFields}</TabPanel>
      )}
    </div>
  );
};

EditorSections.propTypes = {
  selectedTab: PropTypes.string,
  styleFields: PropTypes.array,
  advancedFields: PropTypes.array,
  defaultFields: PropTypes.array
};
EditorSections.defaultProps = {
  selectedTab: 'DEFAULT',
  styleFields: {},
  advancedFields: {},
  defaultFields: {}
};

export default EditorSections;
