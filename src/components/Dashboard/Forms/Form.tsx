import { useSelector, useDispatch } from "react-redux";
import {
  selectFormPage,
  selectFormData,
  setPage,
  selectFormTitle,
  setData,
  setSameAsBilling,
  selectCanNextPage1,
  selectCanNextPage2,
  selectCanSubmit,
} from "@/redux/features/form/formSlice";
import FormInputs from "./FormInputs";
const Form = () => {
  const page = useSelector(selectFormPage);
  const data = useSelector(selectFormData);
  const title = useSelector(selectFormTitle);
  const dispatch = useDispatch();
  const canNextPage1 = useSelector(selectCanNextPage1);
  const canNextPage2 = useSelector(selectCanNextPage2);
  const canSubmit = useSelector(selectCanSubmit);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const payloadValue = type === "checkbox" ? e.target.checked : value;
    dispatch(setData({ name, value: payloadValue }));
  };
  const handlePrev = (page: number) => {
    dispatch(setPage(page - 1));
  };
  const handleNext = (page: number) => {
    dispatch(setPage(page + 1));
  };
  const handleSameAsBillingChange = (e) => {
    dispatch(setSameAsBilling({ sameAsBilling: e.target.checked }));
  };

  const disablePrev = page === 0;

  const disableNext = 
     page === Object.keys(title).length - 1 ||
     (page === 0 && !canNextPage1) ||
     (page === 1 && !canNextPage2);

     console.log("Disable Next Page " + Object.keys(title).length);
  const prevHide = page === 0 && "remove-button";

  const nextHide = page === Object.keys(title).length - 1 && "remove-button";

  const submitHide = page !== Object.keys(title).length - 1 && "remove-button";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(data));
  };

  // Rest of the component code...
  const content = (
    <form className="form flex-col" onSubmit={handleSubmit}>
      <header className="form-header">
        <h2>{title[page]}</h2>

        <div className="button-container">
          <button
            type="button"
            className={`button ${prevHide}`}
            onClick={() => handlePrev(page)}
            disabled={disablePrev}>
            Prev
          </button>

          <button
            type="button"
            className={`button ${nextHide}`}
            onClick={() => handleNext(page)}
            disabled={disableNext}>
            Next
          </button>

          <button
            type="submit"
            className={`button ${submitHide}`}
            disabled={!canSubmit}>
            Submit
          </button>
        </div>
      </header>

      <FormInputs handleChange={handleChange}/>
    </form>
  );

  return content;
};
export default Form;
