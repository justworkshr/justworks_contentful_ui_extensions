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

    it('does not load fields if internalMapping is not blank', () => {
      const json = JSON.stringify({
        fieldRoles: {
          text_field: {
            type: c.FIELD_TYPE_TITLE,
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
              type: c.FIELD_TYPE_TITLE,
              defaultStyle: 'helloClass',
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

    it('loads existing style', () => {
      const templateConfig = {
        style: {},
        fieldRoles: {}
      };

      const styleSection = {
        hiProperty: {},
        hiProperty2: {}
      };

      const json = JSON.stringify({
        style: {
          hiSection: styleSection
        },
        fieldRoles: {}
      });
      expect(new InternalMapping(json, templateConfig).style).toEqual({
        hiSection: styleSection
      });
    });

    it('does not set default styles if already defined', () => {
      const templateConfig = { style: { hi: { defaultStyle: 'hiclass' } }, fieldRoles: {} };
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
      it('sets the type and sets the value, style, and contentType', () => {
        const json = JSON.stringify({
          fieldRoles: { hi: { type: c.FIELD_TYPE_TITLE, value: 'hello' } }
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
          fieldRoles: {
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
          fieldRoles: {
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
      const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
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
      const json = JSON.stringify({ fieldRoles: { hi: { type: 'entry', value: 'hello' } } });
      const internalMapping = new InternalMapping(json);

      internalMapping.addTextField({ key: 'hi', value: 'bye', styleClasses: 'text-left' });

      it('sets the type and sets the value', () => {
        expect(internalMapping.hi.type).toEqual(c.FIELD_TYPE_TITLE);
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
        fieldRoles: {
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

      const defaultStyle = 'defaultStyle';
      const templateConfig = {
        fieldRoles: {
          hi: {
            defaultStyle: defaultStyle
          }
        }
      };
      const internalMapping = new InternalMapping(json, templateConfig);
      internalMapping.addStyleCustom('hi');
      expect(internalMapping.hi.style.value).toEqual(defaultStyle);
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

  describe('setTemplateStyleValue', () => {
    it('adds a style value to empty templateStyleKey', () => {
      const templateStyleKey = 'default';
      const styleKey = 'color';
      const json = JSON.stringify({
        style: {}
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.setTemplateStyleValue(templateStyleKey, styleKey, 'hi');
      expect(internalMapping.style[templateStyleKey][styleKey]).toEqual('hi');
    });

    it('overwrtes style value in existing templateStyleKey', () => {
      const templateStyleKey = 'default';
      const styleKey = 'color';
      const json = JSON.stringify({
        style: {
          [templateStyleKey]: {
            [styleKey]: 'hello'
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.setTemplateStyleValue(templateStyleKey, styleKey, 'hi');
      expect(internalMapping.style[templateStyleKey][styleKey]).toEqual('hi');
    });
  });

  describe('removeTemplateStyleKey', () => {
    it('deletes a templateStyleKey', () => {
      const templateStyleKey = 'default';
      const styleKey = 'color';
      const json = JSON.stringify({
        style: {
          [templateStyleKey]: {
            [styleKey]: 'hi'
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeTemplateStyleKey(templateStyleKey, styleKey);
      expect(internalMapping.style[templateStyleKey]).toBeUndefined();
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

  describe('setStyleValue', () => {
    it('adds style classes to empty value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: { type: 'entry', value: 'hello', style: { type: c.STYLE_TYPE_CUSTOM, value: {} } }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleKey = 'color';
      const styleValue = 'hiValue';
      internalMapping.setStyleValue('hi', styleKey, styleValue);
      expect(internalMapping.hi.style.value[styleKey]).toEqual(styleValue);
    });

    it('overwrites an existing value', () => {
      const styleKey = 'color';

      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: InternalMapping.styleMapping({
              value: {
                [styleKey]: 'helloValue'
              }
            })
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      const styleValue = 'hiValue';
      internalMapping.setStyleValue('hi', styleKey, styleValue);
      expect(internalMapping.hi.style.value[styleKey]).toEqual(styleValue);
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
      internalMapping.setStyleValue('hi', styleClass);
      expect(internalMapping.hi.style).toEqual(styleLink);
    });
  });

  describe('setReferencesStyle', () => {
    it('adds style classes to empty value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            value: [
              { type: 'asset', value: 'hello', style: { type: c.STYLE_TYPE_CUSTOM, value: {} } },
              { type: 'asset', value: 'bye', style: { type: c.STYLE_TYPE_CUSTOM, value: {} } }
            ]
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.setReferencesStyle('hi', 'styleKey', 'styleValue');
      expect(internalMapping.hi.value[0].style.value['styleKey']).toEqual('styleValue');
      expect(internalMapping.hi.value[1].style.value['styleKey']).toEqual('styleValue');
    });
  });

  describe('addReferencesStyleCustom', () => {
    it('adds custom style to references', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            value: [
              { type: 'asset', value: 'hello', style: {} },
              { type: 'asset', value: 'bye', style: {} }
            ]
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.addReferencesStyleCustom('hi');
      expect(internalMapping.hi.value[0].style.type).toEqual(c.STYLE_TYPE_CUSTOM);
      expect(internalMapping.hi.value[1].style.type).toEqual(c.STYLE_TYPE_CUSTOM);
    });

    it('adds assetDefaultStyle to assets', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            value: [
              { type: 'asset', value: 'hello', style: {} },
              { type: 'asset', value: 'bye', style: {} }
            ]
          }
        }
      });

      const style = { styleKey: 'styleValue' };
      const templateConfig = {
        fieldRoles: {
          hi: {
            assetDefaultStyle: {
              ...style
            }
          }
        }
      };
      const internalMapping = new InternalMapping(json, templateConfig);
      internalMapping.addReferencesStyleCustom('hi');
      expect(internalMapping.hi.value[0].style.value).toEqual(style);
      expect(internalMapping.hi.value[1].style.value).toEqual(style);
    });
  });

  describe('clearRoleReferencesStyle', () => {
    it('removes style from references', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            value: [
              { type: 'asset', value: 'hello', style: { type: c.STYLE_TYPE_CUSTOM, value: {} } },
              { type: 'asset', value: 'bye', style: { type: c.STYLE_TYPE_CUSTOM, value: {} } }
            ]
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.clearRoleReferencesStyle('hi');
      expect(internalMapping.hi.value[0].style).toEqual(undefined);
      expect(internalMapping.hi.value[1].style).toEqual(undefined);
    });
  });

  describe('removeStyleKey', () => {
    it('removes from empty value', () => {
      const styleKey = 'color';
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: { type: c.STYLE_TYPE_CUSTOM, value: { [styleKey]: 'helloValue' } }
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleKey('hi', styleKey);
      expect(internalMapping.hi.style.value[styleKey]).toBeUndefined();
    });

    it('removes style class from existing value', () => {
      const styleKey = 'color';
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            type: 'entry',
            value: 'hello',
            style: InternalMapping.styleMapping({
              value: {
                [styleKey]: 'helloClass',
                otherKey: 'greetings'
              }
            })
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeStyleKey('hi', styleKey);
      expect(internalMapping.hi.style.value[styleKey]).toBeUndefined();
      expect(internalMapping.hi.style.value.otherKey).toEqual('greetings');
    });
  });

  describe('removeReferencesStyleKey', () => {
    it('removes style class from existing value', () => {
      const json = JSON.stringify({
        fieldRoles: {
          hi: {
            value: [
              {
                type: 'asset',
                style: InternalMapping.styleMapping({
                  value: {
                    styleKey: 'styleValue'
                  }
                })
              }
            ],
            style: {}
          }
        }
      });
      const internalMapping = new InternalMapping(json);
      internalMapping.removeReferencesStyleKey('hi', 'styleKey');
      expect(internalMapping.hi.value[0].style.value).toEqual({});
    });
  });

  describe('setAssetFormatting', () => {
    it('rejects when roleObject isnt an asset', () => {
      const json = JSON.stringify({
        fieldRoles: { hi: { type: 'field', value: 'hello' } }
      });
      const internalMapping = new InternalMapping(json);
      const imageObject = { w: 100 };

      expect(() => internalMapping.setAssetFormatting('hi', imageObject)).toThrow(
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
      internalMapping.setAssetFormatting('hi', imageObject);
      expect(internalMapping.hi.formatting).toEqual(imageObject);
    });
  });
});
