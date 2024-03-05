import React from "react";
import { useNavigate } from "react-router-dom";

function DailyPlanner() {

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