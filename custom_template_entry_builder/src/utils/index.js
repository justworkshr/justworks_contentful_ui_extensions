import InternalMapping from './InternalMapping';
import * as c from '../../../custom_templates/constants';

export const isDirectField = roleType => {
  return c.DIRECT_FIELD_TYPES.includes(roleType);
};

export const removeByIndex = (array, index) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const getStatus = entry => {
  if (entry.sys.publishedAt && entry.sys.publishedAt === entry.sys.updatedAt) {
    return 'published';
  } else if (entry.sys.publishedAt && entry.sys.publishedAt !== entry.sys.updatedAt) {
    return 'changed';
  } else if (entry.sys.archivedAt) {
    return 'archived';
  } else {
    return 'draft';
  }
};

export const constructLink = entry => {
  return {
    sys: {
      type: 'Link',
      linkType: entry.sys.type,
      id: entry.sys.id
    }
  };
};

export const constructEntryName = (parentName, entryDescriptor) => {
  return `${parentName} ${entryDescriptor}`;
};

export const createAsset = async space => {
  let data = {
    fields: {}
  };

  const newAsset = await space.createAsset(data);

  return newAsset;
};

export const createEntry = async (space, contentType, name, template = undefined) => {
  let data = {
    fields: {
      name: { 'en-US': name }
    }
  };

  if (template) {
    template = template
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    data = { ...data, fields: { ...data.fields, template: { 'en-US': template } } };
  }

  const newEntry = await space.createEntry(contentType, data);

  return newEntry;
};

// Groups an array of objects by key
export const groupByContentType = (templateRoles, entries) => {
  if (!templateRoles || !Object.keys(templateRoles).length) return {};
  const groups = {};

  // { <"contentType">: {<"mappingId">: <"entryId">}...}
  // or:
  // { "text": {"left_text": "1234"}...}
  Object.keys(templateRoles).forEach(key => {
    groups[templateRoles[key].contentType] = {
      ...groups[templateRoles[key].contentType],
      [key]: undefined
    };
  });

  if (!Object.keys(entries).length) return groups;
  Object.keys(entries)
    .filter(entryKey => !!templateRoles[entryKey])
    .forEach(key => {
      const contentTypeKey = templateRoles[key].contentType;
      groups[contentTypeKey][key] = entries[key];
    });

  return groups;
};

export const displayContentType = contentType => {
  return contentType
    .split(',')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' or ');
};

export const displaySnakeCaseName = snakeCaseString => {
  return snakeCaseString
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const getContentTypeArray = stringOrArray => {
  return Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray];
};

export const getEntryContentTypeId = entry => {
  if (!entry.sys || !entry.sys.contentType) return;
  return entry.sys.contentType.sys.id;
};

export const getEntryOrField = async (space, internalMapping, roleKey) => {
  const fieldType = internalMapping.getType(roleKey);
  if (fieldType === c.FIELD_TYPE_ENTRY) {
    return await space.getEntry(internalMapping[roleKey].value);
  } else if (fieldType === c.FIELD_TYPE_ASSET) {
    return await space.getAsset(internalMapping[roleKey].value);
  } else if (fieldType === c.FIELD_TYPE_MULTI_REFERENCE) {
    return await Promise.all(
      internalMapping[roleKey].value.map(async entry => {
        const entryType = entry.type;
        if (entryType === c.FIELD_TYPE_ENTRY) {
          return await space.getEntry(entry.value);
        } else if (entryType === c.FIELD_TYPE_ASSET) {
          return await space.getAsset(entry.value);
        }
      })
    );
  } else {
    const sysType = fieldType === c.FIELD_TYPE_ASSET ? c.SYSTEM_TYPE_ASSET : c.SYSTEM_TYPE_FIELD;

    return constructFieldEntry(sysType, internalMapping[roleKey]);
  }
};

export const constructFieldEntry = (sysType, fieldObject = InternalMapping.entryMapping()) => {
  return {
    sys: {
      type: sysType
    },
    fields: {
      ...fieldObject
    }
  };
};

export const cleanStyleClasses = (styleClasses, entryValue) => {
  if (typeof entryValue !== 'string') return styleClasses;
  if (!styleClasses) return styleClasses;
  // Removes Heading classes if no heading of type is present in markdown
  if (!entryValue.match(/(^|\n)# \b/)) styleClasses = removeSectionClass(styleClasses, 'h1');
  if (!entryValue.match(/(^|\n)## \b/)) styleClasses = removeSectionClass(styleClasses, 'h2');
  if (!entryValue.match(/(^|\n)### \b/)) styleClasses = removeSectionClass(styleClasses, 'h3');
  if (!entryValue.match(/(^|\n)#### \b/)) styleClasses = removeSectionClass(styleClasses, 'h4');
  if (!entryValue.match(/(^|\n)##### \b/)) styleClasses = removeSectionClass(styleClasses, 'h5');
  if (!entryValue.match(/(^|\n)###### \b/)) styleClasses = removeSectionClass(styleClasses, 'h6');

  return styleClasses
    .split(' ')
    .sort()
    .join(' ');
};

export const removeSectionClass = (styleClasses, sectionPrefix) => {
  if (!styleClasses) return;
  const re = new RegExp('^' + sectionPrefix + '-', 'g');

  return styleClasses
    .split(' ')
    .filter(className => !className.match(re))
    .join(' ');
};

export const selectAssetEntries = stateEntries => {
  return Object.keys(stateEntries)
    .reduce((reducer, entryKey) => {
      if (Array.isArray(stateEntries[entryKey])) {
        stateEntries[entryKey].forEach(entry => {
          if (entry.sys.type === c.SYSTEM_TYPE_ASSET) {
            reducer.push(entry);
          }
        });
      } else {
        if (stateEntries[entryKey].sys.type === c.SYSTEM_TYPE_ASSET) {
          reducer.push(stateEntries[entryKey]);
        }
      }

      return reducer;
    }, [])
    .filter(el => el);
};

export const addExclusiveClassName = (value, classString, classObjectArray) => {
  classString = classString
    .split(' ')
    .filter(e => e)
    .filter(
      className => !classObjectArray.some(classObject => classObject.className === className)
    );

  classString = [...classString, value].join(' ');

  return classString;
};

export const getRolesToFetch = (newInternalMapping, oldEntries) => {
  // if newInternalMapping has more keys than oldEntries, return those extra keys
  return newInternalMapping
    .fieldKeys()
    .filter(key => !Object.keys(oldEntries).some(k => k === key));
};
