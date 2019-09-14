import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getTimeDisplays } from "../helpers/calculateTimes";

const useStyles = makeStyles(theme => ({
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

const TimeDisplays = ({ timeRemainingInMinutes, timeToPeakInMinutes }) => {
  const { timeRemaining, isAtPeak, peakIsPast, timeToPeak } = getTimeDisplays(
    timeRemainingInMinutes,
    timeToPeakInMinutes
  );
  const classes = useStyles({ isAtPeak, peakIsPast });
  return (
    <>
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
    </>
  );
};

export default TimeDisplays;
