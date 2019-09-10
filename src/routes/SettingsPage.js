import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
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
      <List>
        <ListItem>
          <ListItemIcon>
            <TimelapseIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${insulinParams.durationOfInsulinActivity} hours`}
            secondary="Duration of insulin activity"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${insulinParams.peak} minutes`}
            secondary="Peak time of insulin activity"
          />
        </ListItem>
      </List>
    </Grid>
  );
};

export default SettingsPage;
