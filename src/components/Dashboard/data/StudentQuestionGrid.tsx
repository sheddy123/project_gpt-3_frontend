import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Document } from "@/components/Common/Icons/Icons";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormPage,
  setPage,
  resetSelectedQuestions,
  resetAnsweredQuestions,
} from "@/redux/features/form/formSlice";
import avatar2 from "./avatar2.jpg";
import { getCourseRelatedQuestionService } from "@/services/api/CourseService/CourseService";

const courseGridStatus = (props) => (
  <TooltipComponent content={props.Status} position="BottomCenter">
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize cursor-pointer">
      <p
        style={{ background: props.StatusBg }}
        className="rounded-full h-3 w-3"
      />
      <p className="dark:text-white">{props.Status}</p>
    </div>
  </TooltipComponent>
);

const courseGridDifficulty = (props) => {
  const classText =
    props.Difficulty == "Easy"
      ? "text-teal-500"
      : props.Difficulty == "Medium"
      ? "text-orange-500"
      : "text-rose-600";
  return (
    <TooltipComponent content={props.Difficulty} position="BottomCenter">
      {" "}
      <span className={`font-bold cursor-pointer ${classText}`}>
        {props.Difficulty}
      </span>
    </TooltipComponent>
  );
};
const courseGridQuestionType = (props) => {
  const classText =
    props.QuestionType == "Traditional questions"
      ? "text-rose-600"
      : "text-sky-500";
  return (
    <TooltipComponent content={props.QuestionType} position="BottomCenter">
      <span className={`font-bold cursor-pointer ${classText}`}>
        {props.QuestionType}
      </span>
    </TooltipComponent>
  );
};

const CourseGridImage = (props) => {
  const { currentMode } = useStateContext();
  return (
    <div className="flex justify-center items-center gap-4 image ">
      <TooltipComponent content="MCQ" position="BottomCenter">
        <span className="cursor-pointer">
          <Document currentMode={currentMode} />
        </span>
      </TooltipComponent>
      {/* <div>
        <p>{props.CustomerName}</p>
        <p>{props.CustomerEmail}</p>
      </div> */}
    </div>
  );
};

const CourseGridButton = (props) => {
  const dispatch = useDispatch();
  const page = useSelector(selectFormPage);
  const handleNext = (page: number, questionCategory: any) => {
    //console.log("Props is ", questionCategory);
    dispatch(setPage(page + 1));
    //reset questions to default
    dispatch(
      getCourseRelatedQuestionService({
        question_type: questionCategory?.QuestionType,
        difficulty: questionCategory?.Difficulty,
        course_id: questionCategory?.CourseID,
        language: questionCategory?.Language ?? "",
      }) as any
    ).then(() => {
      dispatch(resetSelectedQuestions());
      dispatch(resetAnsweredQuestions());
    });
  };

  return (
    <>
      <TooltipComponent
        content={
          props.Status === "Completed"
            ? "Completed"
            : props.Status === "Pending"
            ? "Pending "
            : props.Start
        }
        position="BottomCenter">
        <button
          type="button"
          disabled={props.Status == "Completed"}
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={() => handleNext(page, props)}
          className={`inline-block rounded ${
            props.Status == "Completed"
              ? "bg-orange-500"
              : props.Status === "Pending"
              ? "bg-teal-500"
              : "bg-blue-500"
          }  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}>
          {props.Status == "Completed"
            ? "Completed"
            : props.Status === "Pending"
            ? "Pending "
            : props.Start}
        </button>
      </TooltipComponent>
    </>
  );
};

export const courseQuestionsGrid = [
  //{ type: "checkbox", width: "50" },
  {
    field: "Title",
    headerText: "Title",
    width: "150",
    textAlign: "Center",
  },
  {
    headerText: "Solution",
    width: "100",
    template: CourseGridImage,
    textAlign: "Center",
  },
  {
    field: "Acceptance",
    headerText: "Acceptance",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "Language",
    headerText: "Language",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "Difficulty",
    headerText: "Difficulty",
    width: "100",
    template: courseGridDifficulty,
    textAlign: "Center",
  },
  {
    field: "QuestionType",
    headerText: "Question Type",
    width: "100",
    template: courseGridQuestionType,
    textAlign: "Center",
  },
  {
    field: "Status",
    headerText: "Status",
    width: "130",
    format: "yMd",
    textAlign: "Center",
    template: courseGridStatus,
  },
  {
    field: "Start",
    headerText: "Action",
    width: "150",
    template: CourseGridButton,
    textAlign: "Center",
  },
];

export const courseQuestionsData = [
  {
    CourseID: 1001,
    Title: "Nirav Joshi",
    Solution: avatar2,
    Acceptance: "64.7%",
    Difficulty: "Easy",
    Status: "Pending",
    StatusBg: "#FEC90F",
    Start: "Begin test",
    QuestionType: "GPT-3-Based Hybrid",
  },
  {
    CourseID: 1001,
    Title: "Nirav Joshi",
    Solution: avatar2,
    Acceptance: "64.7%",
    Difficulty: "Medium",
    Status: "Completed",
    StatusBg: "#8BE78B",
    Start: "Begin test",
    QuestionType: "Traditional questions",
  },
  {
    CourseID: 1001,
    Title: "Nirav Joshi",
    Solution: avatar2,
    Acceptance: "64.7%",
    Difficulty: "Difficult",
    Status: "Active",
    StatusBg: "#8BE78B",
    Start: "Begin test",
    QuestionType: "GPT-3-Based Hybrid",
  },
];
