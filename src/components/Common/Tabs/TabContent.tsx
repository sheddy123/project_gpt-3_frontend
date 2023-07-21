import { earningData } from "@/components/Dashboard/data/dummy";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";

import { IoIosMore } from "react-icons/io";
const TabContent = ({ TabNavs, activeTab }) => {
  const { currentColor } = useStateContext();
  return (
    <div id="myTabContent">
      {TabNavs.map((tab, index) => {
        return (
          activeTab === `${tab.name}-tab` && (
            <div className="grid grid-cols-3 gap-4 mt-3 rounded-sm items-center">
              {earningData.map((item, index) => (
                <>
                  <div className="bg-gray-50 shadow grid grid-cols-2 p-2">
                    <div>
                      <button
                        type="button"
                        style={{
                          color: item.iconColor,
                          backgroundColor: item.iconBg,
                        }}
                        className="text-2xl opacity-0.9 rounded-full  hover:drop-shadow-xl">
                        {item.icon}
                      </button>
                    </div>
                    <div className="text-end">
                      <button
                        type="button"
                        style={{ color: currentColor }}
                        className="text-xl font-semibold opacity-0.9 hover:drop-shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none ">
                        <IoIosMore />
                      </button>
                    </div>
                    <div className="col-span-2 mt-11">
                      {" "}
                      <p className="text-sm text-black font-bold mb-1 font-poppins">
                        {item.title}
                      </p>
                      <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                        <div
                          className="h-1 bg-primary"
                          style={{ width: "45%" }}></div>
                      </div>
                      <span
                        className="text-[11px] text-gray-500 mb-1 font-poppins"
                        style={{ float: "inline-start" }}>
                        Course {activeTab}
                      </span>
                      <span
                        className="text-[11px] text-gray-500 mb-1 font-poppins"
                        style={{ float: "inline-end" }}>
                        1/2
                      </span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )
        );
      })}
    </div>
  );
};

export default TabContent;
