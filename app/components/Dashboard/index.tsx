import React, { Fragment, useMemo } from "react";

import { useGlobalContext } from "@/app/Context/store";
import { IToken } from "@/app/types";
import { Tab } from "@headlessui/react";
import useFetch from "../hooks/useFetch";
import TokenTable from "../TokenTable";
import axios from "axios";
import TransactionsList from "../TransactionsList";

const Tabs = [{ title: "Tokens" }, { title: "Transactions" }];



const Dashboard = () => {
  const { accounts, tokens } = useGlobalContext();

  const totalBalance = useMemo(
    () =>
      tokens?.length &&
      tokens
        .map((e) => e.usdBalance)
        .reduce((a, b) => Number(a) + Number(b) || 0),
    [tokens]
  );

  return (
    <div>
      <div>Portfolio value</div>
      <div className="text-3xl font-bold mt-2">${totalBalance.toFixed(2)}</div>
      <div className="bg-surface-default p-4 mt-10 rounded-lg">
        <Tab.Group>
          <Tab.List className="flex rounded-xl gap-x-2 border border-gray-500 max-w-[210px]">
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
              <TokenTable tokens={tokens} totalBalance={totalBalance} />
            </Tab.Panel>
            <Tab.Panel>
              <TransactionsList account={accounts[0]}/>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Dashboard;
