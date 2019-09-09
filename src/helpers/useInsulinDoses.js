import createPersistedState from "use-persisted-state";
import format from "date-fns/format";
import parse from "date-fns/parse";

const useDoseState = createPersistedState("insulinDoses");

const useInsulinDoses = () => {
  const [insulinDoses, setInsulinDoses] = useDoseState([]);

  const parsedDoses = insulinDoses.map(dose => ({
    units: Number(dose.units),
    timestamp: parse(dose.timestamp, "t", new Date()),
  }));

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
  };
};

export default useInsulinDoses;
