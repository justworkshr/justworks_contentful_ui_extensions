const constructStyleClass = ({ className = "", label = "" } = {}) => {
  return {
    className,
    label
  };
};

const constructColor = ({ label = "", value = "", hexValue = "" } = {}) => {
  return {
    label,
    value,
    hexValue
  };
};

const COLORS = [
  constructColor({ label: "Black", value: "black", hexValue: "#515151" }),
  constructColor({ label: "White", value: "white", hexValue: "#ffffff" }),
  constructColor({
    label: "Timberwolf",
    value: "timberwolf",
    hexValue: "#CDD6DA"
  }),
  constructColor({ label: "Concrete", value: "concrete", hexValue: "#8199A3" }),
  constructColor({ label: "Mist", value: "mist", hexValue: "#EBF8FD" }),
  constructColor({ label: "Cerulean", value: "cerulean", hexValue: "#39B6E9" }),
  constructColor({ label: "Navy", value: "navy", hexValue: "#243F69" }),
  constructColor({
    label: "Strawberry",
    value: "strawberry",
    hexValue: "#EC5453"
  })
];

export const TEXT_ALIGNMENT_CLASSES = [
  constructStyleClass({ className: "text-left", label: "Left" }),
  constructStyleClass({ className: "text-center", label: "Center" }),
  constructStyleClass({ className: "text-right", label: "Right" })
];

export const TEXT_TRANSFORM_CLASSES = [
  constructStyleClass({ className: "text-uppercase", label: "Uppercase" }),
  constructStyleClass({ className: "text-lowercase", label: "Lowercase" }),
  constructStyleClass({ className: "text-capitalize", label: "Capitalize" })
];

export const TEXT_WEIGHT_CLASSES = [
  constructStyleClass({ className: "text-normal", label: "Normal" }),
  constructStyleClass({ className: "text-bold", label: "Bold" })
];

export const TEXT_COLOR_CLASSES = COLORS.map(color => {
  return constructStyleClass({
    className: `text-${color.label.toLowerCase()}`,
    label: color.label
  });
});

export const BACKGROUND_COLOR_CLASSES = COLORS.map(color => {
  return constructStyleClass({
    className: `bg-color-${color.label.toLowerCase()}`,
    label: color.label
  });
});

export const ICON_SIZE_CLASSES = [
  constructStyleClass({ className: "icon-small", label: "Small" }),
  constructStyleClass({ className: "icon-large", label: "Large" })
];

export const ICON_POSITION_CLASSES = [
  constructStyleClass({ className: "icon-left", label: "Left" }),
  constructStyleClass({ className: "icon-center", label: "Center" }),
  constructStyleClass({ className: "icon-right", label: "Right" })
];

export const FLEX_DIRECTION_CLASSES = [
  constructStyleClass({ className: "flex-row", label: "Row" }),
  constructStyleClass({ className: "flex-column", label: "Column" }),
  constructStyleClass({ className: "flex-row-reverse", label: "Reverse Row" }),
  constructStyleClass({
    className: "flex-column-reverse",
    label: "Reverse Column"
  })
];

export const FLEX_ALIGNMENT_CLASSES = [
  constructStyleClass({ className: "flex-align-center", label: "Center" }),
  constructStyleClass({ className: "flex-align-start", label: "Start" }),
  constructStyleClass({ className: "flex-align-end", label: "End" })
];

export const FLEX_JUSTIFY_CLASSES = [
  constructStyleClass({ className: "flex-justify-center", label: "Center" }),
  constructStyleClass({ className: "flex-justify-start", label: "Start" }),
  constructStyleClass({ className: "flex-justify-end", label: "End" })
];

export const FLEX_ITEM_COUNT_CLASSES = [
  constructStyleClass({ className: "flex-items-per-1", label: "1" }),
  constructStyleClass({ className: "flex-items-per-2", label: "2" }),
  constructStyleClass({ className: "flex-items-per-3", label: "3" }),
  constructStyleClass({ className: "flex-items-per-4", label: "4" }),
  constructStyleClass({ className: "flex-items-per-5", label: "5" }),
  constructStyleClass({ className: "flex-items-per-6", label: "6" })
];

export const FLEX_HORIZONAL_ITEM_SPACING_CLASSES = [
  constructStyleClass({ className: "flex-item-h-spacing-zero", label: "None" }),
  constructStyleClass({ className: "flex-item-h-spacing-tiny", label: "Tiny" }),
  constructStyleClass({
    className: "flex-item-h-spacing-small",
    label: "Small"
  }),
  constructStyleClass({
    className: "flex-item-h-spacing-column",
    label: "Column Spacing"
  })
];

export const FLEX_VERTICAL_ITEM_SPACING_CLASSES = [
  constructStyleClass({ className: "flex-item-v-spacing-zero", label: "None" }),
  constructStyleClass({ className: "flex-item-v-spacing-tiny", label: "Tiny" }),
  constructStyleClass({
    className: "flex-item-v-spacing-small",
    label: "Small"
  })
];
