import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3AuthCore } from "@web3auth/core";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const name = "Login with Auth0";
const iconUrl = "https://avatars.githubusercontent.com/u/2824157?s=280&v=4";
// modalConfig: {
//   [WALLET_ADAPTERS.OPENLOGIN]: {
//     label: "openlogin",
//     loginMethods: {
//       google: {
//         name: "google login",
//         logoDark: "url to your custom logo which will shown in dark mode",
//       },
//     },
//     // setting it to false will hide all social login methods from modal.
//     showOnModal: true,
//   },
// },

const Web3AuthConnectorComp = ({ chains }) => {
  const web3AuthInstance = new Web3AuthCore({
    clientId:
      "BIugJen7zx11ZL_0BY2Ocu5ezJWDTNc1nvcNBn6flYmYKSwPCLmDn02f2V9k4yEkUJQkH9HK88BswpZXD9gLDuc",
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x" + chains[0].id.toString(16),
      rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
      displayName: chains[0].name,
      tickerName: chains[0].nativeCurrency?.name,
      ticker: chains[0].nativeCurrency?.symbol,
      blockExplorer: chains[0]?.blockExplorers.default?.url,
    },
  });

  // Create Web3Auth Instance
  // Add openlogin adapter for customisations
  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      network: "cyan",
      uxMode: "popup",
      loginConfig: {
        jwt: {
          name: "Web3Auth-Auth0-JWT",
          verifier: "web3auth-auth0-demo",
          typeOfLogin: "jwt",
          clientId: "294QRkchfq2YaXUbPri7D6PH7xzHgQMT",
        },
        google: {
          verifier: "Warranty", // Pass the Verifier name here
          typeOfLogin: "google", // Pass on the login provider of the verifier you've created
          clientId:
            "396097899910-lj5lq2vm75thigo6t5l2fjiv3d7gsn6n.apps.googleusercontent.com", // Pass on the Google `Client ID` here
        },
      },
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapter);
  // await web3AuthInstance.connect();
  return {
    id: "web3auth",
    name,
    iconUrl,
    iconBackground: "#fff",
    createConnector: () => {
      const connector = new Web3AuthConnector({
        chains: chains,
        options: {
          web3AuthInstance,
          loginParams: {
            relogin: true,
            loginProvider: "jwt",
            extraLoginOptions: {
              domain: "https://warrantynft.netlify.app",
              verifierIdField: "sub",
            },
          },
        },
      });
      return {
        connector,
      };
    },
  };
};
export default Web3AuthConnectorComp;
