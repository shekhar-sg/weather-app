"use client";
import ForecastWeatherCard, {ForecastWeatherCardProps,} from "@c/homePage/forecast-weather-card";
import {
    MaterialSwiper,
    MaterialSwiperProps,
    MaterialSwiperSlide,
    MaterialSwiperSlideProps,
} from "@c/material-components";
import {deepmerge} from "@mui/utils";
import {useAppConfig} from "@c/layout";
import useSwr from "swr";
import {weatherPath} from "@/constant";
import {fetcher} from "@/utils/swr";
import {ForecastAPI} from "@/apiTypes/forecast-api.type";
import {Typography} from "@mui/material";

export interface ForecastWeatherSwiperProps {
    SwiperProps?: MaterialSwiperProps;
    SwiperSlideProps?: MaterialSwiperSlideProps;
    ForecastWeatherCardProps?: Omit<ForecastWeatherCardProps, "data">;
}

const ForecastWeatherSwiper = (props: ForecastWeatherSwiperProps) => {
    const {SwiperProps, SwiperSlideProps, ForecastWeatherCardProps} = props;
    const {unit, coordinates} = useAppConfig();
    const {data, isLoading, error} = useSwr<ForecastAPI>(
        weatherPath("forecast", {
            lat: coordinates.lat,
            lon: coordinates.lon,
            units: unit === "C" ? "metric" : "imperial",
        }),
        fetcher,
    );
    if (error) {
        return <Typography>{error.toString()}</Typography>;
    }
    if (isLoading) {
        return <Typography variant={"h2"}>Loading forecast data...</Typography>;
    }

    if (!data || data.cod !== "200") {
        return "No data found";
    }
    const filteredData = data.list.filter((_, index) => index % 8 === 0);
    return (
        <MaterialSwiper {...deepmerge(defaultSwiperProps, SwiperProps)}>
            {filteredData.map((data, index) => {
                const {weather, main, dt_txt} = data;
                return (
                    <MaterialSwiperSlide
                        key={index}
                        {...deepmerge(defaultSwiperSlideProps, SwiperSlideProps)}
                    >
                        <ForecastWeatherCard
                            data={{
                                temperature: main.temp,
                                unit,
                                dateTime: dt_txt,
                                description: weather[0].description,
                                icon: weather[0].icon,
                                max_temp: main.temp_max,
                                min_temp: main.temp_min,
                            }}
                            {...ForecastWeatherCardProps}
                        />
                    </MaterialSwiperSlide>
                );
            })}
        </MaterialSwiper>
    );
};

export default ForecastWeatherSwiper;

const defaultSwiperProps: MaterialSwiperProps = {
    slidesPerView: "auto",
    grabCursor: true,
    sx: {
        p: 1,
        width: 1,
        maxWidth: {
            lg: 0.6,
        },
    },
};

const defaultSwiperSlideProps: MaterialSwiperSlideProps = {
    sx: {
        width: "fit-content",
        mr: 2,
        "&:last-child": {
            mr: 0,
        },
    },
};
