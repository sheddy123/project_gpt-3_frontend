import { dashboardSidebar } from "@/utils/Constants/ComponentsConstants/constants";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
const YouMayLike = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const { img } = dashboardSidebar;
  return (
    <div
      id="dropdown-cta"
      className="ml-3 mr-3 p-4 mt-10 rounded-lg"
      style={{ backgroundColor: currentColor }}
      role="alert">
      <div className="flex items-center mb-3">
        <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
          Beta
        </span>
      </div>
      <div className="grid grid-rows-3 grid-flow-col">
        <div className="row-span-3 text-8xl font-bold text-white">76</div>
        <div className="col-span-2 text-md text-white mt-4">learning hours</div>
        <div className="row-span-2 col-span-2 text-white text-md">
          Keep it up
        </div>
      </div>

      <p className="mb-3 text-sm text-white dark:text-black animate__animated  animate__pulse animate__slow animate__infinite">
        <img src={img} style={{ maxWidth: "76%" }} />
      </p>
    </div>
  );
};

export default YouMayLike;
