import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigate } from 'react-router-dom';
import { unwrapResult } from "@reduxjs/toolkit";
import './Login.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ILoginProps } from "@/interfaces/IConstants/IConstants";
import useAuth from "@/utils/Hooks/useAuth";
import useLogout from "@/utils/Hooks/useLogout";
import { getAuth } from "@/redux/features/auth/authSlice";

const url = import.meta.env.VITE_CLIENT_ID_URL + import.meta.env.VITE_CLIENT_ID;
//"https://localhost:7135/api/Auth/Authenticate?code="
function loginWithGitHub(dispatch) {
  //dispatch(openModal("Open the modal"));
  window.location.assign(url);
}

//const navigate = useNavigate();

const Login : React.FC<ILoginProps> = ({ styles, text }) => {
  const dispatch = useDispatch();
  
  const { setAuth, auth, persist, setPersist } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const signOut = async () => {
    console.log("I am clicked");

    await logout();
  };

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
  

  useEffect(() => {
    
    localStorage.setItem('persist', persist);
  }, [persist]);
  
  const togglePersist = () => {
    
    
    setPersist(prev => !prev);
  }
  return (
    <>
      
      
        {/* <button onClick={() => loginWithGitHub(dispatch)}>
          Login with Github
        </button> */}
        {/* <Button onClick={() =>loginWithGitHub(dispatch)} styles={`${styles}`} text={`${text}`} /> */}
        
        {/* <button onClick={signOut}>Sign out</button> */}
        {/* <div className="persistCheck">
          <input type="checkbox" id="persist" onChange={togglePersist}  checked={persist}/>
          <label htmlFor="persist">Trus this device</label>
        </div> */}
      
    </>
  );
};

export default Login;
