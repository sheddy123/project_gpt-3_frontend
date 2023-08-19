import { useState } from "react";
import TabNav from "./TabNav";
import { TabNavs } from "@/utils/Constants/ComponentsConstants/constants";
import TabContent from "./TabContent";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("inprogress-tab");
  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <>
      <div className="mx-auto">
        <div className="border-b border-gray-200 dark:border-stone-300 mb-4">
         {/* @ts-ignore */}
          <TabNav handleTabClick={handleTabClick} tabNavs={TabNavs} activeTab={activeTab} />
        </div>
        <TabContent TabNavs={TabNavs} activeTab={activeTab} />
        
      </div>
      
    </>
  );
};

export default Tabs;
