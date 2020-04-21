import { extractEntries, linksToFetch, newInternalMappingFromSchema } from '../../utilities/index';
import { mockLink } from '../mockUtils';

const mockSchema = () => {
  return {
    meta: {
      id: 'components/mock',
      styleguide_path: '',
      description: '',
      editor_role: '',
      tags: []
    },
    properties: {
      classname: {
        type: 'text',
        required: false,
        default: null,
        options: null,
        description: '',
        related_to: null,
        hidden: true
      },
      prop1: {
        type: 'text',
        required: false,
        default: 'prop1Value',
        options: null,
        description: '',
        related_to: null,
        hidden: true
      }
    }
  };
};

const mockObject = (linkType = 'Entry') => {
  return {
    properties: {
      test: {
        type: 'link',
        value: mockLink({ id: '1', type: linkType })
      },
      testComponent: {
        type: 'component',
        value: {
          componentId: 'components/stuff',
          properties: {
            testComponentEntry: {
              type: 'link',
              value: mockLink({ id: '2', type: linkType })
            },
            multiLink: {
              type: 'multi-link',
              value: [
                mockLink({ id: '3a', type: linkType }),
                mockLink({ id: '3b', type: linkType })
              ]
            },
            testConfigObjectWithMulti: {
              type: 'config',
              value: {
                componentId: 'components/config1',
                properties: {
                  testComponentEntry3: {
                    type: 'link',
                    value: mockLink({ id: '7', type: linkType })
                  },
                  'multi-component': {
                    type: 'multi-config',
                    value: [
                      {
                        componentId: 'mconfig1',
                        properties: {
                          prop1: {
                            type: 'link',
                            value: mockLink({ id: '8', type: linkType })
                          }
                        }
                      },
                      {
                        componentId: 'mconfig2',
                        properties: {
                          prop1: {
                            type: 'link',
                            value: mockLink({ id: '9', type: linkType })
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            testComponentEntry2: {
              type: 'component',
              value: {
                componentId: 'components/stuff2',
                properties: {
                  testComponentEntry3: {
                    type: 'link',
                    value: mockLink({ id: '4', type: linkType })
                  },
                  'multi-component': {
                    type: 'multi-component',
                    value: [
                      {
                        componentId: 'tce1',
                        properties: {
                          prop1: {
                            type: 'link',
                            value: mockLink({ id: '5', type: linkType })
                          }
                        }
                      },
                      {
                        componentId: 'tce2',
                        properties: {
                          prop1: {
                            type: 'link',
                            value: mockLink({ id: '6', type: linkType })
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
  };
};

describe('extractEntries', () => {
  it('loads entries from link, multi-link, component, multi-component properties, config, and multi-config properties', () => {
    const entries = extractEntries(mockObject('Entry'), 'Entry');

    expect(entries.length).toEqual(10);
    expect(entries.every(e => e.sys.linkType === 'Entry')).toEqual(true);
  });

  it('loads assets from link, multi-link, component, multi-component properties, config, and multi-config properties', () => {
    const assets = extractEntries(mockObject('Asset'), 'Asset');
    expect(assets.length).toEqual(10);
    expect(assets.every(e => e.sys.linkType === 'Asset')).toEqual(true);
  });
});

describe('linksToFetch', () => {
  it('returns the new links', () => {
    const hydratedEntries = [
      mockLink({ id: '1', type: 'Entry' }),
      mockLink({ id: '2', type: 'Entry' }),
      mockLink({ id: '3', type: 'Entry' })
    ];
    const newLinks = [
      mockLink({ id: '1', type: 'Entry' }),
      mockLink({ id: '2', type: 'Entry' }),
      mockLink({ id: '3', type: 'Entry' }),
      mockLink({ id: '4', type: 'Entry' })
    ];

    expect(linksToFetch(hydratedEntries, newLinks).length).toEqual(1);
    expect(linksToFetch(hydratedEntries, newLinks)[0].sys.id).toEqual('4');
  });
});

describe('newInternalMappingFromSchema', () => {
  it('creates a new internalMapping object with types and default values', () => {
    const schema = mockSchema();
    const internalMapping = newInternalMappingFromSchema(schema);

    expect(internalMapping.componentId).toEqual(schema.meta.id);
    expect(internalMapping.properties.classname.type).toEqual(schema.properties.classname.type);
    expect(internalMapping.properties.classname.value).toEqual(schema.properties.classname.default);
    expect(internalMapping.properties.prop1.type).toEqual(schema.properties.prop1.type);
    expect(internalMapping.properties.prop1.value).toEqual(schema.properties.prop1.default);
  });
});
