/*
  Custom templates
  - Should match the "allowed values" validation in Contentful content type CustomTemplate's "template" field.
  - Exact name is used inside template renderer too.
*/
export const CARD_BLOCK = "card block";
export const TEXT_MEDIA_MODULE = "text media module";
export const LOGO_ITEM = "logo item";
export const LOGO_GRID = "logo grid";

/*
  Content types
  - Should match the ID's of the content types from Contentful space
  - Used in the editor to determine which contentTypes a template can link to.
*/
export const CONTENT_TYPE_TEXT = "text";
export const CONTENT_TYPE_MEDIA = "media";
export const CONTENT_TYPE_CUSTOM_TEMPLATE = "customTemplate";
export const CONTENT_TYPE_STYLE = "style";
export const CONTENT_TYPE_LINK = "link";

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

export const FIELD_TYPE_ENTRY = "entry";
export const FIELD_TYPE_ASSET = "asset";
export const FIELD_TYPE_MULTI_REFERENCE = "multi-reference";

/*
  Direct field types
  - Directly editable fields whose values are saved in the InternalMapping JSON
*/

export const FIELD_TYPE_TEXT = "text";
export const FIELD_TYPE_MARKDOWN = "markdown";

// Please keep updated!!
export const DIRECT_FIELD_TYPES = [FIELD_TYPE_TEXT, FIELD_TYPE_MARKDOWN];

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

export * from "./styleClasses";
export * from "./styleViews";
export * from "./styleProperties";
