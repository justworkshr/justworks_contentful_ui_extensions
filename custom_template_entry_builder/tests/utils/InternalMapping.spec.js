import InternalMapping from '../../src/utils/InternalMapping';

describe('InternalMapping', () => {
  describe('constructor', () => {
    it('returns empty object if blank string', () => {
      const json = '';
      expect(new InternalMapping(json)).toEqual({});
    });

    it('returns empty object if invalid', () => {
      const json = undefined;
      expect(new InternalMapping(json)).toEqual({});
    });

    it('returns class', () => {
      const object = { hi: 'hello' };
      const json = JSON.stringify(object);
      expect(new InternalMapping(json).constructor.name).toEqual('InternalMapping');
    });
  });

  describe('getters', () => {
    it('returns object value', () => {
      const object = { hi: { type: 'entry', value: 'hello' } };
      const json = JSON.stringify(object);
      expect(new InternalMapping(json).hi).toEqual('hello');
    });

    it('returns the value, even if not an object', () => {
      const object = { hi: 'hello' };
      const json = JSON.stringify(object);
      expect(new InternalMapping(json).hi).toEqual('hello');
    });
  });

  describe('setters', () => {
    describe('default', () => {
      const json = JSON.stringify({ hi: { type: 'entry', value: 'hello' } });
      const internalMapping = new InternalMapping(json);

      internalMapping.hi = 'bye';

      it('preseves the type and sets the value', () => {
        expect(internalMapping._hi.type).toEqual('entry');
        expect(internalMapping._hi.value).toEqual('bye');
      });
    });

    describe('addEntry', () => {
      it('sets the type and sets the value', () => {
        const json = JSON.stringify({ hi: { type: 'text', value: 'hello' } });
        const internalMapping = new InternalMapping(json);

        internalMapping.addEntry('hi', 'bye');
        expect(internalMapping._hi.type).toEqual('entry');
        expect(internalMapping._hi.value).toEqual('bye');
      });

      it('with blank start - sets the type and sets the value', () => {
        const json = JSON.stringify({});
        const internalMapping = new InternalMapping(json);
        internalMapping.addField('entry', 'hi');
        internalMapping.addEntry('hi', 'bye');
        expect(internalMapping._hi.type).toEqual('entry');
        expect(internalMapping._hi.value).toEqual('bye');
      });
    });

    describe('addTextField', () => {
      const json = JSON.stringify({ hi: { type: 'entry', value: 'hello' } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addTextField('hi', 'bye');

      it('sets the type and sets the value', () => {
        expect(internalMapping._hi.type).toEqual('text');
        expect(internalMapping._hi.value).toEqual('bye');
      });
    });

    describe('addMarkdownField', () => {
      const json = JSON.stringify({ hi: { type: 'entry', value: 'hello' } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addMarkdownField('hi', 'bye');

      it('sets the type and sets the value', () => {
        expect(internalMapping._hi.type).toEqual('markdown');
        expect(internalMapping._hi.value).toEqual('bye');
      });
    });
  });

  describe('asJSON', () => {
    const json = JSON.stringify({ hi: { type: 'entry', value: 'hello' } });
    const internalMapping = new InternalMapping(json);

    it('returns the class and properties as json', () => {
      expect(internalMapping.asJSON()).toEqual('{"hi":{"type":"entry","value":"hello"}}');
    });
  });

  describe('keys', () => {
    const json = JSON.stringify({ hi: { type: 'entry', value: 'hello' } });
    const internalMapping = new InternalMapping(json);

    it('returns the class and properties as json', () => {
      expect(internalMapping.keys()).toEqual(['hi']);
    });
  });

  describe('removeEntry', () => {
    const json = JSON.stringify({ hi: { type: 'entry', value: 'hello' } });
    const internalMapping = new InternalMapping(json);

    it('removes the role and key', () => {
      expect(internalMapping.hi).toEqual('hello');
      internalMapping.removeEntry('hi');
      expect(internalMapping.hi).toBeUndefined();
      expect(internalMapping.keys()).not.toContain('hi');
    });
  });
});
