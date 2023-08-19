import { ITabNav } from "@/interfaces/IConstants/IConstants";
import { useStateContext } from "@/utils/Helpers/ContextProvider";

const TabNav = ({ handleTabClick, tabNavs, activeTab }: ITabNav) => {
  const { currentColor } = useStateContext();
  return (
    <ul
      className="flex flex-wrap -mb-px"
      id="myTab"
      data-tabs-toggle="#myTabContent"
      role="tablist">
      {tabNavs.map((tab) => (
        <li className="mr-2" key={tab.id} role="presentation">
          <button
            className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 font-semibold"
            id={`${tab.name}-tab`}
            key={tab.id}
            type="button"
            role="tab"
            data-tabs-target={`#${tab.name}`}
            aria-controls={`${tab.name}`}
            aria-selected="true"
            style={{
              color: activeTab === tab.name + "-tab" ? currentColor : "",
            }}
            // @ts-ignore
            onClick={(event) => handleTabClick(event?.target.id)}>
            {tab.name.toLocaleUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TabNav;
