"use client";
import React from "react";
import Button from "../Button";
import Link from "next/link";
import { ethers } from "ethers";
import { useGlobalContext } from "@/app/Context/store";

const ConnectWalletAuth = () => {
  const { setAccounts } = useGlobalContext();
  async function requestAccount() {
    if (window?.ethereum) {
      try {
        // const accounts = await window.ethereum.request();

        const provider = new ethers.BrowserProvider(window.ethereum);

        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        setAccounts(signer);
        const balance = await provider.getBalance("ricmoo.eth");
        console.log({
          signer: signer.address,
          balance: ethers.formatEther(balance),
        });
      } catch (error) {
        console.log(error);

        console.log("error fetch");
      }
    }
  }

  return (
    <div className=" flex flex-col gap-y-5 mt-5 text-center sm:mx-auto sm:w-full sm:max-w-md">
      <h5 className="text-2xl">Connect your wallet</h5>
      <p>
        Connect more than one account to experience the full potential of this
        dapp! 💡
      </p>
      <Button
        color="#4f87f6"
        hoverBg="#225ed4"
        rounded="full"
        width="100%"
        className="flex items-center  gap-x-2 justify-center mx-auto"
        handleClick={requestAccount}
      >
        <img
          src="https://portfolio.metamask.io/static/media/metamask-fox.7db94670ec6dc4d4c6c9e18af96281d8.svg"
          alt=""
        />
        <span>Connect MetaMask</span>
      </Button>

      <div className="flex items-center gap-x-4 ">
        <div className="h-px flex-1 bg-slate-200"></div>
        <div>Or</div>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>
      <div>
        <h5 className="text-2xl mb-4">Watch any wallet</h5>
        <div className="relative ">
          <input
            className="bg-default border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Wallet address or ENS name"
          />
          <Button
            color="#4f87f6"
            hoverBg="#225ed4"
            rounded="full"
            className=" absolute right-[1px] bottom-[1px]"
          >
            Import
          </Button>
        </div>
      </div>
      <div className="h-px  bg-slate-200"></div>
      <div>Don{"'"}t have a wallet? Get started with MetaMask</div>
      <Link
        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
        target="_blank"
      >
        <img
          src="data:image/png;base64,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"
          className="object-contain h-12 mx-auto"
          alt="Google Chrome logo"
        ></img>
      </Link>
    </div>
  );
};

export default ConnectWalletAuth;
