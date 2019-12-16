import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SectionHeading,
  TextLink,
  EntryCard,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

import LoadingEntryCard from '../../../shared/components/LoadingEntryCard';

import { getStatus } from '../../../shared/utilities/elementUtils';

import '../../../shared/style.css';

const SingleReferenceField = props => {
  const [hydratedEntry, hydrateEntry] = useState(null);

  const loadEntry = async () => {
    const entry = await props.sdk.space.getEntry(props.value.sys.id);
    if (entry) {
      hydrateEntry(entry);
    }
  };

  const onEditClick = id => {
    props.sdk.navigator.openEntry(id, { slideIn: true });
  };

  if (!hydratedEntry && props.value) {
    loadEntry();
  }

  return (
    <div className="single-reference-field max-width-600">
      <SectionHeading>{props.heading}</SectionHeading>
      {props.value && hydratedEntry && (
        <EntryCard
          loading={!hydratedEntry}
          className="entry-card"
          size="small"
          title={hydratedEntry.fields ? hydratedEntry.fields.name['en-US'] : 'Loading...'}
          contentType={hydratedEntry.sys.contentType.sys.id}
          status={getStatus(hydratedEntry)}
          onClick={() => onEditClick(hydratedEntry.sys.id)}
          dropdownListElements={
            <DropdownList>
              <DropdownListItem isTitle>Actions</DropdownListItem>
              <DropdownListItem
                className="entry-card__action--edit"
                onClick={() => onEditClick(hydratedEntry)}>
                Edit
              </DropdownListItem>
              {props.onDeepCopyClick && (
                <DropdownListItem
                  className="entry-card__action--edit"
                  onClick={() => props.onDeepCopyClick(props.roleKey, contentType, hydratedEntry)}>
                  Deep Copy
                </DropdownListItem>
              )}
              {props.onRemoveClick && (
                <DropdownListItem
                  className="entry-card__action--remove"
                  onClick={() => props.onRemoveClick()}>
                  Remove
                </DropdownListItem>
              )}
            </DropdownList>
          }
        />
      )}
      {props.value && !hydratedEntry && <LoadingEntryCard />}
      {!props.value && (
        <div>
          <TextLink onClick={props.onLinkClick}>Link existing</TextLink>
        </div>
      )}
    </div>
  );
};

SingleReferenceField.propTypes = {
  heading: PropTypes.string,
  value: PropTypes.object,
  onLinkClick: PropTypes.func,
  onDeepCopyClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  sdk: PropTypes.object.isRequired
};
SingleReferenceField.defaultProps = {
  field: undefined
};

export default SingleReferenceField;
