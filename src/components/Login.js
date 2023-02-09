import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import { styled } from "@mui/material/styles";
import { Link, Container, Typography, Grid } from "@mui/material";
import useResponsive from "../hooks/useResponsive";
import LoginForm from "./LoginForm";
import loginImage from "../resources/loginScreen.png";
import { useToken } from "../functions/TokenUtility";
import { getData } from "../functions/apiClient";
import { verifyUser } from "../endpoints";
import GoogleLoginComp from "./GoogleLogin";
import { useAtom } from "jotai";
import { web3AuthState } from "../store";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: "100vw",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const Navigate = useNavigate();
  const [token, setToken] = useToken();
  const [currentStep, setCurrentStep] = useState("0");
  const [role, setRole] = useState("0");
  const [web3Auth, setWeb3Auth] = useAtom(web3AuthState);
  const smUp = useResponsive("up", "sm");
  useEffect(() => {
    const getVerification = async () => {
      const res = await getData(verifyUser(token));
      if (res.status_code === "200") {
        setRole(res?.data?.userRole);
        setCurrentStep("1");
      } else {
        setCurrentStep("2");
      }
    };
    const init = async () => {
      const web3auth = new Web3Auth({
        clientId:
          "BIugJen7zx11ZL_0BY2Ocu5ezJWDTNc1nvcNBn6flYmYKSwPCLmDn02f2V9k4yEkUJQkH9HK88BswpZXD9gLDuc", // Get your Client ID from Web3Auth Dashboard
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x1",
        },
      });
      setWeb3Auth(web3Auth);
      await web3auth.initModal();
    };
    init();
    getVerification();
  }, []);

  return (
    <RootStyle
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
      }}
    >
      {currentStep === "1" &&
        (role === "1" ? Navigate("/Dashboard") : Navigate("/RegisterProduct"))}
      <Container maxWidth="sm">
        <ContentStyle>
          <Typography
            variant="h5"
            gutterBottom
            color="white"
            sx={{ fontWeight: "bold", paddingBottom: "20px" }}
          >
            Welcome To <br />
            Warranty Solutions
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Please enter your details below.
          </Typography>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <img src={loginImage} width="85%" alt="login form" />
          </Grid>

          <Grid sx={{ padding: "0 20px" }}>
            <LoginForm setToken={setToken} />
          </Grid>
          <Grid sx={{ color: "white", margin: "auto", padding: "10px 0" }}>
            Or
          </Grid>
          <Grid>
            <GoogleLoginComp setToken={setToken} />
          </Grid>

          {!smUp && (
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2 }}
              color="white"
            >
              Don’t have an account?{" "}
              <Link
                variant="subtitle2"
                component={RouterLink}
                to="/Register"
                sx={{ color: "white", textDecoration: "underline" }}
              >
                Get started
              </Link>
            </Typography>
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
