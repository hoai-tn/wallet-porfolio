"use client";
import ConnectWalletAuth from "./components/ConnectWalletAuth";
import { useGlobalContext } from "./Context/store";
import { ethers } from "ethers";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import { IToken } from "./types";

export default function Home() {
  const {
    isLoading,
    setAccounts,
    isAuthenticated,
    setTokens,
    setIsAuthenticated,
  } = useGlobalContext();
  console.log("home page");

  async function requestAccount() {
    if (window?.ethereum) {
      try {
        // const accounts = await window.ethereum.request();
        const provider = new ethers.BrowserProvider(window.ethereum);
        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);
        const { address }: { address: string } = await provider.getSigner();
        setIsAuthenticated(true);
        setAccounts([address]);
        const { data }: { data: IToken[] } = await axios.get("api/tokens/", {
          params: { address, chain: 0 },
        });
        setTokens(data);
        // const balance = await provider.getBalance("ricmoo.eth");
        // console.log({
        //   signer: signer.address,
        //   balance: ethers.formatEther(balance),
        // });
      } catch (error) {
        console.log(error);

        console.log("error fetch");
      }
    }
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          {!isAuthenticated ? (
            <ConnectWalletAuth
              requestAccount={requestAccount}
            ></ConnectWalletAuth>
          ) : (
            <Dashboard />
          )}
        </div>
      )}
    </div>
  );
}
