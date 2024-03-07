import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GeneralContext } from "../../../context/GeneralContext";
import { checkForUser , logout } from "../../../utils/AuthService";


function Area() {
  const {isGuest ,setUser} = useContext(GeneralContext)
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard/trip-planner");
  };

 

  return (
    <div>
      <IoMdArrowRoundBack onClick={handleGoBack} className="go-back"/>{" "}
      <NavLink to="overview">Overview</NavLink>{" "}
      <NavLink to="events">Events</NavLink>{" "}
      <NavLink to="hotels">Hotels</NavLink>{" "}
      <NavLink to="daily-planner">Daily Planner</NavLink>{" "}
      <Outlet />
    </div>
  );
}

export default Area;
