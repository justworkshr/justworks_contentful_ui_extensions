import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../customModules/constants';

import EntryActionRow from '../EntryBuilder/components/EntryActionRow';

import { Subheading } from '@contentful/forma-36-react-components';
import { displayCamelCaseName } from '../../../../shared/utilities/elementUtils';
import ComponentZoneMenu from './ComponentZoneMenu';

const ComponentZone = props => {
  const renderComponentZone = (componentZoneKey, zoneMappingObject, zoneConfigObject) => {
    if (zoneMappingObject) {
      const componentConfigObject =
        zoneConfigObject.componentOptions[zoneMappingObject.componentName];
      if (
        componentConfigObject &&
        componentConfigObject.meta.componentType === c.FIELD_TYPE_ENTRY
      ) {
        // Render empty action row

        return (
          <EntryActionRow
            allowAssets={false}
            allowFields={false}
            allowLinks={true}
            className="max-width-600"
            contentTypes={[c.CONTENT_TYPE_COMPONENT_MODULE]}
            roleKey={componentZoneKey}
            // onAddFieldClick={props.onAddFieldClick}
            // onAddEntryClick={props.onAddEntryClick}
            // onLinkAssetClick={props.onLinkAssetClick}
            // onLinkEntryClick={props.onLinkEntryClick}
            // onDeepCopyLinkClick={props.onDeepCopyClick}
            // onDuplicateClick={props.onDuplicateClick}
          />
        );
      } else {
        return null;
      }
    }
  };

  return (
    <div className="component-zone">
      <ComponentZoneMenu
        componentZoneKey={props.componentZoneKey}
        zoneConfigObject={props.zoneConfigObject}
        zoneMappingObject={props.zoneMappingObject}
        addComponentZone={props.addComponentZone}
        clearComponentZone={props.clearComponentZone}
      />
      {renderComponentZone(props.componentZoneKey, props.zoneMappingObject, props.zoneConfigObject)}
    </div>
  );
};

ComponentZone.propTypes = {
  componentZoneKey: PropTypes.string,
  zoneConfigObject: PropTypes.object,
  zoneMappingObject: PropTypes.object,
  addComponentZone: PropTypes.func,
  clearComponentZone: PropTypes.func
};
ComponentZone.defaultProps = {};

export default ComponentZone;
