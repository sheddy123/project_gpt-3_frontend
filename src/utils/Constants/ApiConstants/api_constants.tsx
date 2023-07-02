export const BaseUrl = import.meta.env.VITE_API_BASE_URL;
export const AUTH_TOKEN = "/";
export const Login_Url = BaseUrl + import.meta.env.VITE_LOGIN;

export const ROLES = {
  Administrator: "Admin",
  Instructor: "Instructor",
  Student: "Student",
};
