import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkForUser, logout } from "../../../../utils/AuthService";
import { GeneralContext } from "../../../../context/GeneralContext";
import MyEvents from "./day/MyEvents";
import MyDay from "./day/MyDay";
import "./area.css";
import { getItemsWithFilter } from "../../../../utils/CRUDService";
import { CurrentContext } from "../../../../context/CurrentContext";
import { GrNext, GrPrevious } from "react-icons/gr";
import { format } from "date-fns";

function DailyPlanner() {
  const { isGuest, setUser, myDays, setMyDays } = useContext(GeneralContext);
  const { currentArea, setCurrentArea, currentDay, setCurrentDay } =
    useContext(CurrentContext);
  const [updateDay, setUpdateDay] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getItemsWithFilter("area", { id: currentArea.id })
      .then((response) => {
        console.log("MY DAYS ", response.data[0].Days);
        console.log("CURRENT DAY ", response.data[0].Days[0]);
        setMyDays(response.data[0].Days);

        const prevCurrentDay = JSON.parse(localStorage.getItem("currentDay"));
        if (prevCurrentDay) {
          for (const day of response.data[0].Days) {
            if (prevCurrentDay == day.id) {
              setCurrentDay(day);
            }
          }
        } else {
          setCurrentDay(response.data[0].Days[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [currentArea, updateDay]);


useEffect(()=>{
console.log(updateDay);
},[updateDay])


  const handlePreviousDay = () => {
    const currentIndex = myDays.findIndex((day) => day.id === currentDay.id);
    if (currentIndex > 0) {
      setCurrentDay(myDays[currentIndex - 1]);
    }
  };
  const handleNextDay = () => {
    const currentIndex = myDays.findIndex((day) => day.id === currentDay.id);
    if (currentIndex < myDays.length - 1) {
      setCurrentDay(myDays[currentIndex + 1]);
    }
  };
  return (
    <div className="daily-planner-container">
      <span className="day-tracker">
        {Object.keys(currentDay).length > 0 &&
        myDays.length > 0 &&
        currentDay.day === myDays[0].day ? (
          
            <GrPrevious className="disabled"/>
        ) : (
          
            <GrPrevious className="icon" onClick={handlePreviousDay}/>
        )}
        <b>
          {currentDay.day &&
            Object.keys(currentDay).length > 0 &&
            format(currentDay.day, "EEEE, MMMM do, yyyy")}
        </b>
        {Object.keys(currentDay).length > 0 &&
        myDays.length > 0 &&
        currentDay.day === myDays[myDays.length - 1].day ? (
           
            <GrNext className="disabled"/>
        ) : (
            
            <GrNext className="icon" onClick={handleNextDay}/>
        )}
      </span>
      <div className="event-day-pair">
        <MyDay setUpdateDay={setUpdateDay} updateDay={updateDay}/>
        <MyEvents setUpdateDay={setUpdateDay} updateDay={updateDay}/>
      </div>
    </div>
  );
}

export default DailyPlanner;
