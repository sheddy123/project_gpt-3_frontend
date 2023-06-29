import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../utils/Hooks/useRefreshToken";
import useAuth from "../utils/Hooks/useAuth";
import { useSelector } from "react-redux/es/hooks/useSelector";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const user = useSelector((store) => store?.authReducer?.auth_response);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
console.log("============",user?.token);

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !user?.token ? verifyRefreshToken() : setIsLoading(false);
    //verifyRefreshToken();
    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log("Persist login" + JSON.stringify(user));
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth)}`);
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
