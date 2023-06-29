import React, { useEffect, useState } from "react";
import { BaseSelect } from "./BaseSelect";
import axios from "axios";

export const GasSelect = () => {
  const [selectItem, setSelectItem] = useState({});
  const [list, setList] = useState([]);
  useEffect(() => {
    const getGas = localStorage.getItem("gas") || null;
    if (!getGas) {
      const gasDefault = {
        value: "ETH",
        name: "ETH",
        img: "https://token.metaswap.codefi.network/assets/networkLogos/ethereum.svg",
      };
      localStorage.setItem(
        "gas",
        JSON.stringify({
          ...gasDefault,
        })
      );
      setSelectItem(gasDefault);
    } else {
      setSelectItem(JSON.parse(getGas));
    }
    (async () => {
      const getEthersGas = await axios.get(
        "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=HN12CZFJBCBAZGAPV9RZ14D6TI6PGZZQTS"
      );

      const getBnbGas = await axios.get(
        "https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=EMB4M78RRUYTIIMPWBME8MTT4CRGZS4H7X"
      );
      setList([
        {
          text: getBnbGas.data.result.ProposeGasPrice,
          name: "BNB Chain",
          value: "BNB",
          img: "https://token.metaswap.codefi.network/assets/networkLogos/bsc.svg",
        },
        {
          text: getEthersGas.data.result.ProposeGasPrice,
          name: "Ethereum",
          value: "ETH",
          img: "https://token.metaswap.codefi.network/assets/networkLogos/ethereum.svg",
        },
      ]);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const getBnbGas = await axios.get(
        "https://api.bscscan.com/api?module=gastracker&action=gasoracle"
      );
      if (selectItem.value === "ETH") {
        const { data } = await axios.get(
          "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=HN12CZFJBCBAZGAPV9RZ14D6TI6PGZZQTS"
        );
        setSelectItem((prevState) => ({
          ...prevState,
          text: data.result.ProposeGasPrice,
        }));
      } else {
        const { data } = await axios.get(
          "https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=EMB4M78RRUYTIIMPWBME8MTT4CRGZS4H7X"
        );
        setSelectItem((prevState) => ({
          ...prevState,
          text: data.result.ProposeGasPrice,
        }));
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [selectItem]);

  return (
    <BaseSelect selectItem={selectItem} name="Real-time gas prices">
      {list.map((item) => (
        <div
          key={item.value}
          className=" w-56 flex items-center gap-x-4 px-4 py-1 mb-1 hover:bg-gray-900 cursor-pointer"
          onClick={() => {
            setSelectItem(item);
            localStorage.setItem("gas", JSON.stringify(item));
          }}
        >
          <div className="w-5">
            {item.value === selectItem.value && (
              <div>
                <span className="material-symbols-outlined">done</span>
              </div>
            )}
          </div>
          <div className="flex gap-x-1 items-center">
            {item.img && <img src={item.img} className="w-5 h-5" alt=""></img>}
            <div>
              <div>{item.name}</div>
            </div>
          </div>
        </div>
      ))}
    </BaseSelect>
  );
};
