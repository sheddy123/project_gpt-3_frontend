import { BaseUrl } from "../Constants/ApiConstants/api_constants";
import { appAxiosInstance } from "../Helpers/axios_config";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    const response = await appAxiosInstance.post(
      `${BaseUrl + import.meta.env.VITE_REFRESH_TOKEN}`,
      { RefreshToken: auth?.refreshToken },
      {
        withCredentials: true,
      }
    );

    setAuth((prev) => {
      const refreshToken = response?.data?.auth_User?.refreshToken;
      const roles = response?.data?.auth_User?.roles;
      return { ...prev, refreshToken: refreshToken, roles: roles };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
