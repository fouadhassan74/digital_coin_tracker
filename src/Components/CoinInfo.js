import { createTheme } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ThemeProvider } from "styled-components";
import { CurrencyState } from "../atoms/Atoms";
import { HistoricalChart } from "../config/api";
import { makeStyles } from "tss-react/mui";
import { CircularProgress } from "@mui/material";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Chart } from "react-chartjs-2";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CoinInfo = ({ coin }) => {
  const [history, setHistory] = useState([]);
  const [days, setDays] = useState();
  const [currency, setCurenncy] = useRecoilState(CurrencyState);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setLoading(false);
    setHistory(data.prices);
  };
  const useStyles = makeStyles()((theme) => {
    return {
      container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
          width: "100%",
          marginTop: 0,
          padding: 20,
          paddingTop: 0,
        },
      },
    };
  });
  const { classes } = useStyles();
  useEffect(() => {
    fetch();
  }, [currency, days]);
  console.log("data", history);
  history.map((coin) => {
    console.log(coin);
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {loading ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: history.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: history.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
