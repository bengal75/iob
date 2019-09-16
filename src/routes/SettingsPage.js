import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import { makeStyles } from "@material-ui/core/styles";
import useInsulinParams from "../helpers/useInsulinParameters";
import pluralise from "../helpers/pluralise";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  iconButton: {
    marginLeft: theme.spacing(3),
  },
}));

const EditableParameter = ({
  Icon,
  value,
  setNewValue,
  singularUnit,
  description,
  min,
  max,
  step,
}) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleChange = event => setTempValue(event.target.value);
  const handleAddButtonClick = () => {
    const newValue =
      tempValue < max ? (tempValue > min ? tempValue : min) : max;
    setTempValue(newValue);
    setNewValue(Number(newValue));
    setEditing(false);
  };
  const handleCancelButtonClick = () => {
    setTempValue(Number(value));
    setEditing(false);
  };
  return (
    <ListItem button onClick={() => (editing ? false : setEditing(true))}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      {editing ? (
        <>
          <TextField
            autoComplete="off"
            autoFocus
            fullWidth
            id={description}
            inputProps={{ min, max, step }}
            label={`${description} (${singularUnit}s)`}
            margin="normal"
            name={description}
            onChange={handleChange}
            type="number"
            value={tempValue}
            variant="outlined"
          />
          <IconButton
            className={classes.iconButton}
            color="primary"
            onClick={handleAddButtonClick}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            color="primary"
            onClick={handleCancelButtonClick}
          >
            <CancelIcon />
          </IconButton>
        </>
      ) : (
        <ListItemText
          primary={`${value} ${pluralise(value, singularUnit)}`}
          secondary={description}
        />
      )}
    </ListItem>
  );
};

const SettingsPage = () => {
  const classes = useStyles();
  const { insulinParams, setInsulinParams } = useInsulinParams();
  return (
    <Grid>
      <div className={classes.toolbar} />
      <h1>Settings</h1>
      <List>
        <EditableParameter
          Icon={TimelapseIcon}
          value={insulinParams.durationOfInsulinActivity}
          setNewValue={value =>
            setInsulinParams({
              ...insulinParams,
              durationOfInsulinActivity: value,
            })
          }
          singularUnit="hour"
          description="Duration of insulin activity"
          min={3}
          max={10}
          step={0.25}
        />
        <EditableParameter
          Icon={TrendingUpIcon}
          value={insulinParams.peak}
          setNewValue={value =>
            setInsulinParams({ ...insulinParams, peak: value })
          }
          singularUnit="minute"
          description="Time of peak insulin activity"
          min={30}
          max={120}
          step={10}
        />
      </List>
    </Grid>
  );
};

export default SettingsPage;
