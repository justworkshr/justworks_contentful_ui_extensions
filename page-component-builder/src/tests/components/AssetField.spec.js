import React from 'react';
import AssetField from '../../components/fields/AssetField';

import { render, cleanup, fireEvent, configure } from '@testing-library/react';
import { mockAssetResponse, mockSdk } from '../mockUtils';

configure({
  testIdAttribute: 'data-test-id'
});

const mockOnChange = jest.fn(value => value);
const replaceHydratedAsset = jest.fn(value => value);
const renderComponent = ({ asset = mockAssetResponse({ id: 1 }), sdk = mockSdk() } = {}) => {
  return render(
    <AssetField
      sdk={sdk}
      asset={asset}
      replaceHydratedAsset={replaceHydratedAsset}
      onChange={mockOnChange}
    />
  );
};

describe('actions', () => {
  beforeEach(() => {
    mockOnChange.mockReset();
    replaceHydratedAsset.mockReset();
  });

  afterEach(cleanup);

  it('blank asset - loads actions', () => {
    // renders create and link buttons
    const { queryByTestId } = renderComponent({
      asset: {}
    });

    expect(queryByTestId('asset-field')).toBeTruthy();
    expect(queryByTestId('create-asset')).toBeTruthy();
    expect(queryByTestId('link-asset')).toBeTruthy();

    // expect no card renders
    expect(queryByTestId('hydrated-asset-card')).toBeNull();
    expect(queryByTestId('action-dropdown--edit')).toBeNull();
    expect(queryByTestId('action-dropdown--remove')).toBeNull();
  });

  it('hydrated asset - loads actions', () => {
    // renders edit and remove buttons
    const { queryByTestId } = renderComponent({
      asset: mockAssetResponse({ id: 1 })
    });

    // expect create, link buttons dont render
    expect(queryByTestId('asset-field')).toBeTruthy();
    expect(queryByTestId('create-asset')).toBeNull();
    expect(queryByTestId('link-asset')).toBeNull();

    // expect card renders
    expect(queryByTestId('hydrated-asset-card')).toBeTruthy();

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    // expect edit and remove buttons render
    expect(queryByTestId('action-dropdown--edit')).toBeTruthy();
    expect(queryByTestId('action-dropdown--remove')).toBeTruthy();
  });

  it('creates an asset', async () => {
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      asset: {}
    });

    const createButton = queryByTestId('create-asset');
    expect(createButton).toBeTruthy();

    // click create type button
    await fireEvent.click(createButton);

    // confirms space.createAsset called with correct args
    await expect(sdk.space.createAsset.mock.calls).toHaveLength(1);
    await expect(sdk.space.createAsset.mock.calls[0][0]).toStrictEqual({ fields: {} });

    // confirms navigator.openEntry called with correct args

    await expect(sdk.navigator.openAsset.mock.calls).toHaveLength(1);
    await expect(sdk.navigator.openAsset.mock.calls[0][0]).toBe('createdEntry1a');

    // confirms mockOnChange called w/ correct args

    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject({
      sys: { id: 'mockNavigatedAsset1' }
    });
  });

  it('links an asset', async () => {
    const sdk = mockSdk();

    const { queryByTestId } = renderComponent({
      sdk: sdk,
      asset: {}
    });
    const linkButton = queryByTestId('link-asset');
    expect(linkButton).toBeTruthy();

    // click link button
    await fireEvent.click(linkButton);

    // confirms dialogs.selectSingleAsset called w/ correct args
    await expect(sdk.dialogs.selectSingleAsset.mock.calls).toHaveLength(1);
    await expect(sdk.dialogs.selectSingleAsset.mock.calls[0][0]).toBeUndefined();

    // confirms mockOnChange called w/ correct args
    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject({ sys: { id: 'newLinkedAsset1b' } });
  });

  it('edits an asset', async () => {
    const sdk = mockSdk();

    const { queryByTestId } = renderComponent({
      sdk: sdk,
      asset: mockAssetResponse({ id: 1 })
    });
    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    const editButton = queryByTestId('action-dropdown--edit');
    expect(editButton).toBeTruthy();

    // click edit button

    fireEvent.click(editButton);

    // confirms navigator.openAsset called w/ correct args

    await expect(sdk.navigator.openAsset.mock.calls).toHaveLength(1);
    await expect(sdk.navigator.openAsset.mock.calls[0][0]).toBe(1);

    // confirms replaceHydratedAsset called w/ correct args
    await expect(replaceHydratedAsset.mock.calls).toHaveLength(1);
    await expect(replaceHydratedAsset.mock.calls[0][0]).toMatchObject({ fields: {} });
  });

  it('removes an asset', async () => {
    const sdk = mockSdk();

    const { queryByTestId } = renderComponent({
      sdk: sdk,
      asset: mockAssetResponse({ id: 1 })
    });
    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    // expect edit and remove buttons render
    const removeButton = queryByTestId('action-dropdown--remove');
    expect(removeButton).toBeTruthy();

    // click remove button

    fireEvent.click(removeButton.querySelector('button'));

    // confirms mockOnChange called w/ correct args

    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toBeNull();
  });
});
