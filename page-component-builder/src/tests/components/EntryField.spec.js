import React from 'react';
import EntryField from '../../components/fields/EntryField';

import { render, cleanup, fireEvent, configure } from '@testing-library/react';
import { mockEntryResponse, mockSdk } from '../mockUtils';

configure({
  testIdAttribute: 'data-test-id'
});

const mockOnChange = jest.fn(value => value);
const mockReplaceHydratedEntry = jest.fn(entity => entity);
const mockContentType = 'mock-content-type';

const renderComponent = ({
  entry = mockEntryResponse({ id: 1, contentType: mockContentType }),
  contentTypes = [mockContentType],
  sdk = mockSdk()
} = {}) => {
  return render(
    <EntryField
      sdk={sdk}
      entry={entry}
      contentTypes={contentTypes}
      isLoading={false}
      onChange={mockOnChange}
      replaceHydratedEntry={mockReplaceHydratedEntry}
    />
  );
};

describe('actions', () => {
  beforeEach(() => {
    mockOnChange.mockReset();
    mockReplaceHydratedEntry.mockReset();
  });

  afterEach(cleanup);

  it('blank entry - loads actions', () => {
    // renders create and link buttons
    const { queryByTestId } = renderComponent({
      entry: {}
    });

    expect(queryByTestId('entry-field')).toBeTruthy();
    expect(queryByTestId('dropdown-create')).toBeTruthy();
    expect(queryByTestId('dropdown-link')).toBeTruthy();

    // expect no card renders
    expect(queryByTestId('hydrated-entry-card')).toBeNull();
    expect(queryByTestId('action-dropdown--edit')).toBeNull();
    expect(queryByTestId('action-dropdown--remove')).toBeNull();
  });

  it('hydrated entry - loads actions', () => {
    // renders edit and remove buttons
    const { queryByTestId } = renderComponent({
      entry: mockEntryResponse({ id: 1, contentType: mockContentType })
    });

    // expect create, link buttons dont render
    expect(queryByTestId('entry-field')).toBeTruthy();
    expect(queryByTestId('dropdown-create')).toBeNull();
    expect(queryByTestId('dropdown-link')).toBeNull();

    // expect card renders
    expect(queryByTestId('hydrated-entry-card')).toBeTruthy();

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    // expect edit and remove buttons render
    expect(queryByTestId('action-dropdown--edit')).toBeTruthy();
    expect(queryByTestId('action-dropdown--remove')).toBeTruthy();
  });

  it('creates an entry', async () => {
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entry: {}
    });
    const createDropdown = queryByTestId('dropdown-create');
    expect(queryByTestId('dropdown-create')).toBeTruthy();

    // click create dropdown
    fireEvent.click(createDropdown.querySelector('button'));

    const createButton = queryByTestId(`dropdown-create-type--${mockContentType}`);
    expect(createButton).toBeTruthy();

    // click create type button
    fireEvent.click(createButton.querySelector('button'));

    // confirms space.createEntry called with correct args
    await expect(sdk.space.createEntry.mock.calls).toHaveLength(1);
    await expect(sdk.space.createEntry.mock.calls[0][0]).toBe(mockContentType);
    await expect(sdk.space.createEntry.mock.calls[0][1]).toStrictEqual({ fields: {} });

    // confirms navigator.openEntry called with correct args

    await expect(sdk.navigator.openEntry.mock.calls).toHaveLength(1);
    await expect(sdk.navigator.openEntry.mock.calls[0][0]).toBe('createdEntry1a');

    // confirms mockOnChange called w/ correct args

    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject({
      sys: { id: 'mockNavigatedEntry1' }
    });
  });

  it('links an entry', async () => {
    const sdk = mockSdk();

    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entry: {}
    });

    const linkDropdown = queryByTestId('dropdown-link');
    expect(queryByTestId('dropdown-link')).toBeTruthy();

    // click link dropdown
    fireEvent.click(linkDropdown.querySelector('button'));

    const linkButton = queryByTestId(`dropdown-link-type--${mockContentType}`);
    expect(linkButton).toBeTruthy();

    // click link type button
    fireEvent.click(linkButton.querySelector('button'));

    // confirms dialogs.selectSingleEntry called w/ correct args
    await expect(sdk.dialogs.selectSingleEntry.mock.calls).toHaveLength(1);
    await expect(sdk.dialogs.selectSingleEntry.mock.calls[0][0]).toMatchObject({
      contentTypes: [mockContentType]
    });

    // confirms mockOnChange called w/ correct args
    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject({ sys: { id: 'newLinkedEntry1b' } });
  });

  it('edits an entry', async () => {
    const sdk = mockSdk();

    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entry: mockEntryResponse({ id: 1, contentType: mockContentType })
    });
    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    const editButton = queryByTestId('action-dropdown--edit');
    expect(editButton).toBeTruthy();

    // click edit button

    fireEvent.click(editButton);

    // confirms navigator.openEntry called w/ correct args

    await expect(sdk.navigator.openEntry.mock.calls).toHaveLength(1);
    await expect(sdk.navigator.openEntry.mock.calls[0][0]).toBe(1);

    // confirms mockReplaceHydratedEntry called w/ correct args
    await expect(mockReplaceHydratedEntry.mock.calls).toHaveLength(1);
    await expect(mockReplaceHydratedEntry.mock.calls[0][0]).toMatchObject({ fields: {} });
  });

  it('removes an entry', async () => {
    const sdk = mockSdk();

    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entry: mockEntryResponse({ id: 1, contentType: mockContentType })
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
