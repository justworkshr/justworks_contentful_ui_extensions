import React from 'react';
import PropTypes from 'prop-types';

import RoleSection from '../RoleSection';
import { Heading, Subheading } from '@contentful/forma-36-react-components';

import { displayCamelCaseName } from '../../../../shared/utilities/elementUtils';
import { getFieldConfig } from '../EntryBuilder/utils';

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
  handleMultiReferenceDragEnd
} from '../../utils/eventUtils';

class ComponentBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };

    this.onAddFieldClick = this.onAddFieldClick.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  onAddFieldClick = (mappingKey, fieldType) => {
    handleAddField({
      props: this.props,
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      mappingKey,
      fieldType
    });
  };

  onFieldChange = (e, mappingKey) => {
    handleFieldChange({
      props: this.props,
      setInternalMappingValue: this.props.setInternalMappingValue.bind(this),
      e,
      mappingKey
    });
  };

  onRemoveClick = (mappingKey, entryIndex = null) => {
    handleRemoveMappingKey({
      props: this.props,
      updateEntry: this.props.updateEntry.bind(this),
      mappingKey,
      entryIndex
    });
  };

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

  render() {
    return (
      <div className="component-builder">
        <Heading>Component Properties</Heading>
        {Object.keys(this.props.templateConfig.properties).map((propertyKey, index) => {
          const roleConfigObject = this.props.templateConfig.properties[propertyKey] || {};
          const roleMappingObject = this.props.entryInternalMapping.properties[propertyKey] || {};
          const fieldConfigObject = getFieldConfig(roleConfigObject, roleMappingObject);

          return (
            <RoleSection
              key={index}
              roleKey={propertyKey}
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
              // onLinkAssetClick={this.onLinkAssetClick}
              onLinkEntryClick={this.onLinkEntryClick}
              // addRoleCustomStyle={this.addRoleCustomStyle}
              // addRoleEntryStyle={this.addRoleEntryStyle}
              // clearRoleStyle={this.clearRoleStyle}
              // updateEntryStyle={this.updateEntryStyle}
              // clearEntryStyleKey={this.clearEntryStyleKey}
              // addRoleReferencesCustomStyle={this.addRoleReferencesCustomStyle}
              // addRoleReferencesEntryStyle={this.addRoleReferencesEntryStyle}
              // clearRoleReferencesStyle={this.clearRoleReferencesStyle}
              // updateReferencesStyle={this.updateReferencesStyle}
              // clearReferencesStyle={this.clearReferencesStyle}
              // onMultiReferenceDragEnd={this.onMultiReferenceDragEnd}
            />
          );
        })}
      </div>
    );
  }
}

ComponentBuilder.propTypes = {
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
ComponentBuilder.defaultProps = {};

export default ComponentBuilder;
