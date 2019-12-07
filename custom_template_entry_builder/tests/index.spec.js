import React from 'react';
import { App } from '../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

import * as c from '../../custom_templates/constants';

import * as tm from './mocks/templateMocks';

configure({ adapter: new Adapter() });
jest.useFakeTimers();
const mockLink = ({ id = 0, type = 'Entry' } = {}) => {
  return {
    sys: {
      id: id,
      linkType: type,
      type: 'Link'
    }
  };
};

const mockSdk = mockCustomTemplateEntry => {
  const getValue = (entry, field) => {
    return entry[field];
  };

  return {
    entry: {
      onSysChanged: jest.fn(),
      fields: {
        name: '',
        template: {
          getValue: () => getValue(mockCustomTemplateEntry, 'template'),
          onValueChanged: jest.fn()
        },
        internalMapping: {
          getValue: () => getValue(mockCustomTemplateEntry, 'internalMapping')
        },
        entries: {
          getValue: () => getValue(mockCustomTemplateEntry, 'entries')
        },
        assets: {
          getValue: () => getValue(mockCustomTemplateEntry, 'entries')
        }
      }
    },
    field: {
      getValue: jest.fn(),
      onValueChanged: jest.fn(),
      setValue: jest.fn(),
      removeValue: jest.fn(),
      setInvalid: jest.fn()
    },
    window: {
      startAutoResizer: jest.fn()
    }
  };
};

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('with an empty entry', () => {
    const mockEntry = {
      name: '',
      template: '',
      entries: undefined,
      internalMapping: ''
    };

    it('should render without crashing', () => {
      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={mockSdk(mockEntry)}
        />
      );
      expect(wrapper.find('.custom-template-entry-builder')).toHaveLength(1);
    });
  });

  describe('with a mock entry', () => {
    const mockEntry = {
      name: 'Mock Custom Template Entry',
      template: tm.MOCK_TEMPLATE_NAME,
      entries: {
        ...mockLink({ id: '1' })
      },
      assets: {
        ...mockLink({ id: '2', type: 'Asset' })
      },
      internalMapping: JSON.stringify({
        fieldRoles: {
          left_section: '1',
          right_section: '2'
        },
        style: {}
      })
    };

    it('should render without crashing', () => {
      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates['mock 1']}
          sdk={mockSdk(mockEntry)}
        />
      );

      expect(wrapper.find('.custom-template-entry-builder')).toHaveLength(1);
    });
  });

  describe('a template w/ all fields', () => {
    const mockEntry = {
      name: 'Mock Custom Template Entry',
      template: tm.MOCK_FIELDS_TEMPLATE,
      entries: {},
      assets: {},
      internalMapping: ''
    };

    const templateConfig = tm.mockCustomTemplates[tm.MOCK_FIELDS_TEMPLATE];

    const sdk = mockSdk(mockEntry);

    it('should render the default editor state', () => {
      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      expect(wrapper.find('.custom-template-entry-builder')).toHaveLength(1);

      // 1 Role Section per FieldRole
      expect(wrapper.find('RoleSection')).toHaveLength(2);

      // Tests Role Section render
      wrapper.find('RoleSection').forEach(node => {
        // Tests required label render
        if (templateConfig.fieldRoles[node.props().roleKey].required) {
          expect(node.find('FormLabel.role-section__heading').props().required).toEqual(true);
        } else {
          expect(node.find('FormLabel.role-section__heading').props().required).toEqual(false);
        }

        // Should render the fields and style editors by default
        expect(node.find('TextLink.entry-action-button__add-field')).toHaveLength(0);
        expect(node.find('EntryField')).toHaveLength(1);
        expect(node.find('FieldStyleEditor')).toHaveLength(1);
      });
    });

    it('should clear a field', () => {
      const wrapper = mount(
        <App
          customTemplates={tm.mockCustomTemplates}
          templatePlaceholder={tm.mockCustomTemplates}
          sdk={sdk}
        />
      );

      // Expects internal mapping in App state to have same keys as the template config
      expect(Object.keys(wrapper.state().entryInternalMapping.fieldRoles)).toHaveLength(
        Object.keys(templateConfig.fieldRoles).length
      );

      wrapper.find('RoleSection').forEach(node => {
        // Assumes default field creation
        expect(node.find('EntryField')).toHaveLength(1);
        node.find('IconButton.role-section__remove-field').simulate('click');
      });

      wrapper.find('RoleSection').forEach(node => {
        expect(node.find('TextLink.entry-action-button__add-field')).toHaveLength(1);
        expect(node.find('EntryField')).toHaveLength(0);
        expect(node.find('FieldStyleEditor')).toHaveLength(0);
      });

      // Clears roles from App state
      expect(Object.keys(wrapper.state().entryInternalMapping.fieldRoles)).toHaveLength(0);
    });
  });
});
