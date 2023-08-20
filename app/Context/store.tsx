// import {  ethers } from "ethers";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext({
  accounts: [],
  isAuthenticated: false,
  setAccounts: () => [],
  provider: {},
});

export const GlobalContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const getAccounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        const { data } = await axios.get("api/tokens", {
          params: { address: getAccounts[0], chain: 0 },
        });
        console.log(data);

        setIsAuthenticated(true);
        // const abi = [
        //   "function name() view returns (string)",
        //   "function decimals() view returns (uint8)",
        //   "function symbol() view returns (string)",
        //   "function balanceOf(address a) view returns (uint)",
        // ];
        // const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org/");
        // const contract = new Contract("dai.tokens.ethers.eth", abi, provider);
        // // const ba = await contract.balanceOf("0x86f8ce92c8d9b8e2da41832712ff143059277e68");
        // const ba = "ba"
        // const name = await contract.name();
        // const symbol = await contract.symbol();
        // console.log({name, ba,symbol});

        // const newAccounts = await Promise.all(
        //   getAccounts.map(async (address: string) => {
        //     const provider = new ethers.JsonRpcProvider(
        //       "https://rpc.sepolia.org/"
        //     );
        //     const balance = await provider.getBalance(
        //       ethers.getAddress(address)
        //     );

        //     // const tokenContract = new ethers.Contract(
        //     //   "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        //     //   tokenAbi,
        //     //   provider
        //     // );
        //     // const balances = await tokenContract.balanceOf(address);
        //     // console.log({ balances });

        //     return { address, balance: ethers.formatEther(balance) };
        //   })
        // );
        console.log({ isAuthenticated });

        setAccounts(getAccounts);

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
    <GlobalContext.Provider value={{ accounts, setAccounts, isAuthenticated }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
