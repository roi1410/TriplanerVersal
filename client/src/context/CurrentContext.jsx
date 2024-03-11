import { createContext, useEffect, useState } from "react";
import { getItem} from "../utils/CRUDService";

export const CurrentContext = createContext({
  setTrips: () => {},
  currentTrip: {},
  setCurrentTrip: () => {},
  currentArea: {},
  setCurrentArea: () => {},
  currentHotrel: {},
  setCurrentHotel: () => {},
  currentFlight: {},
  setCurrentFlight: () => {},
});

export const CurrentContextProvider = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useState({});
  const [currentArea, setCurrentArea] = useState({});
  const [currentHotel, setCurrentHotel] = useState({});
  const [currentFlight, setCurrentFlight] = useState({});

  useEffect(() => {
    saveTripLocally({});
    console.log("CURRENT TRIP ", currentTrip);
    // console.log("CURRENT AREA ", currentArea);
  }, []);

  const saveTripLocally = async (tripData) => {
    const myItem = localStorage.getItem('currentTrip');
    if(Object.keys(tripData).length !== 0){
      localStorage.setItem("currentTrip",JSON.stringify(tripData.id))
      setCurrentTrip(tripData)
    }else if(myItem !== "undefined"){
      const newId=JSON.parse(localStorage.getItem("currentTrip"));
      const response = await getItem("trip", newId)
      setCurrentTrip(response.data)
    }
    else{
      console.log("3");
    }
  }



  const saveAreaLocally = async (areaData) => {
    const myItem = localStorage.getItem('currentArea');
    if(Object.keys(areaData).length !== 0){
      localStorage.setItem("currentArea",JSON.stringify(areaData.id))
      setCurrentArea(areaData)
    }else if(myItem !== "undefined"){
      const newId=JSON.parse(localStorage.getItem("currentArea"));
      const response = await getItem("area", newId)
      setCurrentArea(response.data)
    }
    else{
      console.log("3");
    }
  }
  const saveHotelLocally = async (hotelData) => {
    const myItem = localStorage.getItem('currentHotel');
    if(Object.keys(hotelData).length !== 0){
      localStorage.setItem("currentHotel",JSON.stringify(hotelData.id))
      setCurrentHotel(hotelData)
    }else if(myItem !== "undefined"){
      const newId=JSON.parse(localStorage.getItem("currentHotel"));
      const response = await getItem("hotel", newId)
      setCurrentHotel(response.data)
    }
    else{
      console.log("3");

    }
  }
  const saveFlightLocally = async (flightData) => {
    console.log(flightData);
    const myItem = localStorage.getItem('currentFlight');
    if(Object.keys(flightData).length !== 0){
      localStorage.setItem("currentFlight",JSON.stringify(flightData.flightId))
      setCurrentFlight(flightData)
    }else if(myItem !== "undefined"){
      const newId=JSON.parse(localStorage.getItem("currentFlight"));
      const response = await getItem("flight", newId)
      setCurrentFlight(response.data)
    }
    else{
      console.log("3");
    }
  }




  const contextValue = {
    currentTrip,
    setCurrentTrip: saveTripLocally,
    currentArea,
    setCurrentArea : saveAreaLocally,
    currentHotel,
    setCurrentHotel:  saveHotelLocally,
    currentFlight,
    setCurrentFlight: saveFlightLocally ,
  };
  return (
    <CurrentContext.Provider value={contextValue}>{children}</CurrentContext.Provider>
  );
};



