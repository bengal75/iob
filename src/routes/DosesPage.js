import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import PharmacyIcon from "@material-ui/icons/LocalPharmacy";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CloseIcon from "@material-ui/icons/Close";
import useInsulinDoses from "../helpers/useInsulinDoses";
import { makeStyles } from "@material-ui/core/styles";
import format from "date-fns/format";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

const sortReverseOnTimestamp = (doseA, doseB) => {
  if (doseA.timestamp > doseB.timestamp) return -1;
  if (doseA.timestamp < doseB.timestamp) return 1;
  return 0;
};

const pluralise = (number, word) => (number === 1 ? word : `${word}s`);

const SingleDose = ({ dose, deleteDose }) => {
  const doseTimestamp = format(dose.timestamp, "HH:mm, EEE do MMM yyyy");
  return (
    <ListItem disabled={dose.expired}>
      <ListItemIcon>
        <PharmacyIcon />
      </ListItemIcon>
      <ListItemText
        primary={`${dose.units} ${pluralise(dose.units, "unit")}`}
      />
      <ListItemIcon>
        <AccessTimeIcon />
      </ListItemIcon>
      <ListItemText primary={doseTimestamp} />
      <ListItemSecondaryAction onClick={() => deleteDose(dose.originalIndex)}>
        <IconButton edge="end" aria-label="delete">
          <CloseIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const DoseList = ({ type, doses, deleteDose, deleteAll }) => {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <h2>{type} Doses</h2>
        {type === "Depleted" && (
          <Button variant="outlined" color="primary" onClick={deleteAll}>
            Delete All
          </Button>
        )}
      </Grid>
      <List>
        {doses.map(dose => (
          <SingleDose
            key={dose.timestamp}
            dose={dose}
            deleteDose={deleteDose}
          />
        ))}
      </List>
    </>
  );
};

const DosesPage = () => {
  const classes = useStyles();
  const {
    insulinDoses,
    removeInsulinDose,
    removeAllDepletedDoses,
    doseHasExpired,
  } = useInsulinDoses();

  const reverseChronoDoses = insulinDoses
    .map((dose, idx) => ({
      ...dose,
      originalIndex: idx,
      expired: doseHasExpired(dose),
    }))
    .sort(sortReverseOnTimestamp);
  const activeDoses = reverseChronoDoses.filter(dose => !dose.expired);
  const depletedDoses = reverseChronoDoses.filter(dose => dose.expired);

  return (
    <Grid>
      <div className={classes.toolbar} />
      <h1>Doses</h1>
      {activeDoses.length !== 0 && (
        <DoseList
          type="Active"
          doses={activeDoses}
          deleteDose={removeInsulinDose}
        />
      )}
      {depletedDoses.length !== 0 && (
        <DoseList
          type="Depleted"
          doses={depletedDoses}
          deleteDose={removeInsulinDose}
          deleteAll={removeAllDepletedDoses}
        />
      )}
      {!reverseChronoDoses.length && (
        <p>There are no insulin doses recorded. Add some from the home page.</p>
      )}
    </Grid>
  );
};

export default DosesPage;
