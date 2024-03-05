import { createContext, useState } from "react";

export const AppContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  user: {},
  setUser: () => {},
  trips: [],
  setTrips: () => {},
  currentTrip:{},
  setCurrentTrip: () => {},
});

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState({});

  const contextValue = {
    isLoading,
    setIsLoading,
    loggedIn,
    setLoggedIn,
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
