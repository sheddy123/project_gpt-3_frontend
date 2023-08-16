import { Link, NavLink, useLocation } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useState, useEffect } from "react";
import { links } from "./data/dummy";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { IAuth, IGeoLocation } from "@/interfaces/IFeatures/IFeatures";
import StudentProgressBar from "@/components/Common/StudentProgressBar/StudentProgressBar";
import Confetti from "react-confetti";
import { closeConfetti } from "@/redux/features/modal/modalSlice";
import { MapPin, Verified } from "../Common/Icons/Icons";
import { geoLocationService } from "@/services/api/GeoLocation/GeoLocationService";
import { unwrapResult } from "@reduxjs/toolkit";
import { dashboardSidebar } from "@/utils/Constants/ComponentsConstants/constants";
import { getProfileService } from "@/services/api/ProfileService/profileService";
import LearningHoursCard from "./Student/LearningHoursCard";
import { getStudentProgressService } from "@/services/api/AuthService/GetAuthService";
import { selectStudentLogTime, selectStudentProgress } from "@/redux/features/auth/authSlice";
import { calculateStudentProgress, convertMillisecondsToTime } from "@/utils/Helpers/helpers";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize, handleClick } =
    useStateContext();
  const [isActiveLink, setIsActiveLink] = useState("");
  const [geographicLocation, setGeographicLocation] = useState<IGeoLocation>({
    ip: "",
    network: "",
    version: "",
    city: "",
    region: "",
    region_code: "",
    country: "",
    country_name: "",
    country_code: "",
    country_code_iso3: "",
    country_capital: "",
    country_tld: "",
    continent_code: "",
    in_eu: "",
    postal: "",
    latitude: "",
    longitude: "",
    timezone: "",
    utc_offset: "",
    country_calling_code: "",
    currency: "",
    currency_name: "",
    languages: "",
    country_area: "",
    country_population: "",
    asn: "",
    org: "",
  });
  const dispatch = useDispatch();
  const { img } = dashboardSidebar;
  const [userProfileData, setUserProfileData] = useState("");
  const location = useLocation();
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const modalReducer = useSelector((state) => state.modalReducer);
  const store: IAuth | undefined = useSelector((store) => store?.authReducer);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const studentProgress = useSelector(selectStudentProgress);
  const studentLogTime = useSelector(selectStudentLogTime);
  const timeSpent = convertMillisecondsToTime(studentLogTime?.totalDurationMillis);

  const studentProgressSession = calculateStudentProgress(studentProgress);

  useEffect(() => {
    //setIsActiveLink(window.location.pathname === `/dashboard/${link.name}`);
    //console.log(`setActiveLink` + isActiveLink);
  }, [isActiveLink]);

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    const timer = setTimeout(() => {
      dispatch(closeConfetti(undefined));
    }, 5000);

    return () => {
      window.removeEventListener("resize", detectSize);
      clearTimeout(timer);
    };
  }, [modalReducer.isConfettiOpen, windowDimension]);

  useEffect(() => {
    dispatch(geoLocationService(undefined) as any)
      .then(unwrapResult)
      .then((result) => {
        setGeographicLocation(result);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(getStudentProgressService() as any);
    //Profile
    dispatch(getProfileService(store?.auth_response.user_name) as any)
      .then(unwrapResult)
      .then((result) => {
        setUserProfileData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <>
      {modalReducer.isConfettiOpen && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1000}
        />
      )}
      <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
        {activeMenu && (
          <>
            <div
              className="flex justify-between items-center"
              style={{ justifyContent: "center" }}>
              <Link
                to="/"
                onClick={handleCloseSideBar}
                className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                <SiShopware /> <span>Hybrid_GPT3</span>
              </Link>

              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => setActiveMenu(!activeMenu)}
                  style={{ color: currentColor }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <div className="flex justify-center items-center mt-10">
              <div className="relative">
                <img
                  className="w-[10em] h-[10em] rounded-full"
                  src={store?.auth_response.image_url}
                  alt=""
                />
                <span className="top-0 right-7 absolute w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
            </div>

            <div className="flex justify-center items-center mx-auto">
              <div className="flex flex-col text-center">
                <p className="text-black dark:text-white">
                  {store?.auth_response.user_name}{" "}
                  <span className="inline-flex items-center justify-center w-5 h-5">
                    <Verified color="#31d26c" size={5} />
                  </span>
                </p>
                <div className="flex items-center mx-auto">
                  <MapPin color={currentColor} size="5" />
                  <span className="text-sm" style={{ color: currentColor }}>
                    {geographicLocation.city} {geographicLocation.region},
                    {geographicLocation.country_name}
                  </span>
                </div>

                <div
                  className="badge-block mx-auto"
                  onClick={() => handleClick("userProfile")}>
                  <TooltipComponent content="Profile" position="BottomCenter">
                    <a href="#" className="e-badge e-badge-secondary mx-auto">
                      Profile
                    </a>
                  </TooltipComponent>
                </div>
              </div>
            </div>
            <StudentProgressBar
              progress={Math.ceil(parseFloat(studentProgressSession))}
              spanText="%"
              progressText="Progress"
            />

            {/* {links.map((item) => (
              <div key={item.title} className="mt-10">
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase text-center">
                  {item.title}
                </p>
                <div className="flex m-3 flex-wrap justify-center gap-4 items-center mt-4">
                  {item.links.map((link) => (
                    <NavLink
                      to={`/dashboard/${link.name}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => {
                        isActive && setIsActiveLink(link.name);
                        return {
                          backgroundColor: "",
                        };
                      }}
                      // className={`${activeLink}`}
                      // className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                      // style={{
                      //   color: "rgb(3, 201, 215)",
                      //   backgroundColor: "rgb(229, 250, 251)",
                      // }}
                    >
                      <span
                        key={link.name}
                        className="flex flex-col items-center justify-center">
                        <span
                          className={`text-[11px] opacity-0.9 p-4 rounded-full hover:drop-shadow-xl bg-gray-200 hover:bg-stone-800 hover:text-white
                        ${isActiveLink === link.name ? "text-white" : ""}`}
                          style={{
                            backgroundColor: `${
                              isActiveLink === link.name ? currentColor : ""
                            }`,
                          }}>
                          {link.icon}
                        </span>
                        <span
                          className={`capitalize text-[10px]`}
                          style={{ color: `${currentColor}` }}>
                          {link.name}
                        </span>
                      </span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
     */}

            <div className="mt-10 md:hidden">
              {links.map((item) => (
                <div key={item.title}>
                  <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links
                    .filter(
                      (link) =>
                        link.role === store?.auth_response.roles?.[0].roleName
                    )
                    .map((link) => (
                      <NavLink
                        to={`/dashboard/${link.name}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }>
                        {link.icon}
                        <span className="capitalize ">{link.name}</span>
                      </NavLink>
                    ))}
                </div>
              ))}
            </div>
            <LearningHoursCard
              currentColor={currentColor}
              img={img}
              noOfHours={timeSpent}
            />
            <div className="mt-20 text-center dark:text-white text-black font-bold font-poppins">
              <p className=" text-base">
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/fluency/48/so-so.png"
                  alt="so-so"
                  className="inline-flex items-center justify-center w-5 h-5 ml-1"
                />
                Hey, {store?.auth_response.user_name}!
              </p>
              <p className="text-sm text-gray-500">
                Here's an overview of your progress
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
