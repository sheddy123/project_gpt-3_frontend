import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sessionEnded } from "@/redux/features/auth/authSlice";
import jwtDecode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const user = useSelector((store) => store?.authReducer);
  const dispatch = useDispatch();
  const isLoggedIn = user?.message === "Successfully logged in.";

  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds
  const hasAllowedRoles = user?.auth_response?.roles?.some((role) =>
    allowedRoles?.includes(role?.roleName)
  );

  let expiryJwtCode = 0;
  let isTokenExpired = false;
  //console.log("TOne is ", user.auth_response.token);
  if (user && user?.auth_response && user?.auth_response?.token !== "" && user?.auth_response?.token !== undefined) {
    expiryJwtCode = JSON.stringify(
      jwtDecode(user.auth_response.token)?.exp
    );
    isTokenExpired = expiryJwtCode > 0 && expiryJwtCode < currentTimestamp;
  }

  if (isTokenExpired) {
    //console.log("Expiry ended", hasAllowedRoles);
    dispatch(sessionEnded(undefined));
  }

  if (isLoggedIn && !hasAllowedRoles) {
    // User tried logging in but does not have allowed roles
    // Track this event (e.g., send analytics, log to console, etc.)
    //console.log("User tried logging in but does not have allowed roles");
  }
  if (hasAllowedRoles && !isTokenExpired) {
    return <Outlet />;
  } else if (isLoggedIn) {
    return (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
  } else if (isTokenExpired || user?.message.includes("Lifetime validation failed")) {
    return (
      <Navigate
        to="/"
        state={{ from: location, message: "Session Ended" }}
        replace
      />
    );
  } 
  else if(hasAllowedRoles === undefined) {
    return (
      <Navigate
        to="/"
        state={{ from: location, message: "Not Authenticated" }}
        replace
      />
    );
  }
};

export default RequireAuth;
