import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "./hooks/useFetch";
import Image from "next/image";
interface Transaction {
  from: string;
  to: string;
  nonce: string;
  data: string;
  value: string;
  hash: string;
  chain: string;
  gas: string;
  gasPrice: string;
  index: number;
  blockNumber: string;
  blockHash: string;
  blockTimestamp: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  receiptStatus: number;
  logs: any[]; // You can replace `any[]` with a more specific type if you have one
  internalTransactions: any[]; // Same here
  valueDecimal: string;
}

interface TokenTransaction {
  tokenName: string;
  tokenSymbol: string;
  tokenLogo: string | null;
  tokenDecimals: string;
  fromAddress: string;
  fromAddressLabel: string | null;
  toAddress: string;
  toAddressLabel: string | null;
  address: string;
  blockHash: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  transactionIndex: number;
  logIndex: number;
  value: string;
  possibleSpam: boolean;
  valueDecimal: string;
  chain: string;
}

type CombinedTransaction = Transaction | TokenTransaction;
// const transactionsList: CombinedTransaction[] = [
//   {
//     from: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     to: "0xc430b592940661427d57d8d72d68d61a5f72d294",
//     nonce: "4",
//     data: "0x",
//     value: "174843117282180899",
//     hash: "0x9e9038f15cfbd2f793ec0a7ae06aa556a95fffd39263919889f22bf3754bf0b7",
//     chain: "0x1",
//     gas: "21000",
//     gasPrice: "24826478152",
//     index: 113,
//     blockNumber: "16844464",
//     blockHash:
//       "0x10544431af7b5a29b95fd60c94452bb9a39976d8c6bf2f280204df1c59298bf7",
//     blockTimestamp: "Fri Mar 17 2023 09:07:35 GMT+0700 (Indochina Time)",
//     cumulativeGasUsed: "11652826",
//     gasUsed: "21000",
//     receiptStatus: 1,
//     logs: [],
//     internalTransactions: [],
//   },
//   {
//     from: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     to: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
//     nonce: "3",
//     data: "0xa9059cbb000000000000000000000000c430b592940661427d57d8d72d68d61a5f72d2940000000000000000000000000000000000000000000000000000000000186a00",
//     value: "0",
//     hash: "0x0b1c4cc91898da1d6dcf0934fb4d89687d82e35c89d7b71c0e52837fbce05a93",
//     chain: "0x1",
//     gas: "55930",
//     gasPrice: "22078735647",
//     index: 143,
//     blockNumber: "16844459",
//     blockHash:
//       "0xcbe3427ed28ef6e9139f31ecfb956d9676416c859d14c0f8031b5af0f4141389",
//     blockTimestamp: "Fri Mar 17 2023 09:06:35 GMT+0700 (Indochina Time)",
//     cumulativeGasUsed: "11496689",
//     gasUsed: "32487",
//     receiptStatus: 1,
//     logs: [],
//     internalTransactions: [],
//   },
//   {
//     from: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     to: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
//     nonce: "2",
//     data: "0xa9059cbb000000000000000000000000c430b592940661427d57d8d72d68d61a5f72d294000000000000000000000000000000000000000000000000000000000002ddbc",
//     value: "0",
//     hash: "0x6f34644353c30a375c45f0e43c14be288180db5621b70f4b44461774e059bbf6",
//     chain: "0x1",
//     gas: "81598",
//     gasPrice: "28411178236",
//     index: 120,
//     blockNumber: "16844430",
//     blockHash:
//       "0xb5fb4c60f06580527a833bc766778a6f2deb35c7b298500bb40366ea2e814562",
//     blockTimestamp: "Fri Mar 17 2023 09:00:47 GMT+0700 (Indochina Time)",
//     cumulativeGasUsed: "10370890",
//     gasUsed: "54399",
//     receiptStatus: 1,
//     logs: [],
//     internalTransactions: [],
//   },
//   {
//     from: "0x21a31ee1afc51d94c2efccaa2092ad1028285549",
//     to: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     nonce: "5133474",
//     data: "0x",
//     value: "34350930000000000",
//     hash: "0xd67cabddd362d7a6bc2a167ab326189b0bb266921da96273d784e256636eec82",
//     chain: "0x1",
//     gas: "207128",
//     gasPrice: "14865889608",
//     index: 39,
//     blockNumber: "16201741",
//     blockHash:
//       "0x592d49cf988a700f436af3111097a21a3b313948846a13ac314e0b00902ff6a2",
//     blockTimestamp: "Sat Dec 17 2022 10:30:35 GMT+0700 (Indochina Time)",
//     cumulativeGasUsed: "2471709",
//     gasUsed: "21000",
//     receiptStatus: 1,
//     logs: [],
//     internalTransactions: [],
//   },
//   {
//     from: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     to: "0x9be89d2a4cd102d8fecc6bf9da793be995c22541",
//     nonce: "0",
//     data: "0x095ea7b3000000000000000000000000881d40237659c251811cec9c364ef91dc08d300cffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
//     value: "0",
//     hash: "0x12ff26da4f9bcee458c717fbdd693273932711a53c535d6ff336ff13622ab3d8",
//     chain: "0x1",
//     gas: "56333",
//     gasPrice: "15639268234",
//     index: 31,
//     blockNumber: "16182166",
//     blockHash:
//       "0x1e1dcd2bc4f8a9049de5d044fff24e71d800b823f497a938cb87a31e832f12c4",
//     blockTimestamp: "Wed Dec 14 2022 16:54:11 GMT+0700 (Indochina Time)",
//     cumulativeGasUsed: "1411144",
//     gasUsed: "55950",
//     receiptStatus: 1,
//     logs: [],
//     internalTransactions: [],
//   },
//   {
//     from: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     to: "0x881d40237659c251811cec9c364ef91dc08d300c",
//     nonce: "1",
//     data: "0x5f57552900000000000000000000000000000000000000000000000000000000000000800000000000000000000000009be89d2a4cd102d8fecc6bf9da793be995c2254100000000000000000000000000000000000000000000000000000000001b792500000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000c307846656544796e616d6963000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000009be89d2a4cd102d8fecc6bf9da793be995c225410000000000000000000000002260fac5e5542a773aa44fbcfedf7c193bc2c59900000000000000000000000000000000000000000000000000000000001b792500000000000000000000000000000000000000000000000000000000001b01e600000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000003da60000000000000000000000002acf35c9a3f4c5c3f4c78ef5fb64c3ee82f07c45000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000001c8f7fcd3840000000000000000000000009be89d2a4cd102d8fecc6bf9da793be995c225410000000000000000000000002260fac5e5542a773aa44fbcfedf7c193bc2c599000000000000000000000000561b94454b65614ae3db0897b74303f4acf7cc75000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b792500000000000000000000000000000000000000000000000000000000001b3eed00000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000080000000000000000000000000071c661b4deefb59e2a3ddb20db036821eee8f4ba6417ed60000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002869584cd00000000000000000000000011ededebf63bef0ea2d2d071bdf88f71543ec6fb00000000000000000000000000000000000000000000004d8cc8fbf463999d26000000000000000000000000000000000000000000000000ac",
//     value: "0",
//     hash: "0xabe8f0e9617d67ee941c6a305f06bdacd8d7d3d07b9a7b07049063ac5408c1f6",
//     chain: "0x1",
//     gas: "868311",
//     gasPrice: "15639268234",
//     index: 60,
//     blockNumber: "16182166",
//     blockHash:
//       "0x1e1dcd2bc4f8a9049de5d044fff24e71d800b823f497a938cb87a31e832f12c4",
//     blockTimestamp: "Wed Dec 14 2022 16:54:11 GMT+0700 (Indochina Time)",
//     cumulativeGasUsed: "3085264",
//     gasUsed: "457622",
//     receiptStatus: 1,
//     logs: [],
//     internalTransactions: [],
//   },
//   {
//     from: "0xdfd5293d8e347dfe59e90efd55b2956a1343963d",
//     to: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     nonce: "4845666",
//     data: "0x",
//     value: "142177710000000000",
//     hash: "0x6d305da910eeb9cb8032b1f8b4efc3b5a2b08e5e5636e9c3645526f33b4a82e2",
//     chain: "0x1",
//     gas: "207128",
//     gasPrice: "13121862271",
//     index: 68,
//     blockNumber: "16181364",
//     blockHash:
//       "0xc562387f966c8a45299d17e3e95e75117a1f60d1cefa25d6fc9532232ff80302",
//     blockTimestamp: "Wed Dec 14 2022 14:11:59 GMT+0700 (Indochina Time)",
//     cumulativeGasUsed: "3210716",
//     gasUsed: "21000",
//     receiptStatus: 1,
//     logs: [],
//     internalTransactions: [],
//   },
//   {
//     from: "0x9696f59e4d72e237be84ffd425dcad154bf96976",
//     to: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     nonce: "3624933",
//     data: "0x",
//     value: "9232000000000000",
//     hash: "0x355abc2941aa9500d613f854590be6e2b4eabad25ad5f32848f438700581ff91",
//     chain: "0x1",
//     gas: "207128",
//     gasPrice: "15015984202",
//     index: 24,
//     blockNumber: "16181317",
//     blockHash:
//       "0xe84d4d77e3975ab112cbcf9d314aefbab71d8d45bdb8d51ae2df542d40c1f0ff",
//     blockTimestamp: "Wed Dec 14 2022 14:02:23 GMT+0700 (Indochina Time)",
//     cumulativeGasUsed: "1685923",
//     gasUsed: "21000",
//     receiptStatus: 1,
//     logs: [],
//     internalTransactions: [],
//   },
//   {
//     tokenName: "SHIBA INU",
//     tokenSymbol: "SHIB",
//     tokenLogo:
//       "https://cdn.moralis.io/eth/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.png",
//     tokenDecimals: "18",
//     fromAddress: "0x28c6c06298d514db089934071355e5743bf21d60",
//     fromAddressLabel: "Binance 14",
//     toAddress: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     toAddressLabel: null,
//     address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
//     blockHash:
//       "0xfaa1c3ddf811a0228cacefeb096363e791ab7a24e1a833cb8fcb755f01073823",
//     blockNumber: "17931548",
//     blockTimestamp: "2023-08-17T02:25:35.000Z",
//     transactionHash:
//       "0x84088e4fb8cfee969cfa384b579875027831921ef4e93ae35b496e8002fe298c",
//     transactionIndex: 42,
//     logIndex: 173,
//     value: "440870000000000000000000",
//     possibleSpam: false,
//     valueDecimal: "440870",
//     chain: "0x1",
//   },
//   {
//     tokenName: "Wrapped BTC",
//     tokenSymbol: "WBTC",
//     tokenLogo:
//       "https://cdn.moralis.io/eth/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
//     tokenDecimals: "8",
//     fromAddress: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     fromAddressLabel: null,
//     toAddress: "0xc430b592940661427d57d8d72d68d61a5f72d294",
//     toAddressLabel: null,
//     address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
//     blockHash:
//       "0xcbe3427ed28ef6e9139f31ecfb956d9676416c859d14c0f8031b5af0f4141389",
//     blockNumber: "16844459",
//     blockTimestamp: "2023-03-17T02:06:35.000Z",
//     transactionHash:
//       "0x0b1c4cc91898da1d6dcf0934fb4d89687d82e35c89d7b71c0e52837fbce05a93",
//     transactionIndex: 143,
//     logIndex: 293,
//     value: "1600000",
//     possibleSpam: false,
//     valueDecimal: "0.016",
//     chain: "0x1",
//   },
//   {
//     tokenName: "Wrapped BTC",
//     tokenSymbol: "WBTC",
//     tokenLogo:
//       "https://cdn.moralis.io/eth/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
//     tokenDecimals: "8",
//     fromAddress: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     fromAddressLabel: null,
//     toAddress: "0xc430b592940661427d57d8d72d68d61a5f72d294",
//     toAddressLabel: null,
//     address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
//     blockHash:
//       "0xb5fb4c60f06580527a833bc766778a6f2deb35c7b298500bb40366ea2e814562",
//     blockNumber: "16844430",
//     blockTimestamp: "2023-03-17T02:00:47.000Z",
//     transactionHash:
//       "0x6f34644353c30a375c45f0e43c14be288180db5621b70f4b44461774e059bbf6",
//     transactionIndex: 120,
//     logIndex: 302,
//     value: "187836",
//     possibleSpam: false,
//     valueDecimal: "0.00187836",
//     chain: "0x1",
//   },
//   {
//     tokenName: "Wrapped BTC",
//     tokenSymbol: "WBTC",
//     tokenLogo:
//       "https://cdn.moralis.io/eth/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
//     tokenDecimals: "8",
//     fromAddress: "0x74de5d4fcbf63e00296fd95d33236b9794016631",
//     fromAddressLabel: null,
//     toAddress: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     toAddressLabel: null,
//     address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
//     blockHash:
//       "0x1e1dcd2bc4f8a9049de5d044fff24e71d800b823f497a938cb87a31e832f12c4",
//     blockNumber: "16182166",
//     blockTimestamp: "2022-12-14T09:54:11.000Z",
//     transactionHash:
//       "0xabe8f0e9617d67ee941c6a305f06bdacd8d7d3d07b9a7b07049063ac5408c1f6",
//     transactionIndex: 60,
//     logIndex: 60,
//     value: "1787836",
//     possibleSpam: false,
//     valueDecimal: "0.01787836",
//     chain: "0x1",
//   },
//   {
//     tokenName: "Binance Wrapped BTC",
//     tokenSymbol: "BBTC",
//     tokenLogo: null,
//     tokenDecimals: "8",
//     fromAddress: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     fromAddressLabel: null,
//     toAddress: "0x74de5d4fcbf63e00296fd95d33236b9794016631",
//     toAddressLabel: null,
//     address: "0x9be89d2a4cd102d8fecc6bf9da793be995c22541",
//     blockHash:
//       "0x1e1dcd2bc4f8a9049de5d044fff24e71d800b823f497a938cb87a31e832f12c4",
//     blockNumber: "16182166",
//     blockTimestamp: "2022-12-14T09:54:11.000Z",
//     transactionHash:
//       "0xabe8f0e9617d67ee941c6a305f06bdacd8d7d3d07b9a7b07049063ac5408c1f6",
//     transactionIndex: 60,
//     logIndex: 48,
//     value: "1800485",
//     possibleSpam: false,
//     valueDecimal: "0.01800485",
//     chain: "0x1",
//   },
//   {
//     tokenName: "Binance Wrapped BTC",
//     tokenSymbol: "BBTC",
//     tokenLogo: null,
//     tokenDecimals: "8",
//     fromAddress: "0xdfd5293d8e347dfe59e90efd55b2956a1343963d",
//     fromAddressLabel: "Binance 16",
//     toAddress: "0x86f8ce92c8d9b8e2da41832712ff143059277e68",
//     toAddressLabel: null,
//     address: "0x9be89d2a4cd102d8fecc6bf9da793be995c22541",
//     blockHash:
//       "0x117c6871228698a4ccbd5fe09bd0d4a9f2c59fd66d86be66e3e14121f417c839",
//     blockNumber: "16181796",
//     blockTimestamp: "2022-12-14T08:39:11.000Z",
//     transactionHash:
//       "0xca01d82e044c792ecd4fe2e1f37fabc387e7229e33e3a2a1af6faeac99b7076c",
//     transactionIndex: 24,
//     logIndex: 24,
//     value: "1800485",
//     possibleSpam: false,
//     valueDecimal: "0.01800485",
//     chain: "0x1",
//   },
// ];

