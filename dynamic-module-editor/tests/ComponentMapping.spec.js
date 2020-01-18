import ComponentMapping from '../src/classes/ComponentMapping';
import * as c from '../../customModules/constants';

describe('ComponentMapping', () => {
  describe('constructor', () => {
    it('returns empty object if blank string', () => {
      const json = '';
      expect(new ComponentMapping(json)).toEqual({
        _templateConfig: {
          properties: {},
          componentName: ''
        },
        componentName: '',
        properties: {}
      });
    });

    it('returns empty object if invalid', () => {
      const json = undefined;
      expect(new ComponentMapping(json)).toEqual({
        _templateConfig: {
          properties: {},
          componentName: ''
        },
        componentName: '',
        properties: {}
      });
    });

    it('does not load fields if ComponentMapping is blank', () => {
      const json = JSON.stringify({
        properties: {},
        componentName: ''
      });

      const templateConfig = {
        componentName: '',
        properties: {
          text_field: {
            field: {
              type: c.FIELD_TYPE_TITLE,
              defaultValue: 'TEXT!!!'
            }
          }
        }
      };

      const componentMapping = new ComponentMapping(json, templateConfig);
      expect(componentMapping.text_field).toBeUndefined(undefined);
    });

    it('does not load fields if ComponentMapping is not blank', () => {
      const json = JSON.stringify({
        properties: {
          text_field: {
            type: c.FIELD_TYPE_TITLE,
            value: 'occupied'
          }
        },
        componentName: ''
      });

      const templateConfig = {
        componentName: '',
        properties: {
          text_field: {
            field: {
              type: c.FIELD_TYPE_TITLE,
              defaultValue: 'TEXT!!!'
            }
          }
        }
      };

      const componentMapping = new ComponentMapping(json, templateConfig);
      expect(componentMapping.text_field.value).toEqual('occupied');
    });

    it('returns class', () => {
      const object = { componentZones: { hi: 'hello' } };
      const json = JSON.stringify(object);
      expect(new ComponentMapping(json).constructor.name).toEqual('ComponentMapping');
    });
  });

  describe('getters', () => {
    it('returns object value', () => {
      const object = { componentZones: { hi: { type: 'entry', value: 'hello' } } };
      const json = JSON.stringify(object);
      expect(new ComponentMapping(json).hi).toEqual({
        type: 'entry',
        value: 'hello'
      });
    });
  });

  describe('setters', () => {
    describe('default', () => {
      it('preserves other attributes and sets the value', () => {
        const json = JSON.stringify({
          properties: {
            hi: {
              type: 'entry',
              value: 'hello'
            }
          }
        });
        const componentMapping = new ComponentMapping(json);

        componentMapping.hi = 'bye';

        expect(componentMapping.hi.type).toEqual('entry');
        expect(componentMapping.hi.value).toEqual('bye');
      });
    });

    describe('addEntry', () => {
      it('sets the type and sets the value, and contentType', () => {
        const json = JSON.stringify({
          componentZones: { hi: { type: c.FIELD_TYPE_TITLE, value: 'hello' } }
        });
        const componentMapping = new ComponentMapping(json);

        componentMapping.addEntry('hi', 'bye', 'content');
        expect(componentMapping.hi.type).toEqual('entry');
        expect(componentMapping.hi.value).toEqual('bye');
        expect(componentMapping.hi.contentType).toEqual('content');
      });

      it('with blank start - sets the type and sets the value', () => {
        const json = JSON.stringify({});
        const componentMapping = new ComponentMapping(json);
        componentMapping.addEntry('hi', 'bye');
        expect(componentMapping.hi.type).toEqual('entry');
        expect(componentMapping.hi.value).toEqual('bye');
      });
    });

    describe('addEntriesOrAssets', () => {
      it('sets the type and sets the value', () => {
        const json = JSON.stringify({
          componentZones: {
            hi: {
              type: c.FIELD_TYPE_TITLE,
              value: [
                {
                  type: 'entry',
                  value: 'hello'
                }
              ]
            }
          }
        });
        const componentMapping = new ComponentMapping(json);

        componentMapping.addEntriesOrAssets({ key: 'hi', value: ['bye', 'greetings'] });
        expect(componentMapping.hi.type).toEqual('multi-reference');
        expect(componentMapping.hi.value).toHaveLength(3);
        expect(componentMapping.hi.value[0].type).toEqual('entry');
        expect(componentMapping.hi.value[0].value).toEqual('hello');
        expect(componentMapping.hi.value[1].type).toEqual('entry');
        expect(componentMapping.hi.value[1].value).toEqual('bye');
        expect(componentMapping.hi.value[2].type).toEqual('entry');
        expect(componentMapping.hi.value[2].value).toEqual('greetings');
      });

      it('with blank start - sets the type and sets the value', () => {
        const json = JSON.stringify({});
        const componentMapping = new ComponentMapping(json);
        componentMapping.addEntriesOrAssets({ key: 'hi', value: ['bye', 'greetings'] });
        expect(componentMapping.hi.type).toEqual('multi-reference');
        expect(componentMapping.hi.value).toHaveLength(2);
        expect(componentMapping.hi.value[0].type).toEqual('entry');
        expect(componentMapping.hi.value[0].value).toEqual('bye');
        expect(componentMapping.hi.value[1].type).toEqual('entry');
        expect(componentMapping.hi.value[1].value).toEqual('greetings');
      });

      it('sets allows entries and assets to mix', () => {
        const json = JSON.stringify({
          componentZones: {
            hi: {
              type: c.FIELD_TYPE_TITLE,
              value: [{ type: 'entry', value: 'hello' }]
            }
          }
        });
        const componentMapping = new ComponentMapping(json);

        componentMapping.addEntriesOrAssets({
          key: 'hi',
          value: [{ type: 'asset', value: 'bye', assetUrl: 'url', assetType: 'image' }]
        });
        expect(componentMapping.hi.type).toEqual('multi-reference');
        expect(componentMapping.hi.value).toHaveLength(2);
        expect(componentMapping.hi.value[0].type).toEqual('entry');
        expect(componentMapping.hi.value[0].value).toEqual('hello');
        expect(componentMapping.hi.value[1].type).toEqual('asset');
        expect(componentMapping.hi.value[1].value).toEqual('bye');
        expect(componentMapping.hi.value[1].assetUrl).toEqual('url');
        expect(componentMapping.hi.value[1].assetType).toEqual('image');
      });
    });

    describe('addfield', () => {
      const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
      const componentMapping = new ComponentMapping(json);

      componentMapping.addField({
        key: 'hi',
        type: c.FIELD_TYPE_TITLE,
        value: 'bye'
      });

      it('sets the type, value, and classes for the key', () => {
        expect(componentMapping.hi.type).toEqual(c.FIELD_TYPE_TITLE);
        expect(componentMapping.hi.value).toEqual('bye');
      });
    });

    describe('addTextField', () => {
      const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
      const componentMapping = new ComponentMapping(json);

      componentMapping.addTextField({ key: 'hi', value: 'bye' });

      it('sets the type and sets the value', () => {
        expect(componentMapping.hi.type).toEqual(c.FIELD_TYPE_TITLE);
        expect(componentMapping.hi.value).toEqual('bye');
      });
    });

    describe('addMarkdownField', () => {
      const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
      const componentMapping = new ComponentMapping(json);

      componentMapping.addMarkdownField({ key: 'hi', value: 'bye' });

      it('sets the type and sets the value', () => {
        expect(componentMapping.hi.type).toEqual('markdown');
        expect(componentMapping.hi.value).toEqual('bye');
      });
    });
  });

  describe('asJSON', () => {
    const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
    const componentMapping = new ComponentMapping(json);

    it('returns the class and properties as json', () => {
      expect(componentMapping.asJSON()).toEqual(
        '{"componentZones":{"hi":{"type":"entry","value":"hello"}}}'
      );
    });
  });

  describe('fieldKeys', () => {
    const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
    const componentMapping = new ComponentMapping(json);

    it('returns the class and properties as json', () => {
      expect(componentMapping.fieldKeys()).toEqual(['hi']);
    });
  });

  describe('removeEntry', () => {
    it('removes the role and key', () => {
      const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
      const componentMapping = new ComponentMapping(json);
      componentMapping.removeEntry('hi');
      expect(componentMapping.hi).toBeUndefined();
      expect(componentMapping.fieldKeys()).not.toContain('hi');
    });

    it('only removes the entry with passed in ID if the entry value is an array', () => {
      const json = JSON.stringify({
        componentZones: {
          hi: {
            type: c.FIELD_TYPE_TITLE,
            value: [
              { type: 'entry', value: '1' },
              { type: 'entry', value: '2' }
            ]
          }
        }
      });
      const componentMapping = new ComponentMapping(json);
      componentMapping.removeEntry('hi', 1);
      expect(componentMapping.hi.value).toHaveLength(1);
    });

    it('removes the entire key if the array becomes empty from removal', () => {
      const json = JSON.stringify({
        componentZones: {
          hi: {
            type: c.FIELD_TYPE_TITLE,
            value: [{ type: 'entry', value: '2' }]
          }
        }
      });

      const componentMapping = new ComponentMapping(json);
      componentMapping.removeEntry('hi', 0);
      expect(componentMapping.hi).toBeUndefined();
      expect(componentMapping.fieldKeys()).not.toContain('hi');
    });
  });

  describe('switchMultiReferenceValues', () => {
    it('swaps the array position', () => {
      const json = JSON.stringify({
        componentZones: {
          hi: { type: 'multi-reference', value: ['a', 'b', 'c', 'd'] }
        }
      });
      const componentMapping = new ComponentMapping(json);

      componentMapping.switchMultiReferenceValues({
        roleKey: 'hi',
        draggedIndex: 0,
        draggedOverIndex: 1
      });
      expect(componentMapping.hi.value[0]).toEqual('b');
      expect(componentMapping.hi.value[1]).toEqual('a');
    });
  });
});
