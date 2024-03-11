import { createContext, useEffect, useState } from "react";
import { getItem } from "../utils/CRUDService";

export const CurrentContext = createContext({
  setTrips: () => {},
  currentTrip: {},
  setCurrentTrip: () => {},
  currentArea: {},
  setCurrentArea: () => {},
  currentHotel: {},
  setCurrentHotel: () => {},
  currentFlight: {},
  setCurrentFlight: () => {},
  currentDay: {},
  setCurrentDay: () => {},
});

export const CurrentContextProvider = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useState({});
  const [currentArea, setCurrentArea] = useState({});
  const [currentHotel, setCurrentHotel] = useState({});
  const [currentFlight, setCurrentFlight] = useState({});
  const [currentDay, setCurrentDay] = useState({});

  useEffect(() => {
    saveTripLocally({});
    // console.log("CURRENT TRIP ", currentTrip);
    // console.log("CURRENT AREA ", currentArea);
  }, []);


  useEffect(() => {
    // Load initial state from localStorage for each piece of state
    const loadInitialState = async () => {
       const tripId = localStorage.getItem('currentTrip');
       const areaId = localStorage.getItem('currentArea');
       const hotelId = localStorage.getItem('currentHotel');
       const flightId = localStorage.getItem('currentFlight');
       const dayId = localStorage.getItem('currentDay');
   
       // Load each piece of state if it exists in localStorage
       if (tripId) {
         const response = await getItem("trip", tripId);
         setCurrentTrip(response.data);
       }
       if (areaId) {
         const response = await getItem("area", areaId);
         setCurrentArea(response.data);
       }
       if (hotelId) {
         const response = await getItem("hotel", hotelId);
         setCurrentHotel(response.data);
       }
       if (flightId) {
         const response = await getItem("flight", flightId);
         setCurrentFlight(response.data);
       }
       if (dayId) {
         const response = await getItem("day", dayId);
         setCurrentDay(response.data);
       }
    };
   
    loadInitialState();
   }, []);

  const saveTripLocally = async (tripData) => {
    const myItem = localStorage.getItem("currentTrip");
    if (Object.keys(tripData).length !== 0) {
      localStorage.setItem("currentTrip", JSON.stringify(tripData.id));
      setCurrentTrip(tripData);
    } else if (myItem !== "undefined") {
      const newId = JSON.parse(localStorage.getItem("currentTrip"));
      const response = await getItem("trip", newId);
      setCurrentTrip(response.data);
    } else {
      console.log("3");
    }
  };

  const saveAreaLocally = async (areaData) => {
    const myItem = localStorage.getItem("currentArea");
    if (Object.keys(areaData).length !== 0) {
      localStorage.setItem("currentArea", JSON.stringify(areaData.id));
      setCurrentArea(areaData);
    } else if (myItem !== "undefined") {
      const newId = JSON.parse(localStorage.getItem("currentArea"));
      const response = await getItem("area", newId);
      setCurrentArea(response.data);
    } else {
      console.log("3");
    }
  };
  const saveHotelLocally = async (hotelData) => {
    const myItem = localStorage.getItem("currentHotel");
    if (Object.keys(hotelData).length !== 0) {
      localStorage.setItem("currentHotel", JSON.stringify(hotelData.id));
      setCurrentHotel(hotelData);
    } else if (myItem !== "undefined") {
      const newId = JSON.parse(localStorage.getItem("currentHotel"));
      const response = await getItem("hotel", newId);
      setCurrentHotel(response.data);
    } else {
      console.log("3");
    }
  };
  const saveFlightLocally = async (flightData) => {
    const myItem = localStorage.getItem("currentFlight");
    if (Object.keys(flightData).length !== 0) {
      localStorage.setItem("currentFlight", JSON.stringify(flightData.id));
      setCurrentFlight(flightData);
    } else if (myItem !== "undefined") {
      const newId = JSON.parse(localStorage.getItem("currentFlight"));
      const response = await getItem("flight", newId);
      setCurrentFlight(response.data);
    } else {
      console.log("3");
    }
  };
  const saveDayLocally = async (dayData) => {
    // Check if dayData is not undefined or null before proceeding
    if (dayData) {
      const myItem = localStorage.getItem("currentDay");
      if (Object.keys(dayData).length !== 0) {
        localStorage.setItem("currentDay", JSON.stringify(dayData.id));
        setCurrentDay(dayData);
      } else if (myItem !== "undefined") {
        const newId = JSON.parse(localStorage.getItem("currentDay"));
        const response = await getItem("day", newId);
        setCurrentDay(response.data);
      } else {
        console.log("3");
      }
    } else {
      console.log("dayData is undefined or null");
    }
  };

  const contextValue = {
    currentTrip,
    setCurrentTrip: saveTripLocally,
    currentArea,
    setCurrentArea: saveAreaLocally,
    currentHotel,
    setCurrentHotel: saveHotelLocally,
    currentFlight,
    setCurrentFlight: saveFlightLocally,
    currentDay,
    setCurrentDay: saveDayLocally,
  };
  return (
    <CurrentContext.Provider value={contextValue}>
      {children}
    </CurrentContext.Provider>
  );
};
