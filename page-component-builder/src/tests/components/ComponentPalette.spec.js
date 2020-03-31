import React from 'react';
import ComponentPalette from '../../components/ComponentPalette';

import * as c from '../../constants';
import { render, cleanup, fireEvent, configure, wait } from '@testing-library/react';
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

  const closeModal = getByTestId => {
    const closeButton = getByTestId('cf-ui-icon-button');
    fireEvent.click(closeButton);
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

    it('opens and closes a modal on button click', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        componentId: 'test'
      });

      // 1) expect no modal is rendered before button click
      // 1) first check that no modal exists
      expect(queryByTestId('component-palette__modal')).toBeNull();

      // click button to open/render modal
      openModal(getByTestId);

      // 2) expects thats the modal is rendered when button is clicked
      // 2) get modal
      expect(queryByTestId('component-palette__modal')).toBeTruthy();

      //click button to close modal
      // closeModal(getByTestId);
      // fireEvent.click(getByTestId('cf-ui-icon-button'));

      // 3) expects that modal closes when close button clicked
      // 3) final check that no modal exists
      // expect(queryByTestId('component-palette__modal')).toBeNull();
    });

    it('renders the tags and schemas', () => {
      const componentIdPrefix = 'palette-card--patterns/component';
      const { getByTestId, getByText } = renderComponent({
        componentId: 'test'
      });

      // click button to open/render modal
      openModal(getByTestId);

      // 1) expect that 1 mock tag 'test-tag' renders
      expect(getByText('test-tag')).toBeTruthy();

      // 2) expect that 3 cards render (component, component2, component3)
      expect(getByTestId(`${componentIdPrefix}1`)).toBeTruthy();
      expect(getByTestId(`${componentIdPrefix}2`)).toBeTruthy();
      expect(getByTestId(`${componentIdPrefix}3`)).toBeTruthy();
    });

    it('recognizes the selected component', () => {
      // pass in "patterns/component1"
      const componentId = 'patterns/component1';
      const { getByTestId, queryByTestId } = renderComponent({
        componentId: componentId,
        schemas: mockComponents,
        tags: mockTags
      });

      openModal(getByTestId);
      const selectedCard = getByTestId(`palette-card--${componentId}`);

      // 1) test the selectedCard has the selected class
      expect(selectedCard.className.includes('Card__Card--is-selected')).toBeTruthy();
    });
  });

  describe('filtering', () => {
    const { getByTestId, getByText } = renderComponent({
      componentId: 'test'
    });
    openModal(getByTestId);

    // console.log('@121', getByText('palette-card--patterns/component1'));
    xit('filters by tag', () => {
      // 1) expect that 3 cards render (component, component2, component3)
      // 2) expect that component1 and component2 shows up
    });

    xit('filters by search text', () => {
      // 1) expect that 3 cards render (component, component2, component3)
      // 2) expect that only component2 shows up if we type component2
    });

    xit('filters by all 3', () => {
      // 1) expect that 3 cards render (component, component2, component3)
      // 2) expect that  only component1 shows up if we type component1 and have the tag selected
    });
  });
});
