import React from 'react';
import { PageComponentBuilder } from '../index';

import * as c from '../constants';
import { render, cleanup, fireEvent, configure, wait } from '@testing-library/react';
import {
  mockSdk,
  mockSchemas,
  mockInternalMapping,
  mockComponentSchema,
  mockComponentProperty,
  mockLinkProperty,
  mockAssetProperty,
  mockEntryProperty,
  mockTextProperty,
  mockAssetResponse,
  mockEntryResponse,
  mockLink
} from './mockUtils';

configure({
  testIdAttribute: 'data-test-id'
});

function renderComponent(sdk, schemas = mockSchemas()) {
  return render(<PageComponentBuilder schemas={schemas} sdk={sdk} />);
}

const setupLoadedComponent = ({
  sdk,
  schemas,
  assets = [],
  entries = [],
  componentId,
  internalMapping = JSON.stringify({})
} = {}) => {
  sdk.entry.fields.componentId.getValue.mockReturnValue(componentId);
  sdk.entry.fields.assets.getValue.mockReturnValue(assets);
  sdk.entry.fields.entries.getValue.mockReturnValue(entries);
  sdk.entry.fields.internalMapping.getValue.mockReturnValue(internalMapping);

  const hydratedAssets = assets.map(a => mockAssetResponse({ id: a.sys.id }));
  const hydratedEntries = entries.map(e => mockEntryResponse({ id: e.sys.id }));

  return render(
    <PageComponentBuilder
      hydratedAssets={hydratedAssets}
      hydratedEntries={hydratedEntries}
      schemas={schemas}
      sdk={sdk}
    />
  );
};

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

  describe('short text', () => {
    const createSchema = (componentId, propKey, type, editor_type) => {
      return mockSchemas({}, [
        mockComponentSchema(componentId, {
          ...mockComponentProperty({
            propKey,
            type,
            editor_type
          })
        })
      ]);
    };

    it('should render a blank field', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const value = '';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockTextProperty(propKey, value)
      });

      const sdk = mockSdk();

      const schemas = createSchema(componentId, propKey, c.TEXT_PROPERTY, c.SHORT_TEXT_EDITOR);

      const { getByTestId } = setupLoadedComponent({ sdk, schemas, componentId, internalMapping });

      expect(getByTestId('short-text-field').value).toEqual('');
    });

    it('should render a text field with value', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const value = 'prop 1 value';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockTextProperty(propKey, value)
      });

      const sdk = mockSdk();
      const schemas = createSchema(componentId, propKey, c.TEXT_PROPERTY, c.SHORT_TEXT_EDITOR);

      const { getByTestId } = setupLoadedComponent({ sdk, schemas, componentId, internalMapping });

      expect(getByTestId('short-text-field').value).toEqual(value);
    });
  });

  describe('single asset', () => {
    const createSchema = (componentId, propKey, type) => {
      return mockSchemas({}, [
        mockComponentSchema(componentId, {
          ...mockComponentProperty({
            propKey,
            type,
            assetTypes: [c.ASSET_TYPE_IMAGE]
          })
        })
      ]);
    };

    it('should render a blank field', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const id = '';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockAssetProperty(propKey, id)
      });

      const sdk = mockSdk();

      const schemas = createSchema(componentId, propKey, c.LINK_PROPERTY);

      const { getByTestId } = setupLoadedComponent({ sdk, schemas, componentId, internalMapping });

      expect(getByTestId('asset-field-blank')).toBeTruthy();
    });

    it('should render an asset field with value', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const id = 'prop 1 id';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockAssetProperty(propKey, id)
      });

      const sdk = mockSdk();
      const schemas = createSchema(componentId, propKey, c.LINK_PROPERTY);
      const assets = [mockLink({ type: 'Asset', id })];
      const { getByTestId } = setupLoadedComponent({
        sdk,
        schemas,
        componentId,
        assets,
        internalMapping
      });

      expect(getByTestId('asset-field-card')).toBeTruthy();
    });
  });

  describe('single entry', () => {
    const createSchema = (componentId, propKey, type) => {
      return mockSchemas({}, [
        mockComponentSchema(componentId, {
          ...mockComponentProperty({
            propKey,
            type,
            contentTypes: ['test']
          })
        })
      ]);
    };

    it('should render a blank field', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const id = '';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockEntryProperty(propKey, id)
      });

      const sdk = mockSdk();

      const schemas = createSchema(componentId, propKey, c.LINK_PROPERTY);

      const { getByTestId } = setupLoadedComponent({ sdk, schemas, componentId, internalMapping });

      expect(getByTestId('entry-field-blank')).toBeTruthy();
    });

    it('should render an entry field with value', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const id = 'prop 1 id';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockEntryProperty(propKey, id)
      });

      const sdk = mockSdk();
      const schemas = createSchema(componentId, propKey, c.LINK_PROPERTY);
      const entries = [mockLink({ type: 'Entry', id })];
      const { getByTestId } = setupLoadedComponent({
        sdk,
        schemas,
        componentId,
        entries,
        internalMapping
      });

      expect(getByTestId('entry-field-card')).toBeTruthy();
    });
  });
});
