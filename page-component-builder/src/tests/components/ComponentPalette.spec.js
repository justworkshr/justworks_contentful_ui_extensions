import React from 'react';
import ComponentPalette from '../../components/ComponentPalette';

import * as c from '../../constants';
import { render, cleanup, fireEvent, configure, wait } from '@testing-library/react';
import {
  mockSchemas,
  mockComponentSchema,
  mockComponentSchemaProperty,
  mockLinkProperty,
  mockAssetProperty,
  mockEntryProperty,
  mockComponentEntryProperty,
  mockTextProperty,
  mockAssetResponse,
  mockEntryResponse,
  mockLink,
  mockSingletonProperty
} from '../mockUtils';

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
  mockComponentSchema('component1', {}, [mockTag]),
  mockComponentSchema('component2', {}, []),
  mockComponentSchema('component3', {}, [])
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

  describe('loading', () => {
    it('loads with blank attributes', () => {
      const componentPalette = renderComponent({
        schemas: undefined,
        tags: undefined,
        componentId: undefined
      });
      expect(componentPalette).toBeTruthy();
    });

    it('loads', () => {
      const componentPalette = renderComponent({
        componentId: 'test'
      });
      expect(componentPalette).toBeTruthy();
    });
  });
});
