import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../context/AppContext";

function NewTrip() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleCreateTrip = () => {
    navigate("/dashboard/trip-planner");
  };

  return (
    <div>
      {user._id && (
        <IoMdArrowRoundBack onClick={handleGoBack} className="go-back" />
      )}
      <button onClick={handleCreateTrip}>Create New Trip</button>
    </div>
  );
}

export default NewTrip;
