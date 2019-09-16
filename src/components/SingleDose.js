import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PharmacyIcon from "@material-ui/icons/LocalPharmacy";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import TimeDisplays from "./TimeDisplays";
import { makeStyles } from "@material-ui/core/styles";
import format from "date-fns/format";
import pluralise from "../helpers/pluralise";
import {
  calculateActionEnd,
  timeToNowInMinutes,
} from "../helpers/calculateTimes";

const useStyles = makeStyles(theme => ({
  doseCard: ({ expired }) => ({
    opacity: expired ? 0.5 : 1,
  }),
}));

const SingleDose = ({ dose, deleteDose, insulinParams, now }) => {
  const classes = useStyles({ expired: dose.expired });
  const doseActionEnd = calculateActionEnd(
    dose.timestamp,
    insulinParams.durationOfInsulinActivity * 60
  );
  const timeRemainingInMinutes = timeToNowInMinutes(doseActionEnd, now);
  const doseActionPeak = calculateActionEnd(dose.timestamp, insulinParams.peak);
  const timeToPeakInMinutes = timeToNowInMinutes(doseActionPeak, now);
  return (
    <Card className={classes.doseCard}>
      <CardContent>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              item
              xs={4}
            >
              <PharmacyIcon />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{`${dose.units} ${pluralise(
                dose.units,
                "unit"
              )}`}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              item
              xs={4}
            >
              <AccessTimeIcon />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">
                {format(dose.timestamp, "HH:mm, EEE do MMM yyyy")}
              </Typography>
            </Grid>
          </Grid>
          {!dose.expired && (
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                item
                xs={4}
              >
                <TimelapseIcon />
              </Grid>
              <Grid item xs={8}>
                <TimeDisplays
                  timeRemainingInMinutes={timeRemainingInMinutes}
                  timeToPeakInMinutes={timeToPeakInMinutes}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <IconButton
            aria-label="delete"
            onClick={() => deleteDose(dose.originalIndex)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default SingleDose;
