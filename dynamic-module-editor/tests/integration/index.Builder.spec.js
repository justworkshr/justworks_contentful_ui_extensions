import React from 'react';
import { App } from '../../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

import * as c from '../../../customModules/constants';

import * as tm from '../../../customModules/mocks/templateMocks';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

import {
  mockSdk,
  mockComponent,
  mockPrimaryEntry,
  mockLink,
  mockMapping,
  mockAssetMapping
} from '../utils/mockUtils';

describe('ComponentModule', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('with an empty entry', () => {
    it('should render without crashing', () => {
      const sdk = mockSdk(undefined, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });
      expect(wrapper.find('.component-builder')).toHaveLength(1);
    });
  });

  describe('with a mock entry', () => {
    it('should render without crashing', () => {
      const sdk = mockSdk(undefined, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      expect(wrapper.find('.component-builder')).toHaveLength(1);
    });
  });

  describe('a template w/ all fields', () => {
    const mockEntry = mockPrimaryEntry({
      name: 'Mock Custom Template Entry',
      type: tm.MOCK_FIELDS_TEMPLATE,
      entries: undefined,
      assets: undefined,
      internalMapping: ''
    });

    const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_FIELDS_TEMPLATE];
    const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

    it('should render the default editor state', () => {
      const wrapper = mockComponent({ Component: App, sdk });

      expect(wrapper.find('.component-builder')).toHaveLength(1);

      // 1 Role Section per property
      expect(wrapper.find('PropertySection')).toHaveLength(
        Object.keys(templateConfig.properties).length
      );

      // Tests Role Section render
      wrapper.find('PropertySection').forEach(node => {
        // Tests required label render
        if (templateConfig.properties[node.props().mappingKey].required) {
          expect(node.find('FormLabel.role-section__heading').props().required).toEqual(true);
        } else {
          expect(node.find('FormLabel.role-section__heading').props().required).toEqual(false);
        }

        // Should not render the fields and style editors by default
        expect(node.find('TextLink.entry-action-button__add-field')).toHaveLength(1);
        expect(node.find('EntryField')).toHaveLength(0);
      });
    });

    it('should add a field and clear it', () => {
      const wrapper = mockComponent({ Component: App, sdk });

      // adds them back
      wrapper.find('PropertySection').forEach(node => {
        node.find('TextLink.entry-action-button__add-field').simulate('click');
      });

      wrapper.find('PropertySection').forEach(node => {
        expect(node.find('TextLink.entry-action-button__add-field')).toHaveLength(0);
        expect(node.find('EntryField')).toHaveLength(1);
      });

      // Clears roles from App state
      expect(Object.keys(wrapper.state().entryInternalMapping.properties)).toHaveLength(2);

      wrapper.find('PropertySection').forEach(node => {
        // Assumes default field creation
        expect(node.find('EntryField')).toHaveLength(1);
        node.find('IconButton.role-section__remove-field').simulate('click');
      });

      wrapper.find('PropertySection').forEach(node => {
        expect(node.find('TextLink.entry-action-button__add-field')).toHaveLength(1);
        expect(node.find('EntryField')).toHaveLength(0);
      });
    });
  });

  describe('a template w/ asset fields', () => {
    const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_ASSETS_TEMPLATE];

    it('should render the default editor state', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ASSETS_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      expect(wrapper.find('.component-builder')).toHaveLength(1);
      expect(wrapper.find('PropertySection')).toHaveLength(
        Object.keys(templateConfig.properties).length
      );

      wrapper.find('PropertySection').forEach(node => {
        expect(node.find('CreateNewLink')).toHaveLength(1);
        expect(node.find('LinkExisting')).toHaveLength(1);
        expect(node.find('AssetCard')).toHaveLength(0);
      });
    });

    it('renders asset cards', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ASSETS_TEMPLATE,
        entries: undefined,
        assets: [mockLink({ id: '1' }), mockLink({ id: '2' }), mockLink({ id: '3' })],
        internalMapping: JSON.stringify({
          properties: {
            image_asset: mockAssetMapping({ value: 1 }),
            formattable_image_asset: mockAssetMapping({ value: 2 }),
            logo_asset: mockAssetMapping({ value: 3 })
          }
        })
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      wrapper.find('PropertySection').forEach(node => {
        expect(node.find('AssetCard')).toHaveLength(1);
      });
    });
  });

  describe('a template w/ entry fields', () => {
    const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_ENTRY_TEMPLATE];

    it('should render the default editor state', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ENTRY_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      expect(wrapper.find('.component-builder')).toHaveLength(1);
      expect(wrapper.find('PropertySection')).toHaveLength(
        Object.keys(templateConfig.properties).length
      );

      wrapper.find('PropertySection').forEach(node => {
        expect(node.find('CreateNewLink')).toHaveLength(1);
        expect(node.find('LinkExisting')).toHaveLength(1);
        expect(node.find('EntryCard')).toHaveLength(0);
      });
    });

    it('renders entry cards', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_ENTRY_TEMPLATE,
        entries: [mockLink({ id: '1' })],
        assets: undefined,
        internalMapping: JSON.stringify({
          properties: {
            entry_field: mockMapping({
              type: c.FIELD_TYPE_ENTRY,
              value: 1,
              contentType: c.CONTENT_TYPE_TEXT
            })
          }
        })
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      wrapper.find('PropertySection').forEach(node => {
        // only render EntryCard if internalMapping object has a value for role
        if (node.props().propertyMappingObject.value) {
          expect(node.find('EntryCard')).toHaveLength(1);
        } else {
          expect(node.find('EntryCard')).toHaveLength(0);
        }

        // Only render StyleSection if the fieldConfig has a styleView
        if (node.props().fieldConfigObject && node.props().fieldConfigObject.styleView) {
        } else {
        }
      });
    });
  });

  describe('a template w/ multi-reference fields', () => {
    const templateConfig = tm.mockComponentModuleTemplates[tm.MOCK_MULTI_REFERENCE_LOGO_TEMPLATE];

    xit('should render the default editor state', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_MULTI_REFERENCE_LOGO_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      expect(wrapper.find('.component-builder')).toHaveLength(1);
      expect(wrapper.find('PropertySection')).toHaveLength(
        Object.keys(templateConfig.properties).length
      );

      wrapper.find('PropertySection').forEach(node => {
        expect(node.find('CreateNewLink')).toHaveLength(1);
        expect(node.find('LinkExisting')).toHaveLength(1);
        expect(node.find('EntryCard')).toHaveLength(0);
      });
    });

    xit('renders multiple entry/asset cards', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_MULTI_REFERENCE_LOGO_TEMPLATE,
        entries: [
          mockLink({ id: 1 }),
          mockLink({ id: 2 }),
          mockLink({ id: 4 }),
          mockLink({ id: 5 })
        ],
        assets: [mockLink({ id: 3 }), mockLink({ id: 6 })],
        internalMapping: JSON.stringify({
          properties: {
            grid_logo_multi_field: {
              type: c.FIELD_TYPE_MULTI_REFERENCE,
              value: [
                mockMapping({ type: c.FIELD_TYPE_ENTRY, value: 1 }),
                mockMapping({ type: c.FIELD_TYPE_ENTRY, value: 2 }),
                mockAssetMapping({ value: 3 })
              ]
            },
            no_style_multi_field: {
              type: c.FIELD_TYPE_MULTI_REFERENCE,
              value: [
                mockMapping({ type: c.FIELD_TYPE_ENTRY, value: 4 }),
                mockMapping({ type: c.FIELD_TYPE_ENTRY, value: 5 }),
                mockAssetMapping({ value: 6 })
              ]
            }
          }
        })
      });

      const sdk = mockSdk(mockEntry, c.CONTENT_TYPE_COMPONENT_MODULE);

      const wrapper = mockComponent({ Component: App, sdk });

      wrapper.find('PropertySection').forEach(node => {
        expect(node.find('EntryCard')).toHaveLength(2);
        expect(node.find('AssetCard')).toHaveLength(1);
        // Action bar remains
        expect(node.find('CreateNewLink')).toHaveLength(1);
        expect(node.find('LinkExisting')).toHaveLength(1);

        const multiReferenceStyle =
          templateConfig.properties[node.props().mappingKey].multiReferenceStyleView;
        // Only renders this asset reference style if templatre config includes assets
        if (
          multiReferenceStyle &&
          templateConfig.properties[node.props().mappingKey].fieldConfigs.some(
            entry => entry.type === c.FIELD_TYPE_ASSET
          )
        ) {
          expect(node.find('RoleStyleSection').find({ type: c.FIELD_TYPE_ASSET })).toHaveLength(1);
        }
      });
    });
  });
});