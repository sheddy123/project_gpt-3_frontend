import Review from "./Review";
import { MdHandshake } from "react-icons/md";

const ThankYou = () => {
  return (
    <Review>
      <div className="thank_you_img_container">
        {/* Add your image here */}
        <MdHandshake className=" text-7xl text-stone-100 mt-5" />
      </div>
      {/* <div className="selected">
        <p>You selected {rating} out of 5</p>
      </div> */}
      <h2 className="title">Thank you!</h2>
      <p className="text p-5">
        We appreciate you taking the time to give a rating. More support? Don't
        hesitate to get in touch!
      </p>
    </Review>
  );
};

export default ThankYou;
