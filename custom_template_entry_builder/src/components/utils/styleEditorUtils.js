export const isGlobalSection = section => {
  return section === '';
};

export const getSectionedClassName = (section, className) => {
  const sectionPrefix = isGlobalSection(section) ? '' : `${section}-`;
  return `${sectionPrefix}${className}`;
};

export const getSectionLabel = section => {
  return section.charAt(0).toUpperCase() + section.slice(1).toLowerCase() || 'Global';
};

export const getMarkdownSections = entryValue => {
  if (!entryValue) return [];
  let sections = [];

  if (entryValue.match(/(^|\n)# \b/)) sections.push('h1');
  if (entryValue.match(/(^|\n)## \b/)) sections.push('h2');
  if (entryValue.match(/(^|\n)### \b/)) sections.push('h3');
  if (entryValue.match(/(^|\n)#### \b/)) sections.push('h4');
  if (entryValue.match(/(^|\n)##### \b/)) sections.push('h5');
  if (entryValue.match(/(^|\n)###### \b/)) sections.push('h6');

  return sections;
};

export const getSectionValue = (e, section) => {
  const targetValue = e.target.value;
  const prefix = isGlobalSection(section) ? '' : `${section}-`;
  return prefix + targetValue;
};
