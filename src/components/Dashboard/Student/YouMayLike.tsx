import { dashboardSidebar } from "@/utils/Constants/ComponentsConstants/constants";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import LearningHoursCard from "./LearningHoursCard";
import { useSelector } from "react-redux";
import { convertMillisecondsToTime } from "@/utils/Helpers/helpers";
import { selectStudentLogTime } from "@/redux/features/auth/authSlice";
const YouMayLike = () => {
  const { currentColor } =
    useStateContext();
  const { img } = dashboardSidebar;
  const studentLogTime = useSelector(selectStudentLogTime);
  const timeSpent = convertMillisecondsToTime(studentLogTime?.totalDurationMillis);
  return (
    <LearningHoursCard currentColor={currentColor} img={img} noOfHours={timeSpent} />
  );
};

export default YouMayLike;
