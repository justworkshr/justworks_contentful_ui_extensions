import React from 'react';
import PropTypes from 'prop-types';

import CreateNewLink from './CreateNewLink';
import LinkExisting from './LinkExisting';
import { TextLink } from '@contentful/forma-36-react-components';

import { roleAllowsFields, roleAllowsLinks, pluckField } from '../utils';

const EntryActionRow = props => {
  return (
    <div className="entry-action-row">
      {!!roleAllowsFields(props.fieldTypes) && (
        <TextLink
          icon="Quote"
          linkType="primary"
          className="entry-action-button__add-field link-entries-row__button"
          onClick={() => props.onAddFieldClick(props.roleKey, pluckField(props.fieldTypes))}>
          Add field
        </TextLink>
      )}
      {!!roleAllowsLinks(props.fieldTypes) && (
        <CreateNewLink
          className="entry-action-button__create-new link-entries-row__button"
          onAddEntryClick={props.onAddEntryClick}
          roleKey={props.roleKey}
          allowedCustomTemplates={props.allowedCustomTemplates}
          contentTypes={props.contentTypes}
          fieldTypes={props.fieldTypes}
        />
      )}
      {!!roleAllowsLinks(props.fieldTypes) && (
        <LinkExisting
          onLinkAssetClick={props.onLinkAssetClick}
          onLinkEntryClick={props.onLinkEntryClick}
          onDeepCopyLinkClick={props.onDeepCopyLinkClick}
          contentTypes={props.contentTypes}
          roleKey={props.roleKey}
          fieldTypes={props.fieldTypes}
        />
      )}
    </div>
  );
};

EntryActionRow.propTypes = {
  allowedCustomTemplates: PropTypes.array,
  contentTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fieldTypes: PropTypes.array,
  onAddFieldClick: PropTypes.func,
  roleKey: PropTypes.string,
  onAddEntryClick: PropTypes.func,
  onLinkAssetClick: PropTypes.func,
  onLinkEntryClick: PropTypes.func,
  onDeepCopyLinkClick: PropTypes.func
};

export default EntryActionRow;
