import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "tss-react/mui";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { CurrencyState, SymbolState } from "../src/atoms/Atoms";

function App() {
  const [Currency, setCurrency] = useRecoilState(CurrencyState);
  const [Symbol, setSymbol] = useRecoilState(SymbolState);

  const useStyles = makeStyles()((theme) => {
    return {
      App: {
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",
      },
    };
  });
  const { classes } = useStyles();
  useEffect(() => {
    if (Currency === "USD") setSymbol("$");
    else setSymbol("KWD");
  }, [Currency]);

  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coin/:id" element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
