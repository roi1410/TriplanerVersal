import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../../context/AppContext";
import { checkForUser } from "../../../utils/AuthService";


function Area() {
  const {setUser} = useContext(AppContext)
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard/trip-planner");
  };

  useEffect(() => {
    checkForUser().then((response) => {
      if (response.data) {
        setUser(response.data);
      } else {
        logout();
        navigate("/");
        alert("Your previous session has ended, please login again.");
      }
    });
  }, []);

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
