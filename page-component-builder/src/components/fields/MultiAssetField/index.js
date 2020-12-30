import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ErrorList from '../ErrorList';

import { TextLink } from '@contentful/forma-36-react-components';

import HydratedAssetCard from '../../cards/HydratedAssetCard';
import { constructLink, createAsset } from '../../../utilities';

import 'react-mde/lib/styles/css/react-mde-all.css';

export const MultiAssetField = props => {
  const [dragged, setDragged] = useState(undefined);
  const [draggedOver, setDraggedOver] = useState(undefined);

  const onDragStart = asset => {
    setDragged(asset);
  };

  const onDragOver = asset => {
    setDraggedOver(asset);
  };

  const onDragEnd = e => {
    e.preventDefault();

    // flip by index
    const links = orderedLinks();
    props.onChange(links.map(asset => constructLink(asset)));
    resetDrag();
  };

  const orderedLinks = () => {
    // checks if a dragged and a draggedOver exist and ensures dragged isn't same as draggedOver
    if (
      (dragged !== 0 && !dragged) ||
      (draggedOver !== 0 && !draggedOver) ||
      dragged === draggedOver
    ) {
      resetDrag();
      return props.assets;
    }

    // sorts links
    const links = props.assets;
    const draggedEntry = props.assets[dragged];
    // links[dragged] = links[draggedOver];

    if (dragged > draggedOver) {
      // dragged higher in the list, pushes things down

      for (let i = dragged; i > draggedOver; i--) {
        links[i] = links[i - 1];
      }
    } else if (dragged < draggedOver) {
      // dragged lower in the list, pulls things up

      for (let i = dragged; i < draggedOver; i++) {
        links[i] = links[i + 1];
      }
    }
    links[draggedOver] = draggedEntry;

    return links;
  };

  const resetDrag = () => {
    setDragged(undefined);
    setDraggedOver(undefined);
  };

  const updateEntry = (assets = []) => {
    if (assets.length) {
      const links = assets.map(asset => constructLink(asset));
      props.onChange(links);
    } else {
      props.onChange([]);
    }
  };

  const handleLinkClick = async () => {
    const assets = await props.sdk.dialogs.selectMultipleAssets();
    updateEntry([...props.assets, ...assets]);
  };

  const handleEditClick = async entry => {
    const navigation = await props.sdk.navigator.openAsset(entry.sys.id, {
      slideIn: { waitForClose: true }
    });

    // updates entry in parent if editing applied
    if (navigation.navigated) {
      props.replaceHydratedAsset(navigation.entity);
    }
  };

  const handleRemoveClick = (e, asset) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const assets = props.assets.filter(e => e.sys.id !== asset.sys.id);
    updateEntry(assets);
  };

  const handleCreateClick = async () => {
    const newEntry = await createAsset(props.sdk.space);
    const navigator = await props.sdk.navigator.openAsset(newEntry.sys.id, {
      slideIn: { waitForClose: true }
    });

    if (navigator.navigated) {
      updateEntry([...props.assets, navigator.entity]);
    }
  };

  const draggedOverClass = index => {
    if (draggedOver < dragged && index >= draggedOver) return 'dragged-over--down';
    if (draggedOver > dragged && index <= draggedOver) return 'dragged-over--up';
  };

  const renderEntryCards = () => {
    return props.assets.map((asset, index) => {
      if (!!(asset || {}).sys) {
        return (
          <HydratedAssetCard
            key={`${props.propKey}-entries--${index}`}
            index={index}
            className={`f36-margin-bottom--xs ${draggedOverClass(index)}`}
            onClick={() => handleEditClick(asset)}
            handleEditClick={() => handleEditClick(asset)}
            handleRemoveClick={e => handleRemoveClick(e, asset)}
            draggable={true}
            isDragActive={index === dragged}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            asset={asset}
          />
        );
      }
    });
  };

  return (
    <div className="multi-link-field" data-test-id="multi-link-field">
      <div data-test-id="multi-link-field--links">{renderEntryCards()}</div>
      <div data-test-id="action-row" className="link-row">
        <TextLink testId="create-asset" className="f36-margin-right--s" onClick={handleCreateClick}>
          Create asset
        </TextLink>
        <TextLink testId="link-asset" onClick={handleLinkClick}>
          Link asset
        </TextLink>
      </div>
      <ErrorList errors={props.errors} />
    </div>
  );
};

MultiAssetField.propTypes = {
  assetTypes: PropTypes.array,
  assets: PropTypes.array,
  onChange: PropTypes.func,
  sdk: PropTypes.object,
  replaceHydratedAsset: PropTypes.func,
  propKey: PropTypes.string,
  errors: PropTypes.array
};

MultiAssetField.defaultProps = {
  assetTypes: [],
  assets: [],
  errors: []
};

export default MultiAssetField;
