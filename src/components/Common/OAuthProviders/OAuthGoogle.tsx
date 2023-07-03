import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/features/modal/modalSlice";
import { getAuth } from "@/redux/features/auth/authSlice";
import useAuth from "@/utils/Hooks/useAuth";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation, useNavigate } from "react-router-dom";


const OAuthGoogle = () => {
  const dispatch = useDispatch();
  const { setAuth, auth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  function handleGoogleCallBackResponse(response) {
    //console.log("Encoded JWT ID token received " + );
    //console.log(jwtDecode(response.credential));
    dispatch(closeModal(undefined));
    dispatch(getAuth({code: JSON.stringify(jwtDecode(response.credential)), provider:"Google"}) as any)
    .then(unwrapResult)
    .then((result) => {
      // Clear the URL parameter after successful API call
      //navigate('/', { replace: true });
      setAuth({
        message: result?.message,
        auth_response: result?.auth_User,
      });

      navigate(from, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleCallBackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInGoogleDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);
  return (
    <>
      {/* <button className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full inline-flex items-center dark:focus:ring-[#4285F4]/55 mb-2">
      <Google /> <span className="mx-auto">Login with Google</span>
    </button> */}
      <div className="mt-2 " id="signInGoogleDiv"></div>
    </>
  );
};

export default OAuthGoogle;
