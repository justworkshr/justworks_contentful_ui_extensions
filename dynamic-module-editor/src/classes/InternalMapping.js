import * as c from '../../../customModules/constants';

import { removeByIndex } from '../components/EntryBuilder/utils/index';

export default class InternalMapping {
  constructor(json, templateConfig = { componentZones: {} }) {
    /*
      json - string - the raw JSON of the internalMapping field
      templateConfig - object - the corresponding custom template config object from './customModules'

    */
    this._templateConfig = templateConfig;

    const parsedJSON = this.loadInternalMapping(json);

    this.assignRolesFromMapping(parsedJSON);

    // Load template default style classes if none present
    // if (templateConfig.style) {
    //   Object.keys(templateConfig.style).forEach(styleSectionKey => {
    //     if (!templateConfig.style[styleSectionKey]) return;
    //     if (!this.style[styleSectionKey]) {
    //       this.style[styleSectionKey] = {};
    //       this.style[styleSectionKey] = parsedJSON.style[styleSectionKey];
    //     }
    //   });
    // }
  }

  static styleMapping({ type = c.STYLE_TYPE_CUSTOM, value = {} } = {}) {
    return {
      type,
      value
    };
  }

  static entryMapping({ type, value = '' } = {}) {
    return {
      type,
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

  static blankMapping(patternName = '') {
    return {
      patternName,
      componentZones: {}
    };
  }

  loadInternalMapping(json) {
    // if blank
    if (!json || !typeof json === 'string')
      return InternalMapping.blankMapping((this._templateConfig.meta || {}).patternName);
    // if malformed object
    const parsedJSON = JSON.parse(json);
    if (!parsedJSON.componentZones)
      return InternalMapping.blankMapping((this._templateConfig.meta || {}).patternName);
    return parsedJSON;
  }

  assignRolesFromMapping(parsedJSON) {
    // Prepare the object structure: {componentZones: {}, patternName: ''}
    Object.keys(
      InternalMapping.blankMapping((this._templateConfig.meta || {}).patternName)
    ).forEach(key => {
      this[key] =
        parsedJSON[key] ||
        InternalMapping.blankMapping((this._templateConfig.meta || {}).patternName)[key];
    });

    // Load values from the entry's internalMapping Json
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
            // return this.componentZones[key].map(entry => {
            //   if (entry.type === c.FIELD_TYPE_ASSET) {
            //     return InternalMapping.assetMapping({ ...entry });
            //   } else {
            //     return InternalMapping.entryMapping({ ...entry });
            //   }
            // });
          } else {
            return this.componentZones[key];
          }
        },

        set: value => {
          this.componentZones[key] = value;
        },
        configurable: true
      });
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

  // Can be:
  // - a linked ENTRY to a component module
  // - a linked ASSET as a component module
  // - a mapped set of FIELDS which are LINKED GENERIC ENTRIES or raw input
  // - a collection of linked ENTRIES and ASSETS to component modules
  // -

  /*
    Adds a component entry link to the component zone

    componentZones: {
      leftContent: {
        componentName: "foo",
        type: "entry",
        value: "id"
      }
    }
  */
  addEntry(mappingKey, id) {
    if (!this.componentZones[mappingKey].componentName)
      throw 'No componentName found on entry. Cannot add entry.';
    this.componentZones[mappingKey].type = c.FIELD_TYPE_ENTRY;
    this.componentZones[mappingKey].value = id;
  }

  removeEntry(key, entryIndex = null) {
    // Only remove the entry with the passed in sysId if it's a multi-reference array
    // Otherwise remove the entire key.
    if (Array.isArray((this.componentZones[key] || {}).value)) {
      this.componentZones[key].value = removeByIndex(this.componentZones[key].value, entryIndex);

      // delete key entirely if array is now empty
      if (!this.componentZones[key].value.length) {
        delete this.componentZones[key];
      }
    } else {
      delete this.componentZones[key];
    }
  }

  addComponentZone({ mappingKey, componentZoneName } = {}) {
    this.defineGetterSetters(mappingKey);

    // grabs existing componentConfig name
    this.componentZones[mappingKey] = {
      componentName: componentZoneName
    };
  }

  clearComponentZone({ mappingKey } = {}) {
    this.defineGetterSetters(mappingKey);

    delete this.componentZones[mappingKey];
  }
}
