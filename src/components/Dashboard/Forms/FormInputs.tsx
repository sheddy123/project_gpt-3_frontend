import { useSelector } from "react-redux";
import Billing from "./Billing";
import OptIn from "./OptIn";
import Shipping from "./Shipping";
import { selectFormPage } from "@/redux/features/form/formSlice";
import AboutCourse from "./AboutCourse";

const FormInputs = ({ handleChange, handleNext, nextHide, disableNext }) => {
  const page = useSelector(selectFormPage);

  const display = {
    0: <AboutCourse handleNext={handleNext} nextHide={nextHide} disableNext={disableNext}  />,
    1: <Billing handleChange={handleChange} />,
    2: <Shipping handleChange={handleChange} />,
    3: <OptIn handleChange={handleChange} />,
  };

  const content = <div className="form-inputs flex-col">{display[page]}</div>;

  return content;
};
export default FormInputs;
