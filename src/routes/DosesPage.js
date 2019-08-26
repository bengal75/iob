import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

const DosesPage = () => {
  const classes = useStyles();
  return (
    <Grid>
      <div className={classes.toolbar} />
      <h1>Doses</h1>
    </Grid>
  );
};

export default DosesPage;
