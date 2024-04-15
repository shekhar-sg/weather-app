"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import materialTheme, { ThemeType } from "@theme/index";

interface ThemeRegistryProps {
  children: ReactNode;
}

const ThemeRegistry = (props: ThemeRegistryProps) => {
  const { children } = props;
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={materialTheme(ThemeType.DARK)}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeRegistry;
