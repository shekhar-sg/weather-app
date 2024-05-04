"use client";
import CurrentWeatherCard from "@c/homePage/current-weather-card";
import ForecastWeatherSwiper from "@c/homePage/forecast-weather-swiper";
import SectionWrapper from "@/commonComponents/section-wrapper";
import {useAppConfig} from "@c/layout";
import {Chip, Stack, Typography} from "@mui/material";
import {useEffect} from "react";
import GeoLocationTable from "@c/homePage/table";
import Link from "next/link";
import {BookmarkBorder} from "@mui/icons-material";

const HomePage = () => {
    const {loading, error, coordinates, toggleBookmark} = useAppConfig();
    const {setCoordinates, setError} = useAppConfig();

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

    const {bookMarks} = useAppConfig();

    return (
        <>
            <SectionWrapper
                direction={{
                    xs: "column",
                    lg: "row",
                }}
                spacing={2}
                alignItems={{lg: "flex-end"}}
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
                        <ForecastWeatherSwiper/>
                    </>
                ) : null}
            </SectionWrapper>
            <Stack
                direction={"row"}
                alignItems={"center"}
                width={"100%"}
                flexWrap={"wrap"}
                p={2}
                gap={2}
            >
                <Typography variant={"h6"} fontWeight={"bolder"}>Bookmarks:</Typography>
                {
                    bookMarks.length ? bookMarks.map((city, index) => {
                        return (
                            <Chip
                                clickable
                                key={index}
                                component={Link}
                                href={`${city.coordinates.lat},${city.coordinates.lon}`}
                                label={city.name}
                                onDelete={(event) => {
                                    event.preventDefault();
                                    toggleBookmark(city);
                                }}
                                sx={{
                                    cursor: "pointer",
                                }}
                            />
                        )
                    }) : <Typography
                        variant={"body1"}
                    >
                        No Bookmarks, Click on the {<BookmarkBorder
                        sx={{
                            verticalAlign: "middle",
                        }}
                    />} in any row to bookmark it.
                    </Typography>
                }
            </Stack>
            <GeoLocationTable/>
        </>
    );
};

export default HomePage;