import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const user = useSelector((store) => store?.authReducer);

  const isLoggedIn = user?.message === "Successfully logged in.";
  const hasAllowedRoles = user?.auth_response?.roles?.some((role) =>
    allowedRoles?.includes(role?.roleName)
  );

  if (isLoggedIn && !hasAllowedRoles) {
    // User tried logging in but does not have allowed roles
    // Track this event (e.g., send analytics, log to console, etc.)
    console.log("User tried logging in but does not have allowed roles");
  }

  if (hasAllowedRoles) {
    return <Outlet />;
  } else if (isLoggedIn) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/" state={{ from: location, message: "Not Authenticated" }} replace />;
  }
};

export default RequireAuth;
