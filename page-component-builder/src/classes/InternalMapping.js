import * as c from '../constants';

export default class InternalMapping {
  constructor(mapping) {
    this.mapping = mapping || { properties: {} };
  }

  get class() {
    return this.constructor.name;
  }

  asJSON() {
    return JSON.stringify(this.mapping);
  }

  addLink(propertyKey, link) {
    this.mapping.properties[propertyKey] = {
      type: c.LINK_PROPERTY,
      value: link
    };
  }
}
