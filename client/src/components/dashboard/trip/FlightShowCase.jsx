import React, { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { FaPlaneArrival, FaPlaneDeparture, FaClock } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { format } from "date-fns";
import "./trip.css";
import { MdPadding } from "react-icons/md";
import { CurrentContext } from "../../../context/CurrentContext";
import { deleteItem, removeItem } from "../../../utils/CRUDService";
import { useNavigate } from "react-router-dom";


const FlightShowCase = () => {
  const navigate = useNavigate();
  const { currentTrip, setCurrentTrip, currentArea, setCurrentArea, CurrentFlight } =
    useContext(CurrentContext);
  const { flights, setFlights, setGoBack } = useContext(GeneralContext);
  const [myFlight, setMyFlight] = useState(JSON.parse(JSON.parse(localStorage.getItem("currentFlight")).flightInfo).flights);
  const [wFlight, setwFlight] = useState(JSON.parse(localStorage.getItem("currentFlight")))
  const [load, setload] = useState(false)

  useEffect(() => {
    console.log(wFlight);
    setGoBack("/dashboard/trip-planner")
  }, []);

  const handleChangeFlight = () => {
    deleteItem("flight", wFlight.id)
    setload(!load)
  }
  useEffect(()=>{
    if(load){
      navigate('/dashboard/trip-planner/flights')
    }
  },[load])


  function formatMinutesToString(minutesAsString) {
    const minutes = parseInt(minutesAsString, 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours > 0 ? `${hours}h ` : "";
    const formattedMinutes = remainingMinutes > 0 ? `${remainingMinutes}m` : "";
    return `${formattedHours}${formattedMinutes}`;
  }
  return (
    <div className="outlined-card">
      {myFlight.map((value, i) => <div className="flights">
        <div key={i} className="flight">
          <div className="airline">
            <img src={value.airline_logo} alt="airline logo" />
            <h4>{value.airline}</h4>
          </div>
          <div className="takeoff">
            <div>
              <span>
                <FaPlaneDeparture />
              </span>
              <span>{value.departure_airport.id}</span>
            </div>
            <div>
              <span>
                <FaClock />
              </span>
              <span>
                {format(value.departure_airport.time, "HH:mm")} |{" "}
                {format(value.departure_airport.time, "dd/MM/yyyy")}
              </span>{" "}
            </div>{" "}
            <p>{value.departure_airport.name}</p>
          </div>
          <div className="duration">
            <GrNext />
            <p>{formatMinutesToString(value.duration)}</p>
            <GrNext />
          </div>
          <div className="landing">
            <div>
              <span>
                <FaPlaneArrival />
              </span>
              <span>{value.arrival_airport.id}</span>
            </div>
            <div>
              <span>
                <FaClock />
              </span>
              <span>
                {format(value.arrival_airport.time, "HH:mm")} |{" "}
                {format(value.arrival_airport.time, "dd/MM/yyyy")}
              </span>
            </div>
            <p>{value.departure_airport.name}</p>
          </div>
        </div>
      </div>)}
      <button className="primary-button" onClick={handleChangeFlight} >Change Flight</button>
    </div>
  );
};

export default FlightShowCase;
