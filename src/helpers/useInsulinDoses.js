import createPersistedState from "use-persisted-state";

const useDoseState = createPersistedState("insulinDoses");

const useInsulinDoses = () => {
  const [insulinDoses, setInsulinDoses] = useDoseState([]);

  return {
    insulinDoses,
    addInsulinDose: newDoseObject =>
      setInsulinDoses([...insulinDoses, newDoseObject]),
    removeInsulinDose: removalIndex =>
      setInsulinDoses(
        insulinDoses.filter((value, index) => index !== removalIndex)
      ),
  };
};

export default useInsulinDoses;
