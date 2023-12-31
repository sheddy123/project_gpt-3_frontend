// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useSelector, useDispatch } from "react-redux";
import {
  selectFormPage,
  selectFormData,
  setPage,
  selectFormTitle,
  selectDisablePrev,
  selectPrevHide,
  selectNextHide,
  selectSubmitHide,
  selectDisableNext,
  selectFormQuestionLength,
  setSelectedQuestion,
  selectSelectedQuestion,
  resetSelectedQuestions,
  selectAnswerOption,
  selectAnsweredQuestions,
  resetAnsweredQuestions,
  selectQuestionsSkipped,
  setSkippedQuestion,
  submitQuestion,
  selectIsSubmitted,
  selectLastPage,
  selectStartTime,
  selectQuestionType,
} from "@/redux/features/form/formSlice";
import FormInputs from "./FormInputs";
import { openConfetti } from "@/redux/features/modal/modalSlice";
import { gradeStudentQuizService } from "@/services/api/QuestionService/QuestionService";
import { useState } from "react";
const Form = ({ courseId }) => {
  const formData = {
    page: useSelector(selectFormPage),
    selectSelectedQuestion: useSelector(selectSelectedQuestion),
    selectAnsweredQuestions: useSelector(selectAnsweredQuestions),
    data: useSelector(selectFormData),
    title: useSelector(selectFormTitle),
    disablePrev: useSelector(selectDisablePrev),
    prevHide: useSelector(selectPrevHide),
    nextHide: useSelector(selectNextHide),
    submitHide: useSelector(selectSubmitHide),
    disableNext: useSelector(selectDisableNext),
    questionLength: useSelector(selectFormQuestionLength),
    questionsSkipped: useSelector(selectQuestionsSkipped),
    isSubmitted: useSelector(selectIsSubmitted),
    lastPage: useSelector(selectLastPage),
    startTime: useSelector(selectStartTime),
    questionType: useSelector(selectQuestionType),
  };
  const dispatch = useDispatch();
  const [showRating, setShowRating] = useState(false);
  const handleChange = () => {
    //dispatch(submitQuestion());
    // const { name, value, type } = e.target;
    // console.log(name, value, type);
    // console.log(name, value, type);
    // const payloadValue = type === "checkbox" ? e.target.checked : value;
    // dispatch(setData({ name, value: payloadValue }));
  };
  const handlePrev = (page: number, id?: number) => {
    if (page > 1) {
      dispatch(setSkippedQuestion({ id: id }));
    }
    dispatch(setPage(page - 1));
  };
  const handleNext = (page: number, id?: number) => {
    if (page == 0) {
      dispatch(resetSelectedQuestions());
      dispatch(resetAnsweredQuestions());
    }
    if (page > 1) {
      dispatch(setSkippedQuestion({ id: id }));
    }
    dispatch(setPage(page + 1));
    dispatch(setSelectedQuestion(page));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(openConfetti(undefined));
    dispatch(submitQuestion());
    dispatch(setSkippedQuestion(formData.page));
    dispatch(setPage(formData.page + 1));
    setShowRating(true);
    dispatch(
      gradeStudentQuizService({
        studentQuizGrade: formData.selectAnsweredQuestions,
        courseQuizLists: formData.data,
        startTime: formData.startTime,
        endTime: new Date(),
        questionType: formData.questionType
      }) as any
    );
    dispatch(getStudentProgressService() as any);
  };
  const updatedQuestionsArray = formData.data.map((item, index) => ({
    ...item,
    formId: index + 2, // Update the formId to start from 2
  }));

  // Rest of the component code...
  const content = (
    <form className="form flex-col" onSubmit={handleSubmit}>
      {/* <header className="form-header"> */}
      {/* <h2>{title[page]}</h2> */}

      {/* <button
              type="button"
              className={`button ${formData.prevHide}`}
              onClick={() => handlePrev(formData.page)}
              disabled={formData.disablePrev}>
              Prev
            </button> */}

      {/* <div className="button-container">
          {formData.page < 2 && (
            <button
              type="button"
              className={`button ${formData.prevHide}`}
              onClick={() => handlePrev(formData.page)}
              disabled={formData.disablePrev}>
              Prev
            </button>
          )}

          <button
            type="button"
            className={`button ${formData.nextHide}`}
            onClick={() => handleNext(formData.page)}
            disabled={formData.disableNext}>
            Next
          </button>

          <button
            type="submit"
            className={`button ${formData.submitHide}`}
            disabled={!formData.canSubmit}>
            Submit
          </button>
        </div>
      </header> */}
      <br />
      <FormInputs
        handleChange={handleSubmit}
        handleNext={handleNext}
        nextHide={formData.nextHide}
        handlePrev={handlePrev}
        disableNext={formData.disableNext}
        selectedQuestion={formData.selectSelectedQuestion}
        questionSets={updatedQuestionsArray}
        selectAnswerOption={selectAnswerOption}
        selectAnsweredQuestions={formData.selectAnsweredQuestions}
        selectQuestionsSkipped={formData.questionsSkipped}
        isSubmitted={formData.isSubmitted}
        lastPage={formData.lastPage}
        setSkippedQuestion={setSkippedQuestion}
        setPage={setPage}
        wholeQuestions={formData.data}
        courseId={courseId}
        showRating={showRating}
        setShowRating={setShowRating}
        questionType={formData.questionType}
      />
    </form>
  );

  return content;
};
export default Form;
