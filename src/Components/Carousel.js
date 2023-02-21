import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { makeStyles } from "tss-react/mui";
import { CurrencyState, SymbolState } from "../atoms/Atoms";
import { TrendingCoins } from "../config/api";
const useStyles = makeStyles()((theme) => {
  return {
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselitems: {
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
      alignItems: "center",
      textTransform: "uppercase",
      color: "white",
    },
  };
});
export function NumberWithComma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
  const [currency, setCurrency] = useRecoilState(CurrencyState);
  const [symbol, setSymbol] = useRecoilState(SymbolState);
  const [trending, setTrending] = useState([]);
  const { classes } = useStyles();
  const fetchTrending = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  useEffect(() => {
    fetchTrending();
  }, [currency]);
  const Responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselitems} to={`/coin/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{
            marginBottom: 10,
          }}
        />
        <span>
          {coin.symbol}

          <span>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span>
          {symbol}
          {NumberWithComma(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  console.log(trending);
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={Responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
