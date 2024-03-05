import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";


function NewTrip() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleCreateTrip = () => {
    navigate("/dashboard/trip-planner");
  };

  return (
    <div>
      <IoMdArrowRoundBack onClick={handleGoBack} className="go-back"/>
      <button onClick={handleCreateTrip}>Create New Trip</button>
    </div>
  );
}

export default NewTrip;
