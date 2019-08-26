import useInsulinParams from "./useInsulinParameters";
import useInsulinDoses from "./useInsulinDoses";

const iobCalcExponential = (insulinUnits, minsAgo, end, peak) => {
  // Adapted from https://github.com/openaps/oref0/blob/dev/lib/iob/calculate.js

  if (minsAgo > end) return 0;
  if (peak > 100) peak = 100;
  if (peak < 35) peak = 35;

  const tau = (peak * (1 - peak / end)) / (1 - (2 * peak) / end); // time constant of exponential decay
  const a = (2 * tau) / end; // rise time factor
  const S = 1 / (1 - a + (1 + a) * Math.exp(-end / tau)); // auxiliary scale factor

  const iobContrib =
    insulinUnits *
    (1 -
      S *
        (1 - a) *
        ((Math.pow(minsAgo, 2) / (tau * end * (1 - a)) - minsAgo / tau - 1) *
          Math.exp(-minsAgo / tau) +
          1));

  return iobContrib;
};

const useIob = () => {
  const { insulinParams } = useInsulinParams();
  const { insulinDoses } = useInsulinDoses();

  const iob = insulinDoses.reduce((accumulator, insulinDose) => {
    const minsAgo = (new Date() - insulinDose.timestamp) / 1000 / 60;
    const doseIobContrib = iobCalcExponential(
      insulinDose.units,
      minsAgo,
      insulinParams.durationOfInsulinActivity * 60,
      insulinParams.peak
    );
    return accumulator + doseIobContrib;
  }, 0);

  const mostRecentInsulinTimestamp = new Date(
    Math.max(...insulinDoses.map(dose => dose.timestamp))
  );
  const mostRecentInsulinActionEnd = mostRecentInsulinTimestamp.setMinutes(
    mostRecentInsulinTimestamp.getMinutes() +
      insulinParams.durationOfInsulinActivity * 60
  );
  const timeRemainingInMinutes =
    (mostRecentInsulinActionEnd - new Date()) / 1000 / 60;

  return { iob, timeRemainingInMinutes };
};

export default useIob;
