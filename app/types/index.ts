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
