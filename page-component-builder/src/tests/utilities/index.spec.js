import { extractEntries, linksToFetch } from '../../utilities/index';
import { mockLink } from '../mockUtils';

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
  it('loads entries from link, multi-link, component, and mulit-component properties', () => {
    const entries = extractEntries(mockObject('Entry'), 'Entry');

    expect(entries.length).toEqual(7);
    expect(entries.every(e => e.sys.linkType === 'Entry')).toEqual(true);
  });

  it('loads assets from link, multi-link, component, and mulit-component properties', () => {
    const assets = extractEntries(mockObject('Asset'), 'Asset');
    expect(assets.length).toEqual(7);
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
