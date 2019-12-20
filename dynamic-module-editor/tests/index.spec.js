import React from 'react';
import { App } from '../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

import * as tm from '../../customModules/mocks/templateMocks';

import { mockComponent } from './utils/mockUtils';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

configure({
  testIdAttribute: 'data-test-id'
});

const sdk = {
  entry: {
    fields: {
      name: { getValue: jest.fn(), setValue: jest.fn() },
      type: { getValue: jest.fn(), setValue: jest.fn() },
      internalMapping: { getValue: jest.fn(), setValue: jest.fn() },
      isValid: { getValue: jest.fn(), setValue: jest.fn() }
    }
  }
};

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should read a values from entry.fields.* and render without crashing', () => {
    sdk.entry.fields.name.getValue.mockReturnValue('name-value');
    sdk.entry.fields.internalMapping.getValue.mockReturnValue('internalMapping-value');
    sdk.entry.fields.type.getValue.mockReturnValue(true);
    sdk.entry.fields.isValid.getValue.mockReturnValue('isValid-value');

    const wrapper = mockComponent({ Component: App });

    expect(wrapper.find('Form.dynamic-module-editor')).toHaveLength(1);
  });
});
