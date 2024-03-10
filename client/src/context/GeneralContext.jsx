import { createContext, useEffect, useState } from "react";
import { checkForUser, logout } from "../utils/AuthService";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
  isGuest: false,
  setIsGuest: () => {},
  goBack: "",
  setGoBack: () => {},
  user: {},
  setUser: () => {},
  trips: [],
  setTrips: () => {},
  areas: [],
  setAreas: () => {},
  hotels: [],
  setHotels: () => {},
  events: [],
  setEvents: () => {},
  flights: [],
  setFlights: () => {},
  myHotels: [],
  setMyHotels: () => {},
  myEvents: [],
  setMyEvents: () => {},
  myFlights: [],
  setMyFlights: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [goBack, setGoBack] = useState("");
  const [user, setUser] = useState({});
  const [trips, setTrips] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [events, setEvents] = useState([]);
  const [myHotels, setMyHotels] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [flights, setFlights] = useState([]);
  const [myFlights, setMyFlights] = useState([]);
  const [areas, setAreas] = useState([{ areaName: "" }]);
  const [checkGuestUpdate, setCheckGuestUpdate] = useState(false);
  const navigate = useNavigate();

  const checkForGuest = (bool) => {
    if (bool === false) {
      const guest = JSON.parse(localStorage.getItem("guest"));
      setIsGuest(!!guest);
    } else if (bool === true) {
      localStorage.setItem("guest", JSON.stringify({}));
      setIsGuest(true);
      setCheckGuestUpdate(true);
    }
  };

  useEffect(() => {
    console.log("TRIPS ", trips);
    console.log("AREAS ", areas);
  }, [trips, areas]);

  useEffect(() => {
    checkForGuest();
  }, []);

  const fetchUser = async () => {
    const response = await checkForUser();
    if (response.data) {
      setUser(response.data);
    } else if (checkGuestUpdate && !isGuest) {
      logout();
      navigate("/");
    }
    setCheckGuestUpdate(false);
  };

  useEffect(() => {
    fetchUser();
  }, [isGuest]); // Run this effect whenever isGuest state changes

  const contextValue = {
    isLoading,
    setIsLoading,
    isGuest,
    setIsGuest: checkForGuest,
    goBack,
    setGoBack,
    user,
    setUser,
    trips,
    setTrips,
    areas,
    setAreas,
    hotels,
    setHotels,
    events,
    setEvents,
    myHotels,
    setMyHotels,
    myEvents,
    setMyEvents,
    flights,
    setFlights,
    myFlights,
    setMyFlights,
  };
  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
    </GeneralContext.Provider>
  );
};
