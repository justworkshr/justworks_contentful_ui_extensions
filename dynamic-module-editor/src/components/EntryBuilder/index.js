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

import { getFieldConfig } from './utils';
import {
  displayCamelCaseName,
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

  onAddFieldClick = (roleKey, fieldType) => {
    handleAddField({
      props: this.props,
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      roleKey,
      fieldType
    });
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
    type = 'entry'
  } = {}) => {
    await handleAddEntry({
      sdk: this.props.sdk,
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      mappingKey,
      contentType,
      template,
      type
    });
  };

  onLinkAssetClick = async roleKey => {
    await handleLinkAssetClick({
      sdk: this.props.sdk,
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      roleKey
    });
  };

  onLinkEntryClick = async (mappingKey, contentType) => {
    await handleLinkEntryClick({
      sdk: this.props.sdk,
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      mappingKey,
      contentType
    });
  };

  onDeepCopyClick = async (mappingKey, contentType, entry = undefined) => {
    await handleDeepCopyClick({
      sdk: this.props.sdk,
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      mappingKey,
      contentType,
      entry
    });
  };

  onDuplicateClick = async (mappingKey, contentType, entry = undefined) => {
    await handleDuplicateClick({
      sdk: this.props.sdk,
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      mappingKey,
      contentType,
      entry
    });
  };

  onEditClick = async (entry, type = 'entry') => {
    await handleEntryEditClick({
      sdk: this.props.sdk,
      entry,
      type
    });
  };

  onRemoveClick = (roleKey, entryIndex = null) => {
    handleRemoveMappingKey({
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      roleKey,
      entryIndex
    });
  };

  fetchNavigatedTo = () => {
    if (this.state.rolesNavigatedTo && !this.state.rolesNavigatedTo.length) return;
    this.setState({
      rolesNavigatedTo: []
    });
  };

  onFieldChange = (e, roleKey) => {
    handleFieldChange({
      props: this.props,
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      e,
      roleKey
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
    const componentConfig = componentModule[componentZoneName];

    if (!componentConfig) throw `No component configuration found for ${componentZoneName}`;

    handleAddComponentZone({
      mappingKey,
      componentConfig,
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      entryInternalMapping: this.props.entryInternalMapping
    });
  };

  clearComponentZone = mappingKey => {
    handleClearComponentZone({
      mappingKey,
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      entryInternalMapping: this.props.entryInternalMapping
    });
  };

  render() {
    return (
      <div className="custom-template-entry-builder" onClick={this.fetchNavigatedTo}>
        <div className="custom-template-entry-builder__section">
          <DisplayText className="style-editor__heading--header" element="h1">
            Component Zones
          </DisplayText>

          {Object.keys(this.props.templateConfig.componentZones).map((roleKey, index) => {
            const roleConfigObject = this.props.templateConfig.componentZones[roleKey] || {};
            const roleMappingObject =
              this.props.entryInternalMapping.componentZones[roleKey] || null;

            return (
              <div key={`component-zone-menu--${roleKey}`}>
                <Subheading className="sub-section__heading--header" element="h2">
                  {displaySnakeCaseName(roleKey)}
                  {roleMappingObject && (
                    <TextLink
                      className="style-editor__clear-link"
                      icon="Close"
                      onClick={() => {
                        this.clearComponentZone(roleKey);
                      }}>
                      Clear
                    </TextLink>
                  )}
                </Subheading>

                <div className="style-editor__radio-section">
                  {Object.keys(roleConfigObject.componentOptions).map(componentOption => {
                    return (
                      <RadioButtonField
                        key={`${roleKey}-component-option--${componentOption}`}
                        id={`${roleKey}-${componentOption}`}
                        name={`${roleKey}-${componentOption}`}
                        labelText={displayCamelCaseName(componentOption)}
                        checked={
                          roleMappingObject
                            ? roleMappingObject.componentName === componentOption
                            : false
                        }
                        value={componentOption}
                        onChange={e => {
                          this.addComponentZone(roleKey, componentOption);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}

          {Object.keys(this.props.templateConfig.componentZones).map((componentZoneKey, index) => {
            const zoneMappingObject =
              this.props.entryInternalMapping.componentZones[componentZoneKey] || null;
            // const componentConfigObject = componentModule[zoneMappingObject.componentName] || null;
            if (zoneMappingObject) {
              const componentConfigObject = this.props.templateConfig.componentZones[
                componentZoneKey
              ].componentOptions[zoneMappingObject.componentName];
              // const fieldConfigObject = getFieldConfig(
              //   componentConfigObject.properties,
              //   roleMappingObject
              // );
              {
                /* <RoleSection
                key={index}
                roleKey={roleKey}
                fieldConfigObject={fieldConfigObject}
                roleConfigObject={roleConfigObject}
                roleMappingObject={roleMappingObject}
                stateErrors={this.state.errors}
                loadingEntries={this.props.loadingEntries}
                entryInternalMapping={this.props.entryInternalMapping}
                templateConfig={this.props.templateConfig}
                hydratedEntries={this.props.hydratedEntries}
                hydratedAssets={this.props.hydratedAssets}
                onEditClick={this.onEditClick}
                onDeepCopyClick={this.onDeepCopyClick}
                onDuplicateClick={this.onDuplicateClick}
                onRemoveClick={this.onRemoveClick}
                onFieldChange={this.onFieldChange}
                onAddFieldClick={this.onAddFieldClick}
                onAddEntryClick={this.onAddEntryClick}
                onLinkAssetClick={this.onLinkAssetClick}
                onLinkEntryClick={this.onLinkEntryClick}
                addRoleCustomStyle={this.addRoleCustomStyle}
                addRoleEntryStyle={this.addRoleEntryStyle}
                clearRoleStyle={this.clearRoleStyle}
                updateEntryStyle={this.updateEntryStyle}
                clearEntryStyleKey={this.clearEntryStyleKey}
                addRoleReferencesCustomStyle={this.addRoleReferencesCustomStyle}
                addRoleReferencesEntryStyle={this.addRoleReferencesEntryStyle}
                clearRoleReferencesStyle={this.clearRoleReferencesStyle}
                updateReferencesStyle={this.updateReferencesStyle}
                clearReferencesStyle={this.clearReferencesStyle}
                onMultiReferenceDragEnd={this.onMultiReferenceDragEnd}
              /> */
              }
              return (
                <ComponentZone
                  componentZoneKey={componentZoneKey}
                  zoneMappingObject={zoneMappingObject}
                  componentConfigObject={componentConfigObject}
                  index={index}
                />
              );
            }
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
