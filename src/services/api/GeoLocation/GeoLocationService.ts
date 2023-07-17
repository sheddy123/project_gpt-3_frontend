import { IGeoLocation } from "@/interfaces/IFeatures/IFeatures";
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
      //console.log(prop, thunkAPI);
      //console.log(thunkAPI.getState()); //get global store value/state object
      //console.log(thunkApi.dispatch(nameofYourFunction()));

      //const resp = await axios.post(url + prop);
      // const data = await resp.data;
      //return data; // Modify based on your response structure

      //You can return error response with your custom error message
      //console.error(err);
      //  return thunkAPI.rejectWithValue("Your error message");
      controller.abort();
    }
  }
);
