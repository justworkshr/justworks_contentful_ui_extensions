import React from 'react';
import PropTypes from 'prop-types';

import { AssetCard } from '@contentful/forma-36-react-components';
import ActionDropdown from '../../elements/ActionDropdown';

import { getStatus } from '@shared/utilities/index';

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
        <ActionDropdown
          handleEditClick={props.handleEditClick}
          handleRemoveClick={props.handleRemoveClick}
        />
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
