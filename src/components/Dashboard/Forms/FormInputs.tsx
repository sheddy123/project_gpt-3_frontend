import { useDispatch, useSelector } from "react-redux";
import {
  selectFormPage,
  selectFormQuestionLength,
  setQuestionLength,
  setTotalQuestions,
} from "@/redux/features/form/formSlice";
import CourseOverview from "./CourseOverview";
import CourseQuestionLists from "./CourseQuestionLists";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useEffect } from "react";
import Questions from "./Questions";
import SubmitQuestions from "./SubmitQuestions";

const FormInputs = ({
  handleChange,
  handleNext,
  nextHide,
  disableNext,
  handlePrev,
  selectedQuestion,
  questionSets,
  selectAnswerOption,
  selectAnsweredQuestions,
  selectQuestionsSkipped,
  isSubmitted,
  lastPage
}) => {
  const page = useSelector(selectFormPage);
  const questLength = useSelector(selectFormQuestionLength);
  const { setActiveMenu } = useStateContext();
  const dispatch = useDispatch();
  
  useEffect(() => {
    setActiveMenu(false);
    //setSelectedQuestion([]);
  }, []);

  const display = {
    0: (
      <CourseOverview
        handleNext={handleNext}
        nextHide={nextHide}
        disableNext={disableNext}
        page={page}
      />
    ),
    1: <CourseQuestionLists handleChange={handleChange} />,
    ...questionSets.reduce((acc, step, index) => {
      acc[step.formId] = (
        <Questions
          key={step.formId}
          component={index + 1}
          data={step}
          options={step.options}
          answer={step.answer}
          questLength={questLength}
          handleChange={handleChange}
          handleNext={handleNext}
          handlePrev={handlePrev}
          selectedQuestion={selectedQuestion}
          page={page}
          selectAnswerOption={selectAnswerOption}
          selectQuestionsSkipped={selectQuestionsSkipped}
          selectAnsweredQuestions={selectAnsweredQuestions}
          isSubmitted={isSubmitted}
          lastPage={lastPage}
        />
      );
      return acc;
    }, 
    {}),
  };
  useEffect(() => {
    dispatch(setQuestionLength(Object.keys(display).length));
    dispatch(setTotalQuestions(questionSets.length));
  }, []);

  const isOnLastPage = page === questLength;
  const displayRequiredPage = !isOnLastPage ? (
    display[page]
  ) : (
    <SubmitQuestions page={page} />
  );

  const content = (
    <div className="form-inputs flex-col">{displayRequiredPage}</div>
  );

  return content;
};
export default FormInputs;
