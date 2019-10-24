import { getName } from './shared';

export const archiveAllLinkedEntriesBeforeSelf = async (space, resolvedEntries) => {
  const errors = [];
  return {
    results: await Promise.all(
      await resolvedEntries.map(async entry => {
        if (!entry.isExclusive) {
          errors.push({
            code: 'Non-Exclusive Link',
            message: `Entry: ${getName(entry)} is linked to multiple entries.`
          });
        }

        if (!isArchived(entry) && entry.isExclusive) {
          return await archiveEntry(space, entry, errors);
        }
      })
    ),
    errors: errors
  };
};

const archiveEntry = async (space, entry) => {
  const entrySys = entry.sys || entry.getSys();
  if (!isArchived(entry)) {
    return await space.archiveEntry(entrySys.id);
  }
};

export const isArchived = entry => {
  const entrySys = entry.sys || entry.getSys();
  return !!entrySys.archivedAt;
};
