import { useEffect } from "react";
import { ethers } from "ethers";
import Warranty from "../abis/Warranty.json";
import { privateKeyState, warrantyContractState } from "../store";
import { useAtom } from "jotai";
import { useAccount } from "wagmi";

const ConnectBlockChain = () => {
  const { isConnected } = useAccount();
  const [warrantyContract, setWarrantyContract] = useAtom(
    warrantyContractState
  );
  const [privateKey] = useAtom(privateKeyState);
  const loadBlockChainData = async () => {
    // if (typeof window.ethereum !== "undefined") {
    //connecting to metamask
    const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    let accounts = [];
    if (isConnected) {
      accounts = await ethProvider.send("eth_requestAccounts", []);
    }
    const signer = ethProvider.getSigner();
    const provider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/635b9815bd784fcc9819d8b992250dce"
    );
    const signerNew = new ethers.Wallet(
      "0bf6bda06887320b8bad6722a4f1246a45a726cfbd8c656b6a937e5baf02473f",
      provider
    );
    const warrantyCon = new ethers.Contract(
      "0xE48C1327CBf10747D3f13120C39349C8419ed268",
      Warranty.abi,
      signerNew
      // accounts.length > 0 ? signer : signerNew
    );
    setWarrantyContract(warrantyCon);
  };
  useEffect(() => {
    loadBlockChainData();
  }, []);
  return null;
};

export default ConnectBlockChain;
