import { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
const GoogleLoginComp = () => {
  const clientId =
    "396097899910-lj5lq2vm75thigo6t5l2fjiv3d7gsn6n.apps.googleusercontent.com";
  const onLoginSuccess = (res) => {
    console.log("login success", res.profileobj);
    setUserLoggedIn(true);
  };
  const onLoginFailure = () => {
    console.log("login Failed");
  };
  const onLogoutSuccess = () => {
    console.log("logout success");
    setUserLoggedIn(false);
    alert("user is signned out successfully");
  };
  const [isLoggedIn, setUserLoggedIn] = useState(false);
  return (
    <div>
      {!isLoggedIn ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        ></GoogleLogout>
      )}
    </div>
  );
};
export default GoogleLoginComp;
