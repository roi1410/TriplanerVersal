import { format } from "date-fns";
import React from "react";
import { FaClock, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { GrNext } from "react-icons/gr";

function FlightsSummery({ flights,price }) {
    function formatMinutesToString(minutesAsString) {
        const minutes = parseInt(minutesAsString, 10);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const formattedHours = hours > 0 ? `${hours}h ` : "";
        const formattedMinutes = remainingMinutes > 0 ? `${remainingMinutes}m` : "";
        return `${formattedHours}${formattedMinutes}`;
      }
  return (
    <div className="cards-container">
      {flights ? (
        flights.map((v, i) => (
          <div key={i} className="outlined-card">
            <div className="flights">
              <div  className="flight">
                <div className="airline">
                  <img src={v.airline_logo} alt="airline logo" />
                  <h4>{v.airline}</h4>
                </div>
                <div className="takeoff">
                  <div>
                    <span>
                      <FaPlaneDeparture />
                    </span>
                    <span>{v.departure_airport.id}</span>
                  </div>
                  <div>
                    <span>
                      <FaClock />
                    </span>
                    <span>
                      {format(v.departure_airport.time, "HH:mm")} |{" "}
                      {format(v.departure_airport.time, "dd/MM/yyyy")}
                    </span>{" "}
                  </div>{" "}
                  <p>{v.departure_airport.name}</p>
                </div>
                <div className="duration">
                  <GrNext />
                  <p>{formatMinutesToString(v.duration)}</p>
                  <GrNext />
                </div>
                <div className="landing">
                  <div>
                    <span>
                      <FaPlaneArrival />
                    </span>
                    <span>{v.arrival_airport.id}</span>
                  </div>
                  <div>
                    <span>
                      <FaClock />
                    </span>
                    <span>
                      {format(v.arrival_airport.time, "HH:mm")} |{" "}
                      {format(v.arrival_airport.time, "dd/MM/yyyy")}
                    </span>
                  </div>
                  <p>{v.departure_airport.name}</p>
                </div>
              </div>
            </div>
            <div className="flight-order">
              <p>
                <b>Total Price:</b> {price}$
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No flights found within the given data, please try again</p>
      )}
    </div>
  );
}

export default FlightsSummery;
