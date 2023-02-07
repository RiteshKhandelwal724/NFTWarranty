// import React, { useState, useEffect } from "react";
// import { ColorRing } from "react-loader-spinner";
// import "./login.css";
// import { useNavigate } from "react-router-dom";

// import useArcanaAuth from "../../useArcanaAuth";

// function Login() {
//   const [loading, setLoading] = useState(true);
//   const [loggedin, setLoggedin] = useState(false);
//   const [email, setEmail] = useState("");
//   const [account, setAccount] = useState("");

//   const navigate = useNavigate();

//   const {
//     initializeAuth,
//     loggedIn,
//     getAccounts,
//     login,
//     loginWithLink,
//     logout,
//     initialized,
//   } = useArcanaAuth();

//   const initialize = async () => {
//     await initializeAuth();
//   };

//   const handleLogout = async () => {
//     // await logout();
//     console.log("logout");
//     localStorage.removeItem("rfplogin");
//   };

//   useEffect(() => {
//     initialize();
//   }, []);

//   let acc;
//   useEffect(() => {
//     const loadDetails = async () => {
//       if (initialized) {
//         if (loggedIn) {
//           acc = await getAccounts();
//           setAccount(acc[0]);
//           setLoading(false);
//         } else {
//           setLoading(false);
//         }
//       }
//     };
//     loadDetails();
//   }, [initialized, loggedIn]);

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };
//   if (account) {
//     navigate("/dashboard");
//     localStorage.setItem("rfplogin", account);
//   }

//   return (
//     <div className="container">
//       <h1>AUTHENTICATION</h1>
//       <div>
//         {loading ? (
//           <div className="loading">
//             <ColorRing
//               visible={true}
//               height="100"
//               width="80"
//               ariaLabel="blocks-loading"
//               wrapperStyle={{}}
//               wrapperClass="blocks-wrapper"
//               colors={["#000000"]}
//             />
//           </div>
//         ) : !loading && loggedIn ? (
//           <div>
//             <h2 className="sub-heading">Logged In</h2>
//             <h3>Welcome {account}</h3>
//             <h3>you're logged in successfully.</h3>
//             <button className="big-button" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="box">
//             <h2 className="sub-heading">Select a login</h2>
//             <div className="options">
//               <button className="big-button" onClick={() => login("google")}>
//                 Google Login
//               </button>
//               <button className="big-button" onClick={() => login("twitch")}>
//                 Twitch Login
//               </button>
//               <button className="big-button" onClick={() => login("discord")}>
//                 Discord Login
//               </button>
//               <button className="big-button" onClick={() => login("twitter")}>
//                 Twitter Login
//               </button>
//             </div>
//             <div className="form">
//               <input
//                 value={email}
//                 type="text"
//                 placeholder="Enter email"
//                 onChange={handleEmailChange}
//               />
//               <button
//                 className="big-button"
//                 onClick={() => loginWithLink(email)}
//               >
//                 Login with link
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;

import {
  ConnectButton,
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createClient, WagmiConfig, configureChains } from "wagmi";
// import { rainbowWeb3AuthConnector } from "./RainbowWeb3authConnector";
import rainbowWeb3AuthConnector from "./web3Auth";
import { mainnet, polygon } from "wagmi/chains";
import {
  walletConnectWallet,
  rainbowWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, polygon],
  [
    alchemyProvider({ apiKey: "qYiJwyA_sOdvrcKcbfqVK_QCaP1NuYCi" }),
    // alchemyProvider({ apiKey: "fGXusgBUDC-OPy6XI8IFRvu1i7sbWsYj" }),
    publicProvider(),
  ]
);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      metaMaskWallet({ chains }),
      rainbowWeb3AuthConnector({ chains }),
    ],
  },
]);
const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

export default function Login() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          <ConnectButton />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
