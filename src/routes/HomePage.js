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
    margin: theme.spacing(3, 0, 1, 0),
  },
  timeToPeak: ({ isAtPeak, peakIsPast }) => ({
    fontSize: "1rem",
    lineHeight: 1,
    margin: theme.spacing(0, 0, 3, 0),
    color: isAtPeak
      ? theme.colour.tartyRed
      : peakIsPast
      ? theme.colour.lightMossGreen
      : theme.colour.copperOrange,
  }),
}));

const minutesToHoursAndMinutes = minutes =>
  `${Math.floor(minutes / 60)}:${String(Math.floor(minutes % 60)).padStart(
    2,
    "0"
  )}`;

const HomePage = () => {
  const { iob, timeRemainingInMinutes, timeToPeakInMinutes } = useIob();
  const timeRemaining =
    !timeRemainingInMinutes || timeRemainingInMinutes < 0
      ? null
      : minutesToHoursAndMinutes(timeRemainingInMinutes);
  const isAtPeak = Math.abs(timeToPeakInMinutes) < 10;
  const peakIsPast = timeToPeakInMinutes < 0;
  const timeToPeak = timeRemaining
    ? minutesToHoursAndMinutes(Math.abs(timeToPeakInMinutes))
    : null;

  const classes = useStyles({ isAtPeak, peakIsPast });

  return (
    <Grid className={classes.pageContainer}>
      <p className={classes.iobAmount}>{iob ? iob.toFixed(1) : 0}</p>
      <p className={classes.iobUnits}>units on board</p>
      {timeRemaining && (
        <p className={classes.timeRemaining}>{`${timeRemaining} remaining`}</p>
      )}
      {timeToPeak && (
        <p className={classes.timeToPeak}>
          {isAtPeak && peakIsPast
            ? "Insulin action has just passed peak"
            : isAtPeak
            ? "Insulin action is approaching peak"
            : peakIsPast
            ? `${timeToPeak} since peak`
            : `${timeToPeak} to peak`}
        </p>
      )}
      <DoseAddDialog lastPeakInFuture={!peakIsPast} />
    </Grid>
  );
};

export default HomePage;
