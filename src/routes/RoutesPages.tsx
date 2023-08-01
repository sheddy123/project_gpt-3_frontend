import HomePage from "@/pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import PersistLogin from "./PersistLogin";
import RequireAuth from "./RequireAuth";
import { ROLES } from "@/utils/Constants/ApiConstants/api_constants";

import DashboardLayout from "./DashboardLayout";

function NotFoundPage() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white  dark:bg-[#42464D] shadow rounded-sm overflow-hidden prose prose-slate dark:prose-invert max-w-none prose-img:shadow-md prose-p:mb-0 prose-p:mt-0 dark:prose-hr:border-t-2 prose-hr:border-t-2 dark:prose-hr:border-white">
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}


const RoutePages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Student, ROLES.Administrator, ROLES.Instructor]} />}>
            {/* ================================= Dashboard =======================================*/}
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            {/* ================================= Dashboard =======================================*/}
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default RoutePages;

// <Routes>
//   <Route path="/" element={<HomePage />} />
//   <Route path="/home" element={<HomePage />} />
//   <Route element={<PersistLogin />}>
//     <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
//       <Route path="unauthorized" element={<UnAuthorizedPage />} />
//     </Route>
//   </Route>
//   <Route path="*" element={<NotFoundPage />} />
// </Routes>
// </Router>
