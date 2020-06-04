import React from 'react';
import * as c from '@shared/constants';

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
const mockPresetId = 'components/preset';

const renderComponent = ({
  hydratedEntries = [mockEntryResponse({ id: 1, contentType: mockContentType })],
  internalMappingInstance = null, // singleton data
  sdk = mockSdk(),
  options = [mockComponentOption],
  presets = [],
  value = [mockEntryResponse({ id: 1, contentType: mockContentType })]
} = {}) => {
  const schemas = mockSchemas({}, [
    mockSchema(mockComponentId),
    mockSchema(mockComponentOption),
    mockSchema(mockPresetId)
  ]);
  return render(
    <MultiComponentField
      sdk={sdk}
      schemas={schemas.components}
      hydratedAssets={[]}
      hydratedEntries={hydratedEntries}
      value={value}
      internalMappingInstance={internalMappingInstance}
      isLoading={false}
      onChange={mockOnChange}
      options={options}
      presets={presets}
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
      hydratedEntries: [],
      value: []
    });

    expect(queryByTestId('multi-component-field')).toBeTruthy();
    expect(queryByTestId('dropdown-create')).toBeTruthy();
    expect(queryByTestId('dropdown-link')).toBeTruthy();

    // expect no card renders
    expect(queryByTestId('hydrated-entry-card')).toBeNull();
    expect(queryByTestId('action-dropdown--edit')).toBeNull();
    expect(queryByTestId('action-dropdown--remove')).toBeNull();
  });

  it('hydrated component - loads actions', () => {
    // renders edit and remove buttons
    const entries = [mockEntryResponse({ id: 1, contentType: mockContentType })];
    const { queryByTestId } = renderComponent({
      hydratedEntries: entries,
      value: entries,
      options: [mockComponentOption]
    });

    // expect create, link buttons dont render
    expect(queryByTestId('multi-component-field')).toBeTruthy();
    expect(queryByTestId('dropdown-create')).toBeTruthy();
    expect(queryByTestId('dropdown-link')).toBeTruthy();

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
      hydratedEntries: [],
      value: []
    });

    const createDropdown = queryByTestId('dropdown-create');
    expect(createDropdown).toBeTruthy();

    // click create dropdown
    fireEvent.click(createDropdown.querySelector('button'));
    const createButton = queryByTestId(`dropdown-create-type--${mockComponentOption}`);
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
      hydratedEntries: [],
      value: []
    });

    const linkDropdown = queryByTestId('dropdown-link');
    expect(queryByTestId('dropdown-link')).toBeTruthy();

    // click link dropdown
    fireEvent.click(linkDropdown.querySelector('button'));
    const linkButton = queryByTestId(`dropdown-link-type--${mockComponentOption}`);
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

    // action remains
    expect(queryByTestId('dropdown-link')).toBeTruthy();
  });

  it('edits an entry', async () => {
    const sdk = mockSdk();
    const value = [mockEntryResponse({ id: 1, contentType: mockContentType })];
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      hydratedEntries: value,
      value: value,
      options: [mockComponentOption]
    });

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    const editButton = queryByTestId('action-dropdown--edit');
    expect(editButton).toBeTruthy();

    fireEvent.click(editButton);

    await expect(sdk.navigator.openEntry.mock.calls).toHaveLength(1);
    await expect(sdk.navigator.openEntry.mock.calls[0][0]).toBe(1);

    // confirms mockReplaceHydratedEntry called w/ correct args
    await expect(mockReplaceHydratedEntry.mock.calls).toHaveLength(1);
    await expect(mockReplaceHydratedEntry.mock.calls[0][0]).toMatchObject({ fields: {} });
  });

  it('removes an entry', async () => {
    const sdk = mockSdk();
    const value = [mockEntryResponse({ id: 1, contentType: mockContentType })];
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      hydratedEntries: value,
      value,
      options: [mockComponentOption]
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
    await expect(mockOnChange.mock.calls[0][0]).toStrictEqual([]);
  });

  it('creates a singleton', async () => {
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      hydratedEntries: [],
      value: []
    });

    const createDropdown = queryByTestId('dropdown-create-singleton');
    expect(createDropdown).toBeTruthy();

    // click create dropdown
    fireEvent.click(createDropdown.querySelector('button'));
    const createButton = queryByTestId(`dropdown-create-type--${mockComponentOption}`);
    expect(createButton).toBeTruthy();

    // click create type button
    await fireEvent.click(createButton.querySelector('button'));

    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject([
      {
        componentId: mockComponentOption,
        properties: {}
      }
    ]);
  });

  it('creates a singleton preset', async () => {
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      hydratedEntries: [],
      presets: [{ name: 'preset', component_id: mockPresetId, properties: {} }],
      value: []
    });

    const createDropdown = queryByTestId('dropdown-create-singleton');
    expect(createDropdown).toBeTruthy();

    // click create dropdown
    fireEvent.click(createDropdown.querySelector('button'));
    // debug();
    const createButton = queryByTestId(`dropdown-preset-type--preset`);
    expect(createButton).toBeTruthy();

    // click create type button
    await fireEvent.click(createButton.querySelector('button'));

    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject([
      {
        componentId: mockPresetId,
        properties: {
          preset_name: {}
        }
      }
    ]);
  });

  it('removes a singleton', async () => {
    const sdk = mockSdk();
    const value = [
      {
        componentId: mockComponentId,
        properties: {}
      }
    ];
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      hydratedEntries: [],
      value: value
    });

    // expect card renders
    expect(queryByTestId('hydrated-entry-card')).toBeNull();
    expect(queryByTestId('component-field-singleton')).toBeTruthy();

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    // expect remove buttons render
    const removeButton = queryByTestId('action-dropdown--remove');
    expect(removeButton).toBeTruthy();

    fireEvent.click(removeButton.querySelector('button'));
    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toEqual([]);
  });
});
