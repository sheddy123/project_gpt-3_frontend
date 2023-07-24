import { useSelector } from "react-redux";
import { selectFormData } from "@/redux/features/form/formSlice";

const OptIn = ({ handleChange }) => {
  const data = useSelector(selectFormData);
  const content = (
    <>
      <label htmlFor="optInNews">
        <input
          type="checkbox"
          id="optInNews"
          name="optInNews"
          checked={data.optInNews}
          onChange={handleChange}
        />
        Receive our newsletter
      </label>
      <ul className="flex-col">
        <li>Save 10% Now</li>
        <li>Receive Discount Coupons</li>
        <li>Find Out About New Products</li>
      </ul>
    </>
  );

  return content;
};
export default OptIn;
