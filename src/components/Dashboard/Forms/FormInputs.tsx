import { useSelector } from "react-redux";
import Billing from "./Billing";
import OptIn from "./OptIn";
import Shipping from "./Shipping";
import { selectFormPage } from "@/redux/features/form/formSlice";

const FormInputs = ({ handleChange }) => {
  const page = useSelector(selectFormPage);

  const display = {
    0: <Billing handleChange={handleChange} />,
    1: <Shipping handleChange={handleChange} />,
    2: <OptIn handleChange={handleChange} />,
  };

  const content = <div className="form-inputs flex-col">{display[page]}</div>;

  return content;
};
export default FormInputs;
