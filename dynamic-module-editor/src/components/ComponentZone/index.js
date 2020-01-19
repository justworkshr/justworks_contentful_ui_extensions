import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../customModules/constants';

import EntryActionRow from '../EntryBuilder/components/EntryActionRow';

import { Subheading } from '@contentful/forma-36-react-components';
import { displayCamelCaseName } from '../../../../shared/utilities/elementUtils';
import ComponentZoneMenu from './ComponentZoneMenu';
import EntryField from '../EntryBuilder/components/EntryField';

const ComponentZone = props => {
  const renderComponentZone = (componentZoneKey, zoneMappingObject, zoneConfigObject) => {
    if (zoneMappingObject) {
      const componentConfigObject =
        zoneConfigObject.componentOptions[zoneMappingObject.componentName];
      if (zoneMappingObject.type === c.FIELD_TYPE_ENTRY) {
        const entry =
          props.hydratedEntries.find(
            he => he.sys.id === props.entryInternalMapping[componentZoneKey].value
          ) ||
          props.hydratedAssets.find(
            a => a.sys.id === props.entryInternalMapping[componentZoneKey].value
          );
        return (
          <div className="section-row">
            <EntryField
              className="max-width-600"
              entry={entry}
              fieldType={zoneMappingObject.type}
              isLoading={entry ? !!props.loadingEntries.includes(entry.sys.id) : false}
              roleKey={componentZoneKey}
              roleMappingObject={zoneMappingObject}
              onEditClick={props.onEditClick}
              // onDeepCopyClick={props.onDeepCopyClick}
              onRemoveClick={props.onRemoveClick}
              // onFieldChange={props.onFieldChange}
            />
          </div>
        );
      } else if (
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
            onLinkEntryClick={props.onLinkEntryClick}
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
  entryInternalMapping: PropTypes.object,
  hydratedAssets: PropTypes.array,
  hydratedEntries: PropTypes.array,
  loadingEntries: PropTypes.array,
  addComponentZone: PropTypes.func,
  clearComponentZone: PropTypes.func,
  onLinkEntryClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func
};
ComponentZone.defaultProps = {
  loadingEntries: []
};

export default ComponentZone;
