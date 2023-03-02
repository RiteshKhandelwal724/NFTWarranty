import { useEffect } from "react";
import { Web3AuthCore } from "@web3auth/core";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import "@rainbow-me/rainbowkit/styles.css";
import "./web3Login.css";
import { Button, Grid, Typography } from "@mui/material";
import Web3AuthComp from "./web3Auth";
import WagmiComponent from "./WagmiComponent";
import { useAtom } from "jotai";
import { providerState, web3AuthState } from "../store";

const clientId =
  "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk"; // get from https://dashboard.web3auth.io
function App() {
  const [web3auth, setWeb3auth] = useAtom(web3AuthState);
  const [providers, setProvider] = useAtom(providerState);
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3AuthCore({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
          },
          web3AuthNetwork: "cyan",
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            loginConfig: {
              google: {
                verifier: "web3auth-google-example",
                typeOfLogin: "google",
                clientId:
                  "774338308167-q463s7kpvja16l4l0kko3nb925ikds2p.apps.googleusercontent.com", //use your app client id you got from google
              },
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
    init();
  }, []);
  const authenticateUser = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  };
  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };
  const getChainId = async () => {
    if (!providers) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new Web3AuthComp(providers);
    const chainId = await rpc.getChainId();

    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!providers) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new Web3AuthComp(providers);
    const address = await rpc.getAccounts();
    console.log(address);
  };
  const getPrivateKey = async () => {
    if (!providers) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new Web3AuthComp(providers);
    const address = await rpc.getPrivateKey();
    console.log(address);
  };

  const getBalance = async () => {
    if (!providers) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new Web3AuthComp(providers);
    const balance = await rpc.getBalance();
    console.log(balance);
  };
  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const loggedInView = (
    <>
      <Grid container sx={{ padding: "20px" }}>
        <Grid item>
          {/* <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "sans-serif",
                }}
              >
                <ConnectButton />
              </Grid>
            </RainbowKitProvider>
          </WagmiConfig> */}
          <WagmiComponent />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Button onClick={getUserInfo}>Get User Info</Button>
            </Grid>
            <Grid item>
              <Button onClick={authenticateUser}>Get ID Token</Button>
            </Grid>
            <Grid item>
              <Button onClick={getAccounts}> Get Accounts</Button>
            </Grid>
            <Grid item>
              <Button onClick={getChainId}>Get Chain Id</Button>
            </Grid>
            <Grid item>
              <Button onClick={getBalance}>Get Balance</Button>
            </Grid>
            <Grid item>
              <Button onClick={getPrivateKey}>Private key</Button>
            </Grid>

            {/* <Grid item>
              <Button onClick={logout}>Log Out</Button>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
  return (
    <Grid>
      <Grid sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <Typography variant="h3">Web3Auth</Typography>
      </Grid>
      <Grid className="grid">{providers && loggedInView}</Grid>
    </Grid>
  );
}

export default App;
