// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sessionEnded } from "@/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((store:any) => store?.authReducer);
  const dispatch = useDispatch();
  const isLoggedIn =
    user?.message === "Successfully logged in." ||
    user?.message === "Valid client request";

  const hasAllowedRoles = user?.auth_response?.roles?.some((role) =>
    allowedRoles?.includes(role?.roleName)
  );
  const isTokenExpired = () => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expiryJwtCode = JSON.stringify(
      jwtDecode(user.auth_response.token)?.exp
    );
    if (user?.auth_response?.token && expiryJwtCode) {
      return Number(expiryJwtCode) < currentTimestamp;
    }
    return false;
  };

  useEffect(() => {
    setIsLoading(true);
    // If you have a way to ensure that the authentication state is already available (e.g., from PersistLogin),
    // you can directly set isLoading to false.
    setIsLoading(false);
  }, [user]);
  const searchStrings = ["The token is expired", "Session ended", "Lifetime validation failed. The token is expired"];
  let foundString = "";
  for (const searchString of searchStrings) {
    if (user?.message?.includes(searchString)) {
      foundString = searchString;
      break; // If found, exit the loop early
    }
  }
  if (isLoading) {
    // If the authentication state is not yet available, show a loading indicator
    return <p>Loading...</p>;
  }
  //console.log("Is logged in", isLoggedIn, user)
  if (!isLoggedIn && !foundString) {
    return (
      <Navigate
        to="/"
        state={{ from: location, message: "Not Authenticated" }}
        replace
      />
    );
  }
  //console.log("Is token expired ", isTokenExpired())
  if (foundString || isTokenExpired()) {
    dispatch(sessionEnded(undefined));
    return (
      <Navigate
        to="/"
        state={{ from: location, message: "Session Ended" }}
        replace
      />
    );
  }
  //  console.log("Has allowed roles ", hasAllowedRoles)
  if (hasAllowedRoles && !isTokenExpired()) {
    return <Outlet />;
  }

  return (
    <Navigate to="/dashboard/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
