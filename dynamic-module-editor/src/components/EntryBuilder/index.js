import React from 'react';
import PropTypes from 'prop-types';

import { componentModule } from '../../../../customModules';

import * as c from '../../../../customModules/constants';

import {
  RadioButtonField,
  Subheading,
  DisplayText,
  TextLink
} from '@contentful/forma-36-react-components';

import TemplateStyleEditor from './components/TemplateStyleEditor';

import RoleSection from '../RoleSection';
import ComponentZone from '../ComponentZone';

import InternalMapping from '../../classes/InternalMapping';

import {
  displayCamelCaseName,
  camelToSnakeCase,
  displaySnakeCaseName
} from '../../../../shared/utilities/elementUtils';

import {
  handleRemoveMappingKey,
  handleAddField,
  handleAddEntry,
  handleLinkAssetClick,
  handleLinkEntryClick,
  handleDuplicateClick,
  handleDeepCopyClick,
  handleUpdateEntryStyle,
  handleUpdateReferencesStyle,
  handleEntryEditClick,
  handleFieldChange,
  handleAddRoleEntryStyle,
  handleAddRoleReferencesEntryStyle,
  handleMultiReferenceDragEnd,
  handleAddComponentZone,
  handleClearComponentZone
} from '../../utils/eventUtils';

import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import ComponentMapping from '../../classes/ComponentMapping';

export default class EntryBuilder extends React.Component {
  constructor(props) {
    super(props);
    const type = props.type;
    const internalMappingJson = props.internalMappingJson;

    this.state = {
      errors: {}, // object { roleKey: array[{message: <string>}]}
      loadingEntries: {}, // object { roleKey: id }
      entryInternalMapping: type
        ? new InternalMapping(internalMappingJson, props.templateConfig)
        : {},
      rolesNavigatedTo: [],
      type
    };

    this.fetchNavigatedTo = this.fetchNavigatedTo.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.updateEntryStyle = this.updateEntryStyle.bind(this);
    this.updateReferencesStyle = this.updateReferencesStyle.bind(this);
    this.updateAssetFormatting = this.updateAssetFormatting.bind(this);
    this.updateTemplateStyle = this.updateTemplateStyle.bind(this);
    this.clearTemplateStyle = this.clearTemplateStyle.bind(this);
    this.clearEntryStyleKey = this.clearEntryStyleKey.bind(this);
    this.clearReferencesStyle = this.clearReferencesStyle.bind(this);
    this.onLinkAssetClick = this.onLinkAssetClick.bind(this);
    this.onAddFieldClick = this.onAddFieldClick.bind(this);
    this.onMultiReferenceDragEnd = this.onMultiReferenceDragEnd.bind(this);
    this.addRoleCustomStyle = this.addRoleCustomStyle.bind(this);
    this.addRoleReferencesCustomStyle = this.addRoleReferencesCustomStyle.bind(this);
    this.addRoleEntryStyle = this.addRoleEntryStyle.bind(this);
    this.addRoleReferencesEntryStyle = this.addRoleReferencesEntryStyle.bind(this);
    this.clearRoleStyle = this.clearRoleStyle.bind(this);
    this.clearRoleReferencesStyle = this.clearRoleReferencesStyle.bind(this);
    this.addComponentZone = this.addComponentZone.bind(this);
    this.clearComponentZone = this.clearComponentZone.bind(this);
  }

  onAddFieldClick = (
    mappingKey,
    zoneKey,
    internalMappingObject = this.props.entryInternalMapping
  ) => {
    if (internalMappingObject.class === ComponentMapping.name) {
      let transformedMapping = this.props.entryInternalMapping;
      internalMappingObject = handleAddField({
        mappingKey,
        fieldType: c.LINK_TYPE_FIELD,
        entryInternalMapping: internalMappingObject
      });

      // attach to value
      transformedMapping.componentZones[zoneKey].value = internalMappingObject.properties;
      this.props.setInternalMappingValue(transformedMapping.asJSON());
    } else {
      handleAddField({
        setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
        mappingKey,
        fieldType: c.LINK_TYPE_SINGLETON,
        entryInternalMapping: this.props.entryInternalMapping
      });
    }
  };

