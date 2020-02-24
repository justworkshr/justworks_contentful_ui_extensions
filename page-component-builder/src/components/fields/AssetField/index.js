import React from 'react';
import PropTypes from 'prop-types';

import { AssetCard, TextLink } from '@contentful/forma-36-react-components';
import { constructLink } from '../../../utilities';
const AssetField = props => {
  const handleLinkClick = async () => {
    const asset = await props.sdk.dialogs.selectSingleAsset();
    if (asset) {
      const link = constructLink(asset);
      props.onChange(link);
    }
  };
  if (props.asset) {
    return <AssetCard type="image" src={props.asset.fields.file['en-US'].url} />;
  } else {
    return (
      <div className="link-row">
        <TextLink className="f36-margin-right--s">Create asset</TextLink>
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
  asset: null
};

export default AssetField;
