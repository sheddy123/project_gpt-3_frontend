import {
  Create_Profile_Url,
  Get_Profile_Url,
} from "@/utils/Constants/ApiConstants/api_constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfileService = createAsyncThunk(
  "users/Profile/GetProfileService",
  async (prop: any, thunkAPI) => {
    console.log("Prop item received: " + prop);
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await axios.get(`${Get_Profile_Url}/${prop}`, {
        withCredentials: true,
        signal,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Your error message");
    } finally {
      controller.abort();
    }
  }
);

export const createProfileService = createAsyncThunk(
  "users/Profile/CreateProfileService",
  async (prop: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await axios.post(Create_Profile_Url, prop, {
        withCredentials: true,
        signal,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Your error message");
    } finally {
      controller.abort();
    }
  }
);
