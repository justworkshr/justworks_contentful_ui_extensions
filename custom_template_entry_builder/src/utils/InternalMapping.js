export const TEXT_MAPPING = 'text';
export const MARKDOWN_MAPPING = 'markdown';
export const ENTRY_MAPPING = 'entry';

import { removeByIndex } from './index';

export default class InternalMapping {
  constructor(json, templateMapping = { style: {} }) {
    const parsedJSON = this.loadInternalMapping(json);

    Object.keys(InternalMapping.blankMapping).forEach(key => {
      this[key] = parsedJSON[key] || InternalMapping.blankMapping[key];
    });

    Object.keys(parsedJSON.fieldRoles || {}).forEach(key => {
      if (key === 'style')
        throw new Error('Cannot name an entryRole "style". This is a reserved key.');
      this.fieldRoles[key] = parsedJSON.fieldRoles[key];

      this.defineGetterSetters(key);
    });

    if (templateMapping.style) {
      Object.keys(templateMapping.style).forEach(styleSectionKey => {
        if (!templateMapping.style[styleSectionKey]) return;
        if (!this.style[styleSectionKey]) {
          this.style[styleSectionKey] = {};
          let classArray = [];

          Object.keys(templateMapping.style[styleSectionKey]).forEach(stylePropertyKey => {
            classArray.push(
              templateMapping.style[styleSectionKey][stylePropertyKey].defaultClasses
            );
          });

          this.style[styleSectionKey].styleClasses = classArray.join(' ');
        }
      });
    }
  }

  static get TEXT() {
    return 'text';
  }

  static get MARKDOWN() {
    return 'markdown';
  }

  static get ENTRY() {
    return 'entry';
  }

  static get ASSET() {
    return 'asset';
  }

  static get MULTI_REFERENCE() {
    return 'multi-reference';
  }

  static get FIELDSYS() {
    return 'Field';
  }

  static get ASSETSYS() {
    return 'Asset';
  }

  static entryMapping({ type, styleClasses = '', value = '' } = {}) {
    return {
      type,
      styleClasses,
      value
    };
  }

  static assetMapping({
    type,
    assetType = '',
    value = '',
    assetUrl = '',
    formatting = {},
    styleClasses = ''
  } = {}) {
    return {
      type,
      assetType,
      value,
      assetUrl,
      formatting,
      styleClasses
    };
  }

  static get blankMapping() {
    return {
      fieldRoles: {},
      style: {}
    };
  }

  loadInternalMapping(json) {
    if (!json || !typeof json === 'string') return InternalMapping.blankMapping;
    return JSON.parse(json);
  }

  defineGetterSetters(key) {
    if (!this.hasOwnProperty(key)) {
      Object.defineProperty(this, key, {
        get: () => {
          // if its an array, return array of mappings. Else, return direct object mapping.
          if (Array.isArray(this.fieldRoles[key])) {
            return this.fieldRoles[key].map(entry => {
              if (entry.type === InternalMapping.ASSET) {
                return InternalMapping.assetMapping({ ...entry });
              } else {
                return InternalMapping.entryMapping({ ...entry });
              }
            });
          } else {
            if (this.fieldRoles[key].type === InternalMapping.ASSET) {
              return InternalMapping.assetMapping({ ...this.fieldRoles[key] });
            } else {
              return InternalMapping.entryMapping({ ...this.fieldRoles[key] });
            }
          }
        },

        set: value => {
          if (this.fieldRoles[key].type === InternalMapping.ASSET) {
            this.fieldRoles[key] = InternalMapping.assetMapping({
              ...this.fieldRoles[key],
              value
            });
          } else {
            this.fieldRoles[key] = InternalMapping.entryMapping({
              ...this.fieldRoles[key],
              value
            });
          }
        },
        configurable: true
      });
    }
  }

  addAsset(key, value, assetUrl, assetType, formatting, styleClasses) {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.assetMapping({
      type: InternalMapping.ASSET,
      value,
      assetUrl,
      assetType,
      formatting,
      styleClasses
    });
  }

  addEntry(key, value) {
    /*
     * key - string - the getter key of the internal mapping being assigned to
     * value - string - the ID of the contentful entry
     */
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({
      type: InternalMapping.ENTRY,
      value
    });
  }

