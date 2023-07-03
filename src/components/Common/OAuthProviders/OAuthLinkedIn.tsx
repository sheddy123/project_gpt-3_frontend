import { IResolveParams } from 'reactjs-social-login';
import { LoginSocialLinkedin } from 'reactjs-social-login';
import { LinkedInLoginButton } from "react-social-login-buttons";

const OAuthLinkedIn = () => {
  return (
    <LoginSocialLinkedin
    client_id={''}
    client_secret={''}
    redirect_uri={'REDIRECT_URI'}
    // onLoginStart={onLoginStart}
    onResolve={({ provider, data }: IResolveParams) => {
      console.log(provider, data);
      
    }}
    onReject={(err: any) => {
      console.log(err);
    }}
  >
    <LinkedInLoginButton />
  </LoginSocialLinkedin>
  )
}

export default OAuthLinkedIn