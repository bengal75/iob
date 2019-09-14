import createPersistedState from "use-persisted-state";

const useParamsState = createPersistedState("insulinParameters");

const useInsulinParams = () => {
  const [insulinParams, setInsulinParams] = useParamsState({
    durationOfInsulinActivity: 4.25, // hours
    peak: 75, // minutes
  });
  return { insulinParams, setInsulinParams };
};

export default useInsulinParams;
