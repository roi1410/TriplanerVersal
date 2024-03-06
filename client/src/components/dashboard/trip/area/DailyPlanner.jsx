import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkForUser } from "../../../../utils/AuthService";
import { AppContext } from "../../../../context/AppContext";


function DailyPlanner() {
  const {setUser} = useContext(AppContext)
  const navigate = useNavigate();

 
  const handleChooseHotel = () => {
    navigate("my-hotels");
  };
  const handleChooseEvent = () => {
    navigate("my-events");
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
      <button onClick={handleChooseHotel}>My Hotels</button>
      <button onClick={handleChooseEvent}>My Events</button>
    </div>
  );
}

export default DailyPlanner;