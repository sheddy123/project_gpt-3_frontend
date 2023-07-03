import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";


const OAuthFacebook = () => {
  return (
    <>
      {/* <button
      type="button"
      className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full inline-flex items-center dark:focus:ring-[#3b5998]/55 mb-2">
      <Facebook />
      <span className="mx-auto">Sign in with Facebook</span>
    </button> */}
      <LoginSocialFacebook
        appId={import.meta.env.VITE_FACEBOOK_APP_ID}
        onResolve={(response) => {
          console.log(response);
        }}
        onReject={(error)=>{
            console.log(error);
            
        }}>
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </>
  );
};

export default OAuthFacebook;
