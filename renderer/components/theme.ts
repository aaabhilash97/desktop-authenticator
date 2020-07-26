import { grey, blue, purple } from "@material-ui/core/colors";

// Create a theme instance.
const theme = {
  palette: {
    type: "dark",
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  }
};

export const darkTheme = {
  palette: {
    type: "dark",
    primary: {
      main: blue.A200,
    },
    secondary: {
      main: grey.A700,
    },
  }
};

export const lightTheme = {

  palette: {
    type: "light",
    primary: {
      main: blue.A200,
    },
    secondary: {
      main: grey.A100,
    },
  }
};

export function IsDark(theme) {
  return theme.palette.type == "dark" ? true : false;
}
export default theme;
