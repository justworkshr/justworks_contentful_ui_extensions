import * as c from '../../../custom_templates/constants';

import { removeByIndex } from '../components/EntryBuilder/utils/index';

export default class InternalMapping {
  constructor(json, templateConfig = { style: {}, fieldRoles: {} }) {
    /*
      json - string - the raw JSON of the internalMapping field
      templateConfig - object - the corresponding custom template config object from './customTemplates'

    */
    this._templateConfig = templateConfig;

    const parsedJSON = this.loadInternalMapping(json);

    this.assignRolesFromMapping(parsedJSON);

    // Load default style classes if none present
    if (templateConfig.style) {
      Object.keys(templateConfig.style).forEach(styleSectionKey => {
        if (!templateConfig.style[styleSectionKey]) return;
        if (!this.style[styleSectionKey]) {
          this.style[styleSectionKey] = {};
          let classArray = [];

          Object.keys(templateConfig.style[styleSectionKey]).forEach(stylePropertyKey => {
            classArray.push(templateConfig.style[styleSectionKey][stylePropertyKey].defaultClasses);
          });

          this.style[styleSectionKey].styleClasses = classArray.join(' ');
        }
      });
    }

    // load default fields if internalMapping role is blank and the roleConfig allows a field.
    // if (parsedJSON && this._templateConfig) {
    //   Object.keys(this._templateConfig.fieldRoles).forEach(roleKey => {
    //     const roleConfigObject = this._templateConfig.fieldRoles[roleKey];
    //     if (!parsedJSON.fieldRoles[roleKey] && roleConfigObject.field) {
    //       const field = roleConfigObject.field;
    //       this.addField({
    //         key: roleKey,
    //         type: field.type,
    //         value: field.defaultValue,
    //         styleClasses: roleConfigObject.defaultClasses
    //       });
    //     }
    //   });
    // }
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
    // if blank
    if (!json || !typeof json === 'string') return InternalMapping.blankMapping;
    // if malformed object
    const parsedJSON = JSON.parse(json);
    if (!parsedJSON.fieldRoles) return InternalMapping.blankMapping;
    return parsedJSON;
  }

  assignRolesFromMapping(parsedJSON) {
    // Prepare the blank object structure: {fieldRoles: {}, style: {}}
    Object.keys(InternalMapping.blankMapping).forEach(key => {
      this[key] = parsedJSON[key] || InternalMapping.blankMapping[key];
    });
    // Load values from the entry's internalMapping Json
    Object.keys(parsedJSON.fieldRoles || {}).forEach(key => {
      if (key === 'style')
        throw new Error('Cannot name an entryRole "style". This is a reserved key.');
      this.fieldRoles[key] = parsedJSON.fieldRoles[key];
      this.defineGetterSetters(key);
    });
  }

  defineGetterSetters(key) {
    if (!this.hasOwnProperty(key)) {
      Object.defineProperty(this, key, {
        get: () => {
          // if its an array, return array of mappings. Else, return direct object mapping.
          if (Array.isArray(this.fieldRoles[key])) {
            return this.fieldRoles[key].map(entry => {
              if (entry.type === c.FIELD_TYPE_ASSET) {
                return InternalMapping.assetMapping({ ...entry });
              } else {
                return InternalMapping.entryMapping({ ...entry });
              }
            });
          } else {
            if (this.fieldRoles[key].type === c.FIELD_TYPE_ASSET) {
              return InternalMapping.assetMapping({ ...this.fieldRoles[key] });
            } else {
              return InternalMapping.entryMapping({ ...this.fieldRoles[key] });
            }
          }
        },

        set: value => {
          if (this.fieldRoles[key].type === c.FIELD_TYPE_ASSET) {
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
      type: c.FIELD_TYPE_ASSET,
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
      type: c.FIELD_TYPE_ENTRY,
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
          type: c.FIELD_TYPE_ASSET,
          value: entry.value,
          assetUrl: entry.assetUrl,
          assetType: entry.assetType,
          formatting: entry.formatting,
          styleClasses: entry.styleClasses
        });
      } else {
        return InternalMapping.entryMapping({
          type: c.FIELD_TYPE_ENTRY,
          value: entry
        });
      }
    });

    if (Array.isArray((this.fieldRoles[key] || {}).value)) {
      valueArray = [...this.fieldRoles[key].value, ...valueArray];
    }

    this.fieldRoles[key] = InternalMapping.entryMapping({
      type: c.FIELD_TYPE_MULTI_REFERENCE,
      value: valueArray,
      styleClasses: (this.fieldRoles[key] || {}).styleClasses || styleClasses
    });
  }

  addTextField({ key, value = '', styleClasses = '' } = {}) {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({
      type: c.FIELD_TYPE_TEXT,
      value,
      styleClasses
    });
  }

  addMarkdownField({ key, value = '', styleClasses = '' } = {}) {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({
      type: c.FIELD_TYPE_MARKDOWN,
      value,
      styleClasses
    });
  }

  addField({ key, type, value = '', styleClasses = '' } = {}) {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({ type: type, value, styleClasses });
  }

  addFieldToRole(roleKey, fieldType) {
    const roleConfigObject = this._templateConfig.fieldRoles[roleKey];
    switch (fieldType) {
      case c.FIELD_TYPE_TEXT:
        this.addTextField({
          key: roleKey,
          styleClasses: roleConfigObject.defaultClasses
        });
        break;
      case c.FIELD_TYPE_MARKDOWN:
        this.addMarkdownField({
          key: roleKey,
          styleClasses: roleConfigObject.defaultClasses
        });
        break;
      default:
        break;
    }
  }

  setStyleClasses(key, styleClasses) {
    this.fieldRoles[key].styleClasses = styleClasses;
  }

  setReferencesStyleClasses(key, styleClasses) {
    if (!this.fieldRoles[key].value) return;
    this.fieldRoles[key].value = this.fieldRoles[key].value.map(entry => {
      entry.styleClasses = styleClasses;
      return entry;
    });
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

  removeReferencesStyleClasses(key, classArray) {
    if (classArray[0].className) {
      // if passed an array of classObjects instead of strings
      classArray = classArray.map(el => el.className);
    }

    this.fieldRoles[key].value = this.fieldRoles[key].value.map(entry => {
      const classes = entry.styleClasses
        .split(' ')
        .filter(e => e)
        .filter(cl => !classArray.includes(cl));

      entry.styleClasses = [...classes].join(' ');
      return entry;
    });
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

    if (roleObject.type !== c.FIELD_TYPE_ASSET) {
      throw new Error('Can only format an image asset');
    }

    this.fieldRoles[key].formatting = formattingObject;
  }

  asJSON() {
    return JSON.stringify(
      Object.assign(
        {},
        ...Object.keys(this).map(key => {
          if (key === '_templateConfig') return; // Skip templateConfig object
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
      return c.FIELD_TYPE_MULTI_REFERENCE;
    } else {
      return this.fieldRoles[key].type;
    }
  }

  isEntry(key) {
    return this.fieldRoles[key].type === c.FIELD_TYPE_ENTRY;
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