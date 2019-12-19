import * as c from "../../custom_templates/constants";

export const getEntry = async (space, id) => {
  return await space.getEntry(id);
};

const getEntrySys = entry => {
  return entry.sys || entry.getSys();
};

const isSingleReference = fieldValue => {
  return (
    fieldValue &&
    fieldValue.sys &&
    fieldValue.sys.type === "Link" &&
    fieldValue.sys.linkType === "Entry"
  );
};

const isMultiReference = field => {
  return (
    (field.type === "Array" && field.items && field.items.type === "Link") ||
    Array.isArray(field["en-US"])
  );
};

const fetchMultiReferences = async (space, fieldValue, name) => {
  const multiReferenceCount = {};
  const references = await Promise.all(
    fieldValue.map(async link => {
      if ((link.sys || {}).linkType === "Asset") {
        // Do not clone Asset
        return constructLink(link);
      } else {
        // clone entry and add count name

        const linkEntry = await getEntry(space, link.sys.id);
        const linkEntryContentType = linkEntry.sys.contentType.sys.id;
        multiReferenceCount[linkEntryContentType] = multiReferenceCount[
          linkEntryContentType
        ]
          ? (multiReferenceCount[linkEntryContentType] += 1)
          : 1;
        const clonedEntry = await cloneEntry(
          space,
          linkEntry,
          `${name} ${linkEntryContentType} ${multiReferenceCount[linkEntryContentType]}`
        );
        return constructLink(clonedEntry);
      }
    })
  );

  return references;
};

export const cloneEntry = async (space, entry, name) => {
  const entrySys = getEntrySys(entry);
  const contentType = entrySys.contentType.sys.id;
  const clonedEntry = await space.createEntry(contentType, {
    fields:
      contentType === "customTemplate"
        ? await constructCustomTemplateFields(space, entry, contentType, name)
        : await constructFields(space, entry, contentType, name)
  });

  return clonedEntry;
};

const constructFields = async (space, entry, contentType, name) => {
  const fields = {};
  for (let [key, value] of Object.entries(entry.fields)) {
    let parsedField = key === "name" ? name : getParsedFieldValue(value);

    if (isSingleReference(parsedField)) {
      // Single reference entry
      const linkEntry = await getEntry(space, parsedField.sys.id);
      const linkEntryContentType = linkEntry.sys.contentType.sys.id;
      const clonedEntry = await cloneEntry(
        space,
        linkEntry,
        `${name} ${linkEntryContentType}`
      );
      fields[key] = {
        ["en-US"]: constructLink(clonedEntry)
      };
    } else if (isMultiReference(value)) {
      // Multi Reference entry, not customTemplate
      const references = await fetchMultiReferences(space, parsedField, name);

      fields[key] = {
        ["en-US"]: references
      };
    } else {
      // Assets, all other fields
      fields[key] = {
        ["en-US"]: parsedField
      };
    }
  }
  return fields;
};

const getParsedFieldValue = value => {
  if (!value) return;
  if (!!Object.keys(value).length && value["en-US"]) {
    value = value["en-US"];
  } else if (Object.keys(value).length && value._fieldLocales) {
    value = value._fieldLocales["en-US"]._value;
  } else if (!!Object.keys(value).length) {
    value = value["en-US"];
  }

  return value;
};

const constructCustomTemplateFields = async (
  space,
  entry,
  contentType,
  name
) => {
  const fields = {};
  for (let [key, value] of Object.entries(entry.fields)) {
    let parsedField = key === "name" ? name : getParsedFieldValue(value);

    if (isSingleReference(parsedField)) {
      // Single reference entry
      if (link.sys.linkType === "Asset") {
        const linkEntry = await getEntry(space, parsedField.sys.id);
        const linkEntryContentType = linkEntry.sys.contentType.sys.id;
      }
      const clonedEntry = await cloneEntry(
        space,
        linkEntry,
        `${name} ${linkEntryContentType}`
      );
      fields[key] = {
        ["en-US"]: constructLink(clonedEntry)
      };
    } else if (isMultiReference(value)) {
      // Multi assets, multi references including for customTemplate
      if (key === "entries") continue;
      const references = await fetchMultiReferences(space, parsedField, name);

      fields[key] = {
        ["en-US"]: references
      };
    } else {
      if (key === "internalMapping") continue;
      // Single assets, all other fields except customTemplate's internalMapping field
      fields[key] = {
        ["en-US"]: parsedField
      };
    }
  }

  // Handle customTemplate separately

  if (getEntrySys(entry).contentType.sys.id === "customTemplate") {
    const entries = !!entry.fields.entries
      ? entry.fields.entries["en-US"]
      : undefined;
    const assets = !!entry.fields.assets
      ? entry.fields.assets["en-US"]
      : undefined; // Do not clone assets
    let internalMapping = entry.fields.internalMapping["en-US"];
    internalMapping = internalMapping
      ? JSON.parse(internalMapping)
      : internalMapping;

    let newEntries = [];

    if (internalMapping.fieldRoles) {
      await Promise.all(
        await Object.keys(internalMapping.fieldRoles).map(async key => {
          if (
            internalMapping.fieldRoles[key].type ===
            c.FIELD_TYPE_MULTI_REFERENCE
          ) {
            let values = new Array(
              internalMapping.fieldRoles[key].value.length
            ); // pre-construct blank array so async functions can populate in order by index
            await Promise.all(
              await internalMapping.fieldRoles[key].value.map(
                async (mapping, index) => {
                  if (mapping.type === c.FIELD_TYPE_ENTRY) {
                    // clone asset, attached ID to mapping object value
                    const entry = entries.find(
                      e => getEntrySys(e).id === mapping.value
                    );
                    const clonedEntry = await getClonedEntry(
                      space,
                      entry.sys.id,
                      createName(name, key)
                    );
                    values[index] = { ...mapping, value: clonedEntry.sys.id };
                    newEntries.push(constructLink(clonedEntry));
                  } else {
                    // do not clone assets or fields
                    values[index] = mapping;
                  }
                }
              )
            );

            internalMapping.fieldRoles[key].value = values;
          } else if (
            internalMapping.fieldRoles[key].type === c.FIELD_TYPE_ENTRY
          ) {
            const entry = entries.find(
              e => getEntrySys(e).id === internalMapping.fieldRoles[key]
            );

            if (entry) {
              const clonedEntry = await getClonedEntry(
                space,
                entry.sys.id,
                createName(name, key)
              );

              internalMapping.fieldRoles[key] = {
                ...internalMapping.fieldRoles[key],
                value: getEntrySys(clonedEntry).id
              };
              newEntries.push(constructLink(clonedEntry));
            }
          }
        })
      );
    }

    fields["internalMapping"] = {
      ["en-US"]: JSON.stringify(internalMapping)
    };

    fields["entries"] = {
      ["en-US"]: newEntries
    };

    fields["assets"] = {
      ["en-US"]: assets
    };
  }
  return fields;
};

const createName = (name, rolekey) => {
  return `${name} ${rolekey}`;
};

const getClonedEntry = async (space, entryId, name) => {
  const fetchedEntry = await getEntry(space, entryId);

  const clonedEntry = await cloneEntry(space, fetchedEntry, name);

  return clonedEntry;
};

const constructLink = entry => {
  return {
    sys: {
      id: entry.sys.id,
      linkType: entry.sys.type,
      type: "Link"
    }
  };
};
