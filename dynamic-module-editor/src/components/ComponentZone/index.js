import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../../customModules/constants';

import EntryActionRow from '../EntryBuilder/components/EntryActionRow';

import { TextLink } from '@contentful/forma-36-react-components';
import { camelToSnakeCase, displayCamelCaseName } from '../../../../shared/utilities/elementUtils';
import ComponentZoneMenu from './ComponentZoneMenu';
import EntryField from '../EntryBuilder/components/EntryField';
import RoleSection from '../RoleSection';
import ComponentMapping from '../../classes/ComponentMapping';

const ComponentZone = props => {
  const onSingletonAddField = (propertyKey, componentZoneKey, componentMappingObject) => {
    return props.onAddFieldClick(propertyKey, componentZoneKey, componentMappingObject);
  };

  const onSingletonFieldChange = (e, propertyKey, componentZoneKey, componentMappingObject) => {
    return props.onFieldChange(e, propertyKey, componentZoneKey, componentMappingObject);
  };

  const onSingletonRemove = (
    propertyKey,
    componentZoneKey,
    componentMappingObject,
    index = null
  ) => {
    return props.onRemoveClick(propertyKey, componentZoneKey, componentMappingObject, index);
  };

  const onSingletonAddEntry = (
    mappingKey,
    contentType,
    template = undefined,
    type = 'entry',
    componentZoneKey,
    componentMappingObject
  ) => {
    return props.onAddEntryClick({
      mappingKey,
      contentType,
      template,
      type,
      zoneKey: componentZoneKey,
      internalMappingObject: componentMappingObject
    });
  };

  const onSingletonLinkEntry = (
    propertyKey,
    contentType,
    componentZoneKey,
    componentMappingObject
  ) => {
    return props.onLinkEntryClick(
      propertyKey,
      contentType,
      componentZoneKey,
      componentMappingObject
    );
  };

  const onSingletonLinkAsset = (propertyKey, componentZoneKey, componentMappingObject) => {
    return props.onLinkAssetClick(propertyKey, componentZoneKey, componentMappingObject);
  };

  const onSingletonDeepCopy = (
    propertyKey,
    contentType,
    entry,
    componentZoneKey,
    componentMappingObject
  ) => {
    return props.onDeepCopyClick(
      propertyKey,
      contentType,
      entry,
      componentZoneKey,
      componentMappingObject
    );
  };

  const renderComponentZone = (componentZoneKey, zoneMappingObject, zoneConfigObject) => {
    if (!zoneMappingObject) return null;

    const componentConfigObject =
      zoneConfigObject.componentOptions[zoneMappingObject.componentName];
    // Render entry/asset card
    if (zoneMappingObject.type === c.FIELD_TYPE_ENTRY && !!zoneMappingObject.value) {
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
            propertyType={zoneMappingObject.type}
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
      // Render entry select options
      zoneMappingObject &&
      !zoneMappingObject.type
    ) {
      // Render empty action row
      return (
        <EntryActionRow
          allowAssets={false}
          allowEntries={componentConfigObject.meta.componentTypes.includes(c.LINK_TYPE_ENTRY)}
          allowFields={componentConfigObject.meta.componentTypes.includes(c.LINK_TYPE_SINGLETON)}
          addFieldLabel="Add singleton"
          className="max-width-600"
          contentTypes={componentConfigObject.meta.contentTypes}
          roleKey={componentZoneKey}
          onAddFieldClick={props.onAddFieldClick}
          onAddEntryClick={props.onAddEntryClick}
          // onLinkAssetClick={props.onLinkAssetClick}
          onLinkEntryClick={props.onLinkEntryClick}
          onDeepCopyLinkClick={props.onDeepCopyClick}
          // onDuplicateClick={props.onDuplicateClick}
        />
      );
    } else if (props.zoneMappingObject.type === c.LINK_TYPE_SINGLETON) {
      // Render Singleton
      return Object.keys(componentConfigObject.properties).map((propertyKey, index) => {
        const propertyConfigObject = componentConfigObject.properties[propertyKey] || {};
        const propertyMappingObject = zoneMappingObject.value[propertyKey] || {};
        const componentMapping = new ComponentMapping(
          { properties: zoneMappingObject.value },
          componentConfigObject
        );

        return (
          <RoleSection
            key={`cz-rs--${index}`}
            mappingKey={propertyKey}
            propertyMappingObject={propertyMappingObject}
            propertyConfigObject={propertyConfigObject}
            entryInternalMapping={componentMapping}
            templateConfig={componentConfigObject}
            hydratedEntries={props.hydratedEntries}
            hydratedAssets={props.hydratedAssets}
            onAddFieldClick={propertyKey =>
              onSingletonAddField(propertyKey, props.componentZoneKey, componentMapping)
            }
            onFieldChange={(e, propertyKey) =>
              onSingletonFieldChange(e, propertyKey, props.componentZoneKey, componentMapping)
            }
            onRemoveClick={(propertyKey, index) =>
              onSingletonRemove(propertyKey, props.componentZoneKey, componentMapping, index)
            }
            onAddEntryClick={({ mappingKey, contentType, template, type }) =>
              onSingletonAddEntry(
                mappingKey,
                contentType,
                template,
                type,
                props.componentZoneKey,
                componentMapping
              )
            }
            onLinkEntryClick={(propertyKey, contentType) =>
              onSingletonLinkEntry(
                propertyKey,
                contentType,
                props.componentZoneKey,
                componentMapping
              )
            }
            onLinkAssetClick={propertyKey =>
              onSingletonLinkAsset(propertyKey, props.componentZoneKey, componentMapping)
            }
            onDeepCopyClick={(propertyKey, contentType, entry) =>
              onSingletonDeepCopy(
                propertyKey,
                contentType,
                entry,
                props.componentZoneKey,
                componentMapping
              )
            }
          />
        );
      });
    } else {
      return null;
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
        onAddFieldClick={props.onAddFieldClick}
      />
      {props.zoneMappingObject && (
        <TextLink
          href={`https://justworks-sandbox.herokuapp.com/styleguide/components%2F${camelToSnakeCase(
            props.zoneMappingObject.componentName
          )}`}
          target="_blank">
          View Styleguide for {displayCamelCaseName(props.zoneMappingObject.componentName)}
        </TextLink>
      )}

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
  onLinkAssetClick: PropTypes.func,
  onDeepCopyClick: PropTypes.func,
  onAddEntryClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onAddFieldClick: PropTypes.func,
  onFieldChange: PropTypes.func
};
ComponentZone.defaultProps = {
  loadingEntries: []
};

export default ComponentZone;
