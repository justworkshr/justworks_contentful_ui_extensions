import React from 'react';
import { App } from '../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import * as c from '../../customModules/constants';
import * as tm from '../../customModules/mocks/templateMocks';

import { mockComponent, mockSdk } from './utils/mockUtils';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

configure({
  testIdAttribute: 'data-test-id'
});

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('ComponentModule', () => {
    it('without template should render without crashing', () => {
      const sdk = mockSdk(undefined, c.CONTENT_TYPE_COMPONENT_MODULE);
      const wrapper = mockComponent({ Component: App, sdk });

      expect(wrapper.find('Form.dynamic-module-editor')).toHaveLength(1);
    });
  });

  describe('PageModule', () => {
    it('without template should render without crashing', () => {
      const sdk = mockSdk(undefined, c.CONTENT_TYPE_PAGE_MODULE);
      const wrapper = mockComponent({ Component: App, sdk });

      expect(wrapper.find('Form.dynamic-module-editor')).toHaveLength(1);
    });
  });
});
