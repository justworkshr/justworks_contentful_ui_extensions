import React from 'react';
import PropTypes from 'prop-types';

import {
  AssetCard,
  TextLink,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';

import { getStatus, createAsset, constructLink } from '../../../utilities';

const AssetField = props => {
  const updateAsset = entry => {
    if (entry) {
      const link = constructLink(entry);
      props.onChange(link);
    } else {
      props.onChange(null);
    }
  };

  const handleLinkClick = async () => {
    const asset = await props.sdk.dialogs.selectSingleAsset();
    if (asset) {
      const link = constructLink(asset);
      props.onChange(link);
    }
  };

  const handleEditClick = async () => {
    const navigation = await props.sdk.navigator.openAsset(props.asset.sys.id, {
      slideIn: { waitForClose: true }
    });

    if (navigation.navigated) {
      props.replaceHydratedAsset(navigation.entity);
    }
  };

  const handleCreateClick = async () => {
    const newAsset = await createAsset(props.sdk.space);
    const navigator = await props.sdk.navigator.openAsset(newAsset.sys.id, {
      slideIn: { waitForClose: true }
    });
    if (navigator.navigated) {
      updateAsset(navigator.entity);
    }
  };

  if (!!props.asset.sys) {
    return (
      <AssetCard
        status={getStatus(props.asset)}
        title={`${(props.asset.fields.title || {})['en-US']} | ${(props.asset.fields.description ||
          {})['en-US'] || '<missing alt text>'}`}
        type="image"
        src={((props.asset.fields.file || {})['en-US'] || {}).url}
        onClick={handleEditClick}
        dropdownListElements={
          <DropdownList>
            <DropdownListItem isTitle>Actions</DropdownListItem>
            <DropdownListItem className="asset-card__action--edit" onClick={handleEditClick}>
              Edit
            </DropdownListItem>
            <DropdownListItem
              className="asset-card__action--remove"
              onClick={() => updateAsset(null)}>
              Remove
            </DropdownListItem>
          </DropdownList>
        }
      />
    );
  } else {
    return (
      <div className="link-row">
        <TextLink className="f36-margin-right--s" onClick={handleCreateClick}>
          Create asset
        </TextLink>
        <TextLink onClick={handleLinkClick}>Link asset</TextLink>
      </div>
    );
  }
};

AssetField.propTypes = {
  sdk: PropTypes.object,
  asset: PropTypes.object,
  onChange: PropTypes.func
};
AssetField.defaultProps = {
  asset: {}
};

export default AssetField;
