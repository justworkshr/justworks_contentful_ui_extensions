import InternalMapping from '../src/classes/InternalMapping';
import * as c from '../../customModules/constants';
import { mockComponentEntry, mockComponentMapping, mockComponentConfig } from './utils/mockUtils';
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
        meta: {
          patternName: 'patternName'
        },
        componentZones: {
          text_field: mockComponentEntry()
        }
      };

      const internalMapping = new InternalMapping(json, templateConfig);
      expect(internalMapping.patternName).toEqual('patternName');
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
      const object = {
        componentZones: {
          hi: { ...mockComponentMapping(), type: 'entry' }
        }
      };
      const json = JSON.stringify(object);
      const mapping = new InternalMapping(json);
      expect(mapping.hi.type).toEqual('entry');
      expect(mapping.hi.properties.title).toEqual('hi');
      expect(mapping.hi.componentName).toEqual('MockComponentConfig');
    });
  });

  describe('setters', () => {
    describe('default', () => {
      it('preserves other attributes and sets the value', () => {
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
  });

  describe('asJSON', () => {
    const json = JSON.stringify({
      patternName: 'patternName',
      componentZones: {
        hi: {
          ...constructComponentZone({
            componentOptions: [mockComponentConfig]
          }),
          type: 'entry'
        }
      }
    });
    const internalMapping = new InternalMapping(json);

    it('returns the class and properties as json', () => {
      expect(internalMapping.asJSON()).toEqual(
        '{"patternName":"patternName","componentZones":{"hi":{"description":"","componentOptions":[null],"required":true,"type":"entry"}}}'
      );
    });
  });

  describe('fieldKeys', () => {
    it('returns the class and properties as json', () => {
      const json = JSON.stringify({
        componentZones: {
          hi: mockComponentEntry()
        }
      });
      const internalMapping = new InternalMapping(json);
      expect(internalMapping.fieldKeys()).toEqual(['hi']);
    });
  });

  describe('addComponentZone', () => {
    it('adds the component name, blank type, and blank properties', () => {
      const object = {
        componentZones: {}
      };
      const json = JSON.stringify(object);
      const mapping = new InternalMapping(json);
      mapping.addComponentZone({ mappingKey: 'hi', componentZoneName: 'MockComponentConfig' });

      expect(mapping.componentZones.hi.componentName).toEqual('MockComponentConfig');
    });
  });

  describe('clearComponentZone', () => {
    it('clears the component zone', () => {
      const object = {
        componentZones: {
          hi: {
            componentName: 'hello'
          }
        }
      };
      const json = JSON.stringify(object);
      const mapping = new InternalMapping(json);
      mapping.clearComponentZone({ mappingKey: 'hi' });

      expect(mapping.componentZones.hi).toEqual(undefined);
    });
  });

  describe('addEntry', () => {
    it('adds the component and link properties', () => {
      const object = {
        componentZones: {
          hi: {
            componentName: 'hello'
          }
        }
      };
      const json = JSON.stringify(object);
      const mapping = new InternalMapping(json);

      mapping.addEntry('hi', 1);
      expect(mapping.componentZones.hi.componentName).toEqual('hello');
      expect(mapping.componentZones.hi.type).toEqual('entry');
      expect(mapping.componentZones.hi.value).toEqual(1);
    });
  });

  describe('removeEntry', () => {
    it('removes only the value and linkType', () => {
      const object = {
        componentZones: {
          hi: {
            componentName: 'hello'
          }
        }
      };
      const json = JSON.stringify(object);
      const mapping = new InternalMapping(json);

      expect(mapping.hi).toBeDefined();
      mapping.removeEntry('hi');
      expect(mapping.hi.componentName).toEqual('hello');
      expect(mapping.hi.type).toBeUndefined();
      expect(mapping.hi.value).toBeUndefined();
    });
  });
});
