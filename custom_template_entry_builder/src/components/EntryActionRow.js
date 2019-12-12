import React from 'react';
import PropTypes from 'prop-types';

import CreateNewLink from './CreateNewLink';
import LinkExisting from './LinkExisting';
import { TextLink } from '@contentful/forma-36-react-components';

const EntryActionRow = props => {
  return (
    <div className="entry-action-row">
      {!!props.fieldObject && (
        <TextLink
          icon="Quote"
          linkType="primary"
          className="entry-action-button__add-field link-entries-row__button"
          onClick={() => props.onAddFieldClick(props.roleKey, props.fieldObject)}>
          Add field
        </TextLink>
      )}
      {(!!props.contentTypes || !!props.allowAsset) && (
        <CreateNewLink
          allowedCustomTemplates={props.allowedCustomTemplates}
          allowAsset={!!props.allowAsset}
          className="entry-action-button__create-new link-entries-row__button"
          onAddEntryClick={props.onAddEntryClick}
          contentTypes={props.contentTypes}
          roleKey={props.roleKey}
        />
      )}
      {(!!props.contentTypes || !!props.allowAsset) && (
        <LinkExisting
          linkAsset={!!props.allowAsset}
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
  allowAsset: PropTypes.bool,
  allowedCustomTemplates: PropTypes.array,
  contentTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fieldObject: PropTypes.object,
  onAddFieldClick: PropTypes.func,
  roleKey: PropTypes.string,
  onAddEntryClick: PropTypes.func,
  onLinkAssetClick: PropTypes.func,
  onLinkEntryClick: PropTypes.func,
  onDeepCopyLinkClick: PropTypes.func
};

export default EntryActionRow;
