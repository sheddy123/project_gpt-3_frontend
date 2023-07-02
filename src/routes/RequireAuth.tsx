import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";


const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const user = useSelector((store) => store?.authReducer);
  
  return user?.auth_response?.roles?.find((role) =>
    allowedRoles?.includes(role?.roleName)
  ) ? (
    <Outlet />
  ) : user?.message === "Successfully logged in." ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
