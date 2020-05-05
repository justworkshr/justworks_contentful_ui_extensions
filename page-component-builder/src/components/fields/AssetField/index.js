import React from 'react';
import PropTypes from 'prop-types';

import { TextLink } from '@contentful/forma-36-react-components';

import { createAsset, constructLink } from '../../../utilities';
import HydratedAssetCard from '../../cards/HydratedAssetCard';

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

  const renderElement = () => {
    if (!!props.asset.sys) {
      return (
        <HydratedAssetCard
          asset={props.asset}
          handleEditClick={handleEditClick}
          handleRemoveClick={() => updateAsset(null)}
        />
      );
    } else {
      return (
        <div data-test-id="asset-field-blank" className="link-row">
          <TextLink
            testId="create-asset"
            className="f36-margin-right--s"
            onClick={handleCreateClick}>
            Create asset
          </TextLink>
          <TextLink testId="link-asset" onClick={handleLinkClick}>
            Link asset
          </TextLink>
        </div>
      );
    }
  };
  return (
    <div className="asset-field" data-test-id="asset-field">
      {renderElement()}
    </div>
  );
};

AssetField.propTypes = {
  sdk: PropTypes.object,
  asset: PropTypes.object,
  onChange: PropTypes.func,
  replaceHydratedAsset: PropTypes.func
};
AssetField.defaultProps = {
  asset: {}
};

export default AssetField;
