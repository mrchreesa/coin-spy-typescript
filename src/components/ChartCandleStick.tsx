import React, { useState, useEffect } from "react";
import axios from "axios";
import { CoinOHLC } from "../lib/api";
import { Coin } from "../lib/model";
import Chart from "react-apexcharts";

interface Props {
  coin: Coin;
  days: number;
}

const ChartCandleStick: React.FC<Props> = ({ coin, days }) => {
  const [data, setData] = useState([]);
  const fetchChartData = () => {
    axios.get(CoinOHLC(coin.id, days)).then((res) => setData(res.data));
  };
  useEffect(() => {
    fetchChartData();
  }, []);
  console.log(data);

  return (
    <div id="chart">
      <Chart
        // options={this.state.options}
        series={data}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default ChartCandleStick;
