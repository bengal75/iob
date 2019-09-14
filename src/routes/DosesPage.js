import React from "react";
import Grid from "@material-ui/core/Grid";
import DoseList from "../components/DoseList";
import useInsulinDoses from "../helpers/useInsulinDoses";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

const sortReverseOnTimestamp = (doseA, doseB) => {
  if (doseA.timestamp > doseB.timestamp) return -1;
  if (doseA.timestamp < doseB.timestamp) return 1;
  return 0;
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
