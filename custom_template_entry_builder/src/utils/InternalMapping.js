export const TEXT_MAPPING = 'text';
export const MARKDOWN_MAPPING = 'markdown';
export const ENTRY_MAPPING = 'entry';
import * as c from '../../../custom_templates/constants';

export default class InternalMapping {
  constructor(json) {
    const parsedJSON = this.loadInternalMapping(json);

    Object.keys(InternalMapping.blankMapping).forEach(key => {
      this[key] = parsedJSON[key] || InternalMapping.blankMapping[key];
    });

    Object.keys(parsedJSON.fieldRoles || {}).forEach(key => {
      if (key === 'styleClasses')
        throw new Error('Cannot name an entryRole "styleClasses". This is a reserved key.');
      this.fieldRoles[key] = parsedJSON.fieldRoles[key];

      this.defineGetterSetters(key);
    });
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

  static assetMapping({ type, assetType = '', value = '', assetUrl = '', formatting = {} } = {}) {
    return {
      type,
      assetType,
      value,
      assetUrl,
      formatting
    };
  }

  static get blankMapping() {
    return {
      fieldRoles: {},
      styleClasses: ''
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
          if (this.fieldRoles[key].type === InternalMapping.ASSET) {
            return InternalMapping.assetMapping({ ...this.fieldRoles[key] });
          } else {
            return InternalMapping.entryMapping({ ...this.fieldRoles[key] });
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

  addAsset(key, value, assetUrl, assetType, formatting) {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.assetMapping({
      type: InternalMapping.ASSET,
      value,
      assetUrl,
      assetType,
      formatting
    });
  }

  addEntry(key, value) {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({
      type: InternalMapping.ENTRY,
      value
    });
  }

  addTextField(key, value = '') {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({
      type: InternalMapping.TEXT,
      value
    });
  }

  addMarkdownField(key, value = '') {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({
      type: InternalMapping.MARKDOWN,
      value
    });
  }

  addField(key, type, value) {
    this.defineGetterSetters(key);
    this.fieldRoles[key] = InternalMapping.entryMapping({ type: type, value });
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
    return this.fieldRoles[key].type;
  }

  isEntry(key) {
    return this.fieldRoles[key].type === InternalMapping.ENTRY;
  }

  removeEntry(key) {
    delete this.fieldRoles[key];
    delete this[key];
  }
}
