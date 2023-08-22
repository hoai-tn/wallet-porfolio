import React, { Fragment } from "react";
import DataTable, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../DataTable";
import { useGlobalContext } from "@/app/Context/store";
import { IToken } from "@/app/types";
import { Tab } from "@headlessui/react";

const Tabs = [{ title: "Tokens" }, { title: "Transactions" }];

const Dashboard = () => {
  const { accounts, tokens } = useGlobalContext();
  const totalBalance =
    tokens.length &&
    tokens
      .map((e) => e.usdBalance)
      .reduce((a, b) => Number(a) + Number(b) || 0);

  const portfolioPercent = (balance: Number) => {
    return ((balance / totalBalance) * 100).toFixed(2);
  };
  return (
    <div>
      <div>Portfolio value</div>
      <div className="text-3xl font-bold mt-2">${totalBalance}</div>
      <div className="bg-surface-default p-4 mt-10 rounded-lg">
        <Tab.Group>
          <Tab.List className="rounded-xl gap-x-2 border border-gray-500 max-w-[210px]">
            {Tabs.map(({ title }, index) => (
              <Tab key={index} as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <button
                    className={`
                     rounded-xl py-2 px-4 text-sm font-bold leading-5 
                    ${selected ? "bg-blue-500 text-white" : "text-gray-400"}`}
                  >
                    {title}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <DataTable>
                <TableHead>
                  <TableRow>
                    <TableCell>Token</TableCell>
                    <TableCell>Portfolio %</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tokens &&
                    tokens.map((token, index) => (
                      <TableRow
                        key={index}
                        className="border-b dark:border-neutral-500"
                      >
                        <TableCell className="whitespace-nowrap font-bold">
                          <div className="flex gap-x-5">
                            <img src={token.logo} alt="eth" width={40} />
                            <div className="space-y-1">
                              <b className="uppercase">{token.symbol}</b>
                              <p className="text-gray-500">{token.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-bold">
                          {portfolioPercent(token.usdBalance)}%
                        </TableCell>

                        <TableCell className="whitespace-nowrap font-bold">
                          <div>{token.usdPrice.toString()}</div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-bold">
                          {token?.usdBalance && (
                            <div>$ {token.usdBalance.toString()}</div>
                          )}
                          <div className="text-gray-500">
                            {token.symbol} {token.balance.toString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </DataTable>
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Dashboard;
