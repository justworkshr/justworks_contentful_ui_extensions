import * as c from '../../../../customModules/constants';

import { removeByIndex } from '../../components/EntryBuilder/utils/index';

export default class ComponentMapping {
  constructor(json, templateConfig = { properties: {}, componentName: '' }) {
    /*
      json - string - the raw JSON of the ComponentMapping field
      templateConfig - object - the corresponding custom template config object from './customModules'

    */
    this._templateConfig = templateConfig;

    const parsedJSON = this.loadComponentMapping(json);

    this.assignRolesFromMapping(parsedJSON);
  }

  static entryMapping({ type, value = '', contentType = undefined } = {}) {
    return {
      type,
      contentType,
      value
    };
  }

  static assetMapping({ type, assetType = '', value = '', assetUrl = '' } = {}) {
    return {
      type,
      assetType,
      value,
      assetUrl
    };
  }

  static get blankMapping() {
    return {
      properties: {},
      componentName: ''
    };
  }

  loadComponentMapping(json) {
    // if blank
    if (!json || !typeof json === 'string') return ComponentMapping.blankMapping;
    // if malformed object
    const parsedJSON = JSON.parse(json);
    if (!parsedJSON.componentZones) return ComponentMapping.blankMapping;
    return parsedJSON;
  }

  assignRolesFromMapping(parsedJSON) {
    // Prepare the object structure: {componentName: {}, properties: {}}
    Object.keys(ComponentMapping.blankMapping).forEach(key => {
      this[key] = parsedJSON[key] || ComponentMapping.blankMapping[key];
    });
    // Load values from the entry's ComponentMapping Json
    Object.keys(parsedJSON.componentZones || {}).forEach(key => {
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
                return ComponentMapping.assetMapping({ ...entry });
              } else {
                return ComponentMapping.entryMapping({ ...entry });
              }
            });
          } else {
            if (this.componentZones[key].type === c.FIELD_TYPE_ASSET) {
              return ComponentMapping.assetMapping({ ...this.componentZones[key] });
            } else {
              return ComponentMapping.entryMapping({ ...this.componentZones[key] });
            }
          }
        },

        set: value => {
          if (this.componentZones[key].type === c.FIELD_TYPE_ASSET) {
            this.componentZones[key] = ComponentMapping.assetMapping({
              ...this.componentZones[key],
              value
            });
          } else {
            this.componentZones[key] = ComponentMapping.entryMapping({
              ...this.componentZones[key],
              value
            });
          }
        },
        configurable: true
      });
    }
  }

  addAsset(key, value, assetUrl, assetType) {
    this.defineGetterSetters(key);
    this.componentZones[key] = ComponentMapping.assetMapping({
      type: c.FIELD_TYPE_ASSET,
      value,
      assetUrl,
      assetType
    });
  }

  addEntry(key, value, contentType) {
    /*
     * key - string - the getter key of the internal mapping being assigned to
     * value - string - the ID of the contentful entry
     */
    this.defineGetterSetters(key);
    this.componentZones[key] = ComponentMapping.entryMapping({
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
        return ComponentMapping.assetMapping({
          type: c.FIELD_TYPE_ASSET,
          value: entry.value,
          assetUrl: entry.assetUrl,
          assetType: entry.assetType,
          formatting: entry.formatting
        });
      } else {
        return ComponentMapping.entryMapping({
          type: c.FIELD_TYPE_ENTRY,
          value: entry
        });
      }
    });

    if (Array.isArray((this.componentZones[key] || {}).value)) {
      valueArray = [...this.componentZones[key].value, ...valueArray];
    }

    this.componentZones[key] = ComponentMapping.entryMapping({
      type: c.FIELD_TYPE_MULTI_REFERENCE,
      value: valueArray
    });
  }

  addTextField({ key, value = '' } = {}) {
    this.defineGetterSetters(key);
    this.componentZones[key] = ComponentMapping.entryMapping({
      type: c.FIELD_TYPE_TITLE,
      value
    });
  }

  addMarkdownField({ key, value = '' } = {}) {
    this.defineGetterSetters(key);
    this.componentZones[key] = ComponentMapping.entryMapping({
      type: c.FIELD_TYPE_MARKDOWN,
      value
    });
  }

  addField({ key, type, value = '' } = {}) {
    this.defineGetterSetters(key);
    this.componentZones[key] = ComponentMapping.entryMapping({ type: type, value });
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
