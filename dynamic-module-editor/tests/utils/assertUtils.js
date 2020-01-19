export const resolveAll = async () => {
  jest.runAllTimers();
  await Promise.resolve();
  jest.advanceTimersByTime(5000);
};

export const newEntryRole = (newEntryArg, roleKey) => {
  return JSON.parse(newEntryArg['fields']['internalMapping']['en-US']).componentZones[roleKey];
};

export const newEntryZone = (newEntryArg, roleKey) => {
  return JSON.parse(newEntryArg['fields']['internalMapping']['en-US']).componentZones[roleKey];
};

export const newEntryProperty = (newEntryArg, roleKey) => {
  return JSON.parse(newEntryArg['fields']['internalMapping']['en-US']).properties[roleKey];
};

export const internalMappingRoleStyle = (internalMappingArg, roleKey) => {
  return JSON.parse(internalMappingArg).componentZones[roleKey].style.value;
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
