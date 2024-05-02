"use client";
import SectionWrapper from "@/commonComponents/section-wrapper";
import CurrentWeatherCard from "@c/homePage/current-weather-card";
import ForecastWeatherSwiper, {
  ForecastWeatherSwiperProps,
} from "@c/homePage/forecast-weather-swiper";
import { useEffect } from "react";
import { useAppConfig } from "@c/layout";

interface CityPageProps {
  params: {
    coordinates: string;
  };
}

const CityPage = (props: CityPageProps) => {
  const { params } = props;
  const { coordinates, setCoordinates } = useAppConfig();
  useEffect(() => {
    const [lat, lon] = params.coordinates.split("%2C");
    setCoordinates({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    });
  }, [params.coordinates, setCoordinates]);
  return (
    <SectionWrapper
      direction={{
        xs: "column",
        lg: "row",
      }}
      mt={'10%'}
      spacing={2}
      alignItems={{ lg: "flex-end" }}
      justifyContent={"space-between"}
    >
      {coordinates ? (
        <>
          <CurrentWeatherCard
            width={{
              xs: 1,
              lg: 0.4,
            }}
          />
          <ForecastWeatherSwiper
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
  );
};

export default CityPage;
