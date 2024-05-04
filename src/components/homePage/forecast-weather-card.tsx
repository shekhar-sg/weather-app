"use client";

import {Box, Card, Divider, Stack, Typography} from "@mui/material";
import {MaterialImage} from "@c/material-components";

export interface ForecastWeatherCardProps {
    data: {
        temperature: number;
        unit: "C" | "F";
        dateTime: string | Date;
        description: string;
        icon: string;
        max_temp: number;
        min_temp: number;
    };
}

const formatDate = Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
}).format;

const ForecastWeatherCard = (props: ForecastWeatherCardProps) => {
    const {data} = props;
    const {dateTime, temperature, max_temp, min_temp, unit, icon, description} = data;
    const date = formatDate(new Date(dateTime));
    return (
        <Stack
            component={Card}
            direction={"row"}
            sx={{
                width: 200,
                minWidth: 200,
                maxWidth: 200,
                px: 2,
                py: 1,
            }}
            divider={<Divider
                sx={{
                    width: "1px",
                    mx: 2,
                    backgroundColor: (theme) => theme.palette.divider,
                }}
            />}
        >
            <Box>
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
                <Typography variant={"body2"} whiteSpace={"nowrap"}>{description}</Typography>
            </Box>
            <Stack
                justifyContent={"space-between"}
            >
                <Typography variant={"caption"}><strong>Max:</strong>{max_temp}°{unit}</Typography>
                <Typography variant={"caption"}><strong>Min:</strong>{min_temp}°{unit}</Typography>
            </Stack>
        </Stack>
    );
};

export default ForecastWeatherCard;
