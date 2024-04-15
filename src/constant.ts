import { createSearchParams } from "@/utils/helpers";

export interface GeoLocationPathOptions {
  select: string;
  where?: string;
  order_by?: string;
  limit?: number;
  offset: number;
}

export const geoLocationPath = (options: GeoLocationPathOptions) => {
  options.limit = options.limit || 10;
  options.offset = options.offset || 0;
  options.order_by = options.order_by || "name DESC";
  const basePath = `/api-geonames/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records`;
  return `${basePath}${createSearchParams({
    ...options,
    limit: options.limit.toString(),
    offset: options.offset.toString(),
  })}`;
};

export interface WeatherPathOptions {
  lat: number;
  lon: number;
  exclude?: string;
  units?: "metric" | "imperial";
}

export const weatherPath = (
  api: "forecast" | "weather",
  options: WeatherPathOptions,
) => {
  options.units = options.units || "metric";
  return `/api-weather/data/2.5/${api}${createSearchParams({
    ...options,
    lat: options.lat.toString(),
    lon: options.lon.toString(),
  })}`;
};