  onFieldChange = (
    e,
    mappingKey,
    zoneKey,
    internalMappingObject = this.props.entryInternalMapping
  ) => {
    if (internalMappingObject.class === ComponentMapping.name) {
      let transformedMapping = this.props.entryInternalMapping;
      internalMappingObject = handleFieldChange({
        entryInternalMapping: internalMappingObject,
        e,
        mappingKey
      });

      // attach to value
      transformedMapping.componentZones[zoneKey].value = internalMappingObject.properties;
      this.props.setInternalMappingValue(transformedMapping.asJSON());
    } else {
      handleFieldChange({
        entryInternalMapping: this.props.entryInternalMapping,
        setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
        e,
        mappingKey
      });
    }
  };

  onMultiReferenceDragEnd(roleKey, draggedIndex, draggedOverIndex) {
    handleMultiReferenceDragEnd({
      entryInternalMapping: this.props.entryInternalMapping,
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      roleKey,
      draggedIndex,
      draggedOverIndex
    });
  }

  onAddEntryClick = async ({
    mappingKey,
    contentType,
    template = undefined,
    type = 'entry',
    zoneKey,
    internalMappingObject = this.props.entryInternalMapping
  } = {}) => {
    if (internalMappingObject.class === ComponentMapping.name) {
      let transformedMapping = this.props.entryInternalMapping;

      internalMappingObject = await handleAddEntry({
        sdk: this.props.sdk,
        entryInternalMapping: internalMappingObject,
        mappingKey,
        contentType,
        template,
        type
      });

      // attach to value
      transformedMapping.componentZones[zoneKey].value = internalMappingObject.properties;
      this.props.updateEntry(transformedMapping.asJSON());
    } else {
      await handleAddEntry({
        sdk: this.props.sdk,
        entryInternalMapping: this.props.entryInternalMapping,
        updateEntry: this.props.updateEntry.bind(this),
        mappingKey,
        contentType,
        template,
        type
      });
    }
  };

  onLinkAssetClick = async (mappingKey, zoneKey, internalMappingObject) => {
    if (internalMappingObject.class === ComponentMapping.name) {
      let transformedMapping = this.props.entryInternalMapping;

      internalMappingObject = await handleLinkAssetClick({
        sdk: this.props.sdk,
        mappingObject: internalMappingObject.properties,
        entryInternalMapping: internalMappingObject,
        mappingKey,
        assetType: this.props.templateConfig.componentZones[zoneKey].componentOptions[
          internalMappingObject.componentName
        ].properties[mappingKey].assetType
      });

      // attach to value
      transformedMapping.componentZones[zoneKey].value = internalMappingObject.properties;
      this.props.updateEntry(transformedMapping.asJSON());
    } else {
      await handleLinkAssetClick({
        sdk: this.props.sdk,
        mappingObject: this.props.templateConfig.componentZones,
        entryInternalMapping: this.props.entryInternalMapping,
        updateEntry: this.props.updateEntry.bind(this),
        mappingKey,
        assetType: this.props.templateConfig.componentZones[mappingKey].componentOptions[
          this.props.entryInternalMapping.componentZones[mappingKey].componentName
        ].properties[mappingKey].assetType
      });
    }
  };

  onLinkEntryClick = async (
    mappingKey,
    contentType,
    zoneKey,
    internalMappingObject = this.props.entryInternalMapping
  ) => {
    if (internalMappingObject.class === ComponentMapping.name) {
      let transformedMapping = this.props.entryInternalMapping;
      internalMappingObject = await handleLinkEntryClick({
        sdk: this.props.sdk,
        mappingKey,
        contentType,
        mappingObject: internalMappingObject.properties,
        entryInternalMapping: internalMappingObject
      });

      // attach to value
      transformedMapping.componentZones[zoneKey].value = internalMappingObject.properties;
      this.props.updateEntry(transformedMapping.asJSON());
    } else {
      await handleLinkEntryClick({
        sdk: this.props.sdk,
        updateEntry: this.props.updateEntry.bind(this),
        mappingKey,
        contentType,
        mappingObject: this.props.templateConfig.componentZones,
        entryInternalMapping: this.props.entryInternalMapping
      });
    }
  };

