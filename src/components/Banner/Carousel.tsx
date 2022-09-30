import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { TrendingCoins } from "../../lib/api";
import axios from "axios";
import { Trending } from "../../lib/model";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
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
  console.log(trendingCoins);

  return <div className={classes.carousel}>carusel</div>;
};

export default Carousel;
