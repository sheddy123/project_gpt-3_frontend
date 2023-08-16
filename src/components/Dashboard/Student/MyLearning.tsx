import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { ecomPieChartData, pieChartData } from "../data/dummy";
import DropDownComponent from "./DropdownComponent";
import { Pie, ChartsHeader } from "@/components";
import {
  selectStudentLogTime,
  selectStudentProgress,
} from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import {
  convertMillisecondsToTime,
  convertMillisecondsToTimeToString,
  getImageURLForBrand,
  truncateString,
} from "@/utils/Helpers/helpers";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
const MyLearning = () => {
  const filterData: string[] = ["By hours", "By minutes", "By seconds"];

  const { currentMode } = useStateContext();
  const studentLogTime = useSelector(selectStudentLogTime);
  const studentProgress = useSelector(selectStudentProgress);

  const transformedArray = studentProgress?.map((item) => ({
    x: item.name,
    y: item.percentageProgress,
    text:
      item.percentageProgress > 0
        ? `${item.percentageProgress.toFixed(2)}%`
        : "0%",
  }));

  // Sort the array based on durationMillis in descending order
  const sortedData = studentLogTime?.getStudentLogTimeVws
    ?.slice()
    .sort((a, b) => b.durationMillis - a.durationMillis);

  // Get distinct values based on the "durationMillis" property
  const distinctData = sortedData?.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.durationMillis === item.durationMillis)
  );

  // Select the first two objects with the highest duration from the distinct data
  const topTwoObjects = distinctData?.slice(0, 2);
  const renderedDivs = topTwoObjects?.map((obj, index) => {
    return (
      <div key={index}>
        <figcaption className="flex items-center justify-start space-x-3">
          <img
            className="rounded-full w-9 h-9 hover:drop-shadow-xl hover:bg-light-gray"
            src={getImageURLForBrand(obj?.title)}
            alt="profile picture"
          />
          <div className="space-y-0.5 font-medium dark:text-white text-left">
            <TooltipComponent content={obj.title} position="BottomCenter">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {truncateString(obj.title, 26)}
              </div>
            </TooltipComponent>

            <div>
              <span className="font-bold font-poppins text-lg">
                {convertMillisecondsToTimeToString(obj.durationMillis)}
              </span>
            </div>
          </div>
        </figcaption>
      </div>
    );
  });
  return (
    <>
      <div className="flex justify-between items-center gap-2 mt-10">
        <p className="text-xl font-semibold dark:text-white">Statistics</p>
        <DropDownComponent
          handleOnClick={null}
          filterData={filterData}
          currentMode={currentMode}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">{renderedDivs}</div>
      <div className=" dark:bg-secondary-dark-bg rounded-md flex">
        <div className="flex-auto w-96">
          <Pie
            id="chart-pie"
            data={transformedArray}
            legendVisiblity
            height="full"
          />
        </div>
        <div className="flex-auto w-4"></div>
      </div>
    </>
  );
};

export default MyLearning;
