import React from 'react';
import { App } from '../../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import sinon from 'sinon';
import * as c from '../../../customModules/constants';
import { componentTemplatePlaceholder } from '../../../customModules';

import * as tm from '../../../customModules/mocks/templateMocks';

import {
  mockSdk,
  mockPrimaryEntry,
  mockComponent,
  openCreateDropdown,
  hoverDeepCopyDropdown,
  hoverLinkExistingDropdown,
  openLinkExistingDropdown,
  selectComponentZone,
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
  describe('linking assets', () => {
    it('should link a single asset', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ASSETS_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

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
      expect(newEntryAssetIds(sdk.space.updateEntry.args[0][0])).toContain('newLinkedAsset1b');
      expect(newEntryProperty(sdk.space.updateEntry.args[0][0], 'image_asset').value).toEqual(
        'newLinkedAsset1b'
      );
    });

    it('should link multiple assets', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_MULTI_REFERENCE_LOGO_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

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
      expect(newEntryAssetIds(sdk.space.updateEntry.args[0][0])).toContain('newLinkedAsset1a');
      expect(newEntryAssetIds(sdk.space.updateEntry.args[0][0])).toContain('newLinkedAsset2a');
      expect(
        newEntryProperty(sdk.space.updateEntry.args[0][0], 'grid_logo_multi_field').value.map(
          asset => asset.value
        )
      ).toEqual(['newLinkedAsset1a', 'newLinkedAsset2a']);
    });
  });

  describe('linking entries', () => {
    it('should link a single entry', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ENTRY_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });
      const roleKey = 'entry_field';

      openLinkExistingDropdown(wrapper, roleKey);
      hoverLinkExistingDropdown(wrapper, roleKey);

      // click link entry button
      wrapper
        .find('RoleSection')
        .find({ roleKey })
        .find('LinkExisting')
        .find('DropdownListItem')
        .find({ testId: 'link-entries-row__dropdown--link-entry' })
        .at(0)
        .find('button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      console.log(sdk.space.updateEntry.args[0][0]);
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).toContain('newLinkedEntry1b');
      expect(newEntryProperty(sdk.space.updateEntry.args[0][0], 'entry_field').value).toEqual(
        'newLinkedEntry1b'
      );
    });

    it('should link multiple entries', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_MULTI_REFERENCE_LOGO_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_MULTI_REFERENCE_LOGO_TEMPLATE];

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });
      const roleKey = 'grid_logo_multi_field';

      openLinkExistingDropdown(wrapper, roleKey);
      hoverLinkExistingDropdown(wrapper, roleKey);

      // click link entry button
      wrapper
        .find('RoleSection')
        .find({ roleKey })
        .find('LinkExisting')
        .find('DropdownListItem')
        .find({ testId: 'link-entries-row__dropdown--link-entry' })
        .at(0)
        .find('button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).toContain('newLinkedEntry1a');
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).toContain('newLinkedEntry2a');
      expect(
        newEntryProperty(sdk.space.updateEntry.args[0][0], 'grid_logo_multi_field').value.map(
          asset => asset.value
        )
      ).toEqual(['newLinkedEntry1a', 'newLinkedEntry2a']);
    });
  });

  describe('creating entries', () => {
    it('should create and link an entry', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ENTRY_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });
      const roleKey = 'entry_field';

      openCreateDropdown(wrapper, roleKey);

      // click create entry button
      wrapper
        .find('RoleSection')
        .find({ roleKey })
        .find('CreateNewLink')
        .find({ testId: 'create-new-link__dropdown-content-type' })
        .find('button')
        .at(0)
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).toContain('newCreatedEntry1a');
      expect(newEntryProperty(sdk.space.updateEntry.args[0][0], 'entry_field').value).toEqual(
        'newCreatedEntry1a'
      );
    });
  });

  describe('deep copy entries', () => {
    it('should copy and link a single entry', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ENTRY_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });
      const roleKey = 'entry_field';

      openLinkExistingDropdown(wrapper, roleKey);
      hoverDeepCopyDropdown(wrapper, roleKey);

      // click link entry button
      wrapper
        .find('RoleSection')
        .find({ roleKey })
        .find('LinkExisting')
        .find('DropdownListItem')
        .find({ testId: 'link-entries-row__dropdown--deep-copy' })
        .at(0)
        .find('button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).toContain('newCreatedEntry1a');
      expect(newEntryProperty(sdk.space.updateEntry.args[0][0], 'entry_field').value).toEqual(
        'newCreatedEntry1a'
      );
    });

    it('should copy and link multiple entries', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_MULTI_REFERENCE_LOGO_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });
      const roleKey = 'grid_logo_multi_field';

      openLinkExistingDropdown(wrapper, roleKey);
      hoverDeepCopyDropdown(wrapper, roleKey);

      // click link entry button
      wrapper
        .find('RoleSection')
        .find({ roleKey })
        .find('LinkExisting')
        .find('DropdownListItem')
        .find({ testId: 'link-entries-row__dropdown--deep-copy' })
        .at(0)
        .find('button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).toContain('newCreatedEntry1a');
      expect(
        newEntryProperty(sdk.space.updateEntry.args[0][0], 'grid_logo_multi_field').value.map(
          asset => asset.value
        )
      ).toEqual(['newCreatedEntry1a']);
    });
  });
});

