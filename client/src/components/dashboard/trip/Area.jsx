import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GeneralContext } from "../../../context/GeneralContext";
import "./trip.css"
import { CurrentContext } from "../../../context/CurrentContext";
import { getItemsWithFilter } from "../../../utils/CRUDService"

function Area() {
  const {isGuest ,setUser, setGoBack ,setMyDays } = useContext(GeneralContext)
  const {currentArea } = useContext(CurrentContext)
  const navigate = useNavigate();

  useEffect(() => {
    setGoBack("/dashboard/trip-planner");

}, []);

  return (
    <div>
     <div className="mini-navbar">
        <NavLink to="overview">Overview</NavLink>{" "}
        <NavLink to="events">Events</NavLink>{" "}
        <NavLink to="hotels">Hotels</NavLink>{" "}
        <NavLink to="daily-planner">Daily Planner</NavLink>{" "}
     </div>
      <Outlet />
    </div>
  );
}

export default Area;
