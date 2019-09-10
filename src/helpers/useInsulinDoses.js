import createPersistedState from "use-persisted-state";
import useInsulinParams from "./useInsulinParameters";
import format from "date-fns/format";
import parse from "date-fns/parse";
import addMinutes from "date-fns/addMinutes";
import isPast from "date-fns/isPast";

const useDoseState = createPersistedState("insulinDoses");

const useInsulinDoses = () => {
  const [insulinDoses, setInsulinDoses] = useDoseState([]);
  const { insulinParams } = useInsulinParams();

  const parseTimestamp = timestamp => parse(timestamp, "t", new Date());

  const parsedDoses = insulinDoses.map(dose => ({
    units: Number(dose.units),
    timestamp: parseTimestamp(dose.timestamp),
  }));

  const doseHasExpired = dose => {
    const doseTimestamp =
      dose.timestamp instanceof Date
        ? dose.timestamp
        : parseTimestamp(dose.timestamp);
    const doseEndTime = addMinutes(
      doseTimestamp,
      insulinParams.durationOfInsulinActivity * 60
    );
    return isPast(doseEndTime);
  };

  return {
    insulinDoses: parsedDoses,
    addInsulinDose: ({ units, timestamp }) => {
      const formattedTimestamp = format(timestamp, "t");
      setInsulinDoses([
        ...insulinDoses,
        { timestamp: formattedTimestamp, units: Number(units) },
      ]);
    },
    removeInsulinDose: removalIndex =>
      setInsulinDoses(
        insulinDoses.filter((value, index) => index !== removalIndex)
      ),
    removeAllDepletedDoses: () =>
      setInsulinDoses(insulinDoses.filter(dose => !doseHasExpired(dose))),
    doseHasExpired,
  };
};

export default useInsulinDoses;
