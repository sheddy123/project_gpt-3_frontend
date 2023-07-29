import { dashboardSidebar } from "@/utils/Constants/ComponentsConstants/constants";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import LearningHoursCard from "./LearningHoursCard";
const YouMayLike = () => {
  const { currentColor } =
    useStateContext();
  const { img } = dashboardSidebar;
  return (
    <LearningHoursCard currentColor={currentColor} img={img} noOfHours={76} />
  );
};

export default YouMayLike;
