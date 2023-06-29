import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigate } from 'react-router-dom';
import { getAuth } from "../../../redux/features/auth/authSlice";
import Modal from "../../Common/Modal/Modal";
import { openModal } from "../../../redux/features/modal/modalSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import useAuth from "../../../utils/Hooks/useAuth";

import { Link, useNavigate, useLocation } from "react-router-dom";

const url = import.meta.env.VITE_CLIENT_ID_URL + import.meta.env.VITE_CLIENT_ID;
//"https://localhost:7135/api/Auth/Authenticate?code="
function loginWithGitHub(dispatch) {
  //  dispatch(openModal(null));
  window.location.assign(url);
}
//const navigate = useNavigate();

const Login = () => {
  const dispatch = useDispatch();
  const modalReducer = useSelector((state) => state.modalReducer);
  const { setAuth, auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      dispatch(getAuth(codeParam) as any)
        .then(unwrapResult)
        .then((result) => {
          // Clear the URL parameter after successful API call
          //navigate('/', { replace: true });
          setAuth({
            message: result?.message,
            auth_response: result?.auth_User,
          });
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch]);
  const modal = modalReducer.isOpen && <Modal />;

  return (
    <>
      {modal}
      <div>
        <button onClick={() => loginWithGitHub(dispatch)}>
          Login with Github
        </button>
      </div>
    </>
  );
};

export default Login;
