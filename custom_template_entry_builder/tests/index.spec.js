import React from 'react';
import { App } from '../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

import { textMediaModule } from '../../custom_templates/templates/textMediaModule';
import * as c from '../../custom_templates/constants';

configure({ adapter: new Adapter() });

const MOCK_TEMPLATE_NAME = 'mock 1';
const mockCustomTemplates = {
  [MOCK_TEMPLATE_NAME]: {
    meta: {},
    style: {},
    roles: {
      left_section: {
        contentType: 'text',
        description: 'A left section'
      },
      right_section: {
        contentType: 'text',
        description: 'A left section'
      }
    }
  }
};

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
          customTemplates={mockCustomTemplates}
          templatePlaceholder={mockCustomTemplates}
          sdk={mockSdk(mockEntry)}
        />
      );
      expect(wrapper.find('.custom-template-entry-builder')).toHaveLength(1);
    });
  });

  describe('with a mock entry', () => {
    const mockEntry = {
      name: 'Mock Custom Template Entry',
      template: MOCK_TEMPLATE_NAME,
      entries: {
        ...mockLink({ id: '1' })
      },
      assets: {
        ...mockLink({ id: '2', type: 'Asset' })
      },
      internalMapping: JSON.stringify({
        left_section: '1',
        right_section: '2',
        style: {}
      })
    };

    it('should render without crashing', () => {
      const wrapper = mount(
        <App
          customTemplates={mockCustomTemplates}
          templatePlaceholder={mockCustomTemplates['mock 1']}
          sdk={mockSdk(mockEntry)}
        />
      );

      expect(wrapper.find('.custom-template-entry-builder')).toHaveLength(1);
    });
  });

  describe('with text media template', () => {
    const mockEntry = {
      name: 'Mock Custom Template Entry',
      template: c.TEXT_MEDIA_MODULE,
      entries: {},
      assets: {},
      internalMapping: undefined
    };

    const sdk = mockSdk(mockEntry);

    it('should render without crashing', () => {
      const wrapper = mount(
        <App
          customTemplates={textMediaModule}
          templatePlaceholder={mockCustomTemplates}
          sdk={sdk}
        />
      );

      expect(wrapper.find('.custom-template-entry-builder')).toHaveLength(1);
    });
  });
});
