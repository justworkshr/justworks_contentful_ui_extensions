import React from 'react';
import { App } from '../../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import sinon from 'sinon';
import * as c from '../../../custom_templates/constants';

import * as tm from '../../../custom_templates/mocks/templateMocks';

import {
  mockSdk,
  mockAssetResponse,
  mockEntryResponse,
  mockLink,
  mockAssetMapping,
  mockMapping
} from '../utils/mockUtils';

import { resolveAll, newEntryAssetIds, newEntryEntryIds, newEntryRole } from '../utils/assertUtils';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

describe('App', () => {
  describe('removing assets', () => {
    it('should remove from a single asset', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_ASSETS_TEMPLATE,
        entries: undefined,
        assets: [mockLink({ id: 1 }), mockLink({ id: 2 }), mockLink({ id: 3 })],
        internalMapping: JSON.stringify({
          fieldRoles: {
            image_asset: mockAssetMapping({ value: 1 }),
            formattable_image_asset: mockAssetMapping({ value: 2 }),
            logo_asset: mockAssetMapping({ value: 3 })
          }
        })
      };

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);

      const wrapper = mount(
        <App
          entries={{
            image_asset: mockAssetResponse({ id: 1 }),
            formattable_image_asset: mockAssetResponse({ id: 2 }),
            logo_asset: mockAssetResponse({ id: 3 })
          }}
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      // open dropdown
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'image_asset' })
        .find('AssetCard')
        .at(0)
        .find('CardActions button')
        .simulate('click');

      // click remove button
      wrapper
        .find('RoleSection')
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
      expect(newEntryRole(sdk.space.updateEntry.args[0][0], 'image_asset')).toBeUndefined();
    });

    it('should remove from multi-asset field', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_MULTI_REFERENCE_TEMPLATE,
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
          fieldRoles: {
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
      };

      const sdk = mockSdk(mockEntry);

      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          entries={{
            grid_logo_multi_field: [
              mockEntryResponse({ id: 1 }),
              mockAssetResponse({ id: 2 }),
              mockAssetResponse({ id: 3 })
            ]
          }}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      // open dropdown
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('AssetCard')
        .at(0)
        .find('CardActions button')
        .simulate('click');

      // click remove button
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('AssetCard')
        .at(0)
        .find('CardActions')
        .find('.asset-card__action--remove button')
        .simulate('click');

      // updates sdk
      await resolveAll();

      expect(
        newEntryRole(sdk.space.updateEntry.args[0][0], 'grid_logo_multi_field')
          .value.map(asset => asset.value)
          .filter(e => e)
      ).toEqual([1, 3]);
    });
  });

  describe('removing entries', () => {
    it('should remove from a single entry', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_ENTRY_TEMPLATE,
        entries: [mockLink({ id: 1 })],
        assets: undefined,
        internalMapping: JSON.stringify({
          fieldRoles: {
            entry_field: mockMapping({ type: c.FIELD_TYPE_ENTRY, value: 1 })
          }
        })
      };

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_ENTRY_TEMPLATE];

      const sdk = mockSdk(mockEntry);

      const wrapper = mount(
        <App
          entries={{
            entry_field: mockMapping({ value: 1 })
          }}
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      await resolveAll();
      wrapper.update();

      // open dropdown
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'entry_field' })
        .find('EntryCard')
        .at(0)
        .find('CardActions button')
        .simulate('click');

      // click remove button
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'entry_field' })
        .find('EntryCard')
        .at(0)
        .find('CardActions')
        .find('.entry-card__action--remove button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryRole(sdk.space.updateEntry.args[0][0], 'entry_field')).toBeUndefined();
    });

    it('should remove from multi-entry field', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_MULTI_REFERENCE_TEMPLATE,
        entries: [mockLink({ id: 1 }), mockLink({ id: 2 })],
        assets: [mockLink({ type: c.SYSTEM_TYPE_ASSET, id: 3 })],
        internalMapping: JSON.stringify({
          fieldRoles: {
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
      };

      const sdk = mockSdk(mockEntry);

      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          entries={{
            grid_logo_multi_field: [
              mockEntryResponse({ id: 1 }),
              mockEntryResponse({ id: 2 }),
              mockAssetResponse({ id: 3 })
            ]
          }}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      await resolveAll();
      await resolveAll();
      wrapper.update();

      // open dropdown

      wrapper
        .find('RoleSection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('EntryCard')
        .at(0)
        .find('CardActions button')
        .simulate('click');

      // click remove button
      wrapper
        .find('RoleSection')
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
        newEntryRole(sdk.space.updateEntry.args[0][0], 'grid_logo_multi_field')
          .value.map(asset => asset.value)
          .filter(e => e)
      ).toEqual([2, 3]);
    });
  });
});
