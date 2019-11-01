export const TEXT_MAPPING = 'text';
export const MARKDOWN_MAPPING = 'markdown';
export const ENTRY_MAPPING = 'entry';

export default class InternalMapping {
  constructor(json) {
    const object = this.loadInternalMapping(json);
    Object.keys(object).forEach(key => {
      this[`_${key}`] = object[key];

      Object.defineProperty(this, key, {
        get: () => {
          return (this[`_${key}`] || {}).type ? (this[`_${key}`] || {}).value : this[`_${key}`]; // returns {}.value or value
        },

        set: value => {
          this[`_${key}`] = this.entryMapping({ type: this[`_${key}`].type, value });
        }
      });
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

  loadInternalMapping(json) {
    if (!json || !typeof json === 'string') return {};
    return JSON.parse(json);
  }

  entryMapping({ type, value } = {}) {
    return {
      type,
      value
    };
  }

  addEntry(key, value) {
    this[`_${key}`] = this.entryMapping({ type: InternalMapping.ENTRY, value });
  }

  addTextField(key, value = '') {
    this[`_${key}`] = this.entryMapping({ type: InternalMapping.TEXT, value });
  }

  addMarkdownField(key, value = '') {
    this[`_${key}`] = this.entryMapping({ type: InternalMapping.MARKDOWN, value });
  }

  addField(key, type, value) {
    this[`_${key}`] = this.entryMapping({ type: type, value });
  }

  asJSON() {
    return JSON.stringify(
      Object.assign({}, ...Object.keys(this).map(key => ({ [key.slice(1)]: this[key] })))
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

  isText(key) {
    return this[`_${key}`].type === InternalMapping.TEXT;
  }

  isMarkdown(key) {
    return this[`_${key}`].type === InternalMapping.MARKDOWN;
  }

  removeEntry(key) {
    this[`_${key}`] = undefined;
  }
}
