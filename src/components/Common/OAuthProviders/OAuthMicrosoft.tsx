import { IResolveParams } from 'reactjs-social-login';
import { LoginSocialMicrosoft } from 'reactjs-social-login';
import { MicrosoftLoginButton } from "react-social-login-buttons";

const OAuthMicrosoft = () => {
  return (
    <LoginSocialMicrosoft
    client_id={import.meta.env.VITE_MICROSOFT_APP_ID}
    redirect_uri={'https://localhost:5173/'}
    // onLoginStart={onLoginStart}
    onResolve={({ provider, data }: IResolveParams) => {
      console.log(provider, data);
      
    }}
    onReject={(err: any) => {
      console.log(err);
    }}
  >
       <MicrosoftLoginButton />
  </LoginSocialMicrosoft>
  )
}

export default OAuthMicrosoft