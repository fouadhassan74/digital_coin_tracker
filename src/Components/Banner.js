import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { makeStyles } from "tss-react/mui";

import Carousel from "./Carousel";
const useStyles = makeStyles()((theme) => {
  return {
    banner: {
      backgroundImage: "url(tracker/src/images/banner2.jpg)",
    },
    bannerContent: {
      height: 400,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
    tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
  };
});
const Banner = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
