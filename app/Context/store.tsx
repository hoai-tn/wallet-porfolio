"use client";

import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext({
  accounts: [],
  setAccounts: () => [],
});

export const GlobalContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const getAccounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccounts(getAccounts);
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
