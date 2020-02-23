import { extractEntries } from '../index';

const mockObject = (linkType = 'Entry') => {
  return {
    properties: {
      test: {
        type: 'link',
        value: { sys: { type: 'Link', linkType: linkType, id: '1' } }
      },
      testComponent: {
        type: 'component',
        value: {
          componentId: 'components/stuff',
          properties: {
            testComponentEntry: {
              type: 'link',
              value: { sys: { type: 'Link', linkType: linkType, id: '2' } }
            },
            multiLink: {
              type: 'multi-link',
              value: [
                { sys: { type: 'Link', linkType: linkType, id: '3a' } },
                { sys: { type: 'Link', linkType: linkType, id: '3b' } }
              ]
            },
            testComponentEntry2: {
              type: 'component',
              value: {
                componentId: 'components/stuff2',
                properties: {
                  testComponentEntry3: {
                    type: 'link',
                    value: { sys: { type: 'Link', linkType: linkType, id: '4' } }
                  },
                  'multi-component': {
                    type: 'multi-component',
                    value: [
                      {
                        componentId: 'tce1',
                        properties: {
                          prop1: {
                            type: 'link',
                            value: {
                              sys: { type: 'Link', linkType: linkType, id: '5' }
                            }
                          }
                        }
                      },
                      {
                        componentId: 'tce2',
                        properties: {
                          prop1: {
                            type: 'link',
                            value: {
                              sys: { type: 'Link', linkType: linkType, id: '6' }
                            }
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
