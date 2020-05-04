import * as c from '../constants';

export default class InternalMapping {
  constructor(componentId, properties, schema = {}, configObject = false) {
    this.componentId = componentId;
    this.properties = properties || {};
    this.schema = schema;
    this.configObject = configObject;
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
    // don't add property if this is for a config object and the propertyKey being specified does not exist in the meta.config_template
    if (
      this.configObject &&
      this.schema.meta.config_template &&
      !this.schema.meta.config_template.includes(propertyKey)
    )
      return;
    this.properties[propertyKey] = {
      type,
      value
    };
  }

  updateValue(propertyKey, value) {
    if (!this.properties[propertyKey]) {
      this.addProperty(propertyKey, this.schema[propertyKey].type, value);
    } else {
      this.properties[propertyKey].value = value;
    }
  }

  addLink(propertyKey, link) {
    this.properties[propertyKey] = {
      type: c.LINK_PROPERTY,
      value: link
    };
  }
}
