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
      expect(new InternalMapping(json).hi).toEqual({
        styleClasses: '',
        type: 'entry',
        value: 'hello'
      });
    });
  });

  describe('setters', () => {
    describe('default', () => {
      it('preserves the type and sets the value', () => {
        const json = JSON.stringify({ hi: { type: 'entry', value: 'hello' } });
        const internalMapping = new InternalMapping(json);

        internalMapping.hi = 'bye';

        expect(internalMapping._hi.type).toEqual('entry');
        expect(internalMapping._hi.value).toEqual('bye');
        expect(internalMapping._hi.styleClasses).toEqual('');
      });
    });

    describe('addEntry', () => {
      it('sets the type and sets the value and style', () => {
        const json = JSON.stringify({ hi: { type: 'text', value: 'hello' } });
        const internalMapping = new InternalMapping(json);

        internalMapping.addEntry('hi', 'bye');
        expect(internalMapping._hi.type).toEqual('entry');
        expect(internalMapping._hi.value).toEqual('bye');
        expect(internalMapping._hi.styleClasses).toEqual('');
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
        expect(internalMapping._hi.styleClasses).toEqual('');
      });
    });

    describe('addMarkdownField', () => {
      const json = JSON.stringify({ hi: { type: 'entry', value: 'hello' } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addMarkdownField('hi', 'bye');

      it('sets the type and sets the value', () => {
        expect(internalMapping._hi.type).toEqual('markdown');
        expect(internalMapping._hi.value).toEqual('bye');
        expect(internalMapping._hi.styleClasses).toEqual('');
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
      internalMapping.removeEntry('hi');
      expect(internalMapping.hi).toBeUndefined();
      expect(internalMapping.keys()).not.toContain('hi');
    });
  });

  describe('addStyleClass', () => {
    it('adds style class to empty value', () => {
      const json = JSON.stringify({ hi: { type: 'entry', value: 'hello', styleClasses: '' } });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.addStyleClass('hi', styleClass);
      expect(internalMapping._hi.styleClasses).toEqual(styleClass);
    });

    it('adds style class to existing value', () => {
      const json = JSON.stringify({
        hi: { type: 'entry', value: 'hello', styleClasses: 'helloClass' }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.addStyleClass('hi', styleClass);
      expect(internalMapping._hi.styleClasses).toEqual('helloClass hiClass');
    });
  });

  describe('setStyleClasses', () => {
    it('adds style classes to empty value', () => {
      const json = JSON.stringify({ hi: { type: 'entry', value: 'hello', styleClasses: '' } });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.setStyleClasses('hi', styleClass);
      expect(internalMapping._hi.styleClasses).toEqual(styleClass);
    });

    it('overwrites an existing value', () => {
      const json = JSON.stringify({
        hi: { type: 'entry', value: 'hello', styleClasses: 'helloClass' }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.setStyleClasses('hi', styleClass);
      expect(internalMapping._hi.styleClasses).toEqual(styleClass);
    });
  });

  describe('removeStyleClass', () => {
    it('removes from empty value', () => {
      const json = JSON.stringify({ hi: { type: 'entry', value: 'hello', styleClasses: '' } });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.removeStyleClass('hi', styleClass);
      expect(internalMapping._hi.styleClasses).toEqual('');
    });

    it('removes style class from existing value', () => {
      const styleClass = 'hiClass';
      const json = JSON.stringify({
        hi: { type: 'entry', value: 'hello', styleClasses: styleClass }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClass('hi', styleClass);
      expect(internalMapping._hi.styleClasses).toEqual('');
    });

    it('removes style class from multiple existing values', () => {
      const styleClass = 'hiClass';
      const json = JSON.stringify({
        hi: { type: 'entry', value: 'hello', styleClasses: `helloClass ${styleClass}` }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClass('hi', styleClass);
      expect(internalMapping._hi.styleClasses).toEqual('helloClass');
    });
  });
});
