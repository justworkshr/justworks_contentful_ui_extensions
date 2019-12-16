import React from 'react';
import { App } from '../../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import * as c from '../../../custom_templates/constants';

import * as tm from '../../../custom_templates/mocks/templateMocks';

import {
  mockSdk,
  mockComponent,
  mockPrimaryEntry,
  mockLink,
  mockAssetMapping
} from '../utils/mockUtils';

import { resolveAll, internalMappingRoleStyle } from '../utils/assertUtils';
import InternalMapping from '../../src/utils/InternalMapping';

const getRoleStyle = (internalMapping, roleKey) => {
  return internalMapping.fieldRoles[roleKey].style.value;
};

const openStyleEditor = (wrapper, roleKey, type) => {
  return wrapper
    .find({ roleKey })
    .find('FieldStyleEditor')
    .find({ type })
    .find('.style-editor__heading')
    .simulate('click');
};

const setStyleValue = (wrapper, roleKey, type, label, value) => {
  return wrapper
    .find({ roleKey })
    .find('FieldStyleEditor')
    .find({ type })
    .find({ label })
    .find(`input[value="${value}"]`)
    .simulate('change', { target: { value } });
};

configure({ adapter: new Adapter() });
jest.useFakeTimers();

describe('App', () => {
  describe('single entry style editing', () => {
    it('should update style value', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_FIELDS_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      const wrapper = mockComponent({ Component: App, sdk });

      // Adds default styles when field added
      wrapper
        .find({ roleKey: 'text_field' })
        .find('TextLink.entry-action-button__add-field')
        .simulate('click');

      expect(wrapper.state().entryInternalMapping.fieldRoles['text_field'].style.value).toEqual(
        'text-left text-black'
      );

      // Editor starts closed
      expect(wrapper.find({ roleKey: 'text_field' }).find('ColorStyle')).toHaveLength(0);
      expect(wrapper.find({ roleKey: 'text_field' }).find('StyleEditorFieldGroup')).toHaveLength(0);

      openStyleEditor(wrapper, 'text_field', 'text');

      // Editor open
      expect(wrapper.find({ roleKey: 'text_field' }).find('ColorStyle')).toHaveLength(1);
      expect(wrapper.find({ roleKey: 'text_field' }).find('StyleEditorFieldGroup')).toHaveLength(3);

      const value = 'text-navy';

      setStyleValue(wrapper, 'text_field', 'text', 'Text Color', value);

      // Adds value
      expect(getRoleStyle(wrapper.state().entryInternalMapping, 'text_field')).toEqual(
        `text-left ${value}`
      );

      // updates sdk
      await resolveAll();
      expect(
        internalMappingRoleStyle(sdk.entry.fields.internalMapping.setValue.args[0][0], 'text_field')
      ).toBe('text-left text-navy');
    });

    it('should load style object', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_FIELDS_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: JSON.stringify({
          fieldRoles: {
            text_field: {
              type: 'text',
              style: InternalMapping.styleMapping({ value: 'text-black' }),
              value: 'hello'
            }
          }
        })
      });

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      const wrapper = mockComponent({ Component: App, sdk });

      const value = 'text-black';

      // Starts with existing value
      expect(wrapper.state().entryInternalMapping.fieldRoles['text_field'].style).toEqual(
        undefined
      );

      openStyleEditor(wrapper, 'text_field', 'text');

      // radio field is checked
      expect(
        wrapper
          .find({ roleKey: 'text_field' })
          .find(`FieldStyleEditor input[value="${value}"]`)
          .at(0)
          .props().checked
      ).toBe(true);
    });

    it('should clear style value', async () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_FIELDS_TEMPLATE,
        entries: undefined,
        assets: undefined,
        internalMapping: ''
      });

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      const wrapper = mockComponent({ Component: App, sdk });

      // Adds default styles when field added
      wrapper
        .find({ roleKey: 'text_field' })
        .find('TextLink.entry-action-button__add-field')
        .simulate('click');

      expect(wrapper.state().entryInternalMapping.fieldRoles['text_field'].style.value).toEqual(
        'text-left text-black'
      );

      openStyleEditor(wrapper, 'text_field', 'text');

      wrapper
        .find({ roleKey: 'text_field' })
        .find('FieldStyleEditor')
        .at(0)
        .find('StyleEditorFieldGroup')
        .at(0)
        .find('TextLink.style-editor__clear-link')
        .simulate('click');

      // removes corresponding class
      expect(wrapper.state().entryInternalMapping.fieldRoles['text_field'].style.value).toEqual(
        'text-black'
      );

      // updates sdk
      await resolveAll();
      expect(
        internalMappingRoleStyle(sdk.entry.fields.internalMapping.setValue.args[0][0], 'text_field')
      ).toBe('text-black');
    });
  });

  describe('multi-reference asset reference style editing', () => {
    it('should add classes to all references', () => {
      const mockEntry = mockPrimaryEntry({
        name: 'Mock Custom Template Entry',
        type: tm.MOCK_MULTI_REFERENCE_TEMPLATE,
        entries: [],
        assets: [mockLink({ id: 1 }), mockLink({ id: 2 }), mockLink({ id: 3 })],
        internalMapping: JSON.stringify({
          fieldRoles: {
            grid_logo_multi_field: {
              type: c.FIELD_TYPE_MULTI_REFERENCE,
              value: [
                mockAssetMapping({ value: 1 }),
                mockAssetMapping({ value: 2 }),
                mockAssetMapping({ value: 3 })
              ]
            }
          }
        })
      });

      const templateConfig = tm.mockCustomTemplates[tm.MOCK_MULTI_REFERENCE_TEMPLATE];

      const sdk = mockSdk(mockEntry);
      const wrapper = mockComponent({ Component: App, sdk });

      // all assets start with original classes (blank)
      expect(
        wrapper
          .state()
          .entryInternalMapping.fieldRoles['grid_logo_multi_field'].value.filter(
            e => e.type === c.FIELD_TYPE_ASSET
          )
          .every(e => e.style.value === '')
      ).toEqual(true);

      openStyleEditor(wrapper, 'grid_logo_multi_field', 'asset');

      const value = 'icon-large';
      // select value

      setStyleValue(wrapper, 'grid_logo_multi_field', 'asset', 'Icon Size', value);

      // all assets now have selected class
      expect(
        wrapper
          .state()
          .entryInternalMapping.fieldRoles['grid_logo_multi_field'].value.filter(
            e => e.type === c.FIELD_TYPE_ASSET
          )
          .every(e => e.style.value === value)
      ).toEqual(true);
    });
  });
});
