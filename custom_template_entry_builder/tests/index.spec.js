import React from 'react';
import { App } from '../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

configure({ adapter: new Adapter() });

const mockCustomTemplates = {
  'mock 1': {
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

const mockLink = ({ id = 0 } = {}) => {
  return {
    sys: {
      id: id,
      linkType: 'Entry',
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
          templatePlaceholder={mockCustomTemplates['mock 1']}
          sdk={mockSdk(mockEntry)}
        />
      );
      expect(wrapper.find('.custom-template-entry-builder')).toHaveLength(1);
    });
  });

  describe('with an mock entry', () => {
    const mockEntry = {
      name: 'Mock Custom Template Entry',
      template: 'mock 1',
      entries: {
        ...mockLink({ id: '1' }),
        ...mockLink({ id: '2' })
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
});
