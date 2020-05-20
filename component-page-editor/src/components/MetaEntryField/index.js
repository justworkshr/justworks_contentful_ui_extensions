import React from 'react';
import PropTypes from 'prop-types';

import * as c from '@shared/constants';

import {
  EntryCard,
  TextLink,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

import { getStatus, constructLink, createEntry } from '@shared/utilities';

const MetaEntryField = props => {
  const handleLinkClick = async () => {
    const entry = await props.sdk.dialogs.selectSingleEntry({
      contentTypes: [c.CONTENT_TYPE_META]
    });

    if (entry) {
      props.onChange(constructLink(entry));
    }
  };

  const handleCreateClick = async () => {
    const pageName = props.sdk.entry.fields.internalName.getValue();
    const newEntry = await createEntry(props.sdk.space, c.CONTENT_TYPE_META, {
      metaTitle: {
        'en-US': `${pageName}`
      }
    });

    props.sdk.navigator.openEntry(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    const newValue = constructLink(newEntry);
    props.onChange(newValue);
  };

  const handleEditClick = async () => {
    try {
      const navigation = await props.sdk.navigator.openEntry(props.value.sys.id, {
        slideIn: { waitForClose: true }
      });
      props.onChange(props.value);
    } catch (error) {
      // entity deleted
      handleRemoveClick();
    }
  };

  const handleRemoveClick = () => {
    props.onChange(null);
  };

  return (
    <div data-test-id="field-meta" className="entry-field">
      {!!props.hydratedEntry && (
        <EntryCard
          contentType={c.CONTENT_TYPE_META}
          onClick={handleEditClick}
          status={getStatus(props.hydratedEntry)}
          size="small"
          title={(props.hydratedEntry.fields.metaTitle || {})['en-US']}
          dropdownListElements={
            <DropdownList>
              <DropdownListItem isTitle>Actions</DropdownListItem>
              <DropdownListItem
                testId="action-dropdown--edit"
                className="entry-card__action--edit"
                onClick={handleEditClick}>
                Edit
              </DropdownListItem>

              <DropdownListItem
                testId="action-dropdown--remove"
                className="entry-card__action--remove"
                onClick={handleRemoveClick}>
                Remove
              </DropdownListItem>
            </DropdownList>
          }
        />
      )}
      {!props.value && (
        <div className="action-row">
          <TextLink className="f36-margin-right--xs" onClick={handleCreateClick}>
            Create meta
          </TextLink>
          <TextLink onClick={handleLinkClick}>Link meta</TextLink>
        </div>
      )}
    </div>
  );
};

MetaEntryField.propTypes = {
  contentTypes: PropTypes.array,
  hydratedEntry: PropTypes.object,
  onChange: PropTypes.func,
  sdk: PropTypes.object,
  value: PropTypes.object
};

MetaEntryField.defaultProps = {
  contentTypes: [],
  sdk: {},
  value: {}
};

export default MetaEntryField;
