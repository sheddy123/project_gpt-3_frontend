import { earningData } from "@/components/Dashboard/data/dummy";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import "./Tabs.css";
import { IoIosMore } from "react-icons/io";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";
const TabContent = ({ TabNavs, activeTab }) => {
  const { currentColor } = useStateContext();
  return (
    <div id="myTabContent">
      {TabNavs.map((tab, index) => {
        return (
          activeTab === `${tab.name}-tab` && (
            <div key={tab+index} className="grid grid-cols-3 gap-4 mt-3 rounded-sm items-center">
              {earningData.map((item, index) => (
                <>
                  <div key={`${item}${index}`} className="bg-gray-50 shadow grid grid-cols-2 p-2 h-full w-full overflow-hidden relative max-w-xs bg-cover bg-no-repeat cont">
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
                    <div className="group fd-sh group-hover:opacity-100 absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden  bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-20 flex justify-center items-center">
                      <NavLink to={`/dashboard/courses/${item.title.toLowerCase()}`} className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow'}>
                        Get started
                      </NavLink>
                      {/* <Button styles="opacity-0.9 cursor-pointer" text="Get started" /> */}
                      <div className="absolute inset-0 bg-slate-500 opacity-0 group-hover:opacity-20 transition duration-300 ease-in-out pointer-events-none"></div>
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
