import { getName } from './shared';

export const unpublishAllEntries = async (space, resolvedEntries) => {
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

        if (!isUnpublished(entry) && entry.isExclusive) {
          return await unpublishEntry(space, entry, errors);
        }
      })
    ),
    errors: errors
  };
};

const unpublishEntry = async (space, entry, errors) => {
  const entrySys = entry.sys || entry.getSys();
  if (!isUnpublished(entry)) {
    const spaceEntry = await space.getEntry(entrySys.id);
    try {
      const unPublished = await space.unpublishEntry(spaceEntry);
      return unPublished;
    } catch (err) {
      errors.push({
        code: 'Unpublish Error',
        message: `Check entry: ${getName(entry)} for validation errors.`
      });
    }
  }
};

const isUnpublished = entry => {
  const entrySys = entry.sys || entry.getSys();
  return !entrySys.publishedAt;
};
