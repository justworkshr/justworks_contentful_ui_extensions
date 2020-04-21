import React from 'react';
import { PageComponentBuilder } from '../index';

import * as c from '../constants';
import { render, cleanup, fireEvent, configure, wait } from '@testing-library/react';
import {
  mockSdk,
  mockSchemas,
  mockInternalMapping,
  mockComponentSchema,
  mockComponentSchemaProperty,
  mockLinkProperty,
  mockMultiLinkProperty,
  mockMultiComponentProperty,
  mockAssetProperty,
  mockEntryProperty,
  mockComponentEntryProperty,
  mockConfigProperty,
  mockMultiConfigProperty,
  mockTextProperty,
  mockAssetResponse,
  mockEntryResponse,
  mockLink,
  mockSingletonProperty
} from './mockUtils';

configure({
  testIdAttribute: 'data-test-id'
});

const renderComponent = (sdk, schemas = mockSchemas()) => {
  return render(<PageComponentBuilder schemas={schemas} sdk={sdk} />);
};

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
          ...mockComponentSchemaProperty({
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
          ...mockComponentSchemaProperty({
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

      expect(getByTestId('asset-field')).toBeTruthy();
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

      expect(getByTestId('asset-field')).toBeTruthy();
      expect(getByTestId('hydrated-asset-card')).toBeTruthy();
    });
  });

  describe('single entry', () => {
    const createSchema = (componentId, propKey, type) => {
      return mockSchemas({}, [
        mockComponentSchema(componentId, {
          ...mockComponentSchemaProperty({
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

      expect(getByTestId('entry-field')).toBeTruthy();
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

      expect(getByTestId('entry-field')).toBeTruthy();
      expect(getByTestId('hydrated-entry-card')).toBeTruthy();
    });
  });

  describe('multi links', () => {
    const createSchema = (componentId, propKey) => {
      return mockSchemas({}, [
        mockComponentSchema(componentId, {
          ...mockComponentSchemaProperty({
            propKey,
            type: c.MULTI_LINK_PROPERTY,
            contentTypes: ['test']
          })
        })
      ]);
    };

    it('should render a blank field', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockMultiLinkProperty(propKey, [])
      });

      const sdk = mockSdk();

      const schemas = createSchema(componentId, propKey, c.MULTI_LINK_PROPERTY);

      const { getByTestId } = setupLoadedComponent({ sdk, schemas, componentId, internalMapping });

      expect(getByTestId('multi-link-field')).toBeTruthy();
      expect(getByTestId('multi-link-field--links').childNodes).toHaveLength(0);
    });

    it('should render an entry field with value', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const ids = ['1a', '1b'];
      const internalMapping = mockInternalMapping(componentId, {
        ...mockMultiComponentProperty(propKey, ids)
      });

      const sdk = mockSdk();
      const entries = ids.map(id => mockLink({ type: 'Entry', id }));

      const schemas = createSchema(componentId, propKey, c.MULTI_LINK_PROPERTY);

      const { getByTestId } = setupLoadedComponent({
        sdk,
        schemas,
        componentId,
        entries,
        internalMapping
      });

      expect(getByTestId('multi-link-field')).toBeTruthy();
      expect(getByTestId('multi-link-field--links').childNodes).toHaveLength(entries.length);
    });
  });

  describe('single component link', () => {
    const createSchema = (componentId, propKey, type, otherSchemas = []) => {
      return mockSchemas({}, [
        mockComponentSchema(componentId, {
          ...mockComponentSchemaProperty({
            propKey,
            type,
            options: ['test']
          })
        }),
        ...otherSchemas
      ]);
    };

    it('should render a blank field', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const id = '';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockComponentEntryProperty(propKey, id)
      });

      const sdk = mockSdk();

      const schemas = createSchema(componentId, propKey, c.COMPONENT_PROPERTY);

      const { getByTestId } = setupLoadedComponent({ sdk, schemas, componentId, internalMapping });

      expect(getByTestId('component-field')).toBeTruthy();
      expect(getByTestId('component-field-blank')).toBeTruthy();
    });

    it('should render an entry field with value', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const id = 'prop 1 id';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockEntryProperty(propKey, id)
      });

      const sdk = mockSdk();
      const schemas = createSchema(componentId, propKey, c.COMPONENT_PROPERTY);
      const entries = [mockLink({ type: 'Entry', id })];
      const { getByTestId } = setupLoadedComponent({
        sdk,
        schemas,
        componentId,
        entries,
        internalMapping
      });

      expect(getByTestId('component-field')).toBeTruthy();
      expect(getByTestId('hydrated-entry-card')).toBeTruthy();
    });

    it('should render an singleton field with value', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const singletonComponentId = 'singletonComponent';
      const singletonPropKey = 'singletopProp1';
      const singletonProp1Value = 'singleton prop1 value';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockSingletonProperty(propKey, singletonComponentId, {
          ...mockTextProperty(singletonPropKey, singletonProp1Value)
        })
      });

      const sdk = mockSdk();
      const schemas = createSchema(componentId, propKey, c.COMPONENT_PROPERTY, [
        mockComponentSchema(singletonComponentId, {
          ...mockComponentSchemaProperty({
            propKey: singletonPropKey,
            type: c.TEXT_PROPERTY,
            editor_type: c.SHORT_TEXT_EDITOR
          })
        })
      ]);
      const { getByTestId } = setupLoadedComponent({
        sdk,
        schemas,
        componentId,
        internalMapping
      });

      expect(getByTestId('component-field')).toBeTruthy();
      expect(getByTestId('component-field-singleton')).toBeTruthy();
      expect(getByTestId('short-text-field')).toBeTruthy();
      expect(getByTestId('short-text-field').value).toEqual(singletonProp1Value);
    });
  });

  describe('multi component link', () => {
    const createSchema = (componentId, propKey) => {
      return mockSchemas({}, [
        mockComponentSchema(componentId, {
          ...mockComponentSchemaProperty({
            propKey,
            type: c.MULTI_COMPONENT_PROPERTY,
            options: ['test']
          })
        })
      ]);
    };

    it('should render a blank field', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockMultiComponentProperty(propKey, [])
      });

      const sdk = mockSdk();

      const schemas = createSchema(componentId, propKey, c.MULTI_COMPONENT_PROPERTY);

      const { getByTestId } = setupLoadedComponent({ sdk, schemas, componentId, internalMapping });

      expect(getByTestId('multi-component-field')).toBeTruthy();
      expect(getByTestId('multi-component-field--links').childNodes).toHaveLength(0);
    });

    it('should render an entry field with value', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const ids = ['1a', '1b'];
      const internalMapping = mockInternalMapping(componentId, {
        ...mockMultiComponentProperty(propKey, ids)
      });

      const sdk = mockSdk();
      const entries = ids.map(id => mockLink({ type: 'Entry', id }));

      const schemas = createSchema(componentId, propKey, c.MULTI_COMPONENT_PROPERTY);

      const { getByTestId } = setupLoadedComponent({
        sdk,
        schemas,
        componentId,
        entries,
        internalMapping
      });

      expect(getByTestId('multi-component-field')).toBeTruthy();
      expect(getByTestId('multi-component-field--links').childNodes).toHaveLength(entries.length);
    });
  });

  describe('single config object link', () => {
    const createSchema = (componentId, propKey, related_to = 'test', otherSchemas = []) => {
      return mockSchemas({}, [
        mockComponentSchema(componentId, {
          ...mockComponentSchemaProperty({
            propKey,
            type: c.CONFIG_PROPERTY,
            related_to: related_to
          })
        }),
        ...otherSchemas
      ]);
    };

    it('should render a blank field', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const id = '';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockConfigProperty(propKey, id)
      });

      const sdk = mockSdk();

      const schemas = createSchema(componentId, propKey);

      const { getByTestId } = setupLoadedComponent({ sdk, schemas, componentId, internalMapping });

      expect(getByTestId('component-field')).toBeTruthy();
      expect(getByTestId('component-field-blank')).toBeTruthy();
    });

    it('should not render if the schema property lacks a "related_to" field', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const internalMapping = mockInternalMapping(componentId, {});

      const sdk = mockSdk();

      const schemas = createSchema(componentId, propKey, null);

      const { queryByTestId } = setupLoadedComponent({
        sdk,
        schemas,
        componentId,
        internalMapping
      });

      expect(queryByTestId('component-field')).toBeNull();
    });

    it('should render an entry field with value', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const id = 'prop 1 id';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockConfigProperty(propKey, id)
      });

      const sdk = mockSdk();
      const schemas = createSchema(componentId, propKey);
      const entries = [mockLink({ type: 'Entry', id })];
      const { getByTestId } = setupLoadedComponent({
        sdk,
        schemas,
        componentId,
        entries,
        internalMapping
      });

      expect(getByTestId('component-field')).toBeTruthy();
      expect(getByTestId('hydrated-entry-card')).toBeTruthy();
    });
  });

  describe('multi config object link', () => {
    const createSchema = (componentId, propKey) => {
      return mockSchemas({}, [
        mockComponentSchema(componentId, {
          ...mockComponentSchemaProperty({
            propKey,
            type: c.MULTI_CONFIG_PROPERTY,
            related_to: 'test'
          })
        })
      ]);
    };

    it('should render a blank field', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const internalMapping = mockInternalMapping(componentId, {
        ...mockMultiConfigProperty(propKey, [])
      });

      const sdk = mockSdk();

      const schemas = createSchema(componentId, propKey, c.MULTI_CONFIG_PROPERTY);

      const { getByTestId } = setupLoadedComponent({ sdk, schemas, componentId, internalMapping });

      expect(getByTestId('multi-component-field')).toBeTruthy();
      expect(getByTestId('multi-component-field--links').childNodes).toHaveLength(0);
    });

    it('should render an entry field with value', async () => {
      const componentId = 'mockComponent';
      const propKey = 'prop1';
      const ids = ['1a', '1b'];
      const internalMapping = mockInternalMapping(componentId, {
        ...mockMultiConfigProperty(propKey, ids)
      });

      const sdk = mockSdk();
      const entries = ids.map(id => mockLink({ type: 'Entry', id }));

      const schemas = createSchema(componentId, propKey, c.MULTI_CONFIG_PROPERTY);

      const { getByTestId } = setupLoadedComponent({
        sdk,
        schemas,
        componentId,
        entries,
        internalMapping
      });

      expect(getByTestId('multi-component-field')).toBeTruthy();
      expect(getByTestId('multi-component-field--links').childNodes).toHaveLength(entries.length);
    });
  });
});
