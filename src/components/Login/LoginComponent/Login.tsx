import { useEffect } from "react";

const CLIENT_ID = "9503706682799524aaf7";
function loginWithGitHub() {
  window.location.assign(
    "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
  );
}

const Login = () => {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
    
  }, []);

  return (
    <>
      <div>
        <button onClick={loginWithGitHub}>Login with Github</button>
      </div>
    </>
  );
};

export default Login;
