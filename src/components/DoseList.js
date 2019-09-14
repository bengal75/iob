import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SingleDose from "./SingleDose";
import { makeStyles } from "@material-ui/core/styles";
import useInsulinParams from "../helpers/useInsulinParameters";
import useInterval from "../helpers/useInterval";

const useStyles = makeStyles(theme => ({
  doseCardContainer: {
    marginBottom: theme.spacing(4),
  },
  doseCard: {
    padding: theme.spacing(0, 1),
  },
}));

const DoseList = ({ type, doses, deleteDose, deleteAll }) => {
  const classes = useStyles();
  const { insulinParams } = useInsulinParams();
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 60 * 1000);
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
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={classes.doseCardContainer}
      >
        {doses.map(dose => (
          <Grid
            className={classes.doseCard}
            key={dose.timestamp}
            item
            xs={12}
            sm={6}
            lg={4}
          >
            <SingleDose
              dose={dose}
              deleteDose={deleteDose}
              insulinParams={insulinParams}
              now={now}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DoseList;
