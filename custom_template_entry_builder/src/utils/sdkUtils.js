import { templateIsValid, getTemplateErrors } from './validations';

let versionAttempts = 0;
let MAX_VERSION_ATTEMPTS = 3;

export const updateEntry = async ({
  sdk,
  updatedEntryList,
  updatedAssetList,
  updatedInternalMappingJson,
  stateEntries,
  stateTemplateMapping,
  loadEntriesFunc,
  setStateFunc,
  version = 0
} = {}) => {
  if (!updatedInternalMappingJson)
    throw new Error('Cannot update entry without internal mapping JSON.');
  const errors = getTemplateErrors(
    stateTemplateMapping.fieldRoles,
    JSON.parse(updatedInternalMappingJson),
    stateEntries
  );
  const isValid = templateIsValid(errors);

  const entries = updatedEntryList => {
    if (updatedEntryList) return { entries: { 'en-US': updatedEntryList } };
  };

  const assets = updatedAssetList => {
    if (updatedAssetList) return { assets: { 'en-US': updatedAssetList } };
  };

  const newEntry = {
    sys: {
      ...sdk.entry.getSys(),
      version: version ? version : sdk.entry.getSys().version
    },
    fields: Object.assign(
      {},
      ...Object.keys(sdk.entry.fields).map(key => ({
        [key]: { 'en-US': sdk.entry.fields[key].getValue() },
        ...entries(updatedEntryList),
        ...assets(updatedAssetList),
        internalMapping: { 'en-US': updatedInternalMappingJson },
        isValid: {
          'en-US': isValid ? 'Yes' : 'No'
        }
      }))
    )
  };

  try {
    await sdk.space.updateEntry(newEntry);
    versionAttempts = 0;
    setStateFunc({
      errors
    });
  } catch (err) {
    console.log(err);
    if (err.code === 'VersionMismatch') {
      if (versionAttempts < MAX_VERSION_ATTEMPTS) {
        versionAttempts += 1;
        await updateEntry({
          sdk,
          updatedEntryList,
          updatedAssetList,
          updatedInternalMappingJson,
          stateEntries,
          stateTemplateMapping,
          loadEntriesFunc,
          setStateFunc,
          version: version ? version + 1 : sdk.entry.getSys().version + 1
        });
      } else {
        sdk.dialogs.openAlert({
          title: 'Please refresh the page.',
          message: 'This entry needs to be refreshed. Please refresh the page.'
        });
      }
    } else {
      sdk.notifier.error('An error occured. Please try again.');
      await loadEntriesFunc();
    }
  }
};