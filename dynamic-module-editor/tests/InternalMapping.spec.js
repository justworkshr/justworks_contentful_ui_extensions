import InternalMapping from '../src/utils/InternalMapping';
import * as c from '../../custom_templates/constants';

describe('InternalMapping', () => {
  describe('constructor', () => {
    it('returns empty object if blank string', () => {
      const json = '';
      expect(new InternalMapping(json)).toEqual({
        _templateConfig: {
          style: {},
          fieldRoles: {}
        },
        fieldRoles: {},
        style: {}
      });
    });

    it('returns empty object if invalid', () => {
      const json = undefined;
      expect(new InternalMapping(json)).toEqual({
        _templateConfig: {
          style: {},
          fieldRoles: {}
        },
        fieldRoles: {},
        style: {}
      });
    });

    it('does not load fields if internalMapping is blank', () => {
      const json = JSON.stringify({
        fieldRoles: {},
        style: {}
      });

      const templateConfig = {
        style: {},
        fieldRoles: {
          text_field: {
            defaultClasses: 'helloClass',
            field: {
              type: 'text',
              defaultValue: 'TEXT!!!'
            }
          }
        }
      };

      const internalMapping = new InternalMapping(json, templateConfig);
      expect(internalMapping.text_field).toBeUndefined(undefined);
    });

    it('does not load fields if internalMapping is not blank', () => {
      const json = JSON.stringify({
        fieldRoles: {
          text_field: {
            type: 'text',
            value: 'occupied'
          }
        },
        style: {}
      });

      const templateConfig = {
        style: {},
        fieldRoles: {
          text_field: {
            field: {
              type: 'text',
              defaultClasses: 'helloClass',
              defaultValue: 'TEXT!!!'
            }
          }
        }
      };

      const internalMapping = new InternalMapping(json, templateConfig);
      expect(internalMapping.text_field.value).toEqual('occupied');
    });

    it('returns class', () => {
      const object = { fieldRoles: { hi: 'hello' } };
      const json = JSON.stringify(object);
      expect(new InternalMapping(json).constructor.name).toEqual('InternalMapping');
    });

    it('sets default styles', () => {
      const templateConfig = {
        style: {
          hiSection: {
            hiProperty: { defaultClasses: 'hiclass' },
            hiProperty2: { defaultClasses: 'hiclass2 hiclass3' }
          }
        },
        fieldRoles: {}
      };
      const json = JSON.stringify({ fieldRoles: {} });
      expect(new InternalMapping(json, templateConfig).style).toEqual({
        hiSection: { styleClasses: 'hiclass hiclass2 hiclass3' }
      });
    });

    it('does not set default styles if already defined', () => {
      const templateConfig = { style: { hi: { defaultClasses: 'hiclass' } }, fieldRoles: {} };
      const json = JSON.stringify({ fieldRoles: {}, style: { hi: { styleClasses: 'byeClass' } } });
      expect(new InternalMapping(json, templateConfig).style).toEqual({
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
          fieldRoles: {
            hi: {
              type: 'entry',
              value: 'hello',
              style: InternalMapping.styleMapping({ value: styleClass })
            }
          }
        });
        const internalMapping = new InternalMapping(json);

        internalMapping.hi = 'bye';

        expect(internalMapping.hi.type).toEqual('entry');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.style.value).toEqual(styleClass);
      });
    });

    describe('addEntry', () => {
      it('sets the type and sets the value and style', () => {
        const json = JSON.stringify({ fieldRoles: { hi: { type: 'text', value: 'hello' } } });
        const internalMapping = new InternalMapping(json);

        internalMapping.addEntry('hi', 'bye');
        expect(internalMapping.hi.type).toEqual('entry');
        expect(internalMapping.hi.value).toEqual('bye');
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
          fieldRoles: {
            hi: {
              type: 'text',
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
          fieldRoles: {
            hi: { type: 'text', value: [{ type: 'entry', style: undefined, value: 'hello' }] }
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
      const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addField({
        key: 'hi',
        type: 'text',
        value: 'bye'
      });

      it('sets the type, value, and classes for the key', () => {
        expect(internalMapping.hi.type).toEqual('text');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.style).toBeUndefined();
      });
    });

    describe('addTextField', () => {
      const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addTextField({ key: 'hi', value: 'bye', styleClasses: 'text-left' });

      it('sets the type and sets the value', () => {
        expect(internalMapping.hi.type).toEqual('text');
        expect(internalMapping.hi.value).toEqual('bye');
        expect(internalMapping.hi.style).toBeUndefined();
      });
    });

    describe('addMarkdownField', () => {
      const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
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
    it('removes the role and key', () => {
      const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeEntry('hi');
      expect(internalMapping.hi).toBeUndefined();
      expect(internalMapping.fieldKeys()).not.toContain('hi');
    });

    it('only removes the entry with passed in ID if the entry value is an array', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'text',
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
        fieldRoles: {
          hi: {
            type: 'text',
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

  describe('addStyleCustom', () => {
    it('adds a blank styleMapping', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', style: undefined } }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.addStyleCustom('hi');
      expect(internalMapping.hi.style).toEqual(InternalMapping.styleMapping());
    });

    it('adds default classes if templateConfig designates', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', style: undefined } }
      });

      const defaultClass = 'defaultClass';
      const templateConfig = {
        fieldRoles: {
          hi: {
            defaultClasses: defaultClass
          }
        }
      };
      const internalMapping = new InternalMapping(json, templateConfig);
      internalMapping.addStyleCustom('hi');
      expect(internalMapping.hi.style.value).toEqual(defaultClass);
    });
  });

  describe('clearRoleStyle', () => {
    it('adds a blank styleMapping', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: { type: c.STYLE_TYPE_CUSTOM, value: 'helloClass' }
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      expect(internalMapping.hi.style.value).toEqual('helloClass');
      internalMapping.clearRoleStyle('hi');
      expect(internalMapping.hi.style).toEqual(undefined);
    });
  });

  describe('setStyleEntry', () => {
    it('adds a style entry link', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', style: undefined } }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.setStyleEntry('hi', '1');
      expect(internalMapping.hi.style.type).toEqual(c.STYLE_TYPE_ENTRY);
      expect(internalMapping.hi.style.value).toEqual('1');
    });
  });

  describe('addStyleClass', () => {
    it('adds style class to empty value', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'entry', value: 'hello', style: InternalMapping.styleMapping() } }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.addStyleClass('hi', styleClass);
      expect(internalMapping.hi.style.value).toEqual(styleClass);
    });

    it('adds style class to existing value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: InternalMapping.styleMapping({ value: 'helloClass' })
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.addStyleClass('hi', styleClass);
      expect(internalMapping.hi.style.value).toEqual('helloClass hiClass');
    });

    it('does not replace a linked style', () => {
      const styleLink = InternalMapping.styleMapping({ type: 'entry', value: '1' });
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: styleLink
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.addStyleClass('hi', styleClass);
      expect(internalMapping.hi.style).toEqual(styleLink);
    });
  });

  describe('setStyleClasses', () => {
    it('adds style classes to empty value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: { type: 'entry', value: 'hello', style: { type: c.STYLE_TYPE_CUSTOM, value: '' } }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.setStyleClasses('hi', styleClass);
      expect(internalMapping.hi.style.value).toEqual(styleClass);
    });

    it('overwrites an existing value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: InternalMapping.styleMapping({ value: 'helloClass' })
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.setStyleClasses('hi', styleClass);
      expect(internalMapping.hi.style.value).toEqual(styleClass);
    });

    it('does not replace a linked style', () => {
      const styleLink = InternalMapping.styleMapping({ type: 'entry', value: '1' });
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: styleLink
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.setStyleClasses('hi', styleClass);
      expect(internalMapping.hi.style).toEqual(styleLink);
    });
  });

  describe('setReferencesStyleClasses', () => {
    it('adds style classes to empty value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            value: [
              { type: 'entry', value: 'hello', style: {} },
              { type: 'entry', value: 'bye', style: {} }
            ]
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.setReferencesStyleClasses('hi', styleClass);
      expect(internalMapping.hi.value[0].style.value).toEqual(styleClass);
      expect(internalMapping.hi.value[1].style.value).toEqual(styleClass);
    });

    it('overwrites an existing value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            value: [
              {
                type: 'entry',
                value: 'hello',
                style: InternalMapping.styleMapping({ value: 'helloClass' })
              },
              {
                type: 'entry',
                value: 'bye',
                style: InternalMapping.styleMapping({ value: 'helloClass' })
              }
            ]
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.setReferencesStyleClasses('hi', styleClass);
      expect(internalMapping.hi.value[0].style.value).toEqual(styleClass);
      expect(internalMapping.hi.value[1].style.value).toEqual(styleClass);
    });
  });

  describe('removeStyleClass', () => {
    it('removes from empty value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: { type: 'entry', value: 'hello', style: { type: c.STYLE_TYPE_CUSTOM, value: '' } }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleClass = 'hiClass';
      internalMapping.removeStyleClass('hi', styleClass);
      expect(internalMapping.hi.style.value).toEqual('');
    });

    it('removes style class from existing value', () => {
      const styleClass = 'hiClass';
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: InternalMapping.styleMapping({ value: styleClass })
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClass('hi', styleClass);
      expect(internalMapping.hi.style.value).toEqual('');
    });

    it('removes style class from multiple existing values', () => {
      const styleClass = 'hiClass';
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: InternalMapping.styleMapping({ value: `helloClass ${styleClass}` })
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClass('hi', styleClass);
      expect(internalMapping.hi.style.value).toEqual('helloClass');
    });
  });

  describe('removeStyleClasses', () => {
    it('removes from empty value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: { type: 'entry', value: 'hello', style: { type: c.STYLE_TYPE_CUSTOM, value: '' } }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleClasses = [{ className: 'hiClass' }];
      internalMapping.removeStyleClasses(
        'hi',
        styleClasses.map(el => el.className)
      );
      expect(internalMapping.hi.style.value).toEqual('');
    });

    it('removes style class from existing value', () => {
      const styleClasses = [{ className: 'hiClass' }, { className: 'class2' }];
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: InternalMapping.styleMapping({
              value: styleClasses.map(el => el.className).join(' ')
            })
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClasses('hi', styleClasses);
      expect(internalMapping.hi.style.value).toEqual('');
    });

    it('removes style class from existing value with string array', () => {
      const styleClasses = ['hiClass', 'class2'];
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: InternalMapping.styleMapping({ value: styleClasses.join(' ') })
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClasses('hi', styleClasses);
      expect(internalMapping.hi.style.value).toEqual('');
    });

    it('removes style class from existing value 3', () => {
      const styleClasses = [{ className: 'hiClass' }, { className: 'class2' }];
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: InternalMapping.styleMapping({
              value: [...styleClasses.map(el => el.className), 'class3'].join(' ')
            })
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleClasses('hi', styleClasses);
      expect(internalMapping.hi.style.value).toEqual('class3');
    });
  });

  describe('removeReferencesStyleClasses', () => {
    it('removes from empty value', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { style: {}, value: [{ type: 'asset', style: {} }] } }
      });
      const internalMapping = new InternalMapping(json);
      const styleClasses = [{ className: 'hiClass' }];
      internalMapping.removeReferencesStyleClasses(
        'hi',
        styleClasses.map(el => el.className)
      );
      expect(internalMapping.hi.value[0].style.value).toEqual('');
    });

    it('removes style class from existing value', () => {
      const styleClasses = [{ className: 'hiClass' }, { className: 'class2' }];
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            value: [
              {
                type: 'asset',
                style: InternalMapping.styleMapping({
                  value: styleClasses.map(el => el.className).join(' ')
                })
              }
            ],
            style: {}
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeReferencesStyleClasses('hi', styleClasses);
      expect(internalMapping.hi.value[0].style.value).toEqual('');
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
