import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { ChartsHeader, Pie } from "..";
import { ecomPieChartData, pieChartData } from "./data/dummy";
const MyLearning = () => {
  const filterData: string[] = ["By hours", "By minutes", "By seconds"];
  const DropDown = ({ currentMode }) => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
      <DropDownListComponent
        id="time"
        fields={{ text: "Time", value: "Id" }}
        style={{ border: "none", color: currentMode === "Dark" && "black" }}
        value="1"
        dataSource={filterData}
        popupHeight="220px"
        popupWidth="120px"
        placeholder="Filter by"
      />
    </div>
  );

  const { currentMode } = useStateContext();

  return (
    <>
      <div className="flex justify-between items-center gap-2 mt-10">
        <p className="text-xl font-semibold">Statistics</p>
        <DropDown currentMode={currentMode} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="...">
          <figcaption className="flex items-center justify-start space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Developer at Open AI
              </div>
              <div>
                <span className="font-bold font-poppins text-lg">
                  32h 20min
                </span>
              </div>
            </div>
          </figcaption>
          <figcaption className="flex items-center justify-start space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Developer at Open AI
              </div>
              <div>
                <span className="font-bold font-poppins text-lg">
                  32h 20min
                </span>
              </div>
            </div>
          </figcaption>
        </div>
        <div className="...">
          <figcaption className="flex items-center justify-end space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Developer at Open AI
              </div>
              <div>
                <span className="font-bold font-poppins text-lg">
                  32h 20min
                </span>
              </div>
            </div>
          </figcaption>
          <figcaption className="flex items-center justify-end space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Developer at Open AI
              </div>
              <div>
                <span className="font-bold font-poppins text-lg">
                  32h 20min
                </span>
              </div>
            </div>
          </figcaption>
        </div>
      </div>
      <div className=" dark:bg-secondary-dark-bg rounded-3xl">
        <div className="w-full">
          <Pie
            id="chart-pie"
            data={pieChartData}
            legendVisiblity
            height="full"
          />
        </div>
      </div>
   
    </>
  );
};

export default MyLearning;
