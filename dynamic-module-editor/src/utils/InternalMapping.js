import * as c from '../../../customModules/constants';

import { removeByIndex } from '../components/EntryBuilder/utils/index';

export default class InternalMapping {
  constructor(json, templateConfig = { style: {}, componentZones: {} }) {
    /*
      json - string - the raw JSON of the internalMapping field
      templateConfig - object - the corresponding custom template config object from './customModules'

    */
    this._templateConfig = templateConfig;

    const parsedJSON = this.loadInternalMapping(json);

    this.assignRolesFromMapping(parsedJSON);

    // Load template default style classes if none present
    if (templateConfig.style) {
      Object.keys(templateConfig.style).forEach(styleSectionKey => {
        if (!templateConfig.style[styleSectionKey]) return;
        if (!this.style[styleSectionKey]) {
          this.style[styleSectionKey] = {};
          this.style[styleSectionKey] = parsedJSON.style[styleSectionKey];
        }
      });
    }
  }

  static styleMapping({ type = c.STYLE_TYPE_CUSTOM, value = {} } = {}) {
    return {
      type,
      value
    };
  }

  static entryMapping({ type, style = undefined, value = '', contentType = undefined } = {}) {
    return {
      type,
      style,
      contentType,
      value
    };
  }

  static assetMapping({
    type,
    assetType = '',
    value = '',
    assetUrl = '',
    formatting = {},
    style = undefined
  } = {}) {
    return {
      type,
      assetType,
      value,
      assetUrl,
      formatting,
      style
    };
  }

  static get blankMapping() {
    return {
      componentZones: {},
      style: {}
    };
  }

  loadInternalMapping(json) {
    // if blank
    if (!json || !typeof json === 'string') return InternalMapping.blankMapping;
    // if malformed object
    const parsedJSON = JSON.parse(json);
    if (!parsedJSON.componentZones) return InternalMapping.blankMapping;
    return parsedJSON;
  }

  assignRolesFromMapping(parsedJSON) {
    // Prepare the object structure: {componentZones: {}, style: {}}
    Object.keys(InternalMapping.blankMapping).forEach(key => {
      this[key] = parsedJSON[key] || InternalMapping.blankMapping[key];
    });
    // Load values from the entry's internalMapping Json
    Object.keys(parsedJSON.componentZones || {}).forEach(key => {
      if (key === 'style')
        throw new Error('Cannot name an entryRole "style". This is a reserved key.');
      this.componentZones[key] = parsedJSON.componentZones[key];
      this.defineGetterSetters(key);
    });
  }

  defineGetterSetters(key) {
    if (!this.hasOwnProperty(key)) {
      Object.defineProperty(this, key, {
        get: () => {
          // if its an array, return array of mappings. Else, return direct object mapping.
          if (Array.isArray(this.componentZones[key])) {
            return this.componentZones[key].map(entry => {
              if (entry.type === c.FIELD_TYPE_ASSET) {
                return InternalMapping.assetMapping({ ...entry });
              } else {
                return InternalMapping.entryMapping({ ...entry });
              }
            });
          } else {
            if (this.componentZones[key].type === c.FIELD_TYPE_ASSET) {
              return InternalMapping.assetMapping({ ...this.componentZones[key] });
            } else {
              return InternalMapping.entryMapping({ ...this.componentZones[key] });
            }
          }
        },

        set: value => {
          if (this.componentZones[key].type === c.FIELD_TYPE_ASSET) {
            this.componentZones[key] = InternalMapping.assetMapping({
              ...this.componentZones[key],
              value
            });
          } else {
            this.componentZones[key] = InternalMapping.entryMapping({
              ...this.componentZones[key],
              value
            });
          }
        },
        configurable: true
      });
    }
  }

  addAsset(key, value, assetUrl, assetType, style) {
    this.defineGetterSetters(key);
    this.componentZones[key] = InternalMapping.assetMapping({
      type: c.FIELD_TYPE_ASSET,
      value,
      assetUrl,
      assetType,
      style
    });
  }

  addEntry(key, value, contentType) {
    /*
     * key - string - the getter key of the internal mapping being assigned to
     * value - string - the ID of the contentful entry
     */
    this.defineGetterSetters(key);
    this.componentZones[key] = InternalMapping.entryMapping({
      type: c.FIELD_TYPE_ENTRY,
      value,
      contentType
    });
  }

