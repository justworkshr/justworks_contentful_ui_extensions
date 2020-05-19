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
    options = schemas
      .filter(schema => schema.meta.id.includes('patterns'))
      .filter(schema => schema.meta.id !== 'patterns/variant_container')
      .filter(schema => !schema.meta.extension_of) // not an extension
      .map(schema => schema.meta.id);
  }

  return options.filter(id => {
    const optionSchema = schemas.find(schema => schema.meta.id === id);
    return optionSchema ? optionSchema.meta.editor_role !== c.HIDDEN_ROLE : id;
  });
};

export const getExtensions = (componentId, schemas) => {
  return schemas
    .filter(schema => schema.meta.editor_role !== c.HIDDEN_ROLE) // not hidden
    .filter(schema => schema.meta.extension_of === componentId);
};

export const getLabel = (component_id, schemas) => {
  if (!schemas.length) return component_id;
  const schema = schemas.find(schema => schema.meta.id === component_id);

  if (schema) {
    return schema.meta.title;
  } else {
    return component_id;
  }
};

export const isShortTextField = property => {
  return (
    property.type === c.TEXT_PROPERTY &&
    property.editor_type === c.SHORT_TEXT_EDITOR &&
    !(property.options && property.options.length)
  );
};

export const isColorField = property => {
  return property.type === c.TEXT_PROPERTY && property.editor_type === c.COLOR_EDITOR;
};

export const isNumberField = property => {
  return property.type === c.NUMBER_PROPERTY && !property.options;
};

export const isLongTextField = property => {
  return (
    property.type === c.TEXT_PROPERTY &&
    property.editor_type === c.LONG_TEXT_EDITOR &&
    !(property.options && property.options.length)
  );
};

export const isMarkdownTextField = property => {
  return (
    property.type === c.TEXT_PROPERTY &&
    property.editor_type === c.MARKDOWN_EDITOR &&
    !(property.options && !!property.options.length)
  );
};

export const isBoolProperty = property => {
  return property.type === c.BOOL_PROPERTY;
};

export const isRadioTextField = property => {
  return (
    property.type === c.TEXT_PROPERTY &&
    property.editor_type === c.RADIO_EDITOR &&
    property.options &&
    !!property.options.length
  );
};

export const isDropdownTextField = property => {
  return (
    ((property.type === c.TEXT_PROPERTY && property.editor_type === c.SHORT_TEXT_EDITOR) ||
      property.type === c.NUMBER_PROPERTY) &&
    property.options &&
    !!property.options.length
  );
};

export const isDropdownWithCustomField = property => {
  return (
    property.type === c.TEXT_PROPERTY &&
    property.editor_type === c.DROPDOWN_WITH_CUSTOM_EDITOR &&
    property.options &&
    !!property.options.length
  );
};

export const isAssetLinkProperty = property => {
  return property.type === c.LINK_PROPERTY && property.asset_types && !!property.asset_types.length;
};

export const isEntryLinkProperty = property => {
  return (
    property.type === c.LINK_PROPERTY && property.content_types && !!property.content_types.length
  );
};

export const isMultiLinkProperty = property => {
  return (
    property.type === c.MULTI_LINK_PROPERTY &&
    ((property.content_types && !!property.content_types.length) ||
      (property.asset_types && !!property.asset_types.length))
  );
};

export const isComponentProperty = property => {
  return property.type === c.COMPONENT_PROPERTY && property.options && !!property.options.length;
};

export const isMultiComponentProperty = property => {
  return (
    property.type === c.MULTI_COMPONENT_PROPERTY && property.options && !!property.options.length
  );
};

export const isConfigProperty = property => {
  return property.type === c.CONFIG_PROPERTY && !!property.related_to;
};

export const isMultiConfigProperty = property => {
  return property.type === c.MULTI_CONFIG_PROPERTY && !!property.related_to;
};

export const isSubmitActionProperty = property => {
  return property.type === c.SUBMIT_ACTION_PROPERTY;
};

export const isExperimentConditionProperty = property => {
  return property.type === c.EXPERIMENT_CONDITION_PROPERTY;
};

export const getFieldIcon = property => {
  if (isShortTextField(property)) {
    return 'Text';
  }
  if (isNumberField(property)) {
    return 'LooksOne';
  }
  if (isLongTextField(property)) {
    return 'Text';
  }
  if (isMarkdownTextField(property)) {
    return 'Text';
  }
  if (isBoolProperty(property)) {
    return 'ListNumbered';
  }
  if (isRadioTextField(property)) {
    return 'ListNumbered';
  }
  if (isDropdownTextField(property)) {
    return 'ListNumbered';
  }
  if (isDropdownWithCustomField(property)) {
    return 'ListNumbered';
  }
  if (isAssetLinkProperty(property)) {
    return 'Asset';
  }
  if (isEntryLinkProperty(property)) {
    return 'Entry';
  }
  if (isMultiLinkProperty(property)) {
    return 'Copy';
  }
  if (isComponentProperty(property)) {
    return 'Entry';
  }
  if (isMultiComponentProperty(property)) {
    return 'Copy';
  }
  if (isConfigProperty(property)) {
    return 'Folder';
  }
  if (isMultiConfigProperty(property)) {
    return 'FolderCreate';
  }
  if (isSubmitActionProperty(property)) {
    return 'Code';
  }
  if (isExperimentConditionProperty(property)) {
    return 'Code';
  }
  return 'Edit';
};
