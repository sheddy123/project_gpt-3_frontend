import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/features/modal/modalSlice";
import useAuth from "@/utils/Hooks/useAuth";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthService } from "@/services/api/AuthService/GetAuthService";

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
    dispatch(
      getAuthService({
        code: JSON.stringify(jwtDecode(response.credential)),
        provider: "Google",
      }) as any
    )
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
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // The script has been loaded, and the 'google' object is available
      // You can now use the 'google' object here
      /* global google */
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleCallBackResponse,
      });

      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById("signInGoogleDiv"),
        { theme: "outline", size: "large" }
      );
      //console.log(google);
    };

    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component is unmounted
      document.body.removeChild(script);
    };
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
