import { createContext, useEffect, useState } from "react";
import { checkForUser, logout } from "../utils/AuthService";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
  isGuest: false,
  setIsGuest: () => {},
  user: {},
  setUser: () => {},
  trips: [],
  setTrips: () => {},
  currentTrip: {},
  setCurrentTrip: () => {},
});

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState({});
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState({});
  const navigate = useNavigate();
  const [checkGuestUpdate, setCheckGuestUpdate] = useState(false);

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
    checkForGuest(); // Initialize isGuest state based on localStorage
  }, []); // Empty dependency array ensures this effect runs only once on component mount

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
    user,
    setUser,
    trips,
    setTrips,
    currentTrip,
    setCurrentTrip,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