  onDeepCopyClick = async (
    mappingKey,
    contentType,
    entry = undefined,
    zoneKey,
    internalMappingObject = this.props.entryInternalMapping
  ) => {
    if (internalMappingObject.class === ComponentMapping.name) {
      let transformedMapping = this.props.entryInternalMapping;
      internalMappingObject = await handleDeepCopyClick({
        sdk: this.props.sdk,
        mappingKey,
        contentType,
        entry,
        mappingObject: internalMappingObject.properties,
        entryInternalMapping: internalMappingObject
      });

      // attach to value
      transformedMapping.componentZones[zoneKey].value = internalMappingObject.properties;
      this.props.updateEntry(transformedMapping.asJSON());
    } else {
      await handleDeepCopyClick({
        sdk: this.props.sdk,
        updateEntry: this.props.updateEntry.bind(this),
        mappingKey,
        contentType,
        entry,
        mappingObject: this.props.templateConfig.componentZones,
        entryInternalMapping: this.props.entryInternalMapping
      });
    }
  };

  onDuplicateClick = async (mappingKey, contentType, entry = undefined) => {
    await handleDuplicateClick({
      sdk: this.props.sdk,
      updateEntry: this.props.updateEntry.bind(this),
      mappingKey,
      contentType,
      entry,
      mappingObject: this.props.templateConfig.componentZones,
      entryInternalMapping: this.props.entryInternalMapping
    });
  };

  onEditClick = async (entry, type = 'entry') => {
    await handleEntryEditClick({
      sdk: this.props.sdk,
      entry,
      type
    });
  };

  onRemoveClick = (
    mappingKey,
    zoneKey,
    internalMappingObject = this.props.entryInternalMapping,
    entryIndex = null
  ) => {
    if (internalMappingObject.class === ComponentMapping.name) {
      let transformedMapping = this.props.entryInternalMapping;
      internalMappingObject = handleRemoveMappingKey({
        entryInternalMapping: internalMappingObject,
        mappingKey,
        entryIndex
      });

      // attach to value
      transformedMapping.componentZones[zoneKey].value = internalMappingObject.properties;
      this.props.updateEntry(transformedMapping.asJSON());
    } else {
      handleRemoveMappingKey({
        updateEntry: this.props.updateEntry.bind(this),
        mappingKey,
        entryIndex,
        entryInternalMapping: this.props.entryInternalMapping
      });
    }
  };

  fetchNavigatedTo = () => {
    if (this.state.rolesNavigatedTo && !this.state.rolesNavigatedTo.length) return;
    this.setState({
      rolesNavigatedTo: []
    });
  };

  updateTemplateStyle(templateStyleKey, styleKey, styleValue) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.setTemplateStyleValue(templateStyleKey, styleKey, styleValue);
    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  clearTemplateStyle(templateStyleKey, styleKey) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.removeTemplateStyleKey(templateStyleKey, styleKey);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  updateEntryStyle(roleKey, styleKey, styleValue) {
    handleUpdateEntryStyle({
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      internalMappingObject: this.props.entryInternalMapping,
      roleKey,
      styleKey,
      styleValue
    });
  }

  updateReferencesStyle(roleKey, styleKey, styleValue) {
    handleUpdateReferencesStyle({
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      internalMappingObject: this.props.entryInternalMapping,
      roleKey,
      styleKey,
      styleValue
    });
  }

  clearEntryStyleKey(roleKey, styleKey) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.removeStyleKey(roleKey, styleKey);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  clearReferencesStyle(roleKey, styleKey) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.removeReferencesStyleKey(roleKey, styleKey);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  updateAssetFormatting(roleKey, formattingObject) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.setAssetFormatting(roleKey, formattingObject);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  addRoleCustomStyle(roleKey, fieldConfigObject) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.addStyleCustom(roleKey, fieldConfigObject);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  addRoleReferencesCustomStyle(roleKey, fieldConfigObject) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    updatedInternalMapping.addReferencesStyleCustom(roleKey, fieldConfigObject);

