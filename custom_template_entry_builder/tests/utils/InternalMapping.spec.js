import InternalMapping from '../../src/utils/InternalMapping';

describe('InternalMapping', () => {
  describe('constructor', () => {
    it('returns empty object if blank string', () => {
      const json = '';
      expect(new InternalMapping(json)).toEqual({ fieldRoles: {}, styleClasses: '' });
    });

    it('returns empty object if invalid', () => {
      const json = undefined;
      expect(new InternalMapping(json)).toEqual({ fieldRoles: {}, styleClasses: '' });
    });

    it('returns class', () => {
      const object = { fieldRoles: { hi: 'hello' } };
      const json = JSON.stringify(object);
      expect(new InternalMapping(json).constructor.name).toEqual('InternalMapping');
    });

    it('rejects an entryRole named "styleClasses"', () => {
      const object = { fieldRoles: { styleClasses: 'hello' } };
      const json = JSON.stringify(object);
      expect(() => new InternalMapping(json)).toThrow(
        'Cannot name an entryRole "styleClasses". This is a reserved key.'
      );
    });
  });

  describe('getters', () => {
    it('returns object value', () => {
      const object = { fieldRoles: { hi: { type: 'entry', value: 'hello' } } };
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
      it('preserves other attributes and sets the value', () => {
        const json = JSON.stringify({
          fieldRoles: { hi: { type: 'entry', value: 'hello', styleClasses: 'hiClass' } }
        });
        const internalMapping = new InternalMapping(json);

        internalMapping.hi = 'bye';

        expect(internalMapping.hi.type).toEqual('entry');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.styleClasses).toEqual('hiClass');
      });
    });

    describe('addEntry', () => {
      it('sets the type and sets the value and style', () => {
        const json = JSON.stringify({ fieldRoles: { hi: { type: 'text', value: 'hello' } } });
        const internalMapping = new InternalMapping(json);

        internalMapping.addEntry('hi', 'bye');
        expect(internalMapping.hi.type).toEqual('entry');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.styleClasses).toEqual('');
      });

      it('with blank start - sets the type and sets the value', () => {
        const json = JSON.stringify({});
        const internalMapping = new InternalMapping(json);
        internalMapping.addField('entry', 'hi');
        internalMapping.addEntry('hi', 'bye');
        expect(internalMapping.hi.type).toEqual('entry');
        expect(internalMapping.hi.value).toEqual('bye');
      });
    });

    describe('addTextField', () => {
      const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addTextField('hi', 'bye');

      it('sets the type and sets the value', () => {
        expect(internalMapping.hi.type).toEqual('text');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.styleClasses).toEqual('');
      });
    });

    describe('addMarkdownField', () => {
      const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addMarkdownField('hi', 'bye');

      it('sets the type and sets the value', () => {
        expect(internalMapping.hi.type).toEqual('markdown');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.styleClasses).toEqual('');
      });
    });
  });

  describe('asJSON', () => {
    const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
    const internalMapping = new InternalMapping(json);

    it('returns the class and properties as json', () => {
      expect(internalMapping.asJSON()).toEqual(
        '{"fieldRoles":{"hi":{"type":"entry","value":"hello"}},"styleClasses":""}'
      );
    });
  });

  describe('fieldKeys', () => {
    const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
    const internalMapping = new InternalMapping(json);

    it('returns the class and properties as json', () => {
      expect(internalMapping.fieldKeys()).toEqual(['hi']);
    });
  });

  describe('removeEntry', () => {
    const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
    const internalMapping = new InternalMapping(json);

    it('removes the role and key', () => {
      internalMapping.removeEntry('hi');
      expect(internalMapping.hi).toBeUndefined();
      expect(internalMapping.fieldKeys()).not.toContain('hi');
    });
  });

  describe('addStyleClass', () => {
    it('adds style class to empty value', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', styleClasses: '' } }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.addStyleClass('hi', styleClass);
      expect(internalMapping.hi.styleClasses).toEqual(styleClass);
    });

    it('adds style class to existing value', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', styleClasses: 'helloClass' } }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.addStyleClass('hi', styleClass);
      expect(internalMapping.hi.styleClasses).toEqual('helloClass hiClass');
    });
  });

  describe('setStyleClasses', () => {
    it('adds style classes to empty value', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', styleClasses: '' } }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.setStyleClasses('hi', styleClass);
      expect(internalMapping.hi.styleClasses).toEqual(styleClass);
    });

    it('overwrites an existing value', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', styleClasses: 'helloClass' } }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.setStyleClasses('hi', styleClass);
      expect(internalMapping.hi.styleClasses).toEqual(styleClass);
    });
  });

  describe('removeStyleClass', () => {
    it('removes from empty value', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', styleClasses: '' } }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.removeStyleClass('hi', styleClass);
      expect(internalMapping.hi.styleClasses).toEqual('');
    });

    it('removes style class from existing value', () => {
      const styleClass = 'hiClass';
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', styleClasses: styleClass } }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClass('hi', styleClass);
      expect(internalMapping.hi.styleClasses).toEqual('');
    });

    it('removes style class from multiple existing values', () => {
      const styleClass = 'hiClass';
      const json = JSON.stringify({
        fieldRoles: {
          hi: { type: 'entry', value: 'hello', styleClasses: `helloClass ${styleClass}` }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClass('hi', styleClass);
      expect(internalMapping.hi.styleClasses).toEqual('helloClass');
    });
  });

  describe('setImageFormatting', () => {
    it('rejects when roleObject isnt an asset', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'field', value: 'hello' } }
      });
      const internalMapping = new InternalMapping(json);
      const imageObject = { w: 100 };

      expect(() => internalMapping.setImageFormatting('hi', imageObject)).toThrow(
        'Can only format an image asset'
      );
    });

    it('adds formatting object to empty value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: { type: 'asset', assetType: 'image', value: 'hello', formatting: { w: 50 } }
        }
      });
      const internalMapping = new InternalMapping(json);
      const imageObject = { w: 100 };
      internalMapping.setImageFormatting('hi', imageObject);
      expect(internalMapping.hi.formatting).toEqual(imageObject);
    });
  });
});
