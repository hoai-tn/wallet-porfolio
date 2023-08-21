import React from "react";
import DataTable, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../DataTable";
import { useGlobalContext } from "@/app/Context/store";
import { IToken } from "@/app/types";

const Dashboard = () => {
  const { accounts, tokens } = useGlobalContext();
  const totalBalance =
    tokens.reduce((a, b) => Number(a.usdBalance) + Number(b.usdBalance)) || 0;
  const portfolioPercent = (balance: Number) => {
    return ((balance / totalBalance) * 100).toFixed(2) as string;
  };
  return (
    <div>
      <div>Portfolio value</div>
      <div className="text-3xl font-bold mt-2">${totalBalance}</div>
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
                  {token.usdPrice}
                </TableCell>
                <TableCell className="whitespace-nowrap font-bold">
                  {token?.usdBalance && <div>$ {token.usdBalance}</div>}
                  <div className="text-gray-500">
                    {token.symbol} {token.balance}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

export default Dashboard;
