import { getName } from './shared';
import { isArchived } from './deepArchive';
export const publishAllEntries = async (space, resolvedEntries) => {
  let errors = [];

  // Pre-validates
  resolvedEntries.map(entry => {
    if (isArchived(entry)) {
      errors.push({
        code: 'Archived',
        message: `Entry: ${getName(entry)} is archived.`
      });
    }
  });

  if (errors.length) {
    return {
      errors: errors
    };
  }

  return {
    results: await Promise.all(
      await resolvedEntries.map(async entry => {
        if (!isPublished(entry)) {
          return await publishEntry(space, entry, errors);
        }
      })
    ),
    errors: errors
  };
};

const publishEntry = async (space, entry, errors) => {
  const entrySys = entry.sys || entry.getSys();
  if (!isPublished(entry)) {
    try {
      const spaceEntry = await space.getEntry(entrySys.id);
      return await space.publishEntry(spaceEntry);
    } catch (err) {
      errors.push({
        code: 'Publish Error',
        message: `Check entry: ${getName(entry)} for validation errors.`
      });
    }
  }
};

export const isPublished = entry => {
  const entrySys = entry.sys || entry.getSys();
  return !!entrySys.publishedAt;
};
