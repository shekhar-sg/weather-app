"use client";

import { Card, Stack, Typography } from "@mui/material";
import { MaterialImage } from "@c/material-components";

export interface ForecastWeatherCardProps {
  data: {
    temperature: number;
    unit: "C" | "F";
    dateTime: string|Date;
    description: string;
    icon: string;
  };
}

const formatDate = Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
}).format;

const ForecastWeatherCard = (props: ForecastWeatherCardProps) => {
  const { data } = props;
  const { dateTime, temperature, unit, icon, description } = data;
  const date = formatDate(new Date(dateTime));
  return (
    <Stack
      component={Card}
      sx={{
        width: 150,
        px: 2,
        py: 1,
      }}
    >
      <Typography variant={"h5"} fontWeight={"bold"}>{date}</Typography>
      <Stack direction={"row"} alignItems={"center"}>
        <MaterialImage
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={icon}
          width={64}
          height={64}
          sx={{
            width: {
              xs: 34,
              lg: 40,
            },
            height: {
              xs: 34,
              lg: 40,
            },
            objectFit: "contain",
          }}
        />
        <Typography variant={"body1"} fontWeight={"bold"}>
          {temperature}°{unit}
        </Typography>
      </Stack>
      <Typography variant={"body2"}>{description}</Typography>
    </Stack>
  );
};

export default ForecastWeatherCard;
