import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
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
} from "@/redux/features/form/formSlice";
import FormInputs from "./FormInputs";
const Form = () => {
  const formData = {
    page: useSelector(selectFormPage),
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
  };
  const dispatch = useDispatch();
  const [selectedQuestion, setSelectedQuestion] = useState<number[]>([]);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    const payloadValue = type === "checkbox" ? e.target.checked : value;
    dispatch(setData({ name, value: payloadValue }));
  };
  const handlePrev = (page: number) => {
    dispatch(setPage(page - 1));
  };

  const handleNext = (page: number) => {
    dispatch(setPage(page + 1));

    console.log("Page is " + page);
    
      setSelectedQuestion((prevSelected) => {
        // Check if the question is already selected, then remove it from the selected questions
        if (prevSelected.includes(page)) {
          return prevSelected.filter((q) => q !== page);
        }
        // Otherwise, add the question to the selected questions
        return [...prevSelected, page];
      });
    // if (visitedQuestionNumber) {
    //   // Assuming 'numbers' is the state storing the array of unique numbers
    //   setNumbers((prevNumbers) => {
    //     const updatedNumbers = [
    //       ...new Set([visitedQuestionNumber, ...prevNumbers]),
    //     ].slice(0, 5);
    //     return updatedNumbers;
    //   });
    // }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData.data));
  };

  // Rest of the component code...
  const content = (
    <form className="form flex-col" onSubmit={handleSubmit}>
      <header className="form-header">
        {/* <h2>{title[page]}</h2> */}

        <div className="button-container">
          <button
            type="button"
            className={`button ${formData.prevHide}`}
            onClick={() => handlePrev(formData.page)}
            disabled={formData.disablePrev}>
            Prev
          </button>

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
      </header>

      <FormInputs
        handleChange={handleChange}
        handleNext={handleNext}
        nextHide={formData.nextHide}
        handlePrev={handlePrev}
        disableNext={formData.disableNext}
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
      />
    </form>
  );

  return content;
};
export default Form;
