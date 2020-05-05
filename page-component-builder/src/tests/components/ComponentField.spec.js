import React from 'react';
import * as c from '../../constants';

import ComponentField from '../../components/fields/ComponentField';

import { render, cleanup, fireEvent, configure, waitForElement } from '@testing-library/react';
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
  entry = mockEntryResponse({ id: 1, contentType: mockContentType }),
  internalMappingInstance = null, // singleton data
  contentTypes = [mockContentType],
  sdk = mockSdk(),
  property = {}
} = {}) => {
  const schemas = mockSchemas({}, [mockSchema(mockComponentId), mockSchema(mockComponentOption)]);
  return render(
    <ComponentField
      sdk={sdk}
      schemas={schemas.components}
      entry={entry}
      internalMappingInstance={internalMappingInstance}
      contentTypes={contentTypes}
      isLoading={false}
      onChange={mockOnChange}
      replaceHydratedEntry={mockReplaceHydratedEntry}
      property={property}
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
      entry: {}
    });

    expect(queryByTestId('component-field-blank')).toBeTruthy();
    expect(queryByTestId('create-component')).toBeTruthy();
    expect(queryByTestId('link-component')).toBeTruthy();

    // expect no card renders
    expect(queryByTestId('hydrated-entry-card')).toBeNull();
    expect(queryByTestId('action-dropdown--edit')).toBeNull();
    expect(queryByTestId('action-dropdown--remove')).toBeNull();
  });

  it('hydrated component - loads actions', () => {
    // renders edit and remove buttons
    const { queryByTestId } = renderComponent({
      entry: mockEntryResponse({ id: 1, contentType: mockContentType })
    });

    // expect create, link buttons dont render
    expect(queryByTestId('component-field')).toBeTruthy();
    expect(queryByTestId('create-component')).toBeNull();
    expect(queryByTestId('link-component')).toBeNull();

    // expect card renders
    expect(queryByTestId('hydrated-entry-card')).toBeTruthy();

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    // expect edit and remove buttons render
    expect(queryByTestId('action-dropdown--edit')).toBeTruthy();
    expect(queryByTestId('action-dropdown--remove')).toBeTruthy();
  });

  it('singleton component - loads actions', () => {
    // renders edit and remove buttons
    const { queryByTestId } = renderComponent({
      entry: {},
      internalMappingInstance: {
        componentId: mockComponentId,
        properties: {}
      }
    });

    // expect create, link buttons dont render
    expect(queryByTestId('component-field')).toBeTruthy();
    expect(queryByTestId('create-component')).toBeNull();
    expect(queryByTestId('link-component')).toBeNull();

    // expect card renders
    expect(queryByTestId('hydrated-entry-card')).toBeNull();
    expect(queryByTestId('component-field-singleton')).toBeTruthy();

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    // expect remove buttons render
    expect(queryByTestId('remove-component-singleton')).toBeTruthy();
  });

  it('creates an entry', async () => {
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entry: {},
      property: {
        type: c.COMPONENT_PROPERTY,
        options: [mockComponentOption]
      }
    });

    const createDropdown = queryByTestId('create-component');
    expect(createDropdown).toBeTruthy();

    // click create dropdown
    fireEvent.click(createDropdown.querySelector('button'));
    const createButton = queryByTestId(`create-component-type--${mockComponentOption}`);
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
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject({
      sys: { id: 'mockNavigatedEntry1' }
    });
  });

  it('links an entry', async () => {
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entry: {},
      property: {
        type: c.COMPONENT_PROPERTY,
        options: [mockComponentOption]
      }
    });

    const linkDropdown = queryByTestId('link-component');
    expect(queryByTestId('link-component')).toBeTruthy();

    // click link dropdown
    fireEvent.click(linkDropdown.querySelector('button'));
    const linkButton = queryByTestId(`link-component-type--${mockComponentOption}`);
    expect(linkButton).toBeTruthy();

    // click link type button
    await fireEvent.click(linkButton.querySelector('button'));

    // opens modal and calls space.getEntries
    expect(queryByTestId('select-component-modal')).toBeTruthy();
    expect(sdk.space.getEntries.mock.calls.length > 0).toBeTruthy();

    // click result

    expect(queryByTestId('hydrated-entry-card')).toBeTruthy();
    fireEvent.click(queryByTestId('hydrated-entry-card'));

    // confirms mockOnChange called w/ correct args
    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject({ sys: { id: mockComponentOption } });
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

    fireEvent.click(editButton);

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

  it('creates a singleton', async () => {
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entry: {},
      property: {
        type: c.COMPONENT_PROPERTY,
        options: [mockComponentOption]
      }
    });

    const createDropdown = queryByTestId('create-component-singleton');
    expect(createDropdown).toBeTruthy();

    // click create dropdown
    fireEvent.click(createDropdown.querySelector('button'));
    const createButton = queryByTestId(`create-component-singleton-type--${mockComponentOption}`);
    expect(createButton).toBeTruthy();

    // click create type button
    fireEvent.click(createButton.querySelector('button'));

    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toMatchObject({
      componentId: mockComponentOption,
      properties: {}
    });
  });

  it('removes a singleton', async () => {
    // renders edit and remove buttons
    const sdk = mockSdk();
    const { queryByTestId } = renderComponent({
      sdk: sdk,
      entry: {},
      internalMappingInstance: {
        componentId: mockComponentId,
        properties: {}
      }
    });

    // expect create, link buttons dont render
    expect(queryByTestId('component-field')).toBeTruthy();
    expect(queryByTestId('create-component')).toBeNull();
    expect(queryByTestId('link-component')).toBeNull();

    // expect card renders
    expect(queryByTestId('hydrated-entry-card')).toBeNull();
    expect(queryByTestId('component-field-singleton')).toBeTruthy();

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    // expect remove buttons render
    const removeButton = queryByTestId('remove-component-singleton');
    expect(removeButton).toBeTruthy();

    fireEvent.click(removeButton.querySelector('button'));
    await expect(mockOnChange.mock.calls).toHaveLength(1);
    await expect(mockOnChange.mock.calls[0][0]).toBeNull();
  });
});
