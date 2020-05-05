import React from 'react';
import PropTypes from 'prop-types';

import { DropdownList, DropdownListItem, AssetCard } from '@contentful/forma-36-react-components';

import { getStatus } from '../../../utilities/index';

const HydratedAssetCard = props => {
  return (
    <AssetCard
      testId="hydrated-asset-card"
      status={getStatus(props.asset)}
      title={`${(props.asset.fields.title || {})['en-US']} | ${(props.asset.fields.description ||
        {})['en-US'] || '<missing alt text>'}`}
      type="image"
      src={((props.asset.fields.file || {})['en-US'] || {}).url}
      onClick={props.handleEditClick}
      dropdownListElements={
        <DropdownList>
          <DropdownListItem isTitle>Actions</DropdownListItem>
          <DropdownListItem
            testId="hydrated-edit-asset"
            className="asset-card__action--edit"
            onClick={props.handleEditClick}>
            Edit
          </DropdownListItem>
          <DropdownListItem
            testId="hydrated-remove-asset"
            className="asset-card__action--remove"
            onClick={props.handleRemoveClick}>
            Remove
          </DropdownListItem>
        </DropdownList>
      }
    />
  );
};

HydratedAssetCard.propTypes = {
  asset: PropTypes.object,
  handleEditClick: PropTypes.func,
  handleRemoveClick: PropTypes.func
};
HydratedAssetCard.defaultProps = {
  asset: {}
};

export default HydratedAssetCard;
