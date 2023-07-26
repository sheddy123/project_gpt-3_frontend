import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const geoLocationService = createAsyncThunk(
  "users/GeoLocation/getUserGeoLocation",
  async (prop: any, thunkAPI) => {
    const controller = new AbortController();

    try {
      const response = await axios.get(
        import.meta.env.VITE_CODE_GEO_LOCATION_URL
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Your error message");
    } finally {
      controller.abort();
    }
  }
);
