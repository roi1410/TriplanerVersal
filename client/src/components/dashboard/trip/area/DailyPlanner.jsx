import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkForUser , logout } from "../../../../utils/AuthService";
import { AppContext } from "../../../../context/AppContext";


function DailyPlanner() {
  const {isGuest , setUser} = useContext(AppContext)
  const navigate = useNavigate();

 
  const handleChooseHotel = () => {
    navigate("my-hotels");
  };
  const handleChooseEvent = () => {
    navigate("my-events");
  };



  return (
    <div>
      <button onClick={handleChooseHotel}>My Hotels</button>
      <button onClick={handleChooseEvent}>My Events</button>
    </div>
  );
}

export default DailyPlanner;