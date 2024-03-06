import React, { useContext, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { checkForUser } from "../../../../../utils/AuthService";
import { AppContext } from "../../../../../context/AppContext";


function MyHotels() {
  const {setUser} = useContext(AppContext)
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard/trip-planner/area/daily-planner");
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
      <IoMdArrowRoundBack onClick={handleGoBack} className="go-back" />{" "}
      MyHotels
    </div>
  );
}

export default MyHotels;
