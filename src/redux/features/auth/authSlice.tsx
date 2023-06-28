import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAuth } from "../../../interfaces/IFeatures/IFeatures";
import axios from "axios";
import { BaseUrl } from "../../../utils/Constants/ApiConstants/api_constants";

const url = BaseUrl + import.meta.env.VITE_GET_USER_DATA_ACC_TKN;
export const getAuth = createAsyncThunk(
  "users/Auth/getUserDataWithAccessToken",
  async (prop: string, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.post(url + prop, { signal });
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

const initialState: IAuth = {
  isLoading: false,
  code: "",
  message: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.message = "auth has been cleared";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuth.fulfilled, (state, action) => {
        // console.log(state,action);

        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getAuth.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
