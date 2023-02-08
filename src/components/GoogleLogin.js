import { Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { login } from "../endpoints";
import { postData } from "../functions/apiClient";
import { useNavigate } from "react-router-dom";
const GoogleLoginComp = ({ setToken }) => {
  const Navigate = useNavigate();
  const logInGoogle = async (values) => {
    try {
      const res = await postData(login, values);
      if (res?.statusCode === "200") {
        setToken(res?.data?.userToken);
        if (res?.data?.userRole === "2") {
          if (
            sessionStorage
              .getItem("previousPath")
              .startsWith("/ProductDescription")
          ) {
            Navigate(sessionStorage.getItem("previousPath"));
          } else Navigate("/RegisterProduct");
        } else Navigate("/Dashboard");
      } else if (res.statusCode === "400") {
        console.log("error");
      }
    } catch (e) {
      alert("something went wrong");
    }
  };
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(
            "credentialResponse",
            jwt_decode(credentialResponse.credential)
          );
          const cred = jwt_decode(credentialResponse.credential);
          const loginData = {
            email: cred.email,
            password: "",
            firstName: cred.given_name,
            lastName: cred.family_name,
            googleLogin: 1,
          };
          cred?.email && logInGoogle(loginData);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </Grid>
  );
};
export default GoogleLoginComp;