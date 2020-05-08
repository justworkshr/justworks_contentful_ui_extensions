import * as c from '../constants';

export default class InternalMapping {
  constructor(componentId, properties, schema = {}, configObject = false) {
    this.componentId = componentId;
    this.properties = properties || {};
    this.schema = schema;
    this.configObject = configObject;

    this.validateProperties = this.validateProperties.bind(this);
    this.validateRequired = this.validateRequired.bind(this);
    this.validateOptions = this.validateOptions.bind(this);
  }

  get class() {
    return this.constructor.name;
  }

  get errors() {
    return this.validateProperties();
  }

  validateProperties() {
    const errors = {};
    Object.keys(this.properties).forEach(propKey => {
      if (!this.schema.properties) return;
      if (!errors[propKey]) {
        errors[propKey] = [];
      }

      const schemaProperty = this.schema.properties[propKey];
      if (!schemaProperty) return;
      errors[propKey].push(
        this.validateRequired(propKey, this.properties[propKey], schemaProperty)
      );
      errors[propKey].push(this.validateOptions(propKey, this.properties[propKey], schemaProperty));

      errors[propKey] = errors[propKey].filter(e => e);
    });

    // return errors only if a field has messages
    const hasErrors = Object.keys(errors).some(field => {
      return errors[field].length;
    });

    if (hasErrors) {
      return errors;
    } else {
      return {};
    }
  }

  validateRequired(propKey, property = {}, schemaProperty = {}) {
    const errorMessage = 'This field is required';
    if (schemaProperty.required) {
      if (
        // multi-fields
        schemaProperty.type === c.MULTI_COMPONENT_PROPERTY ||
        schemaProperty === c.MULTI_CONFIG_PROPERTY ||
        schemaProperty === c.MULTI_LINK_PROPERTY
      ) {
        if (!(property.value || {}).length) return errorMessage;
      } else if (schemaProperty.type === c.BOOL_PROPERTY) {
        // bool properties
        if (property.value !== false && property.value !== true) return errorMessage;
      } else if (schemaProperty.type === c.NUMBER_PROPERTY) {
        // number properties
        if (property.value !== 0 && !property.value) return errorMessage;
      } else if (!property.value) {
        // all others
        return errorMessage;
      }
    }
  }

  validateOptions(propKey, property = {}, schemaProperty = {}) {
    if (!property.value) return; // do not validate blanks
    if (!schemaProperty.options || !schemaProperty.options.length) return; // do not validate non-optioned properties

    const errorMessage = `The value: '${
      property.value
    }' is not allowed. Please select from: ${schemaProperty.options.join(' | ')}`;

    if (schemaProperty === c.COMPONENT_PROPERTY) {
      // single component
    } else if (schemaProperty.type === c.CONFIG_PROPERTY) {
      // single config
    } else if (schemaProperty.type === c.MULTI_COMPONENT_PROPERTY) {
      // multi component
    } else if (schemaProperty.type === c.MULTI_CONFIG_PROPERTY) {
      // multi config
    } else if (
      schemaProperty.editor_type !== c.DROPDOWN_WITH_CUSTOM_EDITOR &&
      !schemaProperty.options.includes(property.value)
    )
      // all else except for dropdown w/ custom
      return errorMessage;
  }

  asJSON() {
    return JSON.stringify(this.asObject());
  }

  asObject() {
    return {
      componentId: this.componentId,
      properties: this.properties
    };
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
