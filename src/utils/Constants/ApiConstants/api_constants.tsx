export const BaseUrl = import.meta.env.VITE_API_BASE_URL;
export const AUTH_TOKEN = "/";
export const Login_Url = BaseUrl + import.meta.env.VITE_LOGIN;
export const Logout_Url = BaseUrl + import.meta.env.VITE_LOGOUT;
export const Create_Profile_Url = BaseUrl + import.meta.env.VITE_CREATE_PROFILE_URL;
export const Get_Profile_Url = BaseUrl + import.meta.env.VITE_PROFILE_URL;

export const ROLES = {
  Administrator: "Admin",
  Instructor: "Instructor",
  Student: "Student",
};
