"use client";
import { useEffect, useState } from "react";
import ConnectWalletAuth from "./components/ConnectWalletAuth";
import { useGlobalContext } from "./Context/store";
import { ethers } from "ethers";

export default function Home() {
  const { accounts } = useGlobalContext();

  useEffect(() => {
    const getBalance = async () => {
      console.log({ accounts });
      const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org/");
      const balance = await provider.getBalance(accounts[0]);
      console.log({ balance: ethers.formatEther(balance) });
    };
    getBalance();
  }, []);
  return (
    <div>
      {accounts.length === 0 ? (
        <ConnectWalletAuth></ConnectWalletAuth>
      ) : (
        <div>
          <div>
            <div>Portfolio value</div>
            <div className="text-3xl font-bold mt-2">$300.20</div>
          </div>
        </div>
      )}
    </div>
  );
}
