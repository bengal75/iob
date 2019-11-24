import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { DateTimePicker } from "@material-ui/pickers";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useNow from "../helpers/useNow";
import useInsulinDoses from "../helpers/useInsulinDoses";
import isFuture from "date-fns/isFuture";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    position: "fixed",
    bottom: "4vh",
    right: "4vw",
  },
  errorMessage: {
    fontSize: "small",
    color: theme.colour.slateBlue,
  },
  warningMessage: {
    fontSize: "small",
    color: theme.colour.tartyRed,
  },
  timeIsNowSwitch: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

const DoseAddDialog = ({ timeToPeakInMinutes }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [now, setNow] = useNow();

  const { addInsulinDose } = useInsulinDoses();
  const defaultDose = { timestamp: now, units: "" };
  const [doseEntry, setDoseEntry] = useState(defaultDose);

  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const [unitsError, setUnitsError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [timeIsNow, setTimeIsNow] = useState(true);
  const [saving, setSaving] = useState(false);
  const lastPeakInFuture = timeToPeakInMinutes > 0;

  const handleCancelButtonClick = () => {
    setDoseEntry(defaultDose);
    setTimeIsNow(true);
    toggleOpen();
    setSaving(false);
  };
  const handleAddButtonClick = () => {
    if (!doseEntry.units || doseEntry.units < 0) {
      setUnitsError(true);
      return false;
    }
    if (isFuture(doseEntry.timestamp)) {
      setTimeError(true);
      return false;
    }
    setSaving(true);
    timeIsNow
      ? addInsulinDose({ ...doseEntry, timestamp: new Date() })
      : addInsulinDose(doseEntry);
    handleCancelButtonClick();
  };
  const handleUnitsChange = event => {
    setUnitsError(false);
    setDoseEntry({ ...doseEntry, units: event.target.value });
  };
  const handleDateChange = date => {
    setTimeError(false);
    setDoseEntry({ ...doseEntry, timestamp: date });
  };
  const handleTimeIsNowSwitch = () => {
    setTimeIsNow(!timeIsNow);
    if (timeIsNow) handleDateChange(now);
  };
  const handleFabClick = () => {
    toggleOpen();
    setNow(new Date());
  };

  return (
    <>
      <Fab
        color="secondary"
        size="large"
        aria-label="add insulin dose"
        className={classes.fab}
        onClick={handleFabClick}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={toggleOpen}
        aria-labelledby="form-dialog-title"
        fullScreen={fullScreen}
      >
        <DialogTitle id="form-dialog-title">Add an Insulin Dose</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Record a dose of insulin, either now or at a time you select.
          </DialogContentText>
          {lastPeakInFuture && !saving && (
            <p className={classes.warningMessage}>
              <b>Heads up!</b> The last dose of insulin recorded has not yet
              reached its peak action.
            </p>
          )}
          <TextField
            autoComplete="off"
            autoFocus
            disabled={saving}
            error={unitsError}
            fullWidth
            id="units"
            inputProps={{ min: 0.5, max: 100, step: 0.5 }}
            label="Number of units"
            margin="normal"
            name="units"
            onChange={handleUnitsChange}
            type="number"
            value={doseEntry.units}
            variant="outlined"
          />
          {unitsError && (
            <p className={classes.errorMessage}>
              You must specify a dose of insulin greater than 0 units.
            </p>
          )}
          <FormControlLabel
            checked={timeIsNow}
            control={<Switch color="primary" />}
            disabled={saving}
            label="Taken now"
            labelPlacement="end"
            name="timeIsNowSwitch"
            onChange={handleTimeIsNowSwitch}
            className={classes.timeIsNowSwitch}
          />
          {!timeIsNow && (
            <>
              <DateTimePicker
                disabled={saving}
                inputVariant="outlined"
                label="Time of injection"
                value={doseEntry.timestamp}
                onChange={handleDateChange}
                fullWidth
                ampm={false}
                autoOk={true}
                disableFuture={true}
                format="HH:mm, EEEE do MMMM yyyy"
                openTo="hours"
                showTodayButton={true}
                error={timeError}
              />
              {timeError && (
                <p className={classes.errorMessage}>
                  The time of the injection cannot be in the future.
                </p>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelButtonClick}
            color="primary"
            variant="outlined"
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddButtonClick}
            color="primary"
            variant="contained"
            disabled={saving}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DoseAddDialog;
