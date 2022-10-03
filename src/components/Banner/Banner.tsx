import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner3.jpeg)",
    opacity: 1,
  },
  bannerContent: {
    height: "360px",
    display: "flex",

    flexDirection: "column",
    justifyContent: "space-around",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundOrigin: "center",
  },
  tagline: {
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
      <div className={classes.banner}>
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
              Spy with a little a eye on your favourite coin
            </Typography>
            <Carousel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
