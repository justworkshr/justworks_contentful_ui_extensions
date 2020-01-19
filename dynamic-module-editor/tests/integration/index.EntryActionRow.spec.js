import React from 'react';
import { App } from '../../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import * as c from '../../../customModules/constants';

import * as tm from '../../../customModules/mocks/templateMocks';

import { componentTemplatePlaceholder } from '../../../customModules';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

import {
  mockSdk,
  mockComponent,
  mockPrimaryEntry,
  openCreateDropdown,
  selectComponentZone,
  hoverLinkExistingDropdown,
  openLinkExistingDropdown,
  hoverCreateCustomTemplateDropdown,
  setupComponentZones
} from '../utils/mockUtils';

describe('ComponentModule', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('a template w/ entry fields', () => {
    const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_ENTRY_TEMPLATE];

    it('should render the create button', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ENTRY_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);
      const wrapper = mockComponent({ Component: App, sdk });
      expect(wrapper.find('CreateNewLink.entry-action-button__create-new')).toHaveLength(
        Object.keys(templateConfig.properties).length
      );

      wrapper.find('CreateNewLink.entry-action-button__create-new').forEach(node => {
        const roleKey = node.props().roleKey;
        const entryFieldConfigs = templateConfig.properties[roleKey].fieldConfigs.filter(
          e => e.type === c.FIELD_TYPE_ENTRY && e.contentType !== c.CONTENT_TYPE_COLLECTION_MODULE
        );
        const customTemplateFieldConfigs = templateConfig.properties[roleKey].fieldConfigs.filter(
          e => e.type === c.FIELD_TYPE_ENTRY && e.contentType === c.CONTENT_TYPE_COLLECTION_MODULE
        );

        openCreateDropdown(wrapper, roleKey);

        // renders content types list when clicked
        expect(
          wrapper
            .find('RoleSection')
            .find({ roleKey })
            .find('CreateNewLink')
            .find('DropdownListItem')
            .find({ testId: 'create-new-link__dropdown-content-type' })
            .find('button')
        ).toHaveLength(entryFieldConfigs.length);

        // customTemplate dropdowns
        expect(
          wrapper
            .find('RoleSection')
            .find({ roleKey })
            .find('CreateNewLink')
            .find('DropdownListItem')
            .find({ testId: 'create-new-link__dropdown-custom-type' })
            .find('button')
        ).toHaveLength(customTemplateFieldConfigs.length);
      });

      // Hover customTemplate button

      hoverCreateCustomTemplateDropdown(wrapper, 'entry_field');
      expect(
        wrapper
          .find({ roleKey: 'entry_field' })
          .find('CreateNewLink')
          .find({ testId: 'create-new-link__custom-type' })
          .find('button')
      ).toHaveLength(1);
    });

    it('should render the link existing button', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ENTRY_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);
      const wrapper = mockComponent({ Component: App, sdk });
      expect(wrapper.find('LinkExisting.entry-action-button__link-existing')).toHaveLength(
        Object.keys(templateConfig.properties).length
      );

      wrapper.find('LinkExisting.entry-action-button__link-existing').forEach(node => {
        const roleKey = node.props().roleKey;
        const entryFieldConfigs = templateConfig.properties[roleKey].fieldConfigs.filter(
          e => e.type === c.FIELD_TYPE_ENTRY
        );

        // click open link
        openLinkExistingDropdown(wrapper, roleKey);

        // hover link-entry dropdown

        hoverLinkExistingDropdown(wrapper, roleKey);
        // renders content types list when clicked

        expect(
          wrapper
            .find('RoleSection')
            .find({ roleKey: roleKey })
            .find('LinkExisting')
            .find('DropdownListItem')
            .find({ testId: 'link-entries-row__dropdown--link-entry' })
            .find('button')
        ).toHaveLength(entryFieldConfigs.length);
      });
    });
  });
});

describe('PageModule', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('a template w/ entry fields', () => {
    const templateConfig = tm.mockPageModuleTemplates[tm.MOCK_PAGE_MODULE_NAME];

    it('should render the create button', () => {
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

      // select an entry component
      setupComponentZones(wrapper, templateConfig, 0);

      expect(wrapper.find('CreateNewLink.entry-action-button__create-new')).toHaveLength(
        Object.keys(templateConfig.componentZones).length
      );

      wrapper.find('CreateNewLink.entry-action-button__create-new').forEach(node => {
        const roleKey = node.props().roleKey;

        openCreateDropdown(wrapper, roleKey);

        // renders content types list when clicked
        expect(
          wrapper
            .find('ComponentZone')
            .find({ roleKey })
            .find('CreateNewLink')
            .find('DropdownListItem')
            .find({ testId: 'create-new-link__dropdown-content-type' })
            .find('button')
        ).toHaveLength(1); // only componentModule
      });
    });

    it('should render the link existing button', () => {
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

      setupComponentZones(wrapper, templateConfig, 0);

      expect(wrapper.find('LinkExisting.entry-action-button__link-existing')).toHaveLength(
        Object.keys(templateConfig.componentZones).length
      );

      wrapper.find('LinkExisting.entry-action-button__link-existing').forEach(node => {
        const roleKey = node.props().roleKey;
        // click open link
        openLinkExistingDropdown(wrapper, roleKey);

        // hover link-entry dropdown

        hoverLinkExistingDropdown(wrapper, roleKey);
        // renders content types list when clicked

        expect(
          wrapper
            .find('ComponentZone')
            .find({ roleKey: roleKey })
            .find('LinkExisting')
            .find('DropdownListItem')
            .find({ testId: 'link-entries-row__dropdown--link-entry' })
            .find('button')
        ).toHaveLength(1); // Only componentModule
      });
    });
  });
});
