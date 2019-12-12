import React from 'react';
import { App } from '../../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import sinon from 'sinon';
import * as c from '../../../custom_templates/constants';

import * as tm from '../mocks/templateMocks';

import { mockSdk } from '../utils/mockUtils';

import { resolveAll, newEntryAssetIds, newEntryEntryIds, newEntryRole } from '../utils/assertUtils';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

const sdkUpdateSpy = sinon.spy(App.prototype, 'timeoutUpdateEntry');

describe('App', () => {
  describe('linking assets', () => {
    it('should link a single asset', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_ASSETS_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      };

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      sdkUpdateSpy.resetHistory();

      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      // open dropdown
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'image_asset' })
        .find('LinkExisting')
        .simulate('click');

      // click link asset button
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'image_asset' })
        .find('LinkExisting')
        .find('DropdownListItem.link-entries-row__dropdown--link-asset button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryAssetIds(sdk.space.updateEntry.args[1][0])).toContain('newLinkedAsset1b');
      expect(newEntryRole(sdk.space.updateEntry.args[1][0], 'image_asset').value).toEqual(
        'newLinkedAsset1b'
      );
    });

    it('should link multiple assets', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_MULTI_REFERENCE_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      };

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      sdkUpdateSpy.resetHistory();

      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      // open dropdown
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('LinkExisting')
        .simulate('click');

      // click link asset button
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('LinkExisting')
        .find('DropdownListItem.link-entries-row__dropdown--link-asset button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryAssetIds(sdk.space.updateEntry.args[1][0])).toContain('newLinkedAsset1a');
      expect(newEntryAssetIds(sdk.space.updateEntry.args[1][0])).toContain('newLinkedAsset2a');
      expect(
        newEntryRole(sdk.space.updateEntry.args[1][0], 'grid_logo_multi_field').value.map(
          asset => asset.value
        )
      ).toEqual(['newLinkedAsset1a', 'newLinkedAsset2a']);
    });
  });

  describe('linking entries', () => {
    it('should link a single entry', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_ENTRY_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      };

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      sdkUpdateSpy.resetHistory();

      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      // open dropdown
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'entry_field' })
        .find('LinkExisting')
        .simulate('click');

      // click link asset button
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'entry_field' })
        .find('LinkExisting')
        .find('DropdownListItem.link-entries-row__dropdown--link-entry button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[1][0])).toContain('newLinkedEntry1b');
      expect(newEntryRole(sdk.space.updateEntry.args[1][0], 'entry_field').value).toEqual(
        'newLinkedEntry1b'
      );
    });

    it('should link multiple entries', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_MULTI_REFERENCE_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      };

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      sdkUpdateSpy.resetHistory();

      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      // open dropdown
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('LinkExisting')
        .simulate('click');

      // click link asset button
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('LinkExisting')
        .find('DropdownListItem.link-entries-row__dropdown--link-entry button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[1][0])).toContain('newLinkedEntry1a');
      expect(newEntryEntryIds(sdk.space.updateEntry.args[1][0])).toContain('newLinkedEntry2a');
      expect(
        newEntryRole(sdk.space.updateEntry.args[1][0], 'grid_logo_multi_field').value.map(
          asset => asset.value
        )
      ).toEqual(['newLinkedEntry1a', 'newLinkedEntry2a']);
    });
  });

  describe('creating entries', () => {
    it('should create and link an entry', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_ENTRY_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      };

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      sdkUpdateSpy.resetHistory();

      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      // open dropdown
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'entry_field' })
        .find('CreateNewLink')
        .simulate('click');

      // click link asset button
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'entry_field' })
        .find('CreateNewLink')
        .findWhere(node => node.key() === 'dropdown-media')
        .find('button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[1][0])).toContain('newCreatedEntry1a');
      expect(newEntryRole(sdk.space.updateEntry.args[1][0], 'entry_field').value).toEqual(
        'newCreatedEntry1a'
      );
    });
  });

  describe('deep copy entries', () => {
    it('should copy and link a single entry', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_ENTRY_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      };

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      sdkUpdateSpy.resetHistory();

      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      // open dropdown
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'entry_field' })
        .find('LinkExisting')
        .simulate('click');

      // click link asset button
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'entry_field' })
        .find('LinkExisting')
        .find('DropdownListItem.link-entries-row__dropdown--deep-copy button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[1][0])).toContain('newCreatedEntry1a');
      expect(newEntryRole(sdk.space.updateEntry.args[1][0], 'entry_field').value).toEqual(
        'newCreatedEntry1a'
      );
    });

    it('should copy and link multiple entries', async () => {
      const mockEntry = {
        name: 'Mock Custom Template Entry',
        template: tm.MOCK_MULTI_REFERENCE_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      };

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      sdkUpdateSpy.resetHistory();

      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      // open dropdown
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('LinkExisting')
        .simulate('click');

      // click link asset button
      wrapper
        .find('RoleSection')
        .find({ roleKey: 'grid_logo_multi_field' })
        .find('LinkExisting')
        .find('DropdownListItem.link-entries-row__dropdown--deep-copy button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[1][0])).toContain('newCreatedEntry1a');
      expect(
        newEntryRole(sdk.space.updateEntry.args[1][0], 'grid_logo_multi_field').value.map(
          asset => asset.value
        )
      ).toEqual(['newCreatedEntry1a']);
    });
  });
});
