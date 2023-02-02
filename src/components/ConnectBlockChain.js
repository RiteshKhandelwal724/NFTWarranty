import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Warranty from "../abis/Warranty.json";
import { warrantyContractState, accountState } from "../store";
import { useAtom } from "jotai";

const ConnectBlockChain = () => {
  const [provider, setProvider] = useState(null);
  const [signerState, setSignerState] = useState(null);
  const [account, setAccount] = useAtom(accountState);
  const [warrantyContract, setWarrantyContract] = useAtom(
    warrantyContractState
  );
  const loadBlockChainData = async () => {
    // if (typeof window.ethereum !== "undefined") {
    //connecting to metamask
    // const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    // setProvider(ethProvider);
    // const accounts = await ethProvider.send("eth_requestAccounts", []);
    // if (accounts) {
    //   console.log("accounts", ethProvider, accounts);
    //   setAccount(accounts[0]);
    // }
    //connecting to the blockchain
    const provider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/635b9815bd784fcc9819d8b992250dce"
    );
    const signerNew = new ethers.Wallet(
      "fe2e9c06503c1f2a4c1d4c21eb41a29517bd6dee5f659e8ac7a5611dda73eb31",
      provider
    );
    // const signer = provider.getSigner();
    setSignerState(signerNew);
    // console.log("network", provider);
    // console.log("signer", signerNew);
    // console.log("tokens", tokens);
    // //read only data
    // const blockNumber = await provider.getBlockNumber();
    // console.log("blockNumber", blockNumber);
    // // Get the balance of an account (by address or ENS name, if supported by network)
    // const balance = await provider.getBalance(account);
    // // // { BigNumber: "182826475815887608" }
    // console.log("balanceInfo", balance);
    // // // Often you need to format the output to something more user-friendly,
    // // // such as in ether (instead of wei)
    // const formattedBalance = ethers.utils.formatEther(balance);
    // // // '0.182826475815887608'

    // // // If a user enters a string in an input field, you may need
    // // // to convert it from ether (as a string) to wei (as a BigNumber)
    // const utility = ethers.utils.parseEther("1.0");
    // // // { BigNumber: "1000000000000000000" }
    // console.log("balanceUpdated", formattedBalance, utility);

    // //contracts
    const warrantyCon = new ethers.Contract(
      "0xE48C1327CBf10747D3f13120C39349C8419ed268",
      Warranty.abi,
      signerNew
    );
    setWarrantyContract(warrantyCon);
    console.log("warrantyContract", warrantyCon);
  };
  // }

  useEffect(() => {
    loadBlockChainData();
  }, []);
  return null;
};

export default ConnectBlockChain;
