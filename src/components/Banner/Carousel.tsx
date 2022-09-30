import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { TrendingCoins } from "../../lib/api";
import axios from "axios";
import { Trending, Responsive1 } from "../../lib/model";
import AliceCarousel from "react-alice-carousel";
import { Routes, Link } from "react-router-dom";
import { numberWithCommas } from "../../lib/functions";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

const Carousel: React.FC = () => {
  const [trendingCoins, setTrendingCoins] = useState<Trending[]>([]);
  const classes = useStyles();
  const fetchTrendingCoins = () => {
    axios
      .get<Trending[]>(TrendingCoins("usd"))
      .then((res) => setTrendingCoins(res.data));
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, []);
  const items = trendingCoins.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>{coin?.symbol}</span>
        &nbsp;
        <span>
          {profit && "+"}
          {coin?.price_change_percentage_24h?.toFixed(0)}%
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          $ {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive1: Responsive1 = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={{
          0: {
            items: 2,
          },
          512: {
            items: 4,
          },
        }}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
