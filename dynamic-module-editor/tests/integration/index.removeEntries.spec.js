import React from 'react';
import { App } from '../../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as c from '../../../customModules/constants';
import { componentTemplatePlaceholder } from '../../../customModules';

import * as tm from '../../../customModules/mocks/templateMocks';

import {
  mockSdk,
  mockComponent,
  mockPrimaryEntry,
  mockLink,
  mockAssetMapping,
  mockMapping,
  mockZoneMapping,
  setupComponentZones
} from '../utils/mockUtils';

import {
  resolveAll,
  newEntryAssetIds,
  newEntryEntryIds,
  newEntryProperty,
  newEntryZone
} from '../utils/assertUtils';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

describe('ComponentModule', () => {
  describe('removing assets', () => {
    it('should remove from a single asset', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ASSETS_TEMPLATE,
        entries: undefined,
        assets: [mockLink({ id: 1 }), mockLink({ id: 2 }), mockLink({ id: 3 })],
        internalMapping: JSON.stringify({
          properties: {
            image_asset: mockAssetMapping({ value: 1 }),
            formattable_image_asset: mockAssetMapping({ value: 2 }),
            logo_asset: mockAssetMapping({ value: 3 })
          }
        })
      });

      const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      // open dropdown
      wrapper
        .find('PropertySection')
        .find({ roleKey: 'image_asset' })
        .find('AssetCard')
        .at(0)
        .find('CardActions button')
        .simulate('click');

      // click remove button
      wrapper
        .find('PropertySection')
        .find({ roleKey: 'image_asset' })
        .find('AssetCard')
        .at(0)
        .find('CardActions')
        .find('.asset-card__action--remove button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryAssetIds(sdk.space.updateEntry.args[0][0])).not.toContain(1);
      expect(newEntryAssetIds(sdk.space.updateEntry.args[0][0])).toContain(2);
      expect(newEntryAssetIds(sdk.space.updateEntry.args[0][0])).toContain(3);
      expect(newEntryProperty(sdk.space.updateEntry.args[0][0], 'image_asset')).toBeUndefined();
    });

    xit('should remove from multi-asset field', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_MULTI_REFERENCE_LOGO_TEMPLATE,
        entries: [
          mockLink({ id: 1 }),
          mockLink({ id: 2 }),
          mockLink({ id: 4 }),
          mockLink({ id: 5 })
        ],
        assets: [
          mockLink({ type: c.SYSTEM_TYPE_ASSET, id: 3 }),
          mockLink({ type: c.SYSTEM_TYPE_ASSET, id: 6 })
        ],
        internalMapping: JSON.stringify({
          properties: {
            grid_logo_multi_field: {
              type: c.FIELD_TYPE_MULTI_REFERENCE,
              value: [
                mockMapping({ type: c.FIELD_TYPE_ENTRY, value: 1 }),
                mockAssetMapping({ value: 2 }),
                mockAssetMapping({ value: 3 })
              ]
            }
          }
        })
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      // open dropdown
      wrapper
        .find('PropertySection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('AssetCard')
        .at(0)
        .find('CardActions button')
        .simulate('click');

      // click remove button
      wrapper
        .find('PropertySection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('AssetCard')
        .at(0)
        .find('CardActions')
        .find('.asset-card__action--remove button')
        .simulate('click');

      // updates sdk
      await resolveAll();

      expect(
        newEntryProperty(sdk.space.updateEntry.args[0][0], 'grid_logo_multi_field')
          .value.map(asset => asset.value)
          .filter(e => e)
      ).toEqual([1, 3]);
    });
  });

  describe('removing entries', () => {
    it('should remove from a single entry', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ENTRY_TEMPLATE,
        entries: [mockLink({ id: 1 })],
        assets: undefined,
        internalMapping: JSON.stringify({
          properties: {
            entry_field: mockMapping({ type: c.FIELD_TYPE_ENTRY, value: 1 })
          }
        })
      });

      const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_ENTRY_TEMPLATE];

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      await resolveAll();
      wrapper.update();

      // open dropdown
      wrapper
        .find('PropertySection')
        .find({ roleKey: 'entry_field' })
        .find('EntryCard')
        .at(0)
        .find('CardActions button')
        .simulate('click');

      // click remove button
      wrapper
        .find('PropertySection')
        .find({ roleKey: 'entry_field' })
        .find('EntryCard')
        .at(0)
        .find('CardActions')
        .find('.entry-card__action--remove button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryProperty(sdk.space.updateEntry.args[0][0], 'entry_field')).toBeUndefined();
    });

    xit('should remove from multi-entry field', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_MULTI_REFERENCE_LOGO_TEMPLATE,
        entries: [mockLink({ id: 1 }), mockLink({ id: 2 })],
        assets: [mockLink({ type: c.SYSTEM_TYPE_ASSET, id: 3 })],
        internalMapping: JSON.stringify({
          properties: {
            grid_logo_multi_field: {
              type: c.FIELD_TYPE_MULTI_REFERENCE,
              value: [
                mockMapping({ type: c.FIELD_TYPE_ENTRY, value: 1 }),
                mockMapping({ type: c.FIELD_TYPE_ENTRY, value: 2 }),
                mockAssetMapping({ value: 3 })
              ]
            }
          }
        })
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      await resolveAll();
      await resolveAll();
      wrapper.update();

      // open dropdown

      wrapper
        .find('PropertySection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('EntryCard')
        .at(0)
        .find('CardActions button')
        .simulate('click');

      // click remove button
      wrapper
        .find('PropertySection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('EntryCard')
        .at(0)
        .find('CardActions')
        .find('.entry-card__action--remove button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).not.toContain(1);
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).toContain(2);
      expect(newEntryAssetIds(sdk.space.updateEntry.args[0][0])).toContain(3);
      expect(
        newEntryProperty(sdk.space.updateEntry.args[0][0], 'grid_logo_multi_field')
          .value.map(asset => asset.value)
          .filter(e => e)
      ).toEqual([2, 3]);
    });
  });
});

