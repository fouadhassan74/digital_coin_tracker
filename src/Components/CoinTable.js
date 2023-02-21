import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { CurrencyState, SymbolState } from "../atoms/Atoms";
import { CoinList } from "../config/api";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/system";
import { makeStyles } from "tss-react/mui";
import {
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NumberWithComma } from "./Carousel";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useRecoilState(CurrencyState);
  const [symbol, setSymbol] = useRecoilState(SymbolState);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const fetch = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);
    setCoins(data);
    setLoading(false);
  };
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  useEffect(() => {
    fetch();
  }, [currency]);
  console.log(handleSearch());
  const useStyles = makeStyles()((theme) => {
    return {
      res: {
        [theme.breakpoints.down("md")]: {
          maxWidth: "414",
          overflowX: "hidden",
        },
      },
      row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
      },
    };
  });
  console.log((handleSearch().length / 10).toFixed(0));

  const { classes } = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            CryptoCurenncy prices by market cap
          </Typography>
          <TextField
            variant="outlined"
            label="Search for Crypto Curenccy"
            style={{
              marginBottom: 20,
              width: "100%",
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <TableContainer style={{ overflowX: "auto" }} component={Paper}>
            {Loading ? (
              <LinearProgress />
            ) : (
              <Table className={classes.res} aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h_change", "Market cap"].map(
                      (head) => {
                        return (
                          <TableCell
                            style={{
                              color: "black",
                              fontWeight: "700",
                              fontFamily: "Montserrat",
                            }}
                            key={head}
                            align={head === "Coin" ? "left" : "right"}
                          >
                            {head}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          className={classes.row}
                          key={row.name}
                          onClick={() => {
                            navigate(`coin/${row.id}`);
                          }}
                        >
                          <TableCell
                            scope="row"
                            style={{ display: "flex", gap: 15 }}
                          >
                            <img
                              height="50"
                              style={{ marginBottom: 10 }}
                              src={row?.image}
                              alt={row.name}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {NumberWithComma(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {NumberWithComma(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            count={(handleSearch().length / 10).toFixed(0)}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            className={classes.pagination}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default CoinTable;
