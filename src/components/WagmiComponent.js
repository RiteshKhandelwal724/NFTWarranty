import {
  ConnectButton,
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createClient, WagmiConfig, configureChains } from "wagmi";
// import { rainbowWeb3AuthConnector } from "./RainbowWeb3authConnector";
import { goerli } from "wagmi/chains";
import {
  walletConnectWallet,
  rainbowWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "./web3Login.css";
import { Grid } from "@mui/material";
const { chains, provider } = configureChains(
  [goerli],
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
    ],
  },
]);
const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

const WagmiComponent = () => {
  return (
    <WagmiConfig client={wagmiClient}>
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
    </WagmiConfig>
  );
};
export default WagmiComponent;
