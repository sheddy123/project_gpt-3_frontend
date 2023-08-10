import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "@/components";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  DashboardHome,
  StudentCourseList,
  CoursesLists,
} from "@/pages/Dashboard";
import RequireAuth from "./RequireAuth";
import { ROLES } from "@/utils/Constants/ApiConstants/api_constants";
import AddQuestions from "@/pages/Dashboard/Instructor/AddQuestions";
import QuestionLists from "@/pages/Dashboard/Instructor/QuestionLists";
import TestGridCoursesList from "@/components/Dashboard/Instructor/DynamicGridList";
import DisplayConfetti from "@/components/Common/Confetti/DisplayConfetti";

function NotFoundDashboardPage() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white  dark:bg-[#42464D] shadow rounded-sm overflow-hidden prose prose-slate dark:prose-invert max-w-none prose-img:shadow-md prose-p:mb-0 prose-p:mt-0 dark:prose-hr:border-t-2 prose-hr:border-t-2 dark:prose-hr:border-white">
      <h2>404: Page Not Found</h2>
    </div>
  );
}

function UnAuthorizedPage() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white  dark:bg-[#42464D] shadow rounded-sm overflow-hidden prose prose-slate dark:prose-invert max-w-none prose-img:shadow-md prose-p:mb-0 prose-p:mt-0 dark:prose-hr:border-t-2 prose-hr:border-t-2 dark:prose-hr:border-white">
      <h2>Unauthorized</h2>
    </div>
  );
}

const DashboardLayout = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    editDialog,
  } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray">
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-main-dark-bg bg-white z-[100]">
            <Sidebar />
          </div>
        ) : (
          // <div className="w-0 dark:bg-secondary-dark-bg">
          <div className="w-0 dark:bg-main-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-secondary-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-secondary-dark-bg  w-full min-h-screen flex-2 "
          }>
          <div
            className={` ${
              !editDialog ? "fixed" : ""
            } md:static bg-main-bg dark:bg-main-dark-bg navbar w-full `}>
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            <Routes>
              <Route path="*" element={<NotFoundDashboardPage />} />
              <Route path="unauthorized" element={<UnAuthorizedPage />} />
              <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
                {/* dashboard  */}
                <Route path="/" element={<DashboardHome />} />
                <Route path="/home" element={<DashboardHome />} />
                <Route
                  path="/courses/:courseId"
                  element={<StudentCourseList />}
                />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Route>
              <Route
                element={<RequireAuth allowedRoles={[ROLES.Instructor]} />}>
                <Route path="/add-questions" element={<AddQuestions />} />
                <Route path="/courses" element={<CoursesLists />} />
                <Route path="/questions" element={<QuestionLists />} />
                {/* <Route path="/test_courses" element={<TestGridCoursesList />} /> */}
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Administrator]} />
                }></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
