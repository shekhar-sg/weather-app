"use client";
import { Stack, StackProps, Typography } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { fetcher } from "@/utils/swr";
import useSwr from "swr";
import { weatherPath } from "@/constant";
import { WeatherAPI } from "@/apiTypes/weather-api.type";
import { MaterialImage } from "@c/material-components";
import { useAppConfig } from "@c/layout";

export interface CurrentWeatherCardProps extends Omit<StackProps, "children"> {}

const CurrentWeatherCard = (props: CurrentWeatherCardProps) => {
  const { ...restProps } = props;
  const { unit, coordinates, setIcon } = useAppConfig();
  const { data, isLoading, error } = useSwr<WeatherAPI>(
    weatherPath("weather", {
      lat: coordinates.lat,
      lon: coordinates.lon,
      units: unit === "C" ? "metric" : "imperial",
    }),
    fetcher,
    {
      onSuccess: (data) => {
        setIcon(data.weather[0].icon);
      },
    },
  );
  if (error) {
    return <Typography>{error.toString()}</Typography>;
  }
  if (isLoading) {
    return <Typography variant={"h2"}>Loading weather data...</Typography>;
  }

  if (!data || data.cod !== 200) {
    return "No data found";
  }
  const { name, dt, weather, sys, main } = data;
  return (
    <Stack {...deepmerge(defaultCardProps, restProps)}>
      <Typography variant={"h2"} fontWeight={"600"}>
        {name}
        ,&nbsp;
        {sys.country}
      </Typography>
      <Typography variant={"h6"}>{formatDate(new Date(dt))}</Typography>
      <Stack direction={"row"} alignItems={"center"}>
        <MaterialImage
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].icon}
          width={120}
          height={120}
          sx={{
            width: {
              xs: 64,
              lg: 80,
              xxl: 120,
            },
            height: {
              xs: 64,
              lg: 80,
              xxl: 120,
            },
            objectFit: "contain",
          }}
        />
        <Typography variant={"h4"} fontWeight={"500"}>
          {main.temp}°{unit}
        </Typography>
      </Stack>
      <Typography variant={"body1"}>
        {`Feels like ${main.feels_like}°${unit}.`}
        &nbsp;
        {weather[0].description.charAt(0).toUpperCase() +
          weather[0].description.slice(1)}
      </Typography>
    </Stack>
  );
};
export default CurrentWeatherCard;
const defaultCardProps: Omit<CurrentWeatherCardProps, "coordinates"> = {
  width: "fit-content",
  px: 2,
  py: 3,
};

export const formatDate = Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "2-digit",
  dayPeriod: "short",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit",
  localeMatcher: "lookup",
  timeZone: "Asia/Kolkata",
  timeZoneName: "short",
}).format;
