import * as c from '../constants';
import InternalMapping from '../classes/InternalMapping';

export const constructLink = entry => {
  return {
    sys: {
      type: 'Link',
      linkType: entry.sys.type,
      id: entry.sys.id
    }
  };
};

const isLinkOfType = (linkType = 'Entry', link) => {
  if (!link) return false;
  return link.sys.linkType === linkType;
};

export const isEntryLink = link => {
  return link.sys.linkType === 'Entry';
};

export const isAssetLink = link => {
  return link.sys.linkType === 'Asset';
};

export const extractEntries = (mappingObject, linkType = 'Entry') => {
  if (!(mappingObject && mappingObject['properties'])) return;

  let entries = [];
  Object.keys(mappingObject.properties).forEach(key => {
    if (mappingObject.properties[key].type === c.LINK_PROPERTY) {
      const link = mappingObject.properties[key].value;
      if (isLinkOfType(linkType, link)) {
        entries.push(link);
      }
    } else if (mappingObject.properties[key].type === c.MULTI_LINK_PROPERTY) {
      mappingObject.properties[key].value.forEach(link => {
        if (isLinkOfType(linkType, link)) entries.push(link);
      });
    } else if (mappingObject.properties[key].type === c.COMPONENT_PROPERTY) {
      entries = [
        ...entries,
        ...(extractEntries(mappingObject.properties[key].value, linkType) || [])
      ];
    } else if (mappingObject.properties[key].type === c.MULTI_COMPONENT_PROPERTY) {
      mappingObject.properties[key].value.forEach(component => {
        entries = [...entries, ...(extractEntries(component, linkType) || [])];
      });
    }
  });

  return entries;
};

export const linksToFetch = (hydratedEntries = [], allLinks = []) => {
  const linksToFetch = [];

  allLinks.forEach(link => {
    if (!hydratedEntries.some(e => e.sys.id === link.sys.id)) {
      linksToFetch.push(link);
    }
  });

  return linksToFetch;
};

export const newInternalMappingFromSchema = schema => {
  const internalMapping = new InternalMapping(schema.meta.id);
  Object.keys(schema.properties).forEach(propKey => {
    const property = schema.properties[propKey];
    internalMapping.addProperty(propKey, property.type, property.default);
  });
  return internalMapping;
};
