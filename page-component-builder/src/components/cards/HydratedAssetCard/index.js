import React from 'react';
import PropTypes from 'prop-types';

import { AssetCard } from '@contentful/forma-36-react-components';
import ActionDropdown from '../../elements/ActionDropdown';

import { getStatus } from '@shared/utilities/index';
import classnames from 'classnames';

const HydratedAssetCard = props => {
  return (
    <AssetCard
      testId="hydrated-asset-card"
      className={classnames('asset-card', props.className)}
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
      draggable={props.draggable}
      withDragHandle={props.draggable}
      isDragActive={props.isDragActive}
      onMouseDown={props.onDragStart ? () => props.onDragStart(props.index) : null}
      onDragStart={props.onDragStart ? () => props.onDragStart(props.index) : null}
      onDragOver={props.onDragOver ? () => props.onDragOver(props.index) : null}
      onDragEnd={props.onDragEnd}
    />
  );
};

HydratedAssetCard.propTypes = {
  asset: PropTypes.object,
  className: PropTypes.string,
  handleEditClick: PropTypes.func,
  handleRemoveClick: PropTypes.func,
  draggable: PropTypes.bool,
  isDragActive: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
  index: PropTypes.number
};
HydratedAssetCard.defaultProps = {
  asset: {}
};

export default HydratedAssetCard;
