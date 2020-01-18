import InternalMapping from '../src/classes/InternalMapping';
import * as c from '../../customModules/constants';
import { mockComponentMapping, mockComponentConfig } from './utils/mockUtils';
import { constructComponentZone } from '../../customModules/utilities';

describe('InternalMapping', () => {
  describe('constructor', () => {
    it('returns empty object if blank string', () => {
      const json = '';
      const mapping = new InternalMapping(json);
      expect(mapping.componentZones).toEqual({});
      expect(mapping.patternName).toEqual('');
    });

    it('returns empty object if invalid', () => {
      const json = undefined;
      const mapping = new InternalMapping(json);

      expect(mapping.componentZones).toEqual({});
      expect(mapping.patternName).toEqual('');
    });

    it('does not load fields if internalMapping is blank', () => {
      const json = JSON.stringify({
        componentZones: {},
        style: {}
      });

      const templateConfig = {
        style: {},
        componentZones: {
          text_field: {
            defaultStyle: 'helloClass',
            field: {
              type: c.FIELD_TYPE_TITLE,
              defaultValue: 'TEXT!!!'
            }
          }
        }
      };

      const internalMapping = new InternalMapping(json, templateConfig);
      expect(internalMapping.text_field).toBeUndefined(undefined);
    });

    it('sets component zones with correct properties if loaded with json', () => {
      const json = JSON.stringify({
        componentZones: {
          text_field: { ...mockComponentMapping(), type: 'entry' }
        }
      });

      const templateConfig = {
        componentZones: {
          text_field: {
            ...constructComponentZone({
              componentOptions: [mockComponentConfig]
            }),
            type: 'entry'
          }
        }
      };

      const internalMapping = new InternalMapping(json, templateConfig);
      expect(internalMapping.text_field.componentName).toEqual('MockComponentConfig');
      expect(internalMapping.text_field.properties.title).toEqual('hi');
      expect(internalMapping.text_field.type).toEqual('entry');
    });

    it('returns class', () => {
      const object = { componentZones: { hi: 'hello' } };
      const json = JSON.stringify(object);
      expect(new InternalMapping(json).constructor.name).toEqual('InternalMapping');
    });
  });

  describe('getters', () => {
    it('returns object value', () => {
      const object = { componentZones: { hi: { type: 'entry', value: 'hello' } } };
      const json = JSON.stringify(object);
      expect(new InternalMapping(json).hi).toEqual({
        style: undefined,
        type: 'entry',
        value: 'hello'
      });
    });
  });

  describe('setters', () => {
    describe('default', () => {
      it('preserves other attributes and sets the value', () => {
        const styleClass = 'hiClass';
        const json = JSON.stringify({
          componentZones: {
            hi: { ...mockComponentMapping(), type: 'entry' }
          }
        });
        const internalMapping = new InternalMapping(json);

        internalMapping.hi.properties.title = 'bye';

        expect(internalMapping.hi.type).toEqual('entry');
        expect(internalMapping.hi.properties.title).toEqual('bye');
        expect(internalMapping.hi.properties.body).toEqual('hello there');
      });
    });

    describe('addEntry', () => {
      it('sets the type and sets the value, style, and contentType', () => {
        const json = JSON.stringify({
          componentZones: { hi: { type: c.FIELD_TYPE_TITLE, value: 'hello' } }
        });
        const internalMapping = new InternalMapping(json);

        internalMapping.addEntry('hi', 'bye', 'content');
        expect(internalMapping.hi.type).toEqual('entry');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.contentType).toEqual('content');
        expect(internalMapping.hi.style).toBeUndefined();
      });

      it('with blank start - sets the type and sets the value', () => {
        const json = JSON.stringify({});
        const internalMapping = new InternalMapping(json);
        internalMapping.addEntry('hi', 'bye');
        expect(internalMapping.hi.type).toEqual('entry');
        expect(internalMapping.hi.value).toEqual('bye');
      });
    });

    describe('addEntriesOrAssets', () => {
      it('sets the type and sets the value and style', () => {
        const json = JSON.stringify({
          componentZones: {
            hi: {
              type: c.FIELD_TYPE_TITLE,
              value: [
                {
                  type: 'entry',
                  style: InternalMapping.styleMapping({ value: 'hiClass' }),
                  value: 'hello'
                }
              ]
            }
          }
        });
        const internalMapping = new InternalMapping(json);

        internalMapping.addEntriesOrAssets({ key: 'hi', value: ['bye', 'greetings'] });
        expect(internalMapping.hi.type).toEqual('multi-reference');
        expect(internalMapping.hi.value).toHaveLength(3);
        expect(internalMapping.hi.style).toBeUndefined();
        expect(internalMapping.hi.value[0].type).toEqual('entry');
        expect(internalMapping.hi.value[0].value).toEqual('hello');
        expect(internalMapping.hi.value[0].style.value).toEqual('hiClass');
        expect(internalMapping.hi.value[1].type).toEqual('entry');
        expect(internalMapping.hi.value[1].value).toEqual('bye');
        expect(internalMapping.hi.value[1].style).toBeUndefined();
        expect(internalMapping.hi.value[2].type).toEqual('entry');
        expect(internalMapping.hi.value[2].value).toEqual('greetings');
        expect(internalMapping.hi.value[2].style).toBeUndefined();
      });

      it('with blank start - sets the type and sets the value', () => {
        const json = JSON.stringify({});
        const internalMapping = new InternalMapping(json);
        internalMapping.addEntriesOrAssets({ key: 'hi', value: ['bye', 'greetings'] });
        expect(internalMapping.hi.type).toEqual('multi-reference');
        expect(internalMapping.hi.value).toHaveLength(2);
        expect(internalMapping.hi.style).toBeUndefined();
        expect(internalMapping.hi.value[0].type).toEqual('entry');
        expect(internalMapping.hi.value[0].value).toEqual('bye');
        expect(internalMapping.hi.value[1].type).toEqual('entry');
        expect(internalMapping.hi.value[1].value).toEqual('greetings');
      });

      it('sets allows entries and assets to mix', () => {
        const json = JSON.stringify({
          componentZones: {
            hi: {
              type: c.FIELD_TYPE_TITLE,
              value: [{ type: 'entry', style: undefined, value: 'hello' }]
            }
          }
        });
        const internalMapping = new InternalMapping(json);

        internalMapping.addEntriesOrAssets({
          key: 'hi',
          value: [{ type: 'asset', value: 'bye', assetUrl: 'url', assetType: 'image' }]
        });
        expect(internalMapping.hi.type).toEqual('multi-reference');
        expect(internalMapping.hi.value).toHaveLength(2);
        expect(internalMapping.hi.style).toBeUndefined();
        expect(internalMapping.hi.value[0].type).toEqual('entry');
        expect(internalMapping.hi.value[0].value).toEqual('hello');
        expect(internalMapping.hi.value[0].style).toBeUndefined();
        expect(internalMapping.hi.value[1].type).toEqual('asset');
        expect(internalMapping.hi.value[1].value).toEqual('bye');
        expect(internalMapping.hi.value[1].assetUrl).toEqual('url');
        expect(internalMapping.hi.value[1].assetType).toEqual('image');
      });
    });

    describe('addfield', () => {
      const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addField({
        key: 'hi',
        type: c.FIELD_TYPE_TITLE,
        value: 'bye'
      });

      it('sets the type, value, and classes for the key', () => {
        expect(internalMapping.hi.type).toEqual(c.FIELD_TYPE_TITLE);
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.style).toBeUndefined();
      });
    });

    describe('addTextField', () => {
      const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addTextField({ key: 'hi', value: 'bye', styleClasses: 'text-left' });

      it('sets the type and sets the value', () => {
        expect(internalMapping.hi.type).toEqual(c.FIELD_TYPE_TITLE);
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.style).toBeUndefined();
      });
    });

    describe('addMarkdownField', () => {
      const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addMarkdownField({ key: 'hi', value: 'bye', styleClasses: 'text-left' });

      it('sets the type and sets the value', () => {
        expect(internalMapping.hi.type).toEqual('markdown');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.style).toBeUndefined();
      });
    });
  });

  describe('asJSON', () => {
    const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
    const internalMapping = new InternalMapping(json);

    it('returns the class and properties as json', () => {
      expect(internalMapping.asJSON()).toEqual(
        '{"patternName":"","componentZones":{"hi":{"type":"entry","value":"hello"}}}'
      );
    });
  });

  describe('fieldKeys', () => {
    const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
    const internalMapping = new InternalMapping(json);

    it('returns the class and properties as json', () => {
      expect(internalMapping.fieldKeys()).toEqual(['hi']);
    });
  });

  describe('removeEntry', () => {
    it('removes the role and key', () => {
      const json = JSON.stringify({ componentZones: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeEntry('hi');
      expect(internalMapping.hi).toBeUndefined();
      expect(internalMapping.fieldKeys()).not.toContain('hi');
    });

    it('only removes the entry with passed in ID if the entry value is an array', () => {
      const json = JSON.stringify({
        componentZones: {
          hi: {
            type: c.FIELD_TYPE_TITLE,
            value: [
              { type: 'entry', style: {}, value: '1' },
              { type: 'entry', style: {}, value: '2' }
            ]
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeEntry('hi', 1);
      expect(internalMapping.hi.value).toHaveLength(1);
    });

    it('removes the entire key if the array becomes empty from removal', () => {
      const json = JSON.stringify({
        componentZones: {
          hi: {
            type: c.FIELD_TYPE_TITLE,
            value: [{ type: 'entry', style: {}, value: '2' }]
          }
        }
      });

      const internalMapping = new InternalMapping(json);
      internalMapping.removeEntry('hi', 0);
      expect(internalMapping.hi).toBeUndefined();
      expect(internalMapping.fieldKeys()).not.toContain('hi');
    });
  });

  describe('switchMultiReferenceValues', () => {
    it('swaps the array position', () => {
      const json = JSON.stringify({
        componentZones: {
          hi: { type: 'multi-reference', value: ['a', 'b', 'c', 'd'] }
        }
      });
      const internalMapping = new InternalMapping(json);

      internalMapping.switchMultiReferenceValues({
        roleKey: 'hi',
        draggedIndex: 0,
        draggedOverIndex: 1
      });
      expect(internalMapping.hi.value[0]).toEqual('b');
      expect(internalMapping.hi.value[1]).toEqual('a');
    });
  });
});
