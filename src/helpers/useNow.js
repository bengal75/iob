import { createContext, useContext } from "react";

const NowContext = createContext([new Date()]);
export const NowProvider = NowContext.Provider;
const useNow = () => useContext(NowContext);

export default useNow;
