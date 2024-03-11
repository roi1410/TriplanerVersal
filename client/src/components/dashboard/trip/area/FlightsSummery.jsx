import { format } from "date-fns";
import React from "react";
import { FaClock, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { FaCalendarDays } from "react-icons/fa6";

function FlightsSummery({ flights, price }) {
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
      {flights &&
        flights.map((v, i) => (
          <div key={i}>
            <div className="flights">
              <div className="flight flight-summary">
                <div className="airline">
                  <img src={v.airline_logo} alt="Airline logo" />
                  <h4>{v.airline}</h4>
                </div>
                <div className="takeoff">
                  <div>
                      <FaPlaneDeparture />
                    <span>{v.departure_airport.id}</span>
                  </div>
                  
                    <div>
                      <FaClock />
                      <span>{format(v.departure_airport.time, "HH:mm")}</span>
                    </div>
                    <div>
                      <FaCalendarDays />
                      <span>
                        {format(v.departure_airport.time, "dd/MM/yyyy")}
                      </span>{" "}
                    </div>
                  
                </div>
                <div className="duration">
                  <GrNext />
                </div>
                <div className="landing">
                  <div>
                      <FaPlaneArrival />
                    <span>{v.arrival_airport.id}</span>
                  </div>
                 
                    <div>
                      <FaClock />
                      <span>{format(v.arrival_airport.time, "HH:mm")}</span>
                    </div>
                    <div>
                      <FaCalendarDays />
                      <span>
                        {format(v.arrival_airport.time, "dd/MM/yyyy")}
                      </span>{" "}
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="flight-order"></div>
      <p>
        <b>Total Price:</b> {price}$
      </p>
    </div>
  );
}

export default FlightsSummery;