describe('PageModule', () => {
  describe('removing entries', () => {
    it('should remove from a single entry', async () => {
      const templateConfig = tm.mockPageModuleTemplates[tm.MOCK_PAGE_MODULE_NAME];
      const mappingKey = Object.keys(templateConfig.componentZones)[0];

      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_PAGE_MODULE_NAME,
        entries: [mockLink({ id: '1' })],
        assets: undefined,
        internalMapping: JSON.stringify({
          componentZones: {
            [mappingKey]: mockZoneMapping({
              componentName: 'MockComponent',
              type: c.FIELD_TYPE_ENTRY,
              value: '1'
            })
          }
        })
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_PAGE_MODULE);
      const wrapper = mockComponent({
        Component: App,
        sdk,
        customTemplates: tm.mockPageModuleTemplates,
        mocktemplatePlaceholder: componentTemplatePlaceholder
      });

      await resolveAll();
      wrapper.update();
      // console.log()
      // setupComponentZones(wrapper, templateConfig, 0);

      await resolveAll();
      wrapper.update();
      // console.log(
      //   wrapper
      //     .find('ComponentZone')
      //     .find({ componentZoneKey: mappingKey })
      //     .debug()
      // );
      // open dropdown
      wrapper
        .find('ComponentZone')
        .find({ componentZoneKey: mappingKey })
        .find('EntryCard')
        .at(0)
        .find('CardActions button')
        .simulate('click');

      // click remove button
      wrapper
        .find('ComponentZone')
        .find({ componentZoneKey: mappingKey })
        .find('EntryCard')
        .at(0)
        .find('CardActions')
        .find('.entry-card__action--remove button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(
        newEntryZone(sdk.space.updateEntry.args[0][0], mappingKey).componentName
      ).toBeDefined();
      expect(newEntryZone(sdk.space.updateEntry.args[0][0], mappingKey).value).toBeUndefined();
    });
  });
});
