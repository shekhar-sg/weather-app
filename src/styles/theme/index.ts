import { createTheme } from "@mui/material";
import { palette } from "@theme/palette";
import { typography } from "@theme/typography";

export enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
}

const materialTheme = (mode: ThemeType) =>
  createTheme({
    palette: palette(mode),
    typography,
  });
export default materialTheme;
