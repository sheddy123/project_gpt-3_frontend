import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.tsx";
import RequireAuth from "./RequireAuth.tsx";
import { ROLES } from "../utils/Constants/ApiConstants/api_constants.tsx";
import PersistLogin from "./PersistLogin.tsx";

function NotFoundPage() {
  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function UnAuthorizedPage() {
  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2>Unauthorized</h2>
    </div>
  );
}

const RoutePages = () => {
  
  return (
    // <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
          <Route path="unauthorized" element={<UnAuthorizedPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    // </Router>
  );
};

export default RoutePages;
