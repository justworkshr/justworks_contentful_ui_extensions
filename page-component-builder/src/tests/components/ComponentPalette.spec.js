import React from 'react';
import ComponentPalette from '../../components/ComponentPalette';

import * as c from '../../constants';
import {
  render,
  cleanup,
  fireEvent,
  configure,
  wait,
  waitForElementToBeRemoved
} from '@testing-library/react';
import { mockSchemas, mockComponentSchema } from '../mockUtils';

configure({
  testIdAttribute: 'data-test-id'
});

const mockOnChange = jest.fn();

const mockTag = 'test-tag';

const mockTags = {
  component: [mockTag],
  content: [],
  location: []
};

const mockComponents = [
  mockComponentSchema('patterns/component1', {}, [mockTag], c.PATTERN_ROLE),
  mockComponentSchema('patterns/component2', {}, [mockTag], c.PATTERN_ROLE),
  mockComponentSchema('patterns/component3', {}, [], c.PATTERN_ROLE),
  mockComponentSchema('components/component4', {}, [], c.COMPONENT_ROLE)
];

const testSchemas = mockSchemas(mockTags, mockComponents);

const renderComponent = ({
  schemas = testSchemas.components,
  tags = testSchemas.tags,
  componentId = ''
} = {}) => {
  return render(
    <ComponentPalette
      schemas={schemas}
      tags={tags}
      componentId={componentId}
      onChange={mockOnChange}
    />
  );
};

describe('ComponentPalette', () => {
  beforeEach(() => {
    mockOnChange.mockReset();
  });

  afterEach(cleanup);

  const openModal = getByTestId => {
    const openButton = getByTestId('component-palette__button');
    fireEvent.click(openButton);
  };

  describe('loading + rendering', () => {
    it('loads with blank attributes', () => {
      const componentPalette = renderComponent({
        schemas: undefined,
        tags: undefined,
        componentId: undefined
      });

      expect(componentPalette).toBeTruthy();
    });

    it('loads', () => {
      const { getByTestId } = renderComponent({
        componentId: 'test'
      });

      expect(getByTestId('component-palette')).toBeTruthy();
    });

    it('opens and closes a modal on button click', async () => {
      const { getByTestId, queryByTestId, getByText } = renderComponent({
        componentId: 'test'
      });

      expect(queryByTestId('component-palette__modal')).toBeNull();
      openModal(getByTestId);
      expect(queryByTestId('component-palette__modal')).toBeTruthy();
      fireEvent.click(getByTestId('cf-ui-icon-button'));

      await waitForElementToBeRemoved(() => queryByTestId('component-palette__modal'));
      expect(queryByTestId('component-palette__modal')).toBeNull();
    });

    it('renders the tags and schemas', () => {
      const componentIdPrefix = 'palette-card--patterns/component';
      const { getByTestId, getByText } = renderComponent({
        componentId: 'test'
      });

      openModal(getByTestId);
      expect(getByText('test-tag')).toBeTruthy();
      expect(getByTestId(`${componentIdPrefix}1`)).toBeTruthy();
      expect(getByTestId(`${componentIdPrefix}2`)).toBeTruthy();
      expect(getByTestId(`${componentIdPrefix}3`)).toBeTruthy();
      // query length of cards to = 3 = cards.length
    });

    it('recognizes the selected component', () => {
      const componentId = 'patterns/component1';
      const componentIdPrefix = 'palette-card--patterns/component';
      const selectedClass = 'Card__Card--is-selected';
      const { getByTestId } = renderComponent({
        componentId: componentId,
        schemas: mockComponents,
        tags: mockTags
      });

      openModal(getByTestId);
      const selectedCard = getByTestId(`${componentIdPrefix}1`);
      expect(selectedCard.className.includes(selectedClass)).toBeTruthy();
    });
  });

  describe('filtering', () => {
    const { getByTestId, getByText } = renderComponent({
      componentId: 'test'
    });
    openModal(getByTestId);

    // console.log('@149', getByText('palette-card--patterns/component1'));
    xit('filters by tag', () => {
      // similar to lines 105 - 108
      // 1) expect that 3 cards render (component1, component2, component3)
      // 2) expect that component1 and component2 shows up
    });

    // fireEvent.change(getByTestId('field-name'), { // component-palette__search-input
    // target: { value: 'new-name-value' } // change this to component1/2
    // });

    xit('filters by search text', () => {
      // 1) expect that 3 cards render (component1, component2, component3) // render pre search
      // 1b) component-palette__search-input .value === component2 // search input "component2"
      // 2) expect that only component2 shows up if we type component2
    });

    xit('filters by tag and text combined', () => {
      // 1) expect that 3 cards render (component1, component2, component3) // render pre search
      // select tag / check for test-tag
      // all 3 compnonts length = 3
      // search  input "component1"
      // 2) expect that  only component1 shows up if we type component1 and have the tag selected
    });
  });
});
