import React from "react";
import Grid from "@material-ui/core/Grid";
import DoseAddDialog from "../components/DoseAddDialog";
import TimeDisplays from "../components/TimeDisplays";
import { makeStyles } from "@material-ui/core/styles";
import useIob from "../helpers/useIob";

const useStyles = makeStyles(theme => ({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
  },
  iobAmount: {
    fontSize: "8rem",
    lineHeight: 1,
    margin: 0,
  },
  iobUnits: {
    fontSize: "2rem",
    lineHeight: 1,
    margin: theme.spacing(1, 0),
  },
}));

const HomePage = () => {
  const { iob, timeRemainingInMinutes, timeToPeakInMinutes } = useIob();
  const classes = useStyles();

  return (
    <Grid className={classes.pageContainer}>
      <p className={classes.iobAmount}>{iob ? iob.toFixed(1) : 0}</p>
      <p className={classes.iobUnits}>units on board</p>
      <TimeDisplays
        timeRemainingInMinutes={timeRemainingInMinutes}
        timeToPeakInMinutes={timeToPeakInMinutes}
      />
      <DoseAddDialog timeToPeakInMinutes={timeToPeakInMinutes} />
    </Grid>
  );
};

export default HomePage;
