import { ReactNode } from "react";

export interface IToken {
  token_address: string;
  symbol: string;
  name: string;
  logo: string;
  thumbnail: string;
  decimals: Number;
  balance: Number;
  possible_spam: Boolean;
  usdPrice: Number;
  usdBalance: Number;
}

interface ISelectItem {
    text: string;
    value: number;
    img?: string;
    description?: string;
  }
 export interface IBaseSelect {
    name: string;
    title?: string;
    selectItem: ISelectItem;
    children: ReactNode;
  }

 export interface ITokenTableProps {
    tokens: IToken[];
    totalBalance: Number;
  }