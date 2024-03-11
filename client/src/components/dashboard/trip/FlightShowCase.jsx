import React, { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { FaPlaneArrival, FaPlaneDeparture, FaClock } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { format } from "date-fns";
import "./trip.css";
import { MdPadding } from "react-icons/md";

const FlightShowCase = () => {
  const { flights, setFlights } = useContext(GeneralContext);
  const [myFlight, setMyFlight] = useState(flights[0]?.flights[0]);

  useEffect(() => {
    console.log(myFlight);
  }, []);

  const handleChangeFlight=()=>{

  }


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
      <div className="flights">
        <div className="flight">
          <div className="airline">
            <img src={myFlight.airline_logo} alt="airline logo" />
            <h4>{myFlight.airline}</h4>
          </div>
          <div className="takeoff">
            <div>
              <span>
                <FaPlaneDeparture />
              </span>
              <span>{myFlight.departure_airport.id}</span>
            </div>
            <div>
              <span>
                <FaClock />
              </span>
              <span>
                {format(myFlight.departure_airport.time, "HH:mm")} |{" "}
                {format(myFlight.departure_airport.time, "dd/MM/yyyy")}
              </span>{" "}
            </div>{" "}
            <p>{myFlight.departure_airport.name}</p>
          </div>
          <div className="duration">
            <GrNext />
            <p>{formatMinutesToString(myFlight.duration)}</p>
            <GrNext />
          </div>
          <div className="landing">
            <div>
              <span>
                <FaPlaneArrival />
              </span>
              <span>{myFlight.arrival_airport.id}</span>
            </div>
            <div>
              <span>
                <FaClock />
              </span>
              <span>
                {format(myFlight.arrival_airport.time, "HH:mm")} |{" "}
                {format(myFlight.arrival_airport.time, "dd/MM/yyyy")}
              </span>
            </div>
            <p>{myFlight.departure_airport.name}</p>
          </div>
          <button onClick={handleChangeFlight} >Change Flight</button>
        </div>
      </div>
    </div>
  );
};

export default FlightShowCase;
