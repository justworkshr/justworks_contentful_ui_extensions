import React from 'react';
import ComponentPalette from '../../components/ComponentPalette';

import {
  render,
  cleanup,
  fireEvent,
  configure,
  waitForElementToBeRemoved
} from '@testing-library/react';
import * as c from '../../constants';
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
      expect(getByTestId('component-palette-collection').childNodes.length).toEqual(3);
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
    it('filters by tag', () => {
      const { getByTestId, getByText, queryByTestId } = renderComponent({
        componentId: 'test',
        schemas: mockComponents,
        tags: mockTags
      });
      const componentIdPrefix = 'palette-card--patterns/component';
      openModal(getByTestId);
      expect(getByText('test-tag')).toBeTruthy();
      expect(getByTestId(`${componentIdPrefix}1`)).toBeTruthy();
      expect(getByTestId(`${componentIdPrefix}2`)).toBeTruthy();
      expect(getByTestId(`${componentIdPrefix}3`)).toBeTruthy();
      expect(getByTestId('component-palette-collection').childNodes.length).toEqual(3);
      fireEvent.click(getByTestId('button'));
      expect(getByTestId(`${componentIdPrefix}1`)).toBeTruthy();
      expect(getByTestId(`${componentIdPrefix}2`)).toBeTruthy();
      expect(queryByTestId(`${componentIdPrefix}3`)).toBeNull();
      expect(getByTestId('component-palette-collection').childNodes.length).toEqual(2);
    });

    it('filters by search text', () => {
      const { getByTestId, getByText, queryByTestId } = renderComponent({
        componentId: 'test',
        schemas: mockComponents,
        tags: mockTags
      });
      const componentIdPrefix = 'palette-card--patterns/component';
      openModal(getByTestId);
      expect(getByTestId('component-palette-collection').childNodes.length).toEqual(3);
      fireEvent.change(getByTestId('component-palette__search-input'), {
        target: { value: 'component2' }
      });
      expect(getByTestId('component-palette-collection').childNodes.length).toEqual(1);
      expect(queryByTestId(`${componentIdPrefix}1`)).toBeNull();
      expect(getByTestId(`${componentIdPrefix}2`)).toBeTruthy();
      expect(queryByTestId(`${componentIdPrefix}3`)).toBeNull();
    });

    it('filters by tag and text combined', () => {
      const { getByTestId, getByText, queryByTestId } = renderComponent({
        componentId: 'test',
        schemas: mockComponents,
        tags: mockTags
      });
      const componentIdPrefix = 'palette-card--patterns/component';
      openModal(getByTestId);
      expect(getByText('test-tag')).toBeTruthy();
      expect(getByTestId('component-palette-collection').childNodes.length).toEqual(3);
      fireEvent.click(getByTestId('button'));
      expect(getByTestId('component-palette-collection').childNodes.length).toEqual(2);
      fireEvent.change(getByTestId('component-palette__search-input'), {
        target: { value: 'component1' }
      });
      expect(getByTestId('component-palette-collection').childNodes.length).toEqual(1);
      expect(getByTestId(`${componentIdPrefix}1`)).toBeTruthy();
      expect(queryByTestId(`${componentIdPrefix}2`)).toBeNull();
      expect(queryByTestId(`${componentIdPrefix}3`)).toBeNull();
    });
  });
});
