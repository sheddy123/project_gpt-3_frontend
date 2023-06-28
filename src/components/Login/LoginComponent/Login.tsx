import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigate } from 'react-router-dom';
import { getAuth } from "../../../redux/features/auth/authSlice";
import Modal from "../../Common/Modal/Modal";
import { openModal } from "../../../redux/features/modal/modalSlice";

const url = import.meta.env.VITE_CLIENT_ID_URL + import.meta.env.VITE_CLIENT_ID;
//"https://localhost:7135/api/Auth/Authenticate?code="
function loginWithGitHub(dispatch) {
  //  dispatch(openModal(null));
  window.location.assign(url);
}

const Login = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const store = useSelector((state) => state);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      dispatch(getAuth(codeParam) as any).then(() => {
        // Clear the URL parameter after successful API call
        // navigate('/login', { replace: true });
      });
    }
  }, [dispatch]);
  const modal = store.modalReducer.isOpen && <Modal />;
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
