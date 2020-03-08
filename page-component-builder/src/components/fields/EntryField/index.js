import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';

import {
  AssetCard,
  TextLink,
  DropdownList,
  DropdownListItem,
  EntryCard
} from '@contentful/forma-36-react-components';

// import { getEntryContentTypeId } from '../utils';
import { getStatus, getEntryContentTypeId, createEntry } from '../../../utilities/index';

import classnames from 'classnames';
import { constructLink, apiContentTypesToIds } from '../../../utilities';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const EntryField = props => {
  const getContentType = () => {
    return (props.entry.sys || {}).contentType ? getEntryContentTypeId(props.entry) : null;
  };

  const updateEntry = entry => {
    if (entry) {
      const link = constructLink(entry);
      props.onChange(link);
    } else {
      props.onChange(null);
    }
  };

  const handleLinkClick = async () => {
    const entry = await props.sdk.dialogs.selectSingleEntry({
      contentTypes: props.contentTypes
    });
    updateEntry(entry);
  };

  const handleEditClick = async () => {
    const navigation = await props.sdk.navigator.openEntry(props.entry.sys.id, {
      slideIn: { waitForClose: true }
    });

    // updates entry in parent if editing applied
    if (navigation.navigated) {
      props.replaceHydratedEntry(navigation.entity);
    }
  };

  const handleCreateClick = async () => {
    const newEntryName = null;
    const newEntry = await createEntry(props.sdk.space, props.contentTypes, newEntryName, null);

    props.sdk.navigator.openEntry(newEntry.sys.id, { slideIn: true });
    updateEntry(newEntry);
  };

  const renderEntryCard = () => {
    return (
      <EntryCard
        loading={props.isLoading}
        testId="entry-card"
        className="entry-card"
        size="small"
        title={props.entry.fields ? props.entry.fields.name['en-US'] : 'Loading...'}
        contentType={getContentType()}
        status={getStatus(props.entry)}
        withDragHandle={false}
        onClick={handleEditClick}
        dropdownListElements={
          <DropdownList>
            <DropdownListItem isTitle>Actions</DropdownListItem>
            <DropdownListItem className="entry-card__action--edit" onClick={handleEditClick}>
              Edit
            </DropdownListItem>

            <DropdownListItem
              className="entry-card__action--remove"
              onClick={() => updateEntry(null)}>
              Remove
            </DropdownListItem>
          </DropdownList>
        }
      />
    );
  };

  if (props.entry.fields) {
    return renderEntryCard();
  } else {
    return (
      <div className="link-row">
        <TextLink className="f36-margin-right--s" onClick={handleCreateClick}>
          Create entry
        </TextLink>
        <TextLink onClick={handleLinkClick}>Link entry</TextLink>
      </div>
    );
  }
};

EntryField.propTypes = {
  contentTypes: PropTypes.array,
  entry: PropTypes.object,
  entryIndex: PropTypes.number,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  sdk: PropTypes.object
};

EntryField.defaultProps = {
  contentTypes: [],
  isLoading: false,
  entry: {}
};

export default EntryField;
