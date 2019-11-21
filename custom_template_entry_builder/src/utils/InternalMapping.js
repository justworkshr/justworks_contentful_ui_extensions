export const TEXT_MAPPING = 'text';
export const MARKDOWN_MAPPING = 'markdown';
export const ENTRY_MAPPING = 'entry';

export default class InternalMapping {
  constructor(json) {
    const parsedJSON = this.loadInternalMapping(json);

    Object.keys(InternalMapping.blankMapping).forEach(key => {
      this[key] = parsedJSON[key] || InternalMapping.blankMapping[key];
    });

    Object.keys(parsedJSON.fieldRoles || {}).forEach(key => {
      if (key === 'styleClasses')
        throw new Error('Cannot name an entryRole "styleClasses". This is a reserved key.');
      this.fieldRoles[`${key}`] = parsedJSON.fieldRoles[key];

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

  static assetMapping({ type, styleClasses = '', value = '', asset_url = '' } = {}) {
    return {
      type,
      styleClasses,
      value,
      asset_url
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
          return InternalMapping.entryMapping({ ...this.fieldRoles[`${key}`] });
        },

        set: value => {
          this.fieldRoles[`${key}`] = InternalMapping.entryMapping({
            type: this.fieldRoles[`${key}`].type,
            styleClasses: this.fieldRoles[`${key}`].styleClasses,
            value
          });
        },
        configurable: true
      });
    }
  }

  addAsset(key, value, asset_url) {
    this.defineGetterSetters(key);
    this.fieldRoles[`${key}`] = InternalMapping.assetMapping({
      type: InternalMapping.ASSET,
      value,
      asset_url
    });
  }

  addEntry(key, value) {
    this.defineGetterSetters(key);
    this.fieldRoles[`${key}`] = InternalMapping.entryMapping({
      type: InternalMapping.ENTRY,
      value
    });
  }

  addTextField(key, value = '') {
    this.defineGetterSetters(key);
    this.fieldRoles[`${key}`] = InternalMapping.entryMapping({
      type: InternalMapping.TEXT,
      value
    });
  }

  addMarkdownField(key, value = '') {
    this.defineGetterSetters(key);
    this.fieldRoles[`${key}`] = InternalMapping.entryMapping({
      type: InternalMapping.MARKDOWN,
      value
    });
  }

  addField(key, type, value) {
    this.defineGetterSetters(key);
    this.fieldRoles[`${key}`] = InternalMapping.entryMapping({ type: type, value });
  }

  setStyleClasses(key, styleClasses) {
    this.fieldRoles[`${key}`].styleClasses = styleClasses;
  }

  addStyleClass(key, styleClass) {
    const classes = this.fieldRoles[`${key}`].styleClasses.split(' ').filter(e => e);
    this.fieldRoles[`${key}`].styleClasses = [...classes, styleClass].join(' ');
  }

  removeStyleClass(key, styleClass) {
    const classes = this.fieldRoles[`${key}`].styleClasses
      .split(' ')
      .filter(e => e)
      .filter(c => c !== styleClass);
    this.fieldRoles[`${key}`].styleClasses = [...classes].join(' ');
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
    return this.fieldRoles[`${key}`].type;
  }

  isEntry(key) {
    return this.fieldRoles[`${key}`].type === InternalMapping.ENTRY;
  }

  removeEntry(key) {
    delete this.fieldRoles[`${key}`];
    delete this[key];
  }
}
