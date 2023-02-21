import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
const Context = createContext();
export const State = () => {
  return useContext(Context);
};
const AppContext = (props) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  // useEffect(() => {
  //   if (currency === "USD") setSymbol("$");
  //   else setSymbol("@");
  // }, [currency]);
  return (
    <Context.Provider value={(currency, symbol, setCurrency)}>
      {props.children}
    </Context.Provider>
  );
};

export default AppContext;
