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
    expect(queryByTestId('hydrated-edit-entry')).toBeNull();
    expect(queryByTestId('hydrated-remove-entry')).toBeNull();
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
    expect(queryByTestId('hydrated-edit-entry')).toBeTruthy();
    expect(queryByTestId('hydrated-remove-entry')).toBeTruthy();
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
    const { debug, queryByTestId } = renderComponent({
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
  it('edits an entry', async () => {});
  it('removes an entry', async () => {});

  it('creates a singleton', async () => {});
  it('removes a singleton', async () => {});
});
