import React from 'react';
import * as c from '../../constants';
import InternalMapping from '../../classes/InternalMapping';
import { newInternalMappingFromSchema } from '../../utilities/index';

import ComponentEditor from '../../components/ComponentEditor';

import { within, render, cleanup, fireEvent, configure } from '@testing-library/react';
import {
  mockEntryResponse,
  mockAssetResponse,
  mockSchemas,
  mockSchema,
  mockSdk
} from '../mockUtils';

configure({
  testIdAttribute: 'data-test-id'
});

const mockUpdateInternalMapping = jest.fn(value => value);

const testSchemaId = 'patterns/1';
const testSchema = mockSchema(testSchemaId);
const singletonSchemaId = 'components/1';
const singletonSchema = mockSchema(singletonSchemaId);

const renderComponent = ({
  sdk = mockSdk(),
  hydratedEntries = [mockEntryResponse({ id: 1 })],
  hydratedAssets = [mockAssetResponse({ id: 1 })],
  internalMappingInstance = null, // component data
  schema = {}
} = {}) => {
  const schemas = mockSchemas({}, [testSchema, singletonSchema]);

  return render(
    <ComponentEditor
      sdk={sdk}
      schemas={schemas.components}
      schema={schema}
      hydratedEntries={hydratedEntries}
      hydratedAssets={hydratedAssets}
      internalMappingInstance={internalMappingInstance}
      updateInternalMapping={mockUpdateInternalMapping}
    />
  );
};

describe('validation', () => {
  beforeEach(() => {
    mockUpdateInternalMapping.mockReset();
  });

  afterEach(cleanup);

  it('validates text required', () => {
    const internalMappingInstance = newInternalMappingFromSchema({ schema: testSchema });

    const { getByTestId } = renderComponent({
      entry: {},
      schema: testSchema,
      internalMappingInstance
    });

    const prop1Field = getByTestId('editor-field--prop1');
    const errorList = within(prop1Field).queryByTestId('error-list');

    // no errors at start
    expect(errorList).toBeTruthy();
    expect(errorList.textContent).toEqual('');

    const input = within(prop1Field).queryByTestId('short-text-field');
    expect(input).toBeTruthy();
    expect(prop1Field.textContent).toContain('required');

    // change field to blank
    fireEvent.change(input, {
      target: { value: '' }
    });

    // error message appears
    const errorMessage = 'This field is required';
    expect(errorList.textContent).toEqual(errorMessage);

    // onChange calls with errors
    expect(mockUpdateInternalMapping.mock.calls).toHaveLength(1);
    expect(mockUpdateInternalMapping.mock.calls[0][2]).toMatchObject({
      prop1: [errorMessage]
    });
  });

  it('validates singleton required', () => {
    const internalMappingInstance = newInternalMappingFromSchema({ schema: testSchema });
    const singletonInstance = newInternalMappingFromSchema({ schema: singletonSchema }).asObject();
    internalMappingInstance.addProperty('componentProp', c.COMPONENT_PROPERTY, singletonInstance);

    const { getByTestId } = renderComponent({
      entry: {},
      schema: testSchema,
      internalMappingInstance
    });

    const componentPropField = getByTestId('editor-field--componentProp');
    const errorList = within(componentPropField).queryByTestId('error-list');

    // no errors at start
    expect(errorList).toBeTruthy();
    expect(errorList.textContent).toEqual('');

    // open singleton card
    const singletonCard = within(componentPropField).queryByTestId('singleton-entry-card');
    fireEvent.click(singletonCard);

    // field renders w/ required
    const input = within(componentPropField).queryByTestId('short-text-field');
    expect(input).toBeTruthy();

    // change field to blank
    fireEvent.change(input, {
      target: { value: '' }
    });

    // error message appears
    const errorMessage = 'Please correct all errors in this singleton.';
    expect(errorList.textContent).toEqual(errorMessage);

    // onChange calls with errors
    expect(mockUpdateInternalMapping.mock.calls).toHaveLength(1);
    expect(mockUpdateInternalMapping.mock.calls[0][2]).toMatchObject({
      componentProp: [errorMessage]
    });
  });
});
