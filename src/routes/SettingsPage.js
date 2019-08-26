import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useInsulinParams from "../helpers/useInsulinParameters";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

const SettingsPage = () => {
  const classes = useStyles();
  const { insulinParams } = useInsulinParams();
  return (
    <Grid>
      <div className={classes.toolbar} />
      <h1>Settings</h1>
      <pre>{JSON.stringify(insulinParams, null, 2)}</pre>
    </Grid>
  );
};

export default SettingsPage;
