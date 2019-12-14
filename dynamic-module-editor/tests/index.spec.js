import React from 'react';
import { customTemplates, templatePlaceholder } from '../../custom_templates';
// import { App } from '../src/index';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

import * as c from '../../custom_templates/constants';

import * as tm from '../../custom_templates/mocks/templateMocks';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

configure({
  testIdAttribute: 'data-test-id'
});

function renderComponent(sdk) {
  console.log(c.FIELD_TYPE_ENTRY);
  // return mount(
  //   <App
  //     customTemplates={tm.mockCustomTemplates}
  //     templatePlaceholder={tm.mockCustomTemplates}
  //     sdk={sdk}
  //   />
  // );
}

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

  it('should read a values from entry.fields.*', () => {
    sdk.entry.fields.name.getValue.mockReturnValue('name-value');
    sdk.entry.fields.internalMapping.getValue.mockReturnValue('internalMapping-value');
    sdk.entry.fields.type.getValue.mockReturnValue(true);
    sdk.entry.fields.isValid.getValue.mockReturnValue('isValid-value');

    const wrapper = renderComponent(sdk);

    // expect(getByTestId('field-name').value).toEqual('name-value');
    // expect(getByTestId('field-internalMapping').value).toEqual('internalMapping-value');
    // expect(getByTestId('field-isValid').value).toEqual('isValid-value');

    // fireEvent.change(getByTestId('field-internalMapping'), {
    //   target: { value: 'new-internalMapping-value' }
    // });

    // expect(sdk.entry.fields.internalMapping.setValue).toHaveBeenCalledWith(
    //   'new-internalMapping-value'
    // );
  });
});
