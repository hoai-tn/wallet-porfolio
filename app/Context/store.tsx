"use client";

  import { Contract, ethers } from "ethers";
  import { createContext, useContext, useEffect, useState } from "react";
  import axios from "axios";

  const GlobalContext = createContext({
    accounts: [],
    setAccounts: () => [],
    provider: {},
  });

export const GlobalContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const getAccounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        const abi = [
          "function name() view returns (string)",
          "function decimals() view returns (uint8)",
          "function symbol() view returns (string)",
          "function balanceOf(address a) view returns (uint)",
        ];
        const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org/");
        const contract = new Contract(
          "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
          abi,
          provider
        );
        // 0xe2b91697627eb0c7efde8ffb8d7a2ce96d71b92a
        // const ba = await contract.balanceOf("0x86f8ce92c8d9b8e2da41832712ff143059277e68");
        // const name = await contract.name();
        // const symbol = await contract.symbol();
        // console.log({  ba, symbol });

        const newAccounts = await Promise.all(
          getAccounts.map(async (address: string) => {
            const provider = new ethers.JsonRpcProvider(
              "https://rpc.sepolia.org/"
            );
            const balance = await provider.getBalance(
              ethers.getAddress(address)
            );

            // const tokenContract = new ethers.Contract(
            //   "0x514910771AF9Ca656af840dff83E8264EcF986CA",
            //   tokenAbi,
            //   provider
            // );
            // const balances = await tokenContract.balanceOf(address);
            // console.log({ balances });

            return { address, balance: ethers.formatEther(balance) };
          })
        );
        // setAccounts(newAccounts);

        // const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        // const data = response.data;
        // const etherToUSDExchangeRate = data.ethereum.usd;
        // console.log({etherToUSDExchangeRate});


        const {data} = await axios.get('api');
        console.log({data});
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <GlobalContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
