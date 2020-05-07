import React from 'react';
import PropTypes from 'prop-types';

import HydratedEntryCard from '../../cards/HydratedEntryCard';
import DropdownCreate from '../../elements/DropdownCreate';
import DropdownLink from '../../elements/DropdownLink';
import ErrorList from '../ErrorList';

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

  const handleLinkClick = async option => {
    const entry = await props.sdk.dialogs.selectSingleEntry({
      contentTypes: [option]
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

  const handleCreateClick = async contentType => {
    const newEntry = await createEntry(props.sdk.space, contentType);

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
        onClick={handleEditClick}
        handleEditClick={handleEditClick}
        handleRemoveClick={() => updateEntry(null)}
        entry={props.entry}
      />
    );
  };

  const renderElement = () => {
    if (props.entry.fields) {
      return renderEntryCard();
    } else {
      return (
        <div data-test-id="entry-field-blank" className="link-row">
          <DropdownCreate handleCreateClick={handleCreateClick} options={props.contentTypes} />
          <DropdownLink handleLinkClick={handleLinkClick} options={props.contentTypes} />
        </div>
      );
    }
  };

  return (
    <div className="entry-field" data-test-id="entry-field">
      {renderElement()}
      <ErrorList errors={props.errors} />
    </div>
  );
};

EntryField.propTypes = {
  errors: PropTypes.array,
  contentTypes: PropTypes.array,
  entry: PropTypes.object,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  sdk: PropTypes.object,
  replaceHydratedEntry: PropTypes.func
};

EntryField.defaultProps = {
  contentTypes: [],
  errors: [],
  isLoading: false,
  entry: {}
};

export default EntryField;
