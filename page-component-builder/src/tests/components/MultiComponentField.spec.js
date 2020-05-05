import React from 'react';
import * as c from '../../constants';

import MultiComponentField from '../../components/fields/MultiComponentField';

import { render, cleanup, fireEvent, configure } from '@testing-library/react';
import { mockEntryResponse, mockSchemas, mockSchema, mockSdk } from '../mockUtils';

configure({
  testIdAttribute: 'data-test-id'
});

const mockOnChange = jest.fn(value => value);
const mockReplaceHydratedEntry = jest.fn(entity => entity);
const mockContentType = 'mock-content-type';
const mockComponentId = 'patterns/componentId';
const mockComponentOption = 'components/a';

const renderComponent = ({
  entries = [mockEntryResponse({ id: 1, contentType: mockContentType })],
  internalMappingInstance = null, // singleton data
  sdk = mockSdk(),
  options = [mockComponentOption]
} = {}) => {
  const schemas = mockSchemas({}, [mockSchema(mockComponentId), mockSchema(mockComponentOption)]);
  return render(
    <MultiComponentField
      sdk={sdk}
      schemas={schemas.components}
      entries={entries}
      value={entries}
      internalMappingInstance={internalMappingInstance}
      isLoading={false}
      onChange={mockOnChange}
      options={options}
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

  it('blank component - loads actions', () => {
    const { queryByTestId } = renderComponent({
      entries: []
    });

    expect(queryByTestId('multi-component-field')).toBeTruthy();
    expect(queryByTestId('create-multi-component')).toBeTruthy();
    expect(queryByTestId('link-multi-component')).toBeTruthy();

    // expect no card renders
    expect(queryByTestId('hydrated-entry-card')).toBeNull();
    expect(queryByTestId('hydrated-edit-entry')).toBeNull();
    expect(queryByTestId('hydrated-remove-entry')).toBeNull();
  });

  it('hydrated component - loads actions', () => {
    // renders edit and remove buttons
    const { queryByTestId } = renderComponent({
      entries: [mockEntryResponse({ id: 1, contentType: mockContentType })],
      options: [mockComponentOption]
    });

    // expect create, link buttons dont render
    expect(queryByTestId('multi-component-field')).toBeTruthy();
    expect(queryByTestId('create-multi-component')).toBeTruthy();
    expect(queryByTestId('link-multi-component')).toBeTruthy();

    // expect card renders
    expect(queryByTestId('hydrated-entry-card')).toBeTruthy();

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    // expect edit and remove buttons render
    expect(queryByTestId('hydrated-edit-entry')).toBeTruthy();
    expect(queryByTestId('hydrated-remove-entry')).toBeTruthy();
  });

  it('creates an entry', async () => {
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entries: []
    });

    const createDropdown = queryByTestId('create-multi-component');
    expect(createDropdown).toBeTruthy();

    // click create dropdown
    fireEvent.click(createDropdown.querySelector('button'));
    const createButton = queryByTestId(`create-multi-component-type--${mockComponentOption}`);
    expect(createButton).toBeTruthy();

    // click create type button
    await fireEvent.click(createButton.querySelector('button'));

    // confirms space.createEntry called with correct args
    await expect(sdk.space.createEntry.mock.calls).toHaveLength(1);
    await expect(sdk.space.createEntry.mock.calls[0][0]).toBe(c.CONTENT_TYPE_VIEW_COMPONENT);
    await expect(sdk.space.createEntry.mock.calls[0][1]).toMatchObject({
      fields: { componentId: { 'en-US': mockComponentOption } }
    });

    // confirms navigator.openEntry called with correct args

    await expect(sdk.navigator.openEntry.mock.calls).toHaveLength(1);
    await expect(sdk.navigator.openEntry.mock.calls[0][0]).toBe('createdEntry1a');

    // confirms mockOnChange called w/ correct args

    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject([
      {
        sys: { id: 'mockNavigatedEntry1' }
      }
    ]);
  });

  it('links an entry', async () => {
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entries: []
    });

    const linkDropdown = queryByTestId('link-multi-component');
    expect(queryByTestId('link-multi-component')).toBeTruthy();

    // click link dropdown
    fireEvent.click(linkDropdown.querySelector('button'));
    const linkButton = queryByTestId(`link-multi-component-type--${mockComponentOption}`);
    expect(linkButton).toBeTruthy();

    // click link type button
    await fireEvent.click(linkButton.querySelector('button'));

    // opens modal and calls space.getEntries
    expect(queryByTestId('select-component-modal')).toBeTruthy();
    expect(sdk.space.getEntries.mock.calls.length > 0).toBeTruthy();

    // click result

    expect(queryByTestId('hydrated-entry-card')).toBeTruthy();
    fireEvent.click(queryByTestId('hydrated-entry-card'));

    // click submit button
    fireEvent.click(queryByTestId('select-component--submit'));

    // confirms mockOnChange called w/ correct args
    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject([
      { sys: { id: mockComponentOption } }
    ]);
  });
  it('edits an entry', async () => {
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entries: [mockEntryResponse({ id: 1, contentType: mockContentType })],
      options: [mockComponentOption]
    });

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    const editButton = queryByTestId('hydrated-edit-entry');
    expect(editButton).toBeTruthy();

    fireEvent.click(editButton.querySelector('button'));

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
      entries: [mockEntryResponse({ id: 1, contentType: mockContentType })],
      options: [mockComponentOption]
    });

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    // expect edit and remove buttons render
    const removeButton = queryByTestId('hydrated-remove-entry');
    expect(removeButton).toBeTruthy();

    // click remove button

    fireEvent.click(removeButton.querySelector('button'));

    // confirms mockOnChange called w/ correct args

    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toStrictEqual([]);
  });
});
