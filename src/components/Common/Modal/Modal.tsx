import { useDispatch, useSelector } from "react-redux";
import "./Modal.css";
import { closeModal } from "@/redux/features/modal/modalSlice";
import { Close } from "../Icons/Icons";
import OAuthGithub from "../OAuthProviders/OAuthGithub";
import OAuthGoogle from "../OAuthProviders/OAuthGoogle";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Modal = () => {
  const dispatch = useDispatch();
  const [errorText, setErrorText] = useState("");
  const errorResponse = useSelector((store) => store?.authReducer?.message);
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const message = location.state && location.state.message;
  
  useEffect(() => {
    if (
      typeof errorResponse === "string" &&
      (errorResponse.includes("Lifetime validation failed") || message === "Not Authenticated" || message === "Session Ended")
    ) {
      // The string "Lifetime validation failed" is present in the variable
      setErrorText("Session Ended");
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);
  //console.log("The variable contains 'Lifetime validation failed'" + errorText);

  return (
    <aside className="modal-container ">
      <div className="modal ">
        {showAlert && (
          <div
            className={`bg-red-100 border alert-container animate__animated  ${
              showAlert ? "animate__fadeInDown" : "animate__fadeOutUp"
            } border-red-400 text-red-700 px-4 py-3 rounded relative`}
            role="alert">
            <strong className="font-bold">{message}</strong>
          </div>
        )}
        <div className="header">
          <h4>Signup with one of the following:</h4>

          <button
            className="close-icon hover:drop-shadow-xl hover:bg-light-gray"
            style={{ borderRadius: "50%" }}
            onClick={() => dispatch(closeModal(null))}>
            <Close />
          </button>
        </div>
        <div className="content">
          {/* <div className="mt-4">
            <OAuthMicrosoft />
          </div> */}
          <div className="mt-2">
            <OAuthGithub />
          </div>
          <div className="mt-2">
            <OAuthGoogle />
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
