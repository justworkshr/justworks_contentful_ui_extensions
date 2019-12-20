import React from 'react';
import PropTypes from 'prop-types';

import CreateNewLink from './CreateNewLink';
import LinkExisting from './LinkExisting';
import { TextLink } from '@contentful/forma-36-react-components';

import { roleAllowsFields, roleAllowsLinks, pluckFieldType } from '../utils';

const EntryActionRow = props => {
  return (
    <div className="entry-action-row">
      {!!roleAllowsFields(props.fieldConfigs) && (
        <TextLink
          icon="Quote"
          linkType="primary"
          className="entry-action-button__add-field link-entries-row__button"
          onClick={() => props.onAddFieldClick(props.roleKey, pluckFieldType(props.fieldConfigs))}>
          Add field
        </TextLink>
      )}
      {!!roleAllowsLinks(props.fieldConfigs) && (
        <CreateNewLink
          className="entry-action-button__create-new link-entries-row__button"
          onAddEntryClick={props.onAddEntryClick}
          roleKey={props.roleKey}
          allowedCollectionModules={props.allowedCollectionModules}
          contentTypes={props.contentTypes}
          fieldConfigs={props.fieldConfigs}
        />
      )}
      {!!roleAllowsLinks(props.fieldConfigs) && (
        <LinkExisting
          className="entry-action-button__link-existing link-entries-row__button"
          onLinkAssetClick={props.onLinkAssetClick}
          onLinkEntryClick={props.onLinkEntryClick}
          onDeepCopyLinkClick={props.onDeepCopyLinkClick}
          contentTypes={props.contentTypes}
          roleKey={props.roleKey}
          fieldConfigs={props.fieldConfigs}
        />
      )}
    </div>
  );
};

EntryActionRow.propTypes = {
  allowedCollectionModules: PropTypes.array,
  contentTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fieldConfigs: PropTypes.array,
  onAddFieldClick: PropTypes.func,
  roleKey: PropTypes.string,
  onAddEntryClick: PropTypes.func,
  onLinkAssetClick: PropTypes.func,
  onLinkEntryClick: PropTypes.func,
  onDeepCopyLinkClick: PropTypes.func
};

export default EntryActionRow;
