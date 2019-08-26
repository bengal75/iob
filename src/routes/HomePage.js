import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useIob from "../helpers/useIob";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
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
    <Grid>
      <div className={classes.toolbar} />
      <h1>Home</h1>
      <pre>{`${iob ? iob.toFixed(1) : 0} units on board`}</pre>
      {timeRemaining && <pre>{`${timeRemaining} remaining`}</pre>}
    </Grid>
  );
};

export default HomePage;