  addEntriesOrAssets({ key = '', value = [] } = {}) {
    /*
     * Adds an entry mapping to the key, unless the value of the key is an array. Then it adds the entries to the array.
     * key - string - the getter key of the internal mapping being assigned to
     * value - array<string> - an array of the ID strings of all the contentful entries
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
          style: entry.style
        });
      } else {
        return InternalMapping.entryMapping({
          type: c.FIELD_TYPE_ENTRY,
          value: entry
        });
      }
    });

    if (Array.isArray((this.componentZones[key] || {}).value)) {
      valueArray = [...this.componentZones[key].value, ...valueArray];
    }

    this.componentZones[key] = InternalMapping.entryMapping({
      type: c.FIELD_TYPE_MULTI_REFERENCE,
      value: valueArray,
      style: (this.componentZones[key] || {}).style
    });
  }

  addTextField({ key, value = '' } = {}) {
    this.defineGetterSetters(key);
    this.componentZones[key] = InternalMapping.entryMapping({
      type: c.FIELD_TYPE_TITLE,
      value
    });
  }

  addMarkdownField({ key, value = '' } = {}) {
    this.defineGetterSetters(key);
    this.componentZones[key] = InternalMapping.entryMapping({
      type: c.FIELD_TYPE_MARKDOWN,
      value
    });
  }

  addField({ key, type, value = '' } = {}) {
    this.defineGetterSetters(key);
    this.componentZones[key] = InternalMapping.entryMapping({ type: type, value });
  }

  addFieldToRole(roleKey, fieldType) {
    const roleConfigObject = this._templateConfig.componentZones[roleKey];
    switch (fieldType) {
      case c.FIELD_TYPE_TITLE:
        this.addTextField({
          key: roleKey
        });
        break;
      case c.FIELD_TYPE_MARKDOWN:
        this.addMarkdownField({
          key: roleKey
        });
        break;
      default:
        break;
    }
  }

  addStyleCustom(key, fieldConfig = {}) {
    this.componentZones[key].style = InternalMapping.styleMapping({
      type: c.STYLE_TYPE_CUSTOM,
      value: fieldConfig.defaultStyle
    });
  }

  clearRoleStyle(key) {
    this.componentZones[key].style = undefined;
  }

  setStyleEntry(key, entryId) {
    this.componentZones[key].style = InternalMapping.styleMapping({
      type: c.STYLE_TYPE_ENTRY,
      value: entryId
    });
  }

  setStyleValue(key, styleKey, styleValue) {
    if (!this.componentZones[key].style) this.componentZones[key].style = {};
    if (this.componentZones[key].style.type === c.STYLE_TYPE_CUSTOM) {
      this.componentZones[key].style.value[styleKey] = styleValue;
    }
  }

  setTemplateStyleValue(templateStyleKey, styleKey, styleValue) {
    if (!this.style) this.style = {};
    if (!this.style[templateStyleKey]) {
      this.style[templateStyleKey] = {};
    }

    this.style[templateStyleKey][styleKey] = styleValue;
  }

  addReferencesStyleCustom(key, fieldConfigObject = {}) {
    this.componentZones[key].value = this.componentZones[key].value.map(asset => {
      if (asset.type !== c.FIELD_TYPE_ASSET) return; // only update assets
      if (!asset.style) asset.style = {};
      asset.style = InternalMapping.styleMapping({
        type: c.STYLE_TYPE_CUSTOM,
        value: fieldConfigObject.assetDefaultStyle
      });
      return asset;
    });
    this.componentZones[key];
  }

  setReferencesStyleEntry(key, entryId) {
    this.componentZones[key].value = this.componentZones[key].value.map(asset => {
      if (asset.type !== c.FIELD_TYPE_ASSET) return; // only update assets
      if (!asset.style) asset.style = {};
      asset.style = InternalMapping.styleMapping({
        type: c.STYLE_TYPE_ENTRY,
        value: entryId
      });
      return asset;
    });
  }

  setReferencesStyle(key, styleKey, styleValue) {
    this.componentZones[key].value = this.componentZones[key].value.map(asset => {
      if (asset.type !== c.FIELD_TYPE_ASSET) return; // only update assets
      if (!asset.style) asset.style = {};
      asset.style.value[styleKey] = styleValue;
      return asset;
    });
  }

  clearRoleReferencesStyle(key) {
    this.componentZones[key].value = this.componentZones[key].value.map(asset => {
      if (asset.type !== c.FIELD_TYPE_ASSET) return; // only update assets
      if (!asset.style) asset.style = {};
      asset.style = undefined;
      return asset;
    });
  }

  removeReferencesStyleKey(key, styleKey) {
    this.componentZones[key].value = this.componentZones[key].value.map(entry => {
      if (entry.type === c.FIELD_TYPE_ASSET) {
        delete entry.style.value[styleKey];
      }

      return entry;
    });
  }

  removeStyleKey(key, styleKey) {
    if (!this.componentZones[key].style) return;
    if (this.componentZones[key].style.type === c.STYLE_TYPE_CUSTOM) {
      delete this.componentZones[key].style.value[styleKey];
    }
  }

  removeTemplateStyleKey(templateStyleKey, styleKey) {
    if (!this.componentZones.style) return;
    if (!this.componentZones.style[templateStyleKey]) return;
    delete this.style[templateStyleKey][styleKey];
  }

  setAssetFormatting(key, formattingObject) {
    const roleObject = this.componentZones[key];

    if (roleObject.type !== c.FIELD_TYPE_ASSET) {
      throw new Error('Can only format an image asset');
    }

    this.componentZones[key].formatting = formattingObject;
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
    return Object.keys(this.componentZones);
  }

  getType(key) {
    if (Array.isArray(this.componentZones[key])) {
      return c.FIELD_TYPE_MULTI_REFERENCE;
    } else {
      return this.componentZones[key].type;
    }
  }

  isEntry(key) {
    return this.componentZones[key].type === c.FIELD_TYPE_ENTRY;
  }

  removeEntry(key, entryIndex = null) {
    // Only remove the entry with the passed in sysId if it's a multi-reference array
    // Otherwise remove the entire key.
    if (Array.isArray((this.componentZones[key] || {}).value)) {
      this.componentZones[key].value = removeByIndex(this.componentZones[key].value, entryIndex);

      // delete key entirely if array is now empty
      if (!this.componentZones[key].value.length) {
        delete this.componentZones[key];
        delete this[key];
      }
    } else {
      delete this.componentZones[key];
      delete this[key];
    }
  }

  switchMultiReferenceValues({ roleKey, draggedIndex, draggedOverIndex } = {}) {
    if (!Array.isArray(this.componentZones[roleKey].value)) return;
    const array = this.componentZones[roleKey].value;

    [array[draggedIndex], array[draggedOverIndex]] = [array[draggedOverIndex], array[draggedIndex]];

    this.componentZones[roleKey].value = array;
  }
}
