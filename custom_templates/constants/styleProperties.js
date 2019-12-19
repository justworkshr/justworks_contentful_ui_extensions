const constructStyleProperty = ({ key = "", values = [] } = {}) => {
  return {
    key,
    values
  };
};

const constructStyleValue = ({ value = "", label = "" } = {}) => {
  return {
    value,
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

export const COLORS = [
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

// Background Color

export const STYLE_PROPERTY_BACKGROUND_COLOR = constructStyleProperty({
  key: "backgroundColor",
  values: COLORS.map(color => {
    return constructStyleValue({
      value: color.value,
      label: color.label
    });
  })
});

// Text Color

export const TEXT_COLORS = [
  constructColor({ label: "Black", value: "black", hexValue: "#515151" }),
  constructColor({ label: "White", value: "white", hexValue: "#ffffff" }),
  constructColor({
    label: "Timberwolf",
    value: "timberwolf",
    hexValue: "#CDD6DA"
  }),
  constructColor({ label: "Navy", value: "navy", hexValue: "#243F69" })
];

// Typography

export const STYLE_PROPERTY_TEXT_ALIGNMENT = constructStyleProperty({
  key: "textAlignment",
  values: [
    constructStyleValue({
      value: "left",
      label: "Left"
    }),
    constructStyleValue({
      value: "center",
      label: "Center"
    }),
    constructStyleValue({
      value: "right",
      label: "Right"
    })
  ]
});

export const STYLE_PROPERTY_TEXT_TRANSFORM = constructStyleProperty({
  key: "textTransform",
  values: [
    constructStyleValue({
      value: "uppercase",
      label: "Uppercase"
    }),
    constructStyleValue({
      value: "capitalize",
      label: "Capitalize"
    }),
    constructStyleValue({
      value: "lowercase",
      label: "Lowercase"
    })
  ]
});

export const STYLE_PROPERTY_TITLE_SIZE = constructStyleProperty({
  key: "titleSize",
  values: [
    constructStyleValue({
      value: "display",
      label: "Display"
    }),
    constructStyleValue({
      value: "section-default",
      label: "Section Default"
    }),
    constructStyleValue({
      value: "section-small",
      label: "Section Small"
    })
  ]
});

export const STYLE_PROPERTY_TEXT_COLOR = constructStyleProperty({
  key: "textColor",
  values: TEXT_COLORS.map(color => {
    return constructStyleValue({
      value: color.value,
      label: color.label
    });
  })
});

export const STYLE_PROPERTY_HEADER_TEXT_COLOR = constructStyleProperty({
  key: "headerTextColor",
  values: TEXT_COLORS.map(color => {
    return constructStyleValue({
      value: color.value,
      label: color.label
    });
  })
});

export const STYLE_PROPERTY_SUBHEADER_TEXT_COLOR = constructStyleProperty({
  key: "subheaderTextColor",
  values: TEXT_COLORS.map(color => {
    return constructStyleValue({
      value: color.value,
      label: color.label
    });
  })
});

export const STYLE_PROPERTY_BODY_TEXT_COLOR = constructStyleProperty({
  key: "bodyTextColor",
  values: TEXT_COLORS.map(color => {
    return constructStyleValue({
      value: color.value,
      label: color.label
    });
  })
});

// Padded Container

export const STYLE_PROPERTY_PADDED_CONTAINER = constructStyleProperty({
  key: "paddedContainer",
  values: [
    constructStyleValue({
      value: "default",
      label: "Default"
    }),
    constructStyleValue({
      value: "comfortable",
      label: "Comfortable"
    }),
    constructStyleValue({
      value: "compact",
      label: "Compact"
    })
  ]
});

// Flex Row Presets

export const STYLE_PROPERTY_FLEX_ROW = constructStyleProperty({
  key: "flexRowPreset",
  values: [
    constructStyleValue({
      value: "natural",
      label: "Natural"
    }),
    constructStyleValue({
      value: "6-4-2",
      label: "6-4-2"
    }),
    constructStyleValue({
      value: "5-3-2",
      label: "5-3-2"
    }),
    constructStyleValue({
      value: "4-2-2",
      label: "4-2-2"
    }),
    constructStyleValue({
      value: "3-2-1",
      label: "Natural"
    })
  ]
});
