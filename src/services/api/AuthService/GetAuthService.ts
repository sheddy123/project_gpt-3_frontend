import { ILogin } from "@/interfaces/IFeatures/IFeatures";
import {
  Login_Url,
  Student_Log_Time_Url,
  Student_Progress_Url,
} from "@/utils/Constants/ApiConstants/api_constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAuthService = createAsyncThunk(
  "users/Auth/getUserDataWithAccessToken",
  async (prop: ILogin, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.post(
        Login_Url,
        { code: prop.code, provider: prop.provider },
        {
          withCredentials: true,
          signal,
        }
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
export const getStudentProgressService = createAsyncThunk(
  "users/Auth/getStudentProgress",
  async (_, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.get(Student_Progress_Url, {
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


export const getStudentLogTimeService = createAsyncThunk(
  "users/Auth/getStudentLogTime",
  async (_, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.get(Student_Log_Time_Url, {
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


