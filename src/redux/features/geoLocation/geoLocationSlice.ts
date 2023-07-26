import { IGeoLocation } from "@/interfaces/IFeatures/IFeatures";
import { geoLocationService } from "@/services/api/GeoLocation/GeoLocationService";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IGeoLocation = {
  ip: "",
  network: "",
  version: "",
  city: "",
  region: "",
  region_code: "",
  country: "",
  country_name: "",
  country_code: "",
  country_code_iso3: "",
  country_capital: "",
  country_tld: "",
  continent_code: "",
  in_eu: "",
  postal: "",
  latitude: "",
  longitude: "",
  timezone: "",
  utc_offset: "",
  country_calling_code: "",
  currency: "",
  currency_name: "",
  languages: "",
  country_area: "",
  country_population: "",
  asn: "",
  org: "",
};

const geoLocationSlice = createSlice({
  name: "geoLocation",
  initialState,
  reducers: {
    clearGeoLocation: (state) => {
      //state.message = "auth has been cleared";
    },
    getGeoLocation: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(geoLocationService.fulfilled, (state, action) => {
      state.ip = action.payload?.ip;
      state.network = action.payload?.network;
      state.version = action.payload?.version;
      state.city = action.payload?.city;
      state.region = action.payload?.region;
      state.region_code = action.payload?.region_code;
      state.country = action.payload?.country;
      state.country_name = action.payload?.country_name;
      state.country_code = action.payload?.code;
      state.country_code_iso3 = action.payload?.country_code_iso3;
      state.country_capital = action.payload?.country_capital;
      state.country_tld = action.payload?.country_tld;
      state.continent_code = action.payload?.continent_code;
      state.in_eu = action.payload?.in_eu;
      state.postal = action.payload?.postal;
      state.latitude = action.payload?.latitude;
      state.longitude = action.payload?.longitude;
      state.timezone = action.payload?.timezone;
      state.utc_offset = action.payload?.utc_offset;
      state.country_calling_code = action.payload?.country_calling_code;
      state.currency = action.payload?.currency;
      state.currency_name = action.payload?.currency_name;
      state.languages = action.payload?.languages;
      state.country_area = action.payload?.country_area;
      state.country_population = action.payload?.country_population;
      state.asn = action.payload?.asn;
      state.org = action.payload?.org;
    });
  },
});

export const { clearGeoLocation, getGeoLocation } = geoLocationSlice.actions;

export default geoLocationSlice.reducer;
