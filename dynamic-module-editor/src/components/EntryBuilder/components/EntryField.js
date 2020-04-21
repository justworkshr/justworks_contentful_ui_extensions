import React from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';

import * as c from '../../../../../customModules/constants';

import {
  TextInput,
  DropdownList,
  DropdownListItem,
  EntryCard,
  AssetCard,
  Icon,
  Subheading,
} from '@contentful/forma-36-react-components';

import { getEntryContentTypeId } from '../utils';
import { getStatus, getAssetType, capitalize } from '../../../../../shared/utilities/elementUtils';

import classnames from 'classnames';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const EntryField = (props) => {
  const getFieldIcon = () => {
    switch (props.propertyType) {
      case c.FIELD_TYPE_ENTRY:
        return 'Entry';
      case c.PROPERTY_TYPE_ASSET:
        return 'Asset';
      case c.PROPERTY_TYPE_TEXT:
        return 'Text';
      case c.FIELD_TYPE_TITLE:
        return 'Text';
      case c.PROPERTY_TYPE_MARKDOWN:
        return 'Text';
      case c.FIELD_TYPE_MULTI_REFERENCE:
        return 'ListBulleted';
      default:
        return 'Entry';
    }
  };
  const renderEntryCard = () => {
    const contentType = (props.entry.sys || {}).contentType
      ? getEntryContentTypeId(props.entry)
      : null;
    return (
      <EntryCard
        draggable={!!props.onDragStart}
        onDragStart={props.onDragStart}
        onDragOver={props.onDragOver}
        onDragEnd={props.onDragEnd}
        isDragActive={props.isDragActive}
        loading={props.isLoading}
        className="role-section__entity entry-card"
        size="small"
        title={props.entry.fields ? props.entry.fields.name['en-US'] : 'Loading...'}
        contentType={contentType}
        status={getStatus(props.entry)}
        withDragHandle={true}
        onClick={() => (props.onEditClick ? props.onEditClick(props.entry) : {})}
        dropdownListElements={
          <DropdownList>
            <DropdownListItem isTitle>Actions</DropdownListItem>
            {props.onEditClick && (
              <DropdownListItem
                className="entry-card__action--edit"
                onClick={() => props.onEditClick(props.entry)}>
                Edit
              </DropdownListItem>
            )}

            {props.onDeepCopyClick && (
              <DropdownListItem
                className="entry-card__action--edit"
                onClick={() => props.onDeepCopyClick(props.roleKey, contentType, props.entry)}>
                Deep Copy
              </DropdownListItem>
            )}
            {props.onDuplicateClick && (
              <DropdownListItem
                className="entry-card__action--edit"
                onClick={() => props.onDuplicateClick(props.roleKey, contentType, props.entry)}>
                Duplicate
              </DropdownListItem>
            )}
            {props.onRemoveClick && (
              <DropdownListItem
                className="entry-card__action--remove"
                onClick={() => props.onRemoveClick(props.roleKey, props.entryIndex)}>
                Remove
              </DropdownListItem>
            )}
          </DropdownList>
        }
      />
    );
  };

  const renderAssetCard = () => {
    return (
      <AssetCard
        draggable={!!props.onDragStart}
        onDragStart={props.onDragStart}
        onDragOver={props.onDragOver}
        onDragEnd={props.onDragEnd}
        isDragActive={props.isDragActive}
        className="role-section__entity"
        size="default"
        title={props.entry.fields ? props.entry.fields.title['en-US'] : ''}
        src={props.entry.fields ? props.entry.fields.file['en-US'].url : ''}
        type={
          props.entry.fields
            ? getAssetType(props.entry.fields.file['en-US'].contentType)
            : undefined
        }
        status={getStatus(props.entry)}
        withDragHandle={true}
        onClick={() => (props.onEditClick ? props.onEditClick(props.entry, 'asset') : {})}
        isDragActive={props.isDragActive}
        dropdownListElements={
          <DropdownList>
            <DropdownListItem isTitle>Actions</DropdownListItem>
            {props.onRemoveClick && (
              <DropdownListItem
                className="asset-card__action--remove"
                onClick={() => props.onRemoveClick(props.roleKey, props.entryIndex)}>
                Remove
              </DropdownListItem>
            )}
          </DropdownList>
        }
      />
    );
  };

  const renderTextField = (value) => {
    return <TextInput onChange={(e) => props.onFieldChange(e, props.roleKey)} value={value} />;
  };
  const renderMarkdownField = (value) => {
    return (
      <ReactMde
        selectedTab="write"
        onChange={(newValue) => {
          props.onFieldChange({ currentTarget: { value: newValue } }, props.roleKey);
        }}
        value={value}
      />
    );
  };

  return (
    <div className={classnames('entry-field', props.className)}>
      <div className="sub-section__heading">
        <Icon className="sub-section__heading--icon" icon={getFieldIcon()} size="large" />
        <Subheading className="sub-section__heading--header" element="h1">
          {capitalize(props.propertyType)}
        </Subheading>
      </div>
      {props.entry && props.roleMappingObject.type === c.LINK_TYPE_ASSET && renderAssetCard()}
      {props.entry && props.roleMappingObject.type === c.LINK_TYPE_ENTRY && renderEntryCard()}
      {props.roleMappingObject.type === c.LINK_TYPE_FIELD &&
        props.propertyType === c.PROPERTY_TYPE_TEXT &&
        renderTextField(props.roleMappingObject.value)}

      {props.roleMappingObject.type === c.LINK_TYPE_FIELD &&
        props.propertyType === c.PROPERTY_TYPE_MARKDOWN &&
        renderMarkdownField(props.roleMappingObject.value)}
    </div>
  );
};

EntryField.propTypes = {
  className: PropTypes.string,
  entry: PropTypes.object,
  entryIndex: PropTypes.number,
  roleKey: PropTypes.string,
  roleMappingObject: PropTypes.object,
  propertyType: PropTypes.string,
  isDragActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  onEditClick: PropTypes.func,
  onDeepCopyClick: PropTypes.func,
  onDuplicateClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onFieldChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
  isDragActive: PropTypes.bool,
  value: PropTypes.string,
};

EntryField.defaultProps = {
  entry: {
    sys: {},
  },
  roleKey: '',
  isLoading: false,
  isDragActive: false,
  roleMappingObject: {},
};

export default EntryField;
