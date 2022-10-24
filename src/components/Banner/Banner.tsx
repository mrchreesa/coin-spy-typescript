import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    position: "relative",
    backgroundImage: "url(./banner3.jpeg)",
    backgroundSize: "cover",
    "&::before": {
      content: "",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.75)",
    },
  },
  bannerContent: {
    height: "360px",
    display: "flex",
    opacity: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundOrigin: "center",
  },
  tagline: {
    zIndex: 1,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <div className="banner">
        <div className={classes.bannerContent}>
          <div className={classes.tagline}>
            <Typography
              variant="h2"
              style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
            >
              Coin Spy
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                height: "40%",
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
              }}
            >
              Spy with a little eye on your favourite coin
            </Typography>
            <Carousel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
