import { IAuth } from "@/interfaces/IFeatures/IFeatures";
import { getAuthService } from "@/services/api/AuthService/GetAuthService";
import { createSlice } from "@reduxjs/toolkit";

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
    image_url: "",
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
      //state.auth_response.status = action.payload;
    },
    logOff: (state, action) => {
      console.log("Action is logged out" + JSON.stringify(action.payload));

      state.message = "";
      state.auth_response = action.payload;
    },
    sessionEnded: (state, action) => {
      state.message = "Session ended";
    },
    errMessage: (state, action) => {
      
      console.log("Action is", action.payload)
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthService.pending, (state) => {
        state.auth_response.isLoading = true;
      })
      .addCase(getAuthService.fulfilled, (state, action) => {
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
          state.auth_response.image_url = action.payload?.auth_User?.image_url;
        }
        // setAuth({
        //   message: state.message,
        //   auth_response: state.auth_response
        // });
      })
      .addCase(getAuthService.rejected, (state, action) => {
        state.auth_response.isLoading = false;
      });
  },
});

export const { clearAuth, updateAuth, logOff, errMessage, sessionEnded } =
  authSlice.actions;

export default authSlice.reducer;
