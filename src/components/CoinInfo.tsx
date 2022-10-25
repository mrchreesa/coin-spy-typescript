import React, { useState, useEffect } from "react";
import axios from "axios";
import { CoinOHLC } from "../lib/api";
import { Coin } from "../lib/model";
import { makeStyles, CircularProgress } from "@material-ui/core";

import Chart from "react-apexcharts";
import SelectButton from "./SelectButton";
import { chartDays } from "../lib/data";

const useStyles = makeStyles((theme?: any) => ({
  container: {
    width: "73vw",

    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "95vw",
      marginTop: 10,
      padding: 0,
      paddingTop: 0,
    },
  },
}));

interface Props {
  coin: Coin;
}

const CoinInfo: React.FC<Props> = ({ coin }) => {
  const [coinOHLC, setCoinOHLC] = useState<any[]>([]);
  const [days, setDays] = useState<number>(1);
  const [flag, setflag] = useState(false);

  const fetchOHLC = () => {
    axios.get(CoinOHLC(coin.id, days)).then((res) => {
      setflag(true);
      let newArray: any[] = [];
      // newArray=res.data;
      let data: any = res.data;
      console.log(data);

      const time = data.map((c: any) => {
        let date = new Date(c[0]);
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return days === 1 ? time : date.toLocaleDateString();
      });

      data?.map((item: any, index: any) => {
        newArray.push({
          x: time[index],
          y: data[index].slice(1, 5),
        });
      });
      setCoinOHLC(newArray);
    });
  };

  useEffect(() => {
    fetchOHLC();
  }, [days]);

  const classes = useStyles();
  const options = {
    series: [
      {
        data: coinOHLC,
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },

      plotOptions: {
        candlestick: {
          wick: {
            useFillColor: true,
          },
        },
      },

      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  console.log(coinOHLC);

  return (
    <div className={classes.container}>
      {coinOHLC.length === 0 || !coinOHLC ? (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      ) : (
        <>
          <Chart
            options={options}
            series={options?.series}
            type="candlestick"
            width="100%"
            height="700px"
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day: any) => (
              <SelectButton
                style={{}}
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setflag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
