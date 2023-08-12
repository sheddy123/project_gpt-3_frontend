import "./Modal.css";
import { closeModal } from "@/redux/features/modal/modalSlice";
import { Close } from "../Icons/Icons";
import { useDispatch } from "react-redux";

const CustomModal = ({ children, showCloseIcon, styles, maxWidth }) => {
  const dispatch = useDispatch();
  return (
    <aside className="modal-container ">
      <div className={`modal ${styles}`} style={{ maxWidth: maxWidth }}>
        {showCloseIcon && (
          <div className="header">
            <h4>Signup with one of the following:</h4>

            <button
              className="close-icon hover:drop-shadow-xl hover:bg-light-gray"
              style={{ borderRadius: "50%" }}
              onClick={() => dispatch(closeModal(null))}>
              <Close />
            </button>
          </div>
        )}
        {children}
      </div>
    </aside>
  );
};

export default CustomModal;
