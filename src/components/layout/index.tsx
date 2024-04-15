"use client";
import { ReactNode } from "react";
import Header from "@c/layout/header";
import { Box } from "@mui/material";
import { create } from "zustand";

export interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = (props: BaseLayoutProps) => {
  const { children } = props;
  const { icon } = useAppConfig();
  return (
    <>
      <Header />
      <Box component={"main"}>{children}</Box>
      <video
        src={`/${icon}.mp4`}
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: -1,
          objectFit: "cover",
          height: "100%",
          opacity: 0.5,
          aspectRatio: "16/9",
          filter: "blur(10px)",
        }}
      />
    </>
  );
};

export default BaseLayout;

export interface LocationCoordinates {
  lat: number;
  lon: number;
}

export interface AppConfig {
  loading: boolean;
  setLoading: (loading: AppConfig["loading"]) => void;
  coordinates: LocationCoordinates;
  setCoordinates: (coordinates: AppConfig["coordinates"]) => void;
  error: string | null;
  setError: (error: NonNullable<AppConfig["error"]>) => void;
  unit: "C" | "F";
  setUnit: (unit: AppConfig["unit"]) => void;
  icon: string | null;
  setIcon: (icon: NonNullable<AppConfig["icon"]>) => void;
}

export const useAppConfig = create<AppConfig>((setState) => {
  return {
    loading: true,
    setLoading: (loading) => setState({ loading }),
    unit: "C",
    setUnit: (unit) => setState({ unit }),
    coordinates: {
      lat: 0,
      lon: 0,
    },
    setCoordinates: (coordinates) => setState({ coordinates, loading: false }),
    error: null,
    setError: (error) => setState({ error, loading: false }),
    icon: null,
    setIcon: (icon) => setState({ icon }),
  };
});
