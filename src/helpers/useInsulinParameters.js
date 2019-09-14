import createPersistedState from "use-persisted-state";

const useParamsState = createPersistedState("insulinParameters");

const useInsulinParams = () => {
  const [insulinParams, setInsulinParams] = useParamsState({
    durationOfInsulinActivity: 4.0, // hours
    peak: 60, // minutes
  });
  return { insulinParams, setInsulinParams };
};

export default useInsulinParams;
