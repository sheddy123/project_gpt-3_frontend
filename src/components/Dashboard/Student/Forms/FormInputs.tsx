import { useDispatch, useSelector } from "react-redux";
import {
  selectFormPage,
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
  lastPage,
  setSkippedQuestion,
  setPage,
  wholeQuestions,
  courseId,
  showRating, 
  setShowRating,
  questionType
}) => {
  const page = useSelector(selectFormPage);
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
        courseId={courseId}
      />
    ),
    1: <CourseQuestionLists handleChange={handleChange} />,
    ...questionSets.reduce((acc, step, index) => {
      acc[step.formId] = (
        <Questions
          key={step.formId}
          component={index + 1}
          data={step}
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
          setSkippedQuestion={setSkippedQuestion}
          setPage={setPage}
          wholeQuestions={wholeQuestions}
          questionType={questionType}
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
  
  const isOnLastPage = page === (wholeQuestions.length + 2);
  const displayRequiredPage = !isOnLastPage ? (
    display[page]
  ) : (
    <SubmitQuestions page={page} setPage={setPage} courseId={courseId} showRating={showRating} setShowRating={setShowRating} difficulty={wholeQuestions[0]?.difficulty_id}  />
  );

  const content = (
    <div className="form-inputs flex-col">{displayRequiredPage}</div>
  );

  return content;
};
export default FormInputs;
