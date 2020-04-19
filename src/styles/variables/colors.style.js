export const alpha = percent => {
  return Math.round((percent / 100) * 255).toString(16);
};

export const colors = {
  font: "#1C1E21",
  white: "#ffffff",
  gray: {
    offwhite: "#f2f2f2",
    light: "#D9D9D9",
    dark: "#5D5D5D",
    darker: "#3C3C3C"
  },
  scheme: {
    normal: "#9100E4",
    light: "#dd6fff",
    dark: "#43009D",
    secondary: {
      normal: "#1e88e5",
      light: "#6ab7ff",
      dark: "#0062cc"
    },
    success: {
      normal: "#28a745",
      light: "#46d467",
      dark: "#1c7430"
    },
    error: {
      normal: "#dc3545",
      light: "#ef7e89",
      dark: "#b21f2d"
    }
  }
};
