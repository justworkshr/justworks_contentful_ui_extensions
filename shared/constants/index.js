/*
  Synced w/ komponent_constants.rb in rails
*/

export const ENTRY_LINK_TYPE = "Entry";
export const ASSET_LINK_TYPE = "Asset";

export const CONTENT_TYPE_COMPONENT_PAGE = "componentPage";
export const CONTENT_TYPE_VIEW_COMPONENT = "viewComponent";
export const CONTENT_TYPE_META = "meta";

// COMPONENT ROLES
export const PATTERN_ROLE = "pattern";
export const COMPONENT_ROLE = "component";
export const SINGLETON_ROLE = "singleton";
export const HIDDEN_ROLE = "hidden";

// PROPERTY CATEGORIES

export const STYLE_CATEGORY = "style";
export const ADVANCED_CATEGORY = "advanced";

// PROPERTY TYPES
export const LINK_PROPERTY = "link";
export const MULTI_LINK_PROPERTY = "multi-link";
export const COMPONENT_PROPERTY = "component";
export const MULTI_COMPONENT_PROPERTY = "multi-component";
export const CONFIG_PROPERTY = "config";
export const MULTI_CONFIG_PROPERTY = "multi-config";
export const TEXT_PROPERTY = "text";
export const NUMBER_PROPERTY = "number";
export const BOOL_PROPERTY = "bool";
export const SUBMIT_ACTION_PROPERTY = "submit-action";
export const EXPERIMENT_CONDITION_PROPERTY = "experiment-condition";

// EDITOR TYPES

export const SHORT_TEXT_EDITOR = "short-text-editor";
export const LONG_TEXT_EDITOR = "long-text-editor";
export const MARKDOWN_EDITOR = "markdown-editor";
export const COLOR_EDITOR = "color-editor";
export const RADIO_EDITOR = "radio-editor";
export const DROPDOWN_EDITOR = "dropdown-editor";
export const DROPDOWN_WITH_CUSTOM_EDITOR = "dropdown-with-custom-editor";

// ASSET TYPES

export const ASSET_TYPE_IMAGE = "image";

export const SITE_ROUTING = {
  Default: "",
  "Landing Page": "/lp",
};

export const BRAND_COLORS = [
  {
    name: "Brand Black",
    hex: "#515151",
  },
  {
    name: "Brand White",
    hex: "#ffffff",
  },
  {
    name: "Gray-50 (haze)",
    hex: "#f4f7f9",
  },
  {
    name: "Gray-200",
    hex: "#ecf1f5",
  },
  {
    name: "Gray-500 (timberwolf)",
    hex: "#cdd6da",
  },
  {
    name: "Gray-600",
    hex: "#748a93",
  },
  {
    name: "Gray-800 (concrete)",
    hex: "#8199a3",
  },
  {
    name: "Big Stone",
    hex: "#303640",
  },
  {
    name: "Denim",
    hex: "#1a2c47",
  },
  {
    name: "Navy",
    hex: "#243f69",
  },
  {
    name: "Cerulean",
    hex: "#39B6E9",
  },
  {
    name: "Mist",
    hex: "#ebf8fd",
  },
  {
    name: "Strawberry",
    hex: "#ec5453",
  },
  {
    name: "Strawberry-400",
    hex: "#f7bbba",
  },
  {
    name: "Strawberry-600",
    hex: "#af4342",
  },
  {
    name: "Shamrock",
    hex: "#37b375",
  },
  {
    name: "Goldenrod",
    hex: "#b8b24f",
  },
];
