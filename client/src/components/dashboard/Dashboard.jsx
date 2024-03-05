import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleExistingTrip = () => {
    navigate("trip-planner");
  };
  const handleNewTrip = () => {
    navigate("new-trip");
  };

  return (
    <div>
      <button onClick={handleNewTrip}>New Trip</button>
      <button onClick={handleExistingTrip}>Trip</button>
    </div>
  );
}

export default Dashboard;
