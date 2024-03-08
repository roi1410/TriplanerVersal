import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../../context/AppContext";
import { checkForUser } from "../../../utils/AuthService";
import airportData from '../../../assets/airport.json'
import flags from '../../../assets/flags.json'
import { findFlights } from "../../../utils/CRUDService";


function Flights() {
  const { setUser } = useContext(AppContext)
  const navigate = useNavigate();
  const [showFrom, setShowFrom] = useState([])
  const [flightOrderObj, setFlightOrderObj] = useState({})
  const [flightFound, setFlightFound] = useState([])

  const handleGoBack = () => {
    navigate(-1);
  };
  const getflights = async (v) => {
    const flights = await findFlights(v)
    console.log(flights.data);
    setFlightFound(flights.data)
  };


  const handleInputFrom = (e) => {
    const lowerSearchString = e.toLowerCase();
    const tempArr = airportData.filter(obj =>
      Object.values(obj).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(lowerSearchString)
      )
    );
    console.log(tempArr.slice(0, 7));
    setShowFrom(tempArr.slice(0, 7))
    setFlightOrderObj({...flightOrderObj,depAP:e})
  };
  const handleInputTo = (e) => {
    const lowerSearchString = e.toLowerCase();
    const tempArr = airportData.filter(obj =>
      Object.values(obj).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(lowerSearchString)
      )
    );
    console.log(tempArr.slice(0, 7));
    setShowFrom(tempArr.slice(0, 7))
    setFlightOrderObj({...flightOrderObj,arrAP:e})
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
      <IoMdArrowRoundBack onClick={handleGoBack} className="go-back" />

      <div>
        <span>from</span>
        <input type="text" name="from" list="cityname" onChange={(e) => handleInputFrom(e.target.value)} />
        <datalist id="cityname">
          {
            showFrom.map((v, i) =><div>
              <option key={i} value={v.iata_code}> {v.name} | {v.country}</option>
            </div>
            )}
        </datalist>
        <span>          to</span>
        <input type="text" name="to" list="cityname" onChange={(e) => handleInputTo(e.target.value)} />
        <datalist id="cityname">
          {
            showFrom.map((v, i) =>
              <option key={i} value={v.iata_code}>{v.name} | {v.country}</option>

            )}
        </datalist>
        <br />
        <span>at</span>
        <input type="date" id="dateInput" min="13/09/2024" max="27/09/2024" onChange={(e)=>setFlightOrderObj({...flightOrderObj,depTM:e.target.value})}/>
      <button onClick={()=>console.log(flightOrderObj)}>tst</button>
      <button onClick={()=>getflights(flightOrderObj)}>order</button>
      <div>
        {flightFound.map((e,i)=>
        <div style={{backgroundColor:"aliceblue"}} key={i}>
          {e.flights.map((v,i1)=>
          <div key={i1}>
            <span>from {v.departure_airport.name} at {v.departure_airport.time}</span>
            <br />
            <span>from {v.arrival_airport.name} at {v.arrival_airport.time}</span>
          </div>
          )}
          <span>price: {e.price}$ </span>
        </div>
        )}
      </div>

      </div>

    </div>
  );
}

export default Flights