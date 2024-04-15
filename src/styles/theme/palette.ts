import { PaletteMode, ThemeOptions } from "@mui/material";

export const palette = (mode: PaletteMode): ThemeOptions["palette"] => ({
  mode,
  primary: {
    main: mode === "light" ? "#1976d2" : "#90caf9",
    dark: mode === "light" ? "#004ba0" : "#1a73e8",
    light: mode === "light" ? "#63a4ff" : "#a6d4fa",
    contrastText: "#fff",
  },
  secondary: {
    main: mode === "light" ? "#dc004e" : "#f48fb1",
    dark: mode === "light" ? "#9a0036" : "#ab003c",
    light: mode === "light" ? "#e33371" : "#ff77a9",
    contrastText: "#fff",
  },
  error: {
    main: "#b00020",
    dark: "#790000",
    light: "#e35183",
    contrastText: "#fff",
  },
  warning: {
    main: "#f57c00",
    dark: "#bb4d00",
    light: "#ff9800",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  info: {
    main: "#2196f3",
    dark: "#1769aa",
    light: "#4dabf5",
    contrastText: "#fff",
  },
  success: {
    main: "#4caf50",
    dark: "#087f23",
    light: "#8bc34a",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
    A100: "#d5d5d5",
    A200: "#aaaaaa",
    A400: "#303030",
    A700: "#616161",
  },
  background: {
    paper: mode === "light" ? "#fff" : "#424242",
    default: mode === "light" ? "#f5f5f5" : "#303030",
  },
  text: {
    primary: mode === "light" ? "rgba(0, 0, 0, 0.87)" : "#fff",
    secondary:
      mode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.7)",
    disabled:
      mode === "light" ? "rgba(0, 0, 0, 0.38)" : "rgba(255, 255, 255, 0.5)",
  },
  divider:
    mode === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
  common: {
    black: "#000",
    white: "#fff",
  },
});
