import { createMuiTheme } from "@material-ui/core/styles";
export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "rgba(232, 232, 232, 1)", default: "#fafafa" },
    primary: {
      light: "rgba(172, 195, 223, 1)",
      main: "rgba(227, 14, 51, 1)",
      dark: "rgba(138, 137, 140, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(152, 87, 170, 0.52)",
      main: "rgba(80, 141, 207, 1)",
      dark: "rgba(119, 119, 119, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "rgba(240, 222, 0, 1)",
      main: "#f44336",
      dark: "rgba(255, 0, 0, 1)",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(226, 60, 177, 0.87)",
      disabled: "rgba(155, 155, 155, 0.5)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});
