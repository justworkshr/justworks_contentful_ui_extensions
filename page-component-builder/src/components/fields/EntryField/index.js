import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../../../constants';

import { TextLink } from '@contentful/forma-36-react-components';

import HydratedEntryCard from '../../cards/HydratedEntryCard';
import { constructLink, getEntryContentTypeId, createEntry } from '../../../utilities/index';

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

    const navigator = await props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    if (navigator.navigated) {
      updateEntry(navigator.entity);
    }
  };

  const renderEntryCard = () => {
    return (
      <HydratedEntryCard
        contentType={getContentType()}
        isLoading={props.isLoading}
        handleEditClick={handleEditClick}
        handleRemoveClick={() => updateEntry(null)}
        entry={props.entry}
      />
    );
  };

  if (props.entry.fields) {
    return renderEntryCard();
  } else {
    return (
      <div data-test-id="entry-field-blank" className="link-row">
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
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  sdk: PropTypes.object
};

EntryField.defaultProps = {
  contentTypes: [],
  isLoading: false,
  entry: {}
};

export default EntryField;
