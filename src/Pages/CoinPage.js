import React from "react";
import { useState, useEffect } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { CurrencyState, SymbolState } from "../atoms/Atoms";
import { Await, useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { makeStyles } from "tss-react/mui";
import { LinearProgress, Typography } from "@mui/material";
import { NumberWithComma } from "../Components/Carousel";
import CoinInfo from "../Components/CoinInfo";

const CoinPage = () => {
  const { id } = useParams();
  const [currency, setCurrency] = useRecoilState(CurrencyState);
  const [symbol, setSymol] = useRecoilState(SymbolState);
  const [coin, setCoin] = useState();
  console.log(id);
  const fetch = async () => {
    const data = await axios.get(SingleCoin(id));
    setCoin(data.data);
  };
  useEffect(() => {
    fetch();
  }, []);
  console.log(coin);

  const useStyles = makeStyles()((theme) => {
    return {
      container: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      },
      sidebar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
      },
      heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
      },
      description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
      },
      marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
      },
    };
  });
  const { classes } = useStyles();
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin.name}
          height="200"
          style={{ marginBottom: 200 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin.name}
        </Typography>
        {/* <Typography variant="subtitle1" className={classes.description}>
          {coin.description}
        </Typography> */}
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {NumberWithComma(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {NumberWithComma(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {NumberWithComma(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
