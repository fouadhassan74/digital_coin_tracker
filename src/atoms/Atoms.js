import { atom } from "recoil";
export const CurrencyState = atom({
  key: "CurrencyState",
  default: "USD",
});
export const SymbolState = atom({
  key: "SymbolState",
  default: "$",
});
