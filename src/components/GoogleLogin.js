import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
const GoogleLoginComp = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(
            "credentialResponse",
            jwt_decode(credentialResponse.credential)
          );
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};
export default GoogleLoginComp;
