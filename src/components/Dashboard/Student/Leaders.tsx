import { IoIosMore, IoMdTrophy } from "react-icons/io";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { selectHighestScorers } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";
import { getHighestPerformingScorersService } from "@/services/api/AuthService/GetAuthService";
import { getInitials } from "@/utils/Helpers/helpers";
const Leaders = () => {
  const { currentColor } = useStateContext();
  const highestScorers = useSelector(selectHighestScorers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHighestPerformingScorersService() as any);
  }, []);

  const difficultyClassMapping = {
    Difficult: "bg-red-100 text-red-800",
    Medium: "bg-green-100 text-green-800",
    Easy: "bg-yellow-100 text-yellow-800",
  };

  function getDifficultyBadge(difficulty) {
    const classNames = difficultyClassMapping[difficulty];
    if (classNames) {
      return (
        <span
          className={`${classNames} font-medium mr-2 px-2.5 py-0.5 text-[10px] rounded dark:${classNames.replace(
            "bg-",
            "dark:bg-"
          )} dark:text-${classNames.replace("text-", "text-")}`}>
          {difficulty}
        </span>
      );
    }
    return null;
  }

  const tableRowData =
    highestScorers?.length > 0 ? (
      highestScorers.map(
        ({ user_name, course_name, difficulty_level_name, grade }) => {
          return (
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 text-[10px]">
                {course_name}
              </th>
              <td className="px-6 py-4 text-[10px]">{getInitials(user_name)}</td>
              <td className="px-6 py-4 text-[10px]">{grade}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-[10px]">
                {getDifficultyBadge(difficulty_level_name)}
              </td>
            </tr>
          );
        }
      )
    ) : (
      <span className="mt-5">No data to display</span>
    );
  return (
    <>
      <div className=" bg-gray-50 shadow dark:text-gray-200 dark:bg-main-dark-bg rounded-sm p-6 m-3">
        <div className="flex justify-between">
          <p className="text-xl font-semibold text-[12px]">
            {" "}
            <IoMdTrophy /> Highest Scorers in Different Quizzes
          </p>
          <button type="button" className="text-xl font-semibold text-gray-400">
            <IoIosMore />
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-[10px]">
                  Quiz Name
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Highest Scorer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-[10px]">
                  Score
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-[10px]">
                  Difficulty
                </th>
              </tr>
            </thead>
            <tbody>{tableRowData}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Leaders;
