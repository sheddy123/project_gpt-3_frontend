import { useDispatch } from "react-redux";
import { BaseUrl } from "../Constants/ApiConstants/api_constants";
import { appAxiosInstance } from "../Helpers/axios_config";
import useAuth from "./useAuth";
import { updateAuth } from "../../redux/features/auth/authSlice";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const dispatch = useDispatch();
  const refresh = async () => {
    //document.cookie = 'defaultCookie=defaultValue;';
    //console.log("Cookie is ="+document.cookie);

    const requestBody = {
      RefreshToken: "",
      AccessToken: "",
    };
    const response = await appAxiosInstance.post(
      `${BaseUrl + import.meta.env.VITE_REFRESH_TOKEN}`,
      requestBody,
      {
        withCredentials: true,
      }
    );

    dispatch(updateAuth(response?.data));

    setAuth((prev) => {
      //console.log("Response is", JSON.stringify(response?.data));
      const refreshToken = response?.data?.auth_User?.token;
      const roles = response?.data?.auth_User?.roles;
      return { ...prev, refreshToken: refreshToken, roles: roles };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
