import { useDispatch } from "react-redux";
import { appAxiosAuthInstance } from "../Helpers/axios_config";
import { BaseUrl } from "../Constants/ApiConstants/api_constants";
import { errMessage, logOff, updateAuth } from "@/redux/features/auth/authSlice";

const useCookiePresent = () => {
  const dispatch = useDispatch();
  const controller = new AbortController();

  const logOut = async () => {
    try {
      const response = await appAxiosAuthInstance.post(
        `${BaseUrl + import.meta.env.VITE_CHECK_COOKIE_URL}`,
        {
          withCredentials: true,
        }
      );
      //console.log("Response: " + JSON.stringify(response.data));
      if (response.data.message === "Valid client request")
        dispatch(updateAuth(response.data));
      else dispatch(logOff({}));
    } catch (err) {
      dispatch(errMessage(err?.response?.data));
      console.log(err);
    }
    finally{
      controller.abort();
    }
  };
  return logOut;
};

export default useCookiePresent;
