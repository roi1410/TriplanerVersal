import React, { useContext, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { checkForUser , logout } from "../../../../../utils/AuthService";
import { GeneralContext } from "../../../../../context/GeneralContext";

function MyEvents() {
  const {isGuest , setUser} = useContext(GeneralContext)
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
