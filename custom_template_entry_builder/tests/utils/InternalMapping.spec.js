import InternalMapping from '../../src/utils/InternalMapping';

describe('InternalMapping', () => {
  describe('constructor', () => {
    it('returns empty object if blank string', () => {
      const json = '';
      expect(new InternalMapping(json)).toEqual({ fieldRoles: {}, style: {} });
    });

    it('returns empty object if invalid', () => {
      const json = undefined;
      expect(new InternalMapping(json)).toEqual({ fieldRoles: {}, style: {} });
    });

    it('returns class', () => {
      const object = { fieldRoles: { hi: 'hello' } };
      const json = JSON.stringify(object);
      expect(new InternalMapping(json).constructor.name).toEqual('InternalMapping');
    });

    it('sets default styles', () => {
      const templateMapping = {
        style: {
          hiSection: {
            hiProperty: { defaultClasses: 'hiclass' },
            hiProperty2: { defaultClasses: 'hiclass2 hiclass3' }
          }
        }
      };
      const json = JSON.stringify({ fieldRoles: {} });
      expect(new InternalMapping(json, templateMapping).style).toEqual({
        hiSection: { styleClasses: 'hiclass hiclass2 hiclass3' }
      });
    });

    it('does not set default styles if already defined', () => {
      const templateMapping = { style: { hi: { defaultClasses: 'hiclass' } } };
      const json = JSON.stringify({ fieldRoles: {}, style: { hi: { styleClasses: 'byeClass' } } });
      expect(new InternalMapping(json, templateMapping).style).toEqual({
        hi: { styleClasses: 'byeClass' }
      });
    });

    it('rejects an entryRole named "style"', () => {
      const object = { fieldRoles: { style: 'hello' } };
      const json = JSON.stringify(object);
      expect(() => new InternalMapping(json)).toThrow(
        'Cannot name an entryRole "style". This is a reserved key.'
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

      internalMapping.addTextField({ key: 'hi', value: 'bye', styleClasses: 'text-left' });

      it('sets the type and sets the value', () => {
        expect(internalMapping.hi.type).toEqual('text');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.styleClasses).toEqual('text-left');
      });
    });

    describe('addMarkdownField', () => {
      const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addMarkdownField({ key: 'hi', value: 'bye', styleClasses: 'text-left' });

      it('sets the type and sets the value', () => {
        expect(internalMapping.hi.type).toEqual('markdown');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.styleClasses).toEqual('text-left');
      });
    });
  });

  describe('asJSON', () => {
    const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
    const internalMapping = new InternalMapping(json);

    it('returns the class and properties as json', () => {
      expect(internalMapping.asJSON()).toEqual(
        '{"fieldRoles":{"hi":{"type":"entry","value":"hello"}},"style":{}}'
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

  describe('removeStyleClasses', () => {
    it('removes from empty value', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', styleClasses: '' } }
      });
      const internalMapping = new InternalMapping(json);
      const styleClasses = [{ className: 'hiClass' }];
      internalMapping.removeStyleClasses('hi', styleClasses.map(el => el.className));
      expect(internalMapping.hi.styleClasses).toEqual('');
    });

    it('removes style class from existing value', () => {
      const styleClasses = [{ className: 'hiClass' }, { className: 'class2' }];
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            styleClasses: styleClasses.map(el => el.className).join(' ')
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClasses('hi', styleClasses);
      expect(internalMapping.hi.styleClasses).toEqual('');
    });

    it('removes style class from existing value with string array', () => {
      const styleClasses = ['hiClass', 'class2'];
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            styleClasses: styleClasses.join(' ')
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClasses('hi', styleClasses);
      expect(internalMapping.hi.styleClasses).toEqual('');
    });

    it('removess style class from existing value 3', () => {
      const styleClasses = [{ className: 'hiClass' }, { className: 'class2' }];
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            styleClasses: [...styleClasses.map(el => el.className), 'class3'].join(' ')
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClasses('hi', styleClasses);
      expect(internalMapping.hi.styleClasses).toEqual('class3');
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
