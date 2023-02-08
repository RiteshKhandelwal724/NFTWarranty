import { Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
const GoogleLoginComp = () => {
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
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </Grid>
  );
};
export default GoogleLoginComp;
