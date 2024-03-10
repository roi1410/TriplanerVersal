import React, { useContext, useEffect, useRef, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import Map from "../../../general/Map";
import "./area.css";
import {
  fetchNearHotels,
  fetchPlaceLanLon,
} from "../../../../utils/MapService";
import hotelPNG from "../../../../assets/image.png";

function Hotels() {
  const { isGuest, setUser, hotels, setHotels, mapRef, sendToLocation } =
    useContext(GeneralContext);
  const today = new Date();
  const [date, setdate] = useState({
    checkIn: today.toISOString().substring(0, 10),
    checkOut: today.toISOString().substring(0, 10),
  });

  useEffect(() => {
    setHotels(JSON.parse(localStorage.getItem("hotelsDisplay")));
  }, []);

  async function handleSubmitHotels(search) {
    const res = await fetchPlaceLanLon(search);

    if (res.region_id && res.coordinates) {
      sendToLocation(res.coordinates);

      const res2 = await fetchNearHotels(res.region_id, date);
      setHotels(res2);
      localStorage.setItem("hotelsDisplay", JSON.stringify(res2));
    }
  }

  return (
    <div>
      <div className="hotels-container">
        <div className="cards-container">
          {hotels ? (
            hotels.map((hotel, index) => {
              return (
                <div key={index} className="filled-card">
                  <h4>{hotel.name}</h4>
                  <img src={hotel.image} alt="" />
                  <span className="checkedInAndOut">
                    checkIn-{hotel.checkIn}_______________checkOut-
                    {hotel.checkOut}
                  </span>
                  <span className="price">Price-{hotel.price}</span>
                </div>
              );
            })
          ) : (
            <div className="filled-card"> no hotels provided</div>
          )}

          <></>
        </div>
        <div className="map-container">
          <Map
            mapType={"hotels"}
            handleSubmit={handleSubmitHotels}
            sendToLocation={sendToLocation}
            setdate={setdate}
            today={today}
            PNG={hotelPNG}
          />
        </div>
      </div>
    </div>
  );
}

export default Hotels;
