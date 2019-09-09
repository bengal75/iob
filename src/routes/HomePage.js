import React from "react";
import Grid from "@material-ui/core/Grid";
import DoseAddDialog from "../components/DoseAddDialog";
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
  timeRemaining: {
    fontSize: "1rem",
    lineHeight: 1,
    margin: theme.spacing(3, 0),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const { iob, timeRemainingInMinutes } = useIob();
  const timeRemaining =
    !timeRemainingInMinutes || timeRemainingInMinutes < 0
      ? null
      : `${Math.floor(timeRemainingInMinutes / 60)}:${String(
          Math.floor(timeRemainingInMinutes % 60)
        ).padStart(2, "0")}`;

  return (
    <Grid className={classes.pageContainer}>
      <p className={classes.iobAmount}>{iob ? iob.toFixed(1) : 0}</p>
      <p className={classes.iobUnits}>units on board</p>
      {timeRemaining && (
        <p className={classes.timeRemaining}>{`${timeRemaining} remaining`}</p>
      )}
      <DoseAddDialog />
    </Grid>
  );
};

export default HomePage;
