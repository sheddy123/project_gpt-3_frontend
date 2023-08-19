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

const Header = () => {
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
          <h1 className="gradient__text">{h1_header_text}</h1>
          <p>{p_header_text}</p>

          <div className="gpt3__header-content__input">
            <Button
              onClick={() => dispatch(openModal(undefined))}
              styles={`${button.styles}`}
              text={`${button.text}`}
            />
            {/* <input type="email" placeholder="Your Email Address" /> */}
          </div>
          <Avatar AvatarStacked={avatarStackedData} />
        </div>

        <div className="gpt3__header-image">
          <img src={img} />
        </div>
      </div>
    </>
  );
};

export default Header;
