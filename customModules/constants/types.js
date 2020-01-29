/*
  Patterns
  - Should match the "allowed values" validation in Contentful content type CustomTemplate's "template" field.
  - Exact name is used inside template renderer too.
*/
export const CARD_BLOCK = "card block";
export const TEXT_MEDIA_MODULE = "text media module";
export const LOGO_ITEM = "logo item";
export const LOGO_ROW = "logo row";
export const CONTENT_SPLIT = "contentSplit";

/*
  Components
*/

export const COMPONENT_HEADED_LIST = "headedList";
export const COMPONENT_RESPONSIVE_IMAGE = "responsiveImage";

/*
  Content types
  - Should match the ID's of the content types from Contentful space
  - Used in the editor to determine which contentTypes a template can link to.
*/
export const CONTENT_TYPE_GENERIC_TEXT = "genericText";
export const CONTENT_TYPE_GENERIC_MARKDOWN = "genericMarkdown";
export const CONTENT_TYPE_COLLECTION_MODULE = "collectionModule";
export const CONTENT_TYPE_STYLE = "style";
export const CONTENT_TYPE_LINK = "link";
export const CONTENT_TYPE_PAGE_MODULE = "pageModule";
export const CONTENT_TYPE_COMPONENT_MODULE = "componentModule";

/*
  System types
*/

export const SYSTEM_TYPE_FIELD = "Field";
export const SYSTEM_TYPE_ASSET = "Asset";
export const SYSTEM_TYPE_ENTRY = "Entry";

/*
  Field types
  - Used to render the correct editor section
  - Used to render the correct template on the website
*/

export const FIELD_TYPE_FIELD = "field";
export const FIELD_TYPE_ENTRY = "entry";
export const FIELD_TYPE_ASSET = "asset";
export const FIELD_TYPE_PSEUDO_ASSET = "pseudo-asset";
export const FIELD_TYPE_MULTI_REFERENCE = "multi-reference";

/*
  Link Types
  - Used to specify a mapping's data source
*/

export const LINK_TYPE_FIELD = "field";
export const LINK_TYPE_ENTRY = "entry";
export const LINK_TYPE_ASSET = "asset";
export const LINK_TYPE_SINGLETON = "singleton";

/*
  Component Property Types
  - Used to specify the data type a component property receives
  - Used to render correct editor
*/
export const PROPERTY_TYPE_TEXT = "text";
export const PROPERTY_TYPE_MARKDOWN = "markdown";
export const PROPERTY_TYPE_ASSET = "asset";
export const PROPERTY_TYPE_ENTRY = "entry";

/*
  Direct field types
  - Directly editable fields whose values are saved in the InternalMapping JSON
*/

export const FIELD_TYPE_TITLE = "title";
// Please keep updated!!
export const DIRECT_FIELD_TYPES = [
  PROPERTY_TYPE_TEXT,
  FIELD_TYPE_TITLE,
  PROPERTY_TYPE_MARKDOWN
];

/* 
  Internal Mapping Style types
  - types of style references in a direct mapping
*/

export const STYLE_TYPE_CUSTOM = "custom";
export const STYLE_TYPE_ENTRY = "entry";
export const STYLE_TYPE_MULTI_ENTRY = "multi-entry";

/*
  Style types
  - Used for in the custom template config object to determine which style editor to render for template styles or multi-reference styles.
*/

export const MULTI_REFERENCE_STYLE_FLEX = "multi-reference-style-flex";

/*
  Asset types
  - should be regex matchable with the value from a contentful asset response (asset.file.type)
*/

export const ASSET_TYPE_IMAGE = "image";
export const ASSET_TYPE_VIDEO = "video";
export const ASSET_TYPE_PDF = "pdf";

/*
  Asset subtypes
  - Used to determine which style editors appear for asset links
*/
export const ASSET_SUBTYPE_LOGO = "logo";
