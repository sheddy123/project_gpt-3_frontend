import { useDispatch } from "react-redux";
import { appAxiosAuthInstance } from "../Helpers/axios_config";
import { BaseUrl } from "../Constants/ApiConstants/api_constants";
import { logOff } from "../../redux/features/auth/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const logOut = async () => {
    dispatch(logOff({}));

    try {
      const response = await appAxiosAuthInstance.post(
        `${BaseUrl + import.meta.env.VITE_LOGOUT}`,
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return logOut;
};

export default useLogout;


