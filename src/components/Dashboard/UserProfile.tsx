import { MdOutlineCancel } from "react-icons/md";
import { Button } from "..";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useSelector } from "react-redux";
import useLogout from "@/utils/Hooks/useLogout";
import {
  CalendarDays,
  MapPin,
  ProfileIcon,
  SkillIcon,
  Verified,
} from "../Common/Icons/Icons";
import { iconLevelUp } from "@/utils/Constants/ComponentsConstants/constants";

const UserProfile = () => {
  const { currentColor, currentMode } = useStateContext();
  const logout = useLogout();
  const logUserOut = async () => {
    await logout();
  };
  const store = useSelector((store) => store);
  const data = JSON.parse(
    JSON.parse(store?.profileReducer?.programming_skills)
  );

  function DisplaySkills() {
    // Check if programming_skills is an array before rendering
    if (Array.isArray(data)) {
      return (
        <div>
          <ul className="list-disc">
            {data.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={store?.authReducer?.auth_response.image_url}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            {store?.authReducer?.auth_response.user_name}
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1">
              <Verified color="#31d26c" size={5} />
            </span>{" "}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            {store?.authReducer?.auth_response.roles?.[0].roleName}{" "}
            <MapPin
              color={currentMode === "Dark" ? "#fff" : currentColor}
              size="5"
            />
          </p>
        </div>

        <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
          {" "}
          {store?.authReducer?.auth_response.email}{" "}
        </p>
      </div>

      <div>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <CalendarDays
                color={"currentColor"}
                styles={"text-gray-500 dark:text-gray-500"}
              />
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Years of programming experience{" "}
              <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                Latest
              </span>
            </h3>

            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {store?.profileReducer?.years_of_experience}
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <img className="w-[14px] h-[14px]" src={iconLevelUp.img} />
              <div className="absolute inset-0 bg-white opacity-50"></div>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Level
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {store?.profileReducer?.level}
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <SkillIcon
                color={"currentColor"}
                styles={"text-gray-500 dark:text-gray-500"}
              />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Programming skills
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {DisplaySkills()}
            </p>
          </li>
          <li className="ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <ProfileIcon
                color={"currentColor"}
                styles={"text-gray-500 dark:text-gray-500"}
              />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Profile summary
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {store?.profileReducer?.last_updated}
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {store?.profileReducer?.profile_summary}
            </p>
          </li>
        </ol>
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={logout}
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
          className={` text- p-3 w-full hover:drop-shadow-xl hover:bg-`}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
