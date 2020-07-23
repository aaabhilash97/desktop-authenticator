import { grey, blue } from "@material-ui/core/colors";

// Create a theme instance.
const theme = {
  palette: {
    type: "dark",
  },
};

export const darkTheme = {
  palette: {
    secondary: {
      main: blue.A100,
    },
    type: "dark",
  },
};

export const lightTheme = {
  palette: {
    secondary: {
      main: grey.A100,
    },
    type: "light",
  },
};

export default theme;
