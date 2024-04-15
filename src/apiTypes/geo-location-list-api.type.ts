export interface GeoLocationLIstAPI {
  total_count: number;
  results: GeoLocationLIstAPIResult[];
}

export interface GeoLocationLIstAPIResult {
  geoname_id: string;
  name: string;
  ascii_name: string;
  alternate_names: string[] | null;
  feature_class: string;
  feature_code: string;
  country_code: string;
  cou_name_en: string;
  country_code_2: null;
  admin1_code: string;
  admin2_code: string;
  admin3_code: string;
  admin4_code: string;
  population: number;
  elevation: null | string;
  dem: number;
  timezone: string;
  modification_date: Date;
  label_en: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  lon: number;
  lat: number;
}
