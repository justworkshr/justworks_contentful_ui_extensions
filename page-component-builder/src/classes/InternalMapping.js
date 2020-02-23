import * as c from '../constants';

export default class InternalMapping {
  constructor(mapping) {
    this.mapping = mapping || {};
  }

  get class() {
    return this.constructor.name;
  }

  asJSON() {
    return JSON.stringify(this.mapping);
  }

  addLink(propertyKey, link) {
    console.log(c.LINK_PROPERTY);
    this.mapping[propertyKey] = {
      type: c.LINK_PROPERTY,
      value: link
    };
  }
}
