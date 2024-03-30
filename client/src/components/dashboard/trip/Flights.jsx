import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GeneralContext } from "../../../context/GeneralContext";
import airportData from "../../../assets/airport.json";
import flags from "../../../assets/flags.json";

import { CreateDateFromMinMax, createItem, findFlights } from "../../../utils/CRUDService";
import { FaPlaneArrival, FaPlaneDeparture, FaClock } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "./trip.css";
import { CurrentContext } from "../../../context/CurrentContext";
import { login } from "../../../utils/AuthService";


function Flights() {

  const { setUser, isLoading, setIsLoading , flights , setFlights, myFlights, setMyFlights , setGoBack} = useContext(GeneralContext);
  const { currentTrip, setCurrentTrip, currentArea, setCurrentArea,currentFlight,setCurrentFlight } =
  useContext(CurrentContext);
  const navigate = useNavigate();
  const [showFrom, setShowFrom] = useState([]);
  const [flightOrderObj, setFlightOrderObj] = useState({});


  const handleGoBack = () => {
    navigate("/dashboard/trip-planner");
  };

  const getflights = async (v) => {
    console.log(v);
    setIsLoading(true);
    const flights = await findFlights(v);
    console.log(flights.data);
    setFlights(flights.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(false);
    setGoBack("/dashboard/trip-planner")
   
  }, []);

  const handleInputFrom = (e) => {
    const lowerSearchString = e.toLowerCase();
    const tempArr = airportData.filter((obj) =>
      Object.values(obj).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowerSearchString)
      )
    );
    console.log(tempArr.slice(0, 7));
    setShowFrom(tempArr.slice(0, 7));
    setFlightOrderObj({ ...flightOrderObj, depAP: e });
  };
  const handleInputTo = (e) => {
    const lowerSearchString = e.toLowerCase();
    const tempArr = airportData.filter((obj) =>
      Object.values(obj).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowerSearchString)
      )
    );
    console.log(tempArr.slice(0, 7));
    setShowFrom(tempArr.slice(0, 7));
    setFlightOrderObj({ ...flightOrderObj, arrAP: e });
  };

  function formatMinutesToString(minutesAsString) {
    const minutes = parseInt(minutesAsString, 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours > 0 ? `${hours}h ` : "";
    const formattedMinutes = remainingMinutes > 0 ? `${remainingMinutes}m` : "";
    return `${formattedHours}${formattedMinutes}`;
  }

  const handleChooseFlight = async (index) => {
    const selectedFlight = flights[index];
    const minDate = selectedFlight.flights[0].departure_airport.time
    const maxDate = selectedFlight.flights[selectedFlight.flights.length-1].arrival_airport.time
    const res = await createItem("flight",currentTrip.id,{flightName:selectedFlight.booking_token,flightInfo:JSON.stringify(selectedFlight)})
    console.log(res.data.flight);
    const flightId = {flightId:res.data.flight.id}
    console.log(flightId);
    await CreateDateFromMinMax(minDate,maxDate,currentTrip.id,flightId)
    .then(()=>
    navigate("/dashboard/trip-planner"),
    setMyFlights((prev)=>[...prev, selectedFlight]),
    setCurrentFlight(flightId)
    )
  };

  return (
    <div>
      <div>
        <div className="flight-inputs">
          <label>
            <FaPlaneDeparture />{" "}
            <input
              type="text"
              name="from"
              list="cityname"
              onChange={(e) => handleInputFrom(e.target.value)}
            />
          </label>
          <datalist id="cityname">
            {showFrom.map((v, i) => (
              <div>
                <option key={i} value={v.iata_code}>
                  {" "}
                  {v.name} | {v.country}
                </option>
              </div>
            ))}
          </datalist>
          <label>
            <FaPlaneArrival />{" "}
            <input
              type="text"
              name="to"
              list="cityname"
              onChange={(e) => handleInputTo(e.target.value)}
            />
          </label>
          <datalist id="cityname">
            {showFrom.map((v, i) => (
              <option key={i} value={v.iata_code}>
                {v.name} | {v.country}
              </option>
            ))}
          </datalist>
          <label>
            <FaClock />
            <input
              type="date"
              id="dateInput"
              min={format(new Date(), "yyyy-MM-dd")}
              max="27/09/2024" //is there a need for max?
              onChange={(e) =>
                setFlightOrderObj({ ...flightOrderObj, depTM: e.target.value })
              }
            />
          </label>
          <button
            className="primary-button"
            onClick={() => getflights(flightOrderObj)}
          >
            Submit
          </button>
        </div>
        <div className="cards-container">
          {isLoading ? (
            <Skeleton count={3} className="flight-skeleton outlined-card" />
          ) : flights[0]?.flights ? (
            flights.map((e, i) => (
              <div key={i} className="outlined-card">
                <div className="flights">
                  {e.flights.map((v, i1) => (
                    <div key={i1} className="flight">
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
                  ))}
                </div>
                <div className="flight-order">
                  <p>
                    <b>Total Price:</b> {e.price}$
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => handleChooseFlight(i)}
                  >
                    Select Flight
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{marginTop:"2rem"}}>No flights found within the given data, please try again</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flights;
