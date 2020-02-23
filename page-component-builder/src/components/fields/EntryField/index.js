import React from 'react';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';

import * as c from '../../../../../customModules/constants';

import { DropdownList, DropdownListItem, EntryCard } from '@contentful/forma-36-react-components';

// import { getEntryContentTypeId } from '../utils';
import { getStatus } from '../../../../../shared/utilities/elementUtils';

import classnames from 'classnames';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const EntryField = props => {
  const renderEntryCard = () => {
    // const contentType = (props.entry.sys || {}).contentType
    //   ? getEntryContentTypeId(props.entry)
    //   : null;
    return (
      <EntryCard
        loading={props.isLoading}
        textId="entry-card"
        className="entry-card"
        size="small"
        title={props.entry.fields ? props.entry.fields.name['en-US'] : 'Loading...'}
        // contentType={contentType}
        // status={getStatus(props.entry)}
        withDragHandle={false}
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

  return (
    <div className={classnames('entry-field', props.className)}>
      {props.entry && props.roleMappingObject.type === c.LINK_TYPE_ASSET && renderAssetCard()}
      {props.entry && props.roleMappingObject.type === c.LINK_TYPE_ENTRY && renderEntryCard()}
    </div>
  );
};

EntryField.propTypes = {
  className: PropTypes.string,
  entry: PropTypes.object,
  entryIndex: PropTypes.number,
  isLoading: PropTypes.bool,
  value: PropTypes.string
};

EntryField.defaultProps = {
  entry: {
    sys: {}
  },
  roleKey: '',
  isLoading: false,
  isDragActive: false,
  roleMappingObject: {}
};

export default EntryField;
