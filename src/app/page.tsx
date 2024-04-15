"use client";
import CurrentWeatherCard from "@c/homePage/current-weather-card";
import ForecastWeatherSwiper, {
  ForecastWeatherSwiperProps,
} from "@c/homePage/forecast-weather-swiper";
import SectionWrapper from "@/commonComponents/section-wrapper";
import { useAppConfig } from "@c/layout";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import GeoLocationTable from "@c/homePage/table";

const HomePage = () => {
  const { loading, error, coordinates } = useAppConfig();
  const { setCoordinates, setError } = useAppConfig();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setCoordinates({
          lat: 0,
          lon: 0,
        });
        setError(err.message);
      },
    );
  }, [setCoordinates, setError]);
  return (
    <>
      <SectionWrapper
        direction={{
          xs: "column",
          lg: "row",
        }}
        spacing={2}
        alignItems={{ lg: "flex-end" }}
        justifyContent={"space-between"}
      >
        {loading ? (
          <Typography variant={"h2"}>Location Loading...</Typography>
        ) : error ? (
          <Typography variant={"h2"}>{error}</Typography>
        ) : coordinates ? (
          <>
            <CurrentWeatherCard
              width={{
                xs: 1,
                lg: 0.4,
              }}
            />
            <ForecastWeatherSwiper
              data={forecastData}
              SwiperProps={{
                sx: {
                  width: 1,
                  maxWidth: {
                    lg: 0.6,
                  },
                },
              }}
            />
          </>
        ) : null}
      </SectionWrapper>
      <GeoLocationTable />
    </>
  );
};

export default HomePage;

const forecastData: ForecastWeatherSwiperProps["data"] = [
  {
    temperature: 25,
    unit: "C",
    dateTime: "2021-10-10T10:00:00Z",
    description: "Cloudy",
    icon: "04d",
  },
  {
    temperature: 25,
    unit: "C",
    dateTime: "2021-10-10T10:00:00Z",
    description: "Cloudy",
    icon: "04d",
  },
  {
    temperature: 25,
    unit: "C",
    dateTime: "2021-10-10T10:00:00Z",
    description: "Cloudy",
    icon: "04d",
  },
  {
    temperature: 25,
    unit: "C",
    dateTime: "2021-10-10T10:00:00Z",
    description: "Cloudy",
    icon: "04d",
  },
  {
    temperature: 25,
    unit: "C",
    dateTime: "2021-10-10T10:00:00Z",
    description: "Cloudy",
    icon: "04d",
  },
  {
    temperature: 25,
    unit: "C",
    dateTime: "2021-10-10T10:00:00Z",
    description: "Cloudy",
    icon: "04d",
  },
];
