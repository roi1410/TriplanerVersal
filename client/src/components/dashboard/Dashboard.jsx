import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Dashboard() {
  const { user } = useContext(AppContext);
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
      {user._id && <button onClick={handleExistingTrip}>Trip</button>}
    </div>
  );
}

export default Dashboard;
