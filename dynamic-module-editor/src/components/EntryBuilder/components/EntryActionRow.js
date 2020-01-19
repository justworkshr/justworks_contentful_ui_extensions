import React from 'react';
import PropTypes from 'prop-types';

import CreateNewLink from './CreateNewLink';
import LinkExisting from './LinkExisting';
import { TextLink } from '@contentful/forma-36-react-components';

import { roleAllowsFields, roleAllowsLinks, pluckFieldType } from '../utils';

const EntryActionRow = props => {
  return (
    <div className="entry-action-row">
      {props.allowFields && (
        <TextLink
          icon="Quote"
          linkType="primary"
          className="entry-action-button__add-field link-entries-row__button"
          onClick={() => props.onAddFieldClick(props.roleKey, props.fieldType)}>
          Add field
        </TextLink>
      )}
      {props.allowLinks && (
        <CreateNewLink
          allowAssets={props.allowAssets}
          className="entry-action-button__create-new link-entries-row__button"
          onAddEntryClick={props.onAddEntryClick}
          roleKey={props.roleKey}
          allowedCollectionModules={props.allowedCollectionModules}
          contentTypes={props.contentTypes}
        />
      )}
      {props.allowLinks && (
        <LinkExisting
          allowAssets={props.allowAssets}
          className="entry-action-button__link-existing link-entries-row__button"
          onLinkAssetClick={props.onLinkAssetClick}
          onLinkEntryClick={props.onLinkEntryClick}
          onDeepCopyLinkClick={props.onDeepCopyLinkClick}
          contentTypes={props.contentTypes}
          roleKey={props.roleKey}
        />
      )}
    </div>
  );
};

EntryActionRow.propTypes = {
  allowAssets: PropTypes.bool,
  allowLinks: PropTypes.bool,
  allowFields: PropTypes.bool,
  allowedCollectionModules: PropTypes.array,
  contentTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fieldType: PropTypes.string,
  onAddFieldClick: PropTypes.func,
  roleKey: PropTypes.string,
  onAddEntryClick: PropTypes.func,
  onLinkAssetClick: PropTypes.func,
  onLinkEntryClick: PropTypes.func,
  onDeepCopyLinkClick: PropTypes.func
};

export default EntryActionRow;
