import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../customModules/constants';

import EntryActionRow from '../EntryBuilder/components/EntryActionRow';

import { Subheading } from '@contentful/forma-36-react-components';
import { displayCamelCaseName } from '../../../../shared/utilities/elementUtils';

const ComponentZone = props => {
  const renderComponentZone = (componentZoneKey, componentConfigObject) => {
    if (componentConfigObject && componentConfigObject.meta.componentType === c.FIELD_TYPE_ENTRY) {
      // Render empty action row
      return (
        <EntryActionRow
          allowAssets={false}
          allowFields={false}
          allowLinks={true}
          className="max-width-600"
          contentTypes={[c.CONTENT_TYPE_COMPONENT_MODULE]}
          roleKey={props.componentZoneKey}
          // onAddFieldClick={props.onAddFieldClick}
          // onAddEntryClick={props.onAddEntryClick}
          // onLinkAssetClick={props.onLinkAssetClick}
          // onLinkEntryClick={props.onLinkEntryClick}
          // onDeepCopyLinkClick={props.onDeepCopyClick}
          // onDuplicateClick={props.onDuplicateClick}
        />
      );
    }
  };

  console.log(props.zoneMappingObject, props.componentConfigObject);
  return (
    <div className="component-zone">
      <Subheading className="sub-section__heading--header" element="h2">
        {displayCamelCaseName(props.componentZoneKey)}
      </Subheading>
      {renderComponentZone(props.componentZoneKey, props.componentConfigObject)}
    </div>
  );
};

ComponentZone.propTypes = {
  componentZoneKey: PropTypes.string,
  zoneMappingObject: PropTypes.object,
  componentConfigObject: PropTypes.object
};
ComponentZone.defaultProps = {};

export default ComponentZone;
