// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Modal from "@/components/Common/Modal/Modal";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Common/Button/Button";
import { closeModal, openModal } from "@/redux/features/modal/modalSlice";
import Avatar from "@/components/Common/AvatarStacked/Avatar";
import { headerData } from "@/utils/Constants/ComponentsConstants/constants";
import { useEffect } from "react";
import useAuth from "@/utils/Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { getAuthService } from "@/services/api/AuthService/GetAuthService";

const Header = ({handleSelectChange, selectedOption}) => {
  const dispatch = useDispatch();
  const modalReducer = useSelector((state) => state.modalReducer);
  const modal = modalReducer.isOpen && <Modal />;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth, auth, persist, setPersist } = useAuth();
  const { h1_header_text, p_header_text, img, avatarStackedData, button } =
    headerData;

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      dispatch(getAuthService({ code: codeParam, provider: "Github" }) as any)
        .then(unwrapResult)
        .then((result) => {
          // Clear the URL parameter after successful API call
          //navigate('/', { replace: true });
          setAuth({
            message: result?.message,
            auth_response: result?.auth_User,
          });
          const originalPath = localStorage.getItem("originalPath");

          if (originalPath) {
            // Navigate to the original requested path
            navigate(originalPath, { replace: true });

            // Remove the stored path from localStorage
            localStorage.removeItem("originalPath");
          } else {
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch]);

  return (
    <>
      {modal}
      <div className="gpt3__header section__padding" id="home">
        <div className="gpt3__header-content">
          <h1 className="text-cyan-800">{h1_header_text}</h1>
          <h5 className="header__text text-cyan-700">{p_header_text}</h5>
       
          
          <div className="gpt3__header-content__input">
            
          <div className="flex w-full">
            
          <select id="healthPlan" value={selectedOption} onChange={handleSelectChange} className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select health plan</option>
            <option value="IndividualHealth">Individual Health</option>
            <option value="FamilyHealth">Family Health</option>
            <option value="CompanyHealth">Company Health</option>
        </select>

        <Button
              onClick={() => dispatch(openModal(undefined))}
              styles={`${button.styles}`}
              text={`${button.text}`}
            />
    </div>
            
          </div>
          
        </div>

        <div className="gpt3__header-image">
          <img src={img} />
        </div>
      </div>
    </>
  );
};

export default Header;
