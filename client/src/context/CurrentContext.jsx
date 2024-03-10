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

  const saveTripLocally = async (tripData)=>{
    if(currentTrip!=""){
      console.log(tripData);
      localStorage.setItem("currentTrip",tripData.id)
      setCurrentTrip(tripData)
    }else if(localStorage.getItem("currentTrip")!=""){
      setCurrentTrip(getItem("trip", { tripId: localStorage.getItem("currentTrip") }))
    }
  }

  const saveAreaLocally = async (areaData)=>{
    if(currentTrip!=""){
      console.log(areaData);
      localStorage.setItem("currentArea",areaData.id)
      setCurrentArea(areaData)
    }else if(localStorage.getItem("currentArea")!=""){
      setCurrentArea(getItem("area", { areaId: localStorage.getItem("currentArea") }))
    }
  }


  const contextValue = {
    currentTrip,
    setCurrentTrip: saveTripLocally,
    currentArea,
    setCurrentArea: saveAreaLocally,
  };
  return (
    <CurrentContext.Provider value={contextValue}>{children}</CurrentContext.Provider>
  );
};



