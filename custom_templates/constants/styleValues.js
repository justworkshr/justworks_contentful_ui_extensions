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
    value: "timerwolf",
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

export const BACKGROUND_COLOR_VALUES = COLORS.map(color => {
  return constructStyleValue({
    value: color.value,
    label: color.label
  });
});
