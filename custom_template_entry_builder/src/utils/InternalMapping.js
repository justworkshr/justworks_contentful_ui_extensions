export const TEXT_MAPPING = 'text';
export const MARKDOWN_MAPPING = 'markdown';
export const ENTRY_MAPPING = 'entry';

export default class InternalMapping {
  constructor(json) {
    const object = this.loadInternalMapping(json);
    Object.keys(object).forEach(key => {
      this[`_${key}`] = object[key];

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

  loadInternalMapping(json) {
    if (!json || !typeof json === 'string') return {};
    return JSON.parse(json);
  }

  defineGetterSetters(key) {
    if (!this.hasOwnProperty(key)) {
      Object.defineProperty(this, key, {
        get: () => {
          return InternalMapping.entryMapping({ ...this[`_${key}`] });
        },

        set: value => {
          this[`_${key}`] = InternalMapping.entryMapping({
            type: this[`_${key}`].type,
            style: this[`_${key}`].style,
            value
          });
        },
        configurable: true
      });
    }
  }

  addAsset(key, value) {
    this.defineGetterSetters(key);
    this[`_${key}`] = InternalMapping.entryMapping({ type: InternalMapping.ASSET, value });
  }

  addEntry(key, value) {
    this.defineGetterSetters(key);
    this[`_${key}`] = InternalMapping.entryMapping({ type: InternalMapping.ENTRY, value });
  }

  addTextField(key, value = '') {
    this.defineGetterSetters(key);
    this[`_${key}`] = InternalMapping.entryMapping({ type: InternalMapping.TEXT, value });
  }

  addMarkdownField(key, value = '') {
    this.defineGetterSetters(key);
    this[`_${key}`] = InternalMapping.entryMapping({ type: InternalMapping.MARKDOWN, value });
  }

  addField(key, type, value) {
    this.defineGetterSetters(key);
    this[`_${key}`] = InternalMapping.entryMapping({ type: type, value });
  }

  setStyleClasses(key, styleClasses) {
    this[`_${key}`].styleClasses = styleClasses;
  }

  addStyleClass(key, styleClass) {
    const classes = this[`_${key}`].styleClasses.split(' ').filter(e => e);
    this[`_${key}`].styleClasses = [...classes, styleClass].join(' ');
  }

  removeStyleClass(key, styleClass) {
    const classes = this[`_${key}`].styleClasses
      .split(' ')
      .filter(e => e)
      .filter(c => c !== styleClass);
    this[`_${key}`].styleClasses = [...classes].join(' ');
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

  keys() {
    return Object.getOwnPropertyNames(this).filter(key => key.charAt(0) !== '_');
  }

  getType(key) {
    return this[`_${key}`].type;
  }

  isEntry(key) {
    return this[`_${key}`].type === InternalMapping.ENTRY;
  }

  removeEntry(key) {
    delete this[`_${key}`];
    delete this[key];
  }
}
