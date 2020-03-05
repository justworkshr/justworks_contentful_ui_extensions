import React from 'react';
import { PageComponentBuilder } from '../index';
import { render, cleanup, fireEvent, configure, wait } from '@testing-library/react';
import { mockSdk, mockInternalMapping, mockLinkProperty } from './mockUtils';

configure({
  testIdAttribute: 'data-test-id'
});

function renderComponent(sdk) {
  return render(<PageComponentBuilder sdk={sdk} />);
}

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(cleanup);

  it('should read values from entry.fields.*', async () => {
    const sdk = mockSdk();
    sdk.entry.fields.name.getValue.mockReturnValue('name-value');
    sdk.entry.fields.componentId.getValue.mockReturnValue('componentId-value');
    sdk.entry.fields.entries.getValue.mockReturnValue([]);
    sdk.entry.fields.assets.getValue.mockReturnValue([]);
    sdk.entry.fields.internalMapping.getValue.mockReturnValue(JSON.stringify({}));
    sdk.entry.fields.isValid.getValue.mockReturnValue('yes');

    const { getByTestId } = renderComponent(sdk);

    expect(getByTestId('field-name').value).toEqual('name-value');
    expect(getByTestId('field-componentId').value).toEqual('componentId-value');
    expect(getByTestId('field-internalMapping').value).toEqual('{}');
    expect(getByTestId('field-entries').value).toEqual('');
    expect(getByTestId('field-assets').value).toEqual('');
    expect(getByTestId('field-isValid').value).toEqual('yes');

    fireEvent.change(getByTestId('field-name'), {
      target: { value: 'new-name-value' }
    });

    expect(sdk.entry.fields.name.setValue).toHaveBeenCalledWith('new-name-value');

    await jest.useFakeTimers();
    await wait(() =>
      fireEvent.change(getByTestId('field-componentId'), {
        target: { value: 'new-componentId-value' }
      })
    );

    expect(sdk.entry.fields.componentId.setValue).toHaveBeenCalledWith('new-componentId-value');
    expect(sdk.entry.fields.internalMapping.setValue).toHaveBeenCalledWith('{}'); // no schemas loaded so nil value passed

    const value = '{ "meta": {}, "properties": {}}';
    await wait(() => {
      fireEvent.change(getByTestId('field-internalMapping'), {
        target: { value: '{ "meta": {}, "properties": {}}' }
      });
    });
    await jest.runAllTimers();
    expect(sdk.entry.fields.internalMapping.setValue).toHaveBeenCalledWith(value);
  });
});
