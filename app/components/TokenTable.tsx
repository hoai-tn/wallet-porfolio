import React from "react";
import DataTable, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "./DataTable";
import { ITokenTableProps } from "../types";

const TokenTable = ({ tokens, totalBalance }: ITokenTableProps) => {
  const portfolioPercent = (balance: Number) => {
    return ((Number(balance) / Number(totalBalance)) * 100).toFixed(2);
  };
  return (
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
        {tokens?.length ? (
          tokens.map((token, index) => (
            <TableRow key={index} className="border-b dark:border-gray-700">
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
                <div>${token.usdPrice.toString()}</div>
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
          ))
        ) : (
          <TableRow className="text-center font-bold text-md w-full">
            <TableCell colspan={4}>There are no tokens</TableCell>
          </TableRow>
        )}
      </TableBody>
    </DataTable>
  );
};

export default TokenTable;
