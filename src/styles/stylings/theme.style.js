import { createMuiTheme } from "@material-ui/core";

import { colors } from "../variables/colors.style";

const theme = createMuiTheme({
  palette: {
    common: {
      black: colors.font,
      white: colors.white
    },
    type: "light",
    primary: {
      light: colors.scheme.light,
      main: colors.scheme.normal,
      dark: colors.scheme.dark,
      contrastText: colors.white
    },
    secondary: {
      light: colors.scheme.secondary.light,
      main: colors.scheme.secondary.normal,
      dark: colors.scheme.secondary.dark,
      contrastText: colors.white
    },
    error: {
      light: colors.scheme.error.light,
      main: colors.scheme.error.normal,
      dark: colors.scheme.error.dark,
      contrastText: colors.white
    },
    success: {
      light: colors.scheme.success.light,
      main: colors.scheme.success.normal,
      dark: colors.scheme.success.dark,
      contrastText: colors.white
    }
  }
});

export default theme;
