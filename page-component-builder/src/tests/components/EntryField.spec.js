import React from 'react';
import EntryField from '../../components/fields/EntryField';

import {
  render,
  cleanup,
  fireEvent,
  configure,
  wait,
  waitForElementToBeRemoved
} from '@testing-library/react';
import * as c from '../../constants';
import { mockEntryResponse, mockSdk } from '../mockUtils';

configure({
  testIdAttribute: 'data-test-id'
});

const sdk = mockSdk();
const mockOnChange = jest.fn();
const mockReplaceHydratedEntry = jest.fn();

const mockContentType = 'mock-content-type';
// mock updatePropertyValue(propKey, value, false)

const renderComponent = ({
  entry = mockEntryResponse({ id: 1, contentType: mockContentType }),
  contentTypes = [mockContentType]
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
    expect(queryByTestId('create-entry')).toBeTruthy();
    expect(queryByTestId('link-entry')).toBeTruthy();

    // expect no card renders
    expect(queryByTestId('hydrated-entry-card')).toBeNull();
    expect(queryByTestId('hydrated-edit-entry')).toBeNull();
    expect(queryByTestId('hydrated-remove-entry')).toBeNull();
  });

  it('hydrated entry - loads actions', () => {
    // renders edit and remove buttons
    const { debug, queryByTestId } = renderComponent({
      entry: mockEntryResponse({ id: 1, contentType: mockContentType })
    });

    // expect create, link buttons dont render
    expect(queryByTestId('entry-field')).toBeTruthy();
    expect(queryByTestId('create-entry')).toBeNull();
    expect(queryByTestId('link-entry')).toBeNull();

    // expect card renders
    expect(queryByTestId('hydrated-entry-card')).toBeTruthy();

    // open action dropdown
    const actionButton = queryByTestId('cf-ui-card-actions');
    fireEvent.click(actionButton.querySelector('button'));

    // expect edit and remove buttons render
    expect(queryByTestId('hydrated-edit-entry')).toBeTruthy();
    expect(queryByTestId('hydrated-remove-entry')).toBeTruthy();
  });

  it('creates an entry', () => {
    // click create
    // confirms space.createEntry called with correct args
    // confirms navigator.openEntry called with correct args
    // confirms mockOnChange called w/ correct args
  });
  it('links an entry', () => {
    //
  });
  it('edits an entry', () => {
    //
  });
  it('removes an entry', () => {
    //
  });
});