  addEntriesOrAssets({ key = '', value = [], styleClasses = '' } = {}) {
    /*
     * Adds an entry mapping to the key, unless the value of the key is an array. Then it adds the entries to the array.
     * key - string - the getter key of the internal mapping being assigned to
     * value - array<string> - an array of the ID strings of all the contentful entries
     * styleClasses - string - the style classes to apply to the multi-reference field
     */
    if (!Array.isArray(value)) throw new Error('Value for "addEntriesOrAssets" must be an array.');
    this.defineGetterSetters(key);

    let valueArray = value.map(entry => {
      if (entry.assetUrl) {
        return InternalMapping.assetMapping({
          type: InternalMapping.ASSET,
          value: entry.value,
          assetUrl: entry.assetUrl,
          assetType: entry.assetType,
          formatting: entry.formatting,
          styleClasses: entry.styleClasses
        });
      } else {
        return InternalMapping.entryMapping({
          type: InternalMapping.ENTRY,
          value: entry
        });
      }
    });

    if (Array.isArray((this.fieldRoles[key] || {}).value)) {
      valueArray = [...this.fieldRoles[key].value, ...valueArray];
    }

    this.fieldRoles[key] = InternalMapping.entryMapping({
      type: InternalMapping.MULTI_REFERENCE,
      value: valueArray,
      styleClasses: (this.fieldRoles[key] || {}).styleClasses || styleClasses
    });
  }

  addTextField({ key, value = '', styleClasses = '' } = {}) {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({
      type: InternalMapping.TEXT,
      value,
      styleClasses
    });
  }

  addMarkdownField({ key, value = '', styleClasses = '' } = {}) {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({
      type: InternalMapping.MARKDOWN,
      value,
      styleClasses
    });
  }

  addField(key, type, value = '', styleClasses = '') {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({ type: type, value, styleClasses });
  }

  setStyleClasses(key, styleClasses) {
    this.fieldRoles[key].styleClasses = styleClasses;
  }

  addStyleClass(key, styleClass) {
    const classes = this.fieldRoles[key].styleClasses.split(' ').filter(e => e);
    this.fieldRoles[key].styleClasses = [...classes, styleClass].join(' ');
  }

  removeStyleClass(key, styleClass) {
    const classes = this.fieldRoles[key].styleClasses
      .split(' ')
      .filter(e => e)
      .filter(cl => cl !== styleClass);
    this.fieldRoles[key].styleClasses = [...classes].join(' ');
  }

  removeStyleClasses(key, classArray) {
    if (classArray[0].className) {
      // if passed an array of classObjects instead of strings
      classArray = classArray.map(el => el.className);
    }
    const classes = this.fieldRoles[key].styleClasses
      .split(' ')
      .filter(e => e)
      .filter(cl => !classArray.includes(cl));
    this.fieldRoles[key].styleClasses = [...classes].join(' ');
  }

  setImageFormatting(key, formattingObject) {
    const roleObject = this.fieldRoles[key];

    if (roleObject.type !== InternalMapping.ASSET) {
      throw new Error('Can only format an image asset');
    }

    this.fieldRoles[key].formatting = formattingObject;
  }

  asJSON() {
    return JSON.stringify(
      Object.assign(
        {},
        ...Object.keys(this).map(key => {
          return {
            [key.charAt(0) === '_' ? key.slice(1) : key]: this[key]
          };
        })
      )
    );
  }

  fieldKeys() {
    return Object.keys(this.fieldRoles);
  }

  getType(key) {
    if (Array.isArray(this.fieldRoles[key])) {
      return InternalMapping.MULTI_REFERENCE;
    } else {
      return this.fieldRoles[key].type;
    }
  }

  isEntry(key) {
    return this.fieldRoles[key].type === InternalMapping.ENTRY;
  }

  removeEntry(key, entryIndex = null) {
    // Only remove the entry with the passed in sysId if it's a multi-reference array
    // Otherwise remove the entire key.
    if (Array.isArray((this.fieldRoles[key] || {}).value)) {
      this.fieldRoles[key].value = removeByIndex(this.fieldRoles[key].value, entryIndex);

      // delete key entirely if array is now empty
      if (!this.fieldRoles[key].value.length) {
        delete this.fieldRoles[key];
        delete this[key];
      }
    } else {
      delete this.fieldRoles[key];
      delete this[key];
    }
  }
}