    this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
  }

  clearRoleStyle(roleKey) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    const styleType = updatedInternalMapping[roleKey].style.type;
    updatedInternalMapping.clearRoleStyle(roleKey);
    if (styleType === c.STYLE_TYPE_CUSTOM) {
      this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
    } else {
      this.props.updateEntry(updatedInternalMapping.asJSON());
    }
  }

  clearRoleReferencesStyle(roleKey) {
    let updatedInternalMapping = this.props.entryInternalMapping;
    const styleType = updatedInternalMapping[roleKey].value.find(e => e.type === c.FIELD_TYPE_ASSET)
      .style.type;
    updatedInternalMapping.clearRoleReferencesStyle(roleKey);
    if (styleType === c.STYLE_TYPE_CUSTOM) {
      this.props.setInternalMappingValue(updatedInternalMapping.asJSON());
    } else {
      this.props.updateEntry(updatedInternalMapping.asJSON());
    }
  }

  addRoleEntryStyle = roleKey => {
    handleAddRoleEntryStyle({
      sdk: this.props.sdk,
      props: this.props,
      roleKey,
      updateEntry: this.props.updateEntry
    });
  };

  addRoleReferencesEntryStyle = roleKey => {
    handleAddRoleReferencesEntryStyle({
      sdk: this.props.sdk,
      props: this.props,
      roleKey,
      updateEntry: this.props.updateEntry
    });
  };

  addComponentZone = (mappingKey, componentZoneName) => {
    handleAddComponentZone({
      mappingKey,
      componentZoneName,
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      entryInternalMapping: this.props.entryInternalMapping
    });
  };

  clearComponentZone = mappingKey => {
    handleClearComponentZone({
      mappingKey,
      updateEntry: this.props.updateEntry.bind(this),
      entryInternalMapping: this.props.entryInternalMapping
    });
  };

  render() {
    return (
      <div className="custom-template-entry-builder" onClick={this.fetchNavigatedTo}>
        <div className="custom-template-entry-builder__section">
          {/* <DisplayText className="style-editor__heading--header" element="h1">
            Component Zones
          </DisplayText> */}

          <TextLink
            href={`https://justworks-sandbox.herokuapp.com/styleguide/patterns%2F${camelToSnakeCase(
              (this.props.entryInternalMapping || {}).patternName
            )}`}
            target="_blank">
            View Styleguide for{' '}
            {displayCamelCaseName((this.props.entryInternalMapping || {}).patternName)}
          </TextLink>

          {this.props.templateConfig.componentZones &&
            Object.keys(this.props.templateConfig.componentZones).map((componentZoneKey, index) => {
              const zoneConfigObject =
                this.props.templateConfig.componentZones[componentZoneKey] || {};
              const zoneMappingObject =
                this.props.entryInternalMapping.componentZones[componentZoneKey] || null;
              return (
                <ComponentZone
                  key={`cz-${componentZoneKey}`}
                  index={index}
                  componentZoneKey={componentZoneKey}
                  zoneMappingObject={zoneMappingObject}
                  zoneConfigObject={zoneConfigObject}
                  entryInternalMapping={this.props.entryInternalMapping}
                  hydratedAssets={this.props.hydratedAssets}
                  hydratedEntries={this.props.hydratedEntries}
                  addComponentZone={this.addComponentZone}
                  clearComponentZone={this.clearComponentZone}
                  onLinkEntryClick={this.onLinkEntryClick}
                  onLinkAssetClick={this.onLinkAssetClick}
                  onDeepCopyClick={this.onDeepCopyClick}
                  onAddEntryClick={this.onAddEntryClick}
                  onEditClick={this.onEditClick}
                  onRemoveClick={this.onRemoveClick}
                  onAddFieldClick={this.onAddFieldClick}
                  onFieldChange={this.onFieldChange}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

EntryBuilder.propTypes = {
  sdk: PropTypes.object.isRequired,
  type: PropTypes.string,
  entryInternalMapping: PropTypes.object,
  internalMappingJson: PropTypes.string,
  loadingEntries: PropTypes.array,
  hydratedEntries: PropTypes.array,
  hydratedAssets: PropTypes.array,
  updateEntry: PropTypes.func,
  setInternalMappingValue: PropTypes.func,
  templateConfig: PropTypes.object
};

EntryBuilder.defaultProps = {
  internalMappingJson: '',
  entryInternalMapping: {},
  type: '',
  hydratedEntries: [],
  loadingEntries: [],
  hydratedAssets: [],
  templateConfig: {}
};
