"use client";

import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

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
        const newAccounts = await Promise.all(
          getAccounts.map(async (address: string) => {
            const provider = new ethers.JsonRpcProvider(
              "https://rpc.sepolia.org/"
            );
            const balance = await provider.getBalance(
              ethers.getAddress(address)
            );
            return { address, balance: ethers.formatEther(balance) };
          })
        );
        setAccounts(newAccounts);

        // const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        // const data = response.data;
        // const etherToUSDExchangeRate = data.ethereum.usd;
        // console.log({etherToUSDExchangeRate});
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
