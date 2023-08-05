import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sessionEnded } from "@/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((store) => store?.authReducer);
  const dispatch = useDispatch();
  const isLoggedIn = user?.message === "Successfully logged in." || user?.message === "Valid client request";

  const hasAllowedRoles = user?.auth_response?.roles?.some((role) =>
    allowedRoles?.includes(role?.roleName)
  );
  const isTokenExpired = () => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    let expiryJwtCode = JSON.stringify(
      jwtDecode(user.auth_response.token)?.exp
    );
    if (user?.auth_response?.token && expiryJwtCode) {
      return expiryJwtCode < currentTimestamp;
    }
    return false;
  };

  useEffect(() => {
    setIsLoading(true);
    // If you have a way to ensure that the authentication state is already available (e.g., from PersistLogin),
    // you can directly set isLoading to false.
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    // If the authentication state is not yet available, show a loading indicator
    return <p>Loading...</p>;
  }
  //console.log("Is logged in", isLoggedIn, user)
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/"
        state={{ from: location, message: "Not Authenticated" }}
        replace
      />
    );
  }
  //console.log("Is token expired ", isTokenExpired())
  if (isTokenExpired()) {
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
