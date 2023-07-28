import { useSelector, useDispatch } from "react-redux";
import {
  selectFormPage,
  selectFormData,
  setPage,
  selectFormTitle,
  setData,
  selectCanNextPage1,
  selectCanNextPage2,
  selectCanSubmit,
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
} from "@/redux/features/form/formSlice";
import FormInputs from "./FormInputs";
const Form = () => {
  const formData = {
    page: useSelector(selectFormPage),
    selectSelectedQuestion: useSelector(selectSelectedQuestion),
    selectAnsweredQuestions: useSelector(selectAnsweredQuestions),
    data: useSelector(selectFormData),
    title: useSelector(selectFormTitle),
    canNextPage1: useSelector(selectCanNextPage1),
    canNextPage2: useSelector(selectCanNextPage2),
    canSubmit: useSelector(selectCanSubmit),
    disablePrev: useSelector(selectDisablePrev),
    prevHide: useSelector(selectPrevHide),
    nextHide: useSelector(selectNextHide),
    submitHide: useSelector(selectSubmitHide),
    disableNext: useSelector(selectDisableNext),
    questionLength: useSelector(selectFormQuestionLength),
    questionsSkipped: useSelector(selectQuestionsSkipped),
  };
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    // console.log(name, value, type);
    // const payloadValue = type === "checkbox" ? e.target.checked : value;
    // dispatch(setData({ name, value: payloadValue }));
  };
  const handlePrev = (page: number) => {
    if (page > 1) {
      dispatch(setSkippedQuestion(page));
    }
    dispatch(setPage(page - 1));
  };
  const handleNext = (page: number) => {
    if (page == 0) {
      dispatch(resetSelectedQuestions());
      dispatch(resetAnsweredQuestions());
    }
    if (page > 1) {
      dispatch(setSkippedQuestion(page));
    }
    dispatch(setPage(page + 1));
    dispatch(setSelectedQuestion(page));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData.data));
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
<br/>
      <FormInputs
        handleChange={handleChange}
        handleNext={handleNext}
        nextHide={formData.nextHide}
        handlePrev={handlePrev}
        disableNext={formData.disableNext}
        selectedQuestion={formData.selectSelectedQuestion}
        questionSets={updatedQuestionsArray}
        selectAnswerOption={selectAnswerOption}
        selectAnsweredQuestions={formData.selectAnsweredQuestions}
        selectQuestionsSkipped={formData.questionsSkipped}
      />
    </form>
  );

  return content;
};
export default Form;
