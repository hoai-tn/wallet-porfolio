"use client";
import { useEffect, useState } from "react";
import ConnectWalletAuth from "./components/ConnectWalletAuth";
import { useGlobalContext } from "./Context/store";
import { ethers } from "ethers";
import axios from "axios";

export default function Home() {
  const { accounts } = useGlobalContext();
  const [balance, setBalance] = useState(0);
  // useEffect(() => {
  //   const getBalance = async () => {
  //     console.log({ accounts });
  //     const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org/");
  //     const balance = await provider.getBalance(accounts[0]);
  //     setBalance(ethers.formatEther(balance));

  //     // const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
  //     // const data = response.data;
  //     // const etherToUSDExchangeRate = data.ethereum.usd;
  //     // console.log({etherToUSDExchangeRate});
      
  //   };
  //   getBalance();
  // }, []);
  return (
    <div>
      {accounts.length === 0 ? (
        <ConnectWalletAuth></ConnectWalletAuth>
      ) : (
        <div>
          <div>
            <div>Portfolio value</div>
            <div className="text-3xl font-bold mt-2">${accounts[0]?.balance}</div>
          </div>
        </div>
      )}
    </div>
  );
}
