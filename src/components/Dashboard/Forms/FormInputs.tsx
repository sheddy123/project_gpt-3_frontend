import { useDispatch, useSelector } from "react-redux";
import {
  selectFormPage,
  selectFormQuestionLength,
  setQuestionLength,
  setTotalQuestions
} from "@/redux/features/form/formSlice";
import CourseOverview from "./CourseOverview";
import CourseQuestionLists from "./CourseQuestionLists";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useEffect } from "react";
import Questions from "./Questions";
import SubmitQuestions from "./SubmitQuestions";

const FormInputs = ({ handleChange, handleNext, nextHide, disableNext }) => {
  const page = useSelector(selectFormPage);
  const questLength = useSelector(selectFormQuestionLength);
  const { setActiveMenu } = useStateContext();
  const dispatch = useDispatch();
  useEffect(() => {
    setActiveMenu(false);
  }, []);
  const QuestionsData = [
    { id: 2, component: "1", data: "Question 1 data" },
    { id: 3, component: "2", data: "Question 2 data" },
    { id: 4, component: "3", data: "Question 3 data" },
    { id: 5, component: "4", data: "Question 4 data" },
    { id: 6, component: "5", data: "Question 5 data" },
    { id: 7, component: "6", data: "Question 6 data" },
    // Add more billing data as needed
  ];
  const display = {
    0: (
      <CourseOverview
        handleNext={handleNext}
        nextHide={nextHide}
        disableNext={disableNext}
      />
    ),
    1: <CourseQuestionLists handleChange={handleChange} />,
    ...QuestionsData.reduce((acc, step) => {
      acc[step.id] = (
        <Questions
          key={step.id}
          component={step.component}
          data={step.data}
          handleChange={handleChange}
        />
      );
      return acc;
    }, {}),
  };
  useEffect(() => {
    dispatch(setQuestionLength(Object.keys(display).length));
    dispatch(setTotalQuestions(QuestionsData.length));
  }, []);

  const isOnLastPage = page === questLength;
  const displayRequiredPage = !isOnLastPage ? (
    display[page]
  ) : (
    <SubmitQuestions />
  );

  const content = (
    <div className="form-inputs flex-col">{displayRequiredPage}</div>
  );

  return content;
};
export default FormInputs;
