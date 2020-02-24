import * as c from '../constants';

export default class InternalMapping {
  constructor(componentId, properties) {
    this.componentId = componentId;
    this.properties = properties || {};
  }

  get class() {
    return this.constructor.name;
  }

  asJSON() {
    return JSON.stringify({
      componentId: this.componentId,
      properties: this.properties
    });
  }

  addProperty(propertyKey, type, value) {
    this.properties[propertyKey] = {
      type,
      value
    };
  }

  updateValue(propertyKey, value) {
    this.properties[propertyKey].value = value;
  }

  addLink(propertyKey, link) {
    this.properties[propertyKey] = {
      type: c.LINK_PROPERTY,
      value: link
    };
  }
}
