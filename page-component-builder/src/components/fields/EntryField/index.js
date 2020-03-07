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
// import { getStatus } from '../../../../../shared/utilities/elementUtils';

import classnames from 'classnames';
import { constructLink, apiContentTypesToIds } from '../../../utilities';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const EntryField = props => {
  const handleLinkClick = async () => {
    const entry = await props.sdk.dialogs.selectSingleEntry({
      contentTypes: props.contentTypes
    });
    if (entry) {
      const link = constructLink(entry);
      props.onChange(link);
    }
  };

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

  if (props.entry.fields) {
    console.log(props.entry);
    return renderEntryCard();
  } else {
    return (
      <div className="link-row">
        <TextLink className="f36-margin-right--s">Create entry</TextLink>
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
  sdk: PropTypes.object,
  value: PropTypes.string
};

EntryField.defaultProps = {
  contentTypes: [],
  isLoading: false,
  entry: {}
};

export default EntryField;
