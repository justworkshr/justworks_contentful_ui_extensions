import React from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';

import * as c from '../../../../../custom_templates/constants';

import {
  TextInput,
  DropdownList,
  DropdownListItem,
  EntryCard,
  AssetCard
} from '@contentful/forma-36-react-components';

import { getStatus, getEntryContentTypeId } from '../utils';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const EntryField = props => {
  const renderEntryCard = () => {
    const contentType = (props.entry.sys || {}).contentType
      ? getEntryContentTypeId(props.entry)
      : null;
    return (
      <EntryCard
        draggable
        loading={props.isLoading}
        className="role-section__entity"
        size="small"
        title={props.entry.fields ? props.entry.fields.name['en-US'] : 'Loading...'}
        contentType={contentType}
        status={getStatus(props.entry)}
        withDragHandle={true}
        isDragActive={props.isDragActive}
        onClick={() => props.onEditClick(props.entry)}
        dropdownListElements={
          <DropdownList>
            <DropdownListItem isTitle>Actions</DropdownListItem>
            <DropdownListItem
              className="entry-card__action--edit"
              onClick={() => props.onEditClick(props.entry)}>
              Edit
            </DropdownListItem>
            <DropdownListItem
              className="entry-card__action--edit"
              onClick={() => props.onDeepCopyClick(props.roleKey, contentType, props.entry)}>
              Deep Copy
            </DropdownListItem>
            <DropdownListItem
              className="entry-card__action--remove"
              onClick={() => props.onRemoveClick(props.roleKey, props.entryIndex)}>
              Remove
            </DropdownListItem>
          </DropdownList>
        }
      />
    );
  };

  const renderAssetCard = () => {
    return (
      <AssetCard
        draggable
        className="role-section__entity"
        size="default"
        title={props.entry.fields ? props.entry.fields.title['en-US'] : ''}
        src={props.entry.fields ? props.entry.fields.file['en-US'].url : ''}
        type={props.roleConfig.asset.type}
        status={getStatus(props.entry)}
        withDragHandle={true}
        onClick={() => props.onEditClick(props.entry, 'asset')}
        isDragActive={props.isDragActive}
        dropdownListElements={
          <DropdownList>
            <DropdownListItem isTitle>Actions</DropdownListItem>
            <DropdownListItem
              className="asset-card__action--remove"
              onClick={() => props.onRemoveClick(props.roleKey, props.entryIndex)}>
              Remove
            </DropdownListItem>
          </DropdownList>
        }
      />
    );
  };

  const renderTextField = value => {
    return <TextInput onChange={e => props.onFieldChange(e, props.roleKey)} value={value} />;
  };
  const renderMarkdownField = value => {
    return (
      <ReactMde
        selectedTab="write"
        onChange={newValue => {
          props.onFieldChange({ currentTarget: { value: newValue } }, props.roleKey);
        }}
        value={value}
      />
    );
  };
  return (
    <div className="custom-template-entry-field">
      {props.fieldType === c.FIELD_TYPE_ASSET && renderAssetCard()}
      {props.fieldType === c.FIELD_TYPE_ENTRY && renderEntryCard()}
      {props.fieldType === c.FIELD_TYPE_TEXT && renderTextField(props.roleMappingObject.value)}
      {props.fieldType === c.FIELD_TYPE_MARKDOWN &&
        renderMarkdownField(props.roleMappingObject.value)}
    </div>
  );
};

EntryField.propTypes = {
  entry: PropTypes.object,
  entryIndex: PropTypes.number,
  roleKey: PropTypes.string,
  roleConfig: PropTypes.object,
  roleMapping: PropTypes.object,
  fieldType: PropTypes.string,
  isDragActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  onEditClick: PropTypes.func,
  onDeepCopyClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onFieldChange: PropTypes.func,
  value: PropTypes.string
};

EntryField.defaultProps = {
  entry: {
    sys: {}
  },
  roleKey: '',
  roleConfig: {},
  isLoading: false,
  isDragActive: false,
  onEditClick: () => {},
  onRemoveClick: () => {}
};

export default EntryField;
