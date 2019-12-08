export const resolveAll = async () => {
  jest.runAllTimers();
  await Promise.resolve();
  jest.advanceTimersByTime(500);
};

export const newEntryRole = (newEntryArg, roleKey) => {
  return JSON.parse(newEntryArg['fields']['internalMapping']['en-US']).fieldRoles[roleKey];
};

export const newEntryRoleStyle = (newEntryArg, roleKey) => {
  return JSON.parse(newEntryArg['fields']['internalMapping']['en-US']).fieldRoles[roleKey]
    .styleClasses;
};

export const newEntryAssets = newEntryArg => {
  return newEntryArg['fields']['assets']['en-US'];
};

export const newEntryAssetIds = newEntryArg => {
  return newEntryArg['fields']['assets']['en-US'].map(asset => asset.sys.id);
};

export const newEntryEntries = newEntryArg => {
  return newEntryArg['fields']['entries']['en-US'];
};

export const newEntryEntryIds = newEntryArg => {
  return newEntryArg['fields']['entries']['en-US'].map(entry => entry.sys.id);
};
