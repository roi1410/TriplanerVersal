import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function MyEvents() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard/trip-planner/area/daily-planner");
  };

  return (
    <div>
      <IoMdArrowRoundBack onClick={handleGoBack} className="go-back" />{" "}
      MyEvents
    </div>
  );
}

export default MyEvents;
