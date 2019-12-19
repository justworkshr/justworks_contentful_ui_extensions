import React from 'react';
import { App } from '../../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import * as c from '../../../custom_templates/constants';

import * as tm from '../../../custom_templates/mocks/templateMocks';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

import {
  mockSdk,
  mockComponent,
  mockPrimaryEntry,
  openCreateDropdown,
  hoverLinkExistingDropdown,
  openLinkExistingDropdown,
  hoverCreateCustomTemplateDropdown
} from '../utils/mockUtils';

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('a template w/ entry fields', () => {
    const templateConfig = tm.mockCustomTemplates[tm.MOCK_ENTRY_TEMPLATE];

    it('should render the create button', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ENTRY_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const sdk = mockSdk(mockEntry);
      const wrapper = mockComponent({ Component: App, sdk });
      expect(wrapper.find('CreateNewLink.entry-action-button__create-new')).toHaveLength(
        Object.keys(templateConfig.fieldRoles).length
      );

      wrapper.find('CreateNewLink.entry-action-button__create-new').forEach(node => {
        const roleKey = node.props().roleKey;
        const entryFieldConfigs = templateConfig.fieldRoles[roleKey].fieldTypes.filter(
          e => e.type === c.FIELD_TYPE_ENTRY && e.contentType !== c.CONTENT_TYPE_CUSTOM_TEMPLATE
        );
        const customTemplateFieldConfigs = templateConfig.fieldRoles[roleKey].fieldTypes.filter(
          e => e.type === c.FIELD_TYPE_ENTRY && e.contentType === c.CONTENT_TYPE_CUSTOM_TEMPLATE
        );

        openCreateDropdown(wrapper, roleKey);
        // console.log(
        //   wrapper
        //     .find('RoleSection')
        //     .find({ roleKey })
        //     .find('CreateNewLink')
        //     .find('DropdownListItem')
        //     .debug()
        // );
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

      const sdk = mockSdk(mockEntry);
      const wrapper = mockComponent({ Component: App, sdk });
      expect(wrapper.find('LinkExisting.entry-action-button__link-existing')).toHaveLength(
        Object.keys(templateConfig.fieldRoles).length
      );

      wrapper.find('LinkExisting.entry-action-button__link-existing').forEach(node => {
        const roleKey = node.props().roleKey;
        const entryFieldConfigs = templateConfig.fieldRoles[roleKey].fieldTypes.filter(
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
