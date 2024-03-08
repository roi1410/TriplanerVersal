import { createContext, useEffect, useState } from "react";


export const CurrentContext = createContext({
  setTrips: () => {},
  currentTrip: {},
  setCurrentTrip: () => {},
  currentArea: {},
  setCurrentArea: () => {},
});

export const CurrentContextProvider = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useState({});
  const [currentArea, setCurrentArea] = useState({});

  useEffect(() => {
    console.log("CURRENT TRIP ", currentTrip);
    console.log("CURRENT AREA ", currentArea);
  }, [ currentTrip, currentArea]);

  const contextValue = {
    currentTrip,
    setCurrentTrip,
    currentArea,
    setCurrentArea,
  };
  return (
    <CurrentContext.Provider value={contextValue}>{children}</CurrentContext.Provider>
  );
};



