import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link, Container, Typography, Grid, Button } from "@mui/material";
import useResponsive from "../hooks/useResponsive";
import LoginForm from "./LoginForm";
import loginImage from "../resources/loginScreen.png";
import { useToken } from "../functions/TokenUtility";
import { getData, postData } from "../functions/apiClient";
import { verifyUser } from "../endpoints";
import { Web3AuthCore } from "@web3auth/core";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { login } from "../../src/endpoints";
import { useAtom } from "jotai";
import {
  fromGoogleState,
  privateKeyState,
  providerState,
  web3AuthState,
} from "../store";
import "./web3Login.css";
import Web3AuthComp from "./web3Auth";
// import RPC from './ethersRPC' // for using ethers.js

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

export default function LoginComp() {
  const [privateKey, setPrivateKey] = useAtom(privateKeyState);
  const [fromGoogle, setFromGoogle] = useAtom(fromGoogleState);

  const clientId =
    "BIugJen7zx11ZL_0BY2Ocu5ezJWDTNc1nvcNBn6flYmYKSwPCLmDn02f2V9k4yEkUJQkH9HK88BswpZXD9gLDuc"; // get from https://dashboard.web3auth.io
  const Navigate = useNavigate();
  const [token, setToken] = useToken();
  const [currentStep, setCurrentStep] = useState("0");
  const [role, setRole] = useState("0");
  const smUp = useResponsive("up", "sm");
  const [web3auth, setWeb3auth] = useAtom(web3AuthState);
  const [provider, setProvider] = useAtom(providerState);
  const getVerification = async () => {
    const res = await getData(verifyUser(token));
    if (res.status_code === "200") {
      setRole(res?.data?.userRole);
      setCurrentStep("1");
    } else {
      setCurrentStep("2");
    }
  };

  const logInGoogle = async (values) => {
    try {
      const res = await postData(login, values);
      if (res?.statusCode === "200") {
        setToken(res?.data?.userToken);
        setFromGoogle(true);
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
  const init = async () => {
    try {
      const web3auth = new Web3AuthCore({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x5",
        },
        web3AuthNetwork: "testnet",
      });

      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          loginConfig: {
            verifier: "Warranty",
            typeOfLogin: "google",
            clientId:
              "396097899910-lj5lq2vm75thigo6t5l2fjiv3d7gsn6n.apps.googleusercontent.com", //use your app client id you got from google
          },
        },
      });
      web3auth.configureAdapter(openloginAdapter);
      setWeb3auth(web3auth);

      await web3auth.init();
      if (web3auth.provider) {
        setProvider(web3auth.provider);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getVerification();
    init();
  }, []);
  const loginFun = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
    const rpc = new Web3AuthComp(web3authProvider);
    const address = await rpc.getPrivateKey();
    setPrivateKey(address);
    const user = await web3auth.getUserInfo();
    const userData = {
      email: user?.email,
      password: "",
      role: "1",
      googleLogin: "1",
    };
    logInGoogle(userData);
  };
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
          {/* <Grid>
            <GoogleLoginComp setToken={setToken} />
          </Grid> */}
          {/* <Grid>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                    paddingTop: "20px",
                  }}
                >
                  <ConnectButton />
                </div>
              </RainbowKitProvider>
            </WagmiConfig>
          </Grid> */}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              padding: "0 20px",
            }}
          >
            <Button
              sx={{ width: "100%", padding: "10px", borderRadius: "25px" }}
              variant="contained"
              onClick={loginFun}
              size="large"
            >
              Sign In with Google
            </Button>
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
