import * as c from "../constants";
import InternalMapping from "../classes/InternalMapping";

export const isComponentPropertySingleton = (value) => {
  return !!(value || {}).componentId;
};

export const constructLink = (entry) => {
  return {
    sys: {
      type: "Link",
      linkType: entry.sys.linkType || entry.sys.type, // redundant check linkType in case link accidentally passed in
      id: entry.sys.id,
    },
  };
};

export const createEntry = async (space, contentType, fields = {}) => {
  const newEntry = await space.createEntry(contentType, { fields });

  return newEntry;
};

const isLinkOfType = (linkType = "Entry", link) => {
  if (!link || !link.sys) return false;
  return link.sys.linkType === linkType;
};

export const isEntryLink = (link) => {
  return link.sys.linkType === "Entry";
};

export const isAssetLink = (link) => {
  return link.sys.linkType === "Asset";
};

export const extractEntries = (mappingObject, linkType = c.ENTRY_LINK_TYPE) => {
  if (!(mappingObject && mappingObject["properties"])) return;

  let entries = [];
  Object.keys(mappingObject.properties).forEach((key) => {
    if (mappingObject.properties[key].type === c.LINK_PROPERTY) {
      const link = mappingObject.properties[key].value;
      if (isLinkOfType(linkType, link)) {
        entries.push(link);
      }
    } else if (mappingObject.properties[key].type === c.MULTI_LINK_PROPERTY) {
      if (!mappingObject.properties[key].value) return;
      mappingObject.properties[key].value.forEach((link) => {
        if (isLinkOfType(linkType, link)) entries.push(link);
      });
    } else if (
      mappingObject.properties[key].type === c.COMPONENT_PROPERTY ||
      mappingObject.properties[key].type === c.CONFIG_PROPERTY
    ) {
      if (isComponentPropertySingleton(mappingObject.properties[key].value)) {
        entries = [
          ...entries,
          ...(extractEntries(mappingObject.properties[key].value, linkType) ||
            []),
        ];
      } else if (
        linkType === c.ENTRY_LINK_TYPE &&
        isComponentPropertyLink(mappingObject.properties[key].value)
      ) {
        entries.push(mappingObject.properties[key].value);
      }
    } else if (
      mappingObject.properties[key].type === c.MULTI_COMPONENT_PROPERTY ||
      mappingObject.properties[key].type === c.MULTI_CONFIG_PROPERTY
    ) {
      if (!mappingObject.properties[key].value) return;
      mappingObject.properties[key].value.forEach((component) => {
        if (isComponentPropertySingleton(component)) {
          entries = [
            ...entries,
            ...(extractEntries(component, linkType) || []),
          ];
        } else if (isLinkOfType(linkType, component)) {
          entries.push(component);
        }
      });
    }
  });

  return entries;
};

export const newInternalMappingFromSchema = ({
  schema = {},
  presetObject = null, // {} for loading a internalMapping from a preset
  configObject = false,
} = {}) => {
  const internalMapping = new InternalMapping(
    schema.meta.id,
    {},
    schema,
    configObject
  );
  Object.keys(schema.properties).forEach((propKey) => {
    const property = schema.properties[propKey];
    let value;

    if (presetObject) {
      value = presetObject.properties[propKey] || property.default;
    } else {
      value = property.default;
    }
    internalMapping.addProperty(propKey, property.type, value);
  });

  if (presetObject) {
    internalMapping.addProperty("preset_name", "text", presetObject.name);
  }

  return internalMapping;
};
