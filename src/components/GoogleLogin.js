import { GoogleLogin } from "@react-oauth/google";

import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleLoginComp = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("credentialResponse", credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};
export default GoogleLoginComp;
