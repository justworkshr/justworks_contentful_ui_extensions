import React from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';
import InternalMapping from '../utils/InternalMapping';

import {
  TextInput,
  DropdownList,
  DropdownListItem,
  EntryCard,
  AssetCard
} from '@contentful/forma-36-react-components';

import { displayRoleName } from '../utils';

import { getStatus, getEntryContentTypeId } from '../utils';
import StyleEditor from './StyleEditor/index.js';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const EntryField = props => {
  const renderEntryCard = () => {
    return (
      <EntryCard
        draggable
        loading={props.isLoading}
        className="role-section__entity"
        size="small"
        title={props.entry ? props.entry.fields.name['en-US'] : 'Loading...'}
        contentType={props.entry.sys.contentType ? getEntryContentTypeId(props.entry) : null}
        status={getStatus(props.entry)}
        withDragHandle={true}
        isDragActive={props.isDragActive}
        onClick={() => props.onEditClick(props.entry)}
        dropdownListElements={
          <DropdownList>
            <DropdownListItem isTitle>Actions</DropdownListItem>
            <DropdownListItem onClick={() => props.onEditClick(props.entry)}>Edit</DropdownListItem>
            <DropdownListItem onClick={() => props.onRemoveClick(props.roleKey)}>
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
        title={props.entry ? props.entry.fields.title['en-US'] : 'Loading...'}
        src={props.entry ? props.entry.fields.file['en-US'].url : ''}
        status={getStatus(props.entry)}
        withDragHandle={true}
        isDragActive={props.isDragActive}
        dropdownListElements={
          <DropdownList>
            <DropdownListItem isTitle>Actions</DropdownListItem>
            <DropdownListItem onClick={() => props.onRemoveFieldClick(props.roleKey)}>
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
      {props.entry.sys.type === 'Asset' && renderAssetCard()}
      {props.entry.sys.type === 'Entry' && renderEntryCard()}
      {props.entry.sys.type === 'Field' &&
        props.entry.fields.type === InternalMapping.TEXT &&
        renderTextField(props.entry.fields.value)}
      {props.entry.sys.type === 'Field' &&
        props.entry.fields.type === InternalMapping.MARKDOWN &&
        renderMarkdownField(props.entry.fields.value)}
      {props.entry.sys.type === 'Field' && (
        <StyleEditor
          roleKey={props.roleKey}
          updateStyle={props.updateStyle}
          entryStyleClasses={props.entry.fields.styleClasses}
          entryValue={props.entry.fields.value}
          title={displayRoleName(props.roleKey) + ' Style'}
          type={props.entry.fields.type}
        />
      )}
    </div>
  );
};
EntryField.defaultProps = {
  entry: {
    sys: {}
  },
  roleKey: '',
  isLoading: false,
  isDragActive: false,
  onEditClick: () => {},
  onRemoveClick: () => {}
};

EntryField.propTypes = {
  entry: PropTypes.object,
  roleKey: PropTypes.string,
  isDragActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onRemoveFieldClick: PropTypes.func,
  onFieldChange: PropTypes.func,
  updateStyle: PropTypes.func
};

export default EntryField;