const TransactionsList = ({ account }) => {
  const [transactions, setTransactions] = useState<{
    [key: string]: CombinedTransaction[];
  }>({});
  const { response: transactionsFetch, isFetching } = useFetch(
    `api/transactions/${account}`,
    {
      params: { chain: 0 },
    }
  );
  useEffect(() => {
    setTransactions(() => {
      let tempTransactions: { [key: string]: CombinedTransaction[] } = {};
      transactionsFetch?.data?.length &&
        transactionsFetch.data
          .sort(
            (a, b) =>
              moment(b.block_timestamp).valueOf() -
              moment(a.block_timestamp).valueOf()
          )
          .forEach((transaction) => {
            const date = moment
              .utc(transaction.block_timestamp)
              .format("MMM DD, YYYY");
            tempTransactions[date] = !!tempTransactions[date]
              ? [...tempTransactions[date], transaction]
              : [transaction];
          });
      console.log(tempTransactions);
      return tempTransactions;
    });
  }, [transactionsFetch]);

  const typeOfTransaction = useCallback(
    (transaction) => {
      return transaction?.decoded_call &&
        !transaction?.decoded_call.params.filter((e) => e.name === "_to").length
        ? transaction.decoded_call.label
        : account === transaction.from_address
        ? "Send"
        : "Receive";
    },
    [transactions]
  );

  if (isFetching) return <div>Fetching data</div>;

  return (
    <div className="pt-5 ">
      {Object.keys(transactions).length ? (
        Object.keys(transactions).map((key, index) => (
          <div key={index} className="mt-5">
            <div className="text-subdued font-medium pb-3 border-b border-gray-700">
              {key}
            </div>
            {transactions[key].map((transaction, index) => (
              <div key={index} className="mt-3">
                <div className="flex pb-3 px-2 space-x-2 items-center border-b border-gray-700">
                  <div className="basis-4/12 flex gap-x-2 items-center">
                    <div className="bg-gray-800 w-[35px] h-[35px] p-2 rounded-full">
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: 20,
                        }}
                      >
                        call_made
                        {/* <span className="material-symbols-outlined">call_received</span> */}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">
                        {typeOfTransaction(transaction)}
                      </p>
                      <p className="text-subdued ">
                        {moment(transaction.block_timestamp).format(
                          "hh:mm:ss A"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="basis-2/12">
                    <p className="font-semibold">To</p>
                    <p className="text-subdued ">
                      {truncateEthereumAddress(transaction.to_address)}{" "}
                      {transaction.to_address === account && "(You)"}
                    </p>
                  </div>
                  <div className="basis-2/12">
                    <p className="font-semibold">From</p>
                    <p className="text-subdued ">
                      {truncateEthereumAddress(transaction.from_address)}
                      {transaction.from_address === account && "(You)"}
                    </p>
                  </div>
                  <div className="basis-2/12">
                    <div className=" flex items-center gap-x-2">
                      <img
                        src={
                          transaction.token_logo
                            ? transaction.token_logo
                            : "https://token.metaswap.codefi.network/assets/networkLogos/ethereum.svg"
                        }
                        alt="MetaMask"
                        width={35}
                        height={35}
                      />
                      <div>
                        <p className="font-semibold">
                          {Number(transaction?.value_decimal).toFixed(3)}
                        </p>
                        <p className="text-subdued">
                          {transaction.token_symbol || "ETH"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-1/12 flex justify-end gap-x-2 text-subdued">
                    <div>
                      {Number(transaction?.gas) || 0}
                    </div>
                    <div>ETH</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default TransactionsList;
function truncateEthereumAddress(address: string, chars = 6) {
  if (!address) return "";

  const prefix = address.slice(0, chars);
  const suffix = address.slice(-chars);

  return `${prefix}...${suffix}`;
}
