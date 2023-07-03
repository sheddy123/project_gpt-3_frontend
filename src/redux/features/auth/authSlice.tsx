import { IAuth, ILogin } from "@/interfaces/IFeatures/IFeatures";
import { Login_Url } from "@/utils/Constants/ApiConstants/api_constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAuth = createAsyncThunk(
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

const initialState: IAuth = {
  message: "",
  auth_response: {
    isLoading: true,
    code: "",
    access_failed_count: "0",
    email: "",
    locked_out_enabled: "",
    lockout_end: "",
    normalized_email: "",
    normalized_username: "",
    phone_number: "",
    security_stamp: "",
    user_name: "",
    twoFactorEnabled: "",
    roles: [{ id: 0, roleName: "" }],
    token: "",
    refresh_token: "",
    refresh_token_expiry_time: "",
  },
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.message = "auth has been cleared";
    },
    updateAuth: (state, action) => {
      state.message = action.payload?.message;
      state.auth_response = action.payload?.auth_User;
    },
    logOff: (state, action) => {
      console.log("Action is logged out" + action.payload);

      state.message = "";
      state.auth_response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuth.pending, (state) => {
        state.auth_response.isLoading = true;
      })
      .addCase(getAuth.fulfilled, (state, action) => {
        //const { setAuth } = useAuth();
        if (action.payload?.message == "Invalid client request")
          state.message = action.payload?.message;
        else {
          state.message = action.payload?.message;
          state.auth_response.isLoading = false;
          state.auth_response.code = action.payload?.auth_User?.code;
          state.auth_response.access_failed_count =
            action.payload?.auth_User?.access_failed_count;
          state.auth_response.email = action.payload?.auth_User?.email;
          state.auth_response.locked_out_enabled =
            action.payload?.auth_User?.locked_out_enabled;
          state.auth_response.lockout_end =
            action.payload?.auth_User?.lockout_end;
          state.auth_response.normalized_email =
            action.payload?.auth_User?.normalized_email;
          state.auth_response.phone_number =
            action.payload?.auth_User?.phone_number;
          state.auth_response.security_stamp =
            action.payload?.auth_User?.security_stamp;
          state.auth_response.user_name = action.payload?.auth_User?.user_name;
          state.auth_response.twoFactorEnabled =
            action.payload?.auth_User?.twoFactorEnabled;
          state.auth_response.roles = action.payload?.auth_User?.roles;
          state.auth_response.token = action.payload?.auth_User?.token;
          state.auth_response.refresh_token =
            action.payload?.auth_User?.refresh_token;
          state.auth_response.refresh_token_expiry_time =
            action.payload?.auth_User?.refresh_token_expiry_time;
        }
        // setAuth({
        //   message: state.message,
        //   auth_response: state.auth_response
        // });
      })
      .addCase(getAuth.rejected, (state, action) => {
        state.auth_response.isLoading = false;
      });
  },
});

export const { clearAuth, updateAuth, logOff } = authSlice.actions;

export default authSlice.reducer;
