import * as c from '../constants';
import InternalMapping from '../classes/InternalMapping';

export const constructLink = entry => {
  return {
    sys: {
      type: 'Link',
      linkType: entry.sys.linkType || entry.sys.type, // redundant check linkType in case link accidentally passed in
      id: entry.sys.id
    }
  };
};

const isLinkOfType = (linkType = 'Entry', link) => {
  if (!link || !link.sys) return false;
  return link.sys.linkType === linkType;
};

export const isEntryLink = link => {
  return link.sys.linkType === 'Entry';
};

export const isAssetLink = link => {
  return link.sys.linkType === 'Asset';
};

export const extractEntries = (mappingObject, linkType = c.ENTRY_LINK_TYPE) => {
  if (!(mappingObject && mappingObject['properties'])) return;

  let entries = [];
  Object.keys(mappingObject.properties).forEach(key => {
    if (mappingObject.properties[key].type === c.LINK_PROPERTY) {
      const link = mappingObject.properties[key].value;
      if (isLinkOfType(linkType, link)) {
        entries.push(link);
      }
    } else if (mappingObject.properties[key].type === c.MULTI_LINK_PROPERTY) {
      if (!mappingObject.properties[key].value) return;
      mappingObject.properties[key].value.forEach(link => {
        if (isLinkOfType(linkType, link)) entries.push(link);
      });
    } else if (
      mappingObject.properties[key].type === c.COMPONENT_PROPERTY ||
      mappingObject.properties[key].type === c.CONFIG_PROPERTY
    ) {
      if (isComponentPropertySingleton(mappingObject.properties[key].value)) {
        entries = [
          ...entries,
          ...(extractEntries(mappingObject.properties[key].value, linkType) || [])
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
      mappingObject.properties[key].value.forEach(component => {
        if (isComponentPropertySingleton(component)) {
          entries = [...entries, ...(extractEntries(component, linkType) || [])];
        } else if (isLinkOfType(linkType, component)) {
          entries.push(component);
        }
      });
    }
  });

  return entries;
};

export const isComponentPropertySingleton = value => {
  return !!(value || {}).componentId;
};

export const isComponentPropertyLink = value => {
  return !!(value || {}).sys;
};

export const linksToFetch = (hydratedEntries = [], allLinks = []) => {
  const linksToFetch = [];

  allLinks
    .filter(l => l)
    .forEach(link => {
      if (!hydratedEntries.some(e => e.sys.id === link.sys.id)) {
        linksToFetch.push(link);
      }
    });

  return linksToFetch;
};

export const newInternalMappingFromSchema = ({
  schema = {},
  presetObject = null, // {} for loading a internalMapping from a preset
  configObject = false
} = {}) => {
  const internalMapping = new InternalMapping(schema.meta.id, {}, schema, configObject);
  Object.keys(schema.properties).forEach(propKey => {
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
    internalMapping.addProperty('preset_name', 'text', presetObject.name);
  }

  return internalMapping;
};

export const apiContentTypesToIds = contentTypes => {
  return contentTypes;
};

export const getStatus = entry => {
  if (
    entry &&
    entry.sys &&
    entry.sys.publishedAt &&
    entry.sys.publishedAt === entry.sys.updatedAt
  ) {
    return 'published';
  } else if (
    entry &&
    entry.sys &&
    entry.sys.publishedAt &&
    entry.sys.publishedAt !== entry.sys.updatedAt
  ) {
    return 'changed';
  } else if (entry && entry.sys && entry.sys.archivedAt) {
    return 'archived';
  } else {
    return 'draft';
  }
};

export const getEntryContentTypeId = entry => {
  if (!entry.sys || !entry.sys.contentType) return;
  return entry.sys.contentType.sys.id;
};

export const createEntry = async (space, contentType, fields = {}) => {
  const newEntry = await space.createEntry(contentType, { fields });

  return newEntry;
};

export const createAsset = async space => {
  let data = {
    fields: {}
  };

  const newAsset = await space.createAsset(data);

  return newAsset;
};

export const getDropdownOptions = (options, schemas) => {
  if (options[0] === '{{ patterns }}') {
    return schemas
      .filter(schema => schema.meta.id.includes('patterns'))
      .map(schema => schema.meta.id);
  } else {
    return options;
  }
};