describe('PageModule', () => {
  describe('linking entries', () => {
    it('should link a single entry', async () => {
      const templateConfig = tm.mockPageModuleTemplates[tm.MOCK_PAGE_MODULE_NAME];
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_PAGE_MODULE_NAME,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_PAGE_MODULE);
      const wrapper = mockComponent({
        Component: App,
        sdk,
        customTemplates: tm.mockPageModuleTemplates,
        mocktemplatePlaceholder: componentTemplatePlaceholder
      });

      const mappingKey = Object.keys(templateConfig.componentZones)[0];

      setupComponentZones(wrapper, templateConfig, 0);

      // console.log(wrapper.debug());

      openLinkExistingDropdown(wrapper, mappingKey);
      hoverLinkExistingDropdown(wrapper, mappingKey);

      // click link entry button
      wrapper
        .find('ComponentZone')
        .find({ componentZoneKey: mappingKey })
        .find('LinkExisting')
        .find('DropdownListItem')
        .find({ testId: 'link-entries-row__dropdown--link-entry' })
        .at(0)
        .find('button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).toContain('newLinkedEntry1b');
      expect(newEntryZone(sdk.space.updateEntry.args[0][0], mappingKey).value).toEqual(
        'newLinkedEntry1b'
      );
    });
  });

  describe('creating entries', () => {
    it('should create and link an entry', async () => {
      const templateConfig = tm.mockPageModuleTemplates[tm.MOCK_PAGE_MODULE_NAME];
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_PAGE_MODULE_NAME,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_PAGE_MODULE);
      const wrapper = mockComponent({
        Component: App,
        sdk,
        customTemplates: tm.mockPageModuleTemplates,
        mocktemplatePlaceholder: componentTemplatePlaceholder
      });

      const mappingKey = Object.keys(templateConfig.componentZones)[0];

      setupComponentZones(wrapper, templateConfig, 0);

      openCreateDropdown(wrapper, mappingKey);

      // click create entry button
      wrapper
        .find('ComponentZone')
        .find({ componentZoneKey: mappingKey })
        .find('CreateNewLink')
        .find({ testId: 'create-new-link__dropdown-content-type' })
        .find('button')
        .at(0)
        .simulate('click');

      // updates sdk
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).toContain('newCreatedEntry1a');
      expect(newEntryZone(sdk.space.updateEntry.args[0][0], mappingKey).value).toEqual(
        'newCreatedEntry1a'
      );
    });
  });

  describe('deep copy entries', () => {
    it('should copy and link a single entry', async () => {
      const templateConfig = tm.mockPageModuleTemplates[tm.MOCK_PAGE_MODULE_NAME];
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_PAGE_MODULE_NAME,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_PAGE_MODULE);
      const wrapper = mockComponent({
        Component: App,
        sdk,
        customTemplates: tm.mockPageModuleTemplates,
        mocktemplatePlaceholder: componentTemplatePlaceholder
      });

      const mappingKey = Object.keys(templateConfig.componentZones)[0];

      setupComponentZones(wrapper, templateConfig, 0);

      openLinkExistingDropdown(wrapper, mappingKey);
      hoverDeepCopyDropdown(wrapper, mappingKey);

      // click link entry button
      wrapper
        .find('ComponentZone')
        .find({ componentZoneKey: mappingKey })
        .find('LinkExisting')
        .find('DropdownListItem')
        .find({ testId: 'link-entries-row__dropdown--deep-copy' })
        .at(0)
        .find('button')
        .simulate('click');

      // updates sdk
      await resolveAll();
      await resolveAll();
      expect(newEntryEntryIds(sdk.space.updateEntry.args[0][0])).toContain('newCreatedEntry1a');
      expect(newEntryZone(sdk.space.updateEntry.args[0][0], mappingKey).value).toEqual(
        'newCreatedEntry1a'
      );
    });
  });
});
