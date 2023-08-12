import { MdClose } from "react-icons/md";
import "./Review.css";

const Review = (props) => {
  return (
    <aside className="modal-container ">
      <div className="card_review text-center">
        <div className=" float-right">
          <button type="button"
            className="close-icon hover:drop-shadow-xl bg-light-gray hover:dark:bg-light-gray mt-[9px] mr-[-5px] dark:bg-slate-700"
            style={{ borderRadius: "50%" }}
            onClick={() =>props.setShowRating(false)}>
            <MdClose />
          </button>
        </div>
        {props.children}
      </div>
    </aside>
  );
};

export default Review;
