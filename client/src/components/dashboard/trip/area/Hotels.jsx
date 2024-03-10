import React, { useContext, useEffect, useRef, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import Map from "../../../general/Map";
import { FaLink } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "./area.css";
import {
  fetchNearHotels,
  fetchPlaceLanLon,
} from "../../../../utils/MapService";
import hotelPNG from "../../../../assets/image.png";
import { CreateDateFromMinMax, createItem } from "../../../../utils/CRUDService";
import { CurrentContext } from "../../../../context/CurrentContext";

function Hotels() {
  const { isGuest, setUser, hotels, setHotels, mapRef, sendToLocation, isLoading,setIsLoading } =
    useContext(GeneralContext);
    const {currentArea,currentTrip}=useContext(CurrentContext)
  const today = new Date();
  const [date, setdate] = useState({
    checkIn: today.toISOString().substring(0, 10),
    checkOut: today.toISOString().substring(0, 10),
  });

  useEffect(() => {
   
      setHotels(JSON.parse(localStorage.getItem("hotelsDisplay")));
      hotels&&setIsLoading(false)
    
  }, []);

  async function handleSubmitHotels(search) {
    const res = await fetchPlaceLanLon(search);

    if (res.region_id && res.coordinates) {
      sendToLocation(res.coordinates);

      const res2 = await fetchNearHotels(res.region_id, date);
      console.log(res2);
      setHotels(res2);
      res2&&localStorage.setItem("hotelsDisplay", JSON.stringify(res2));
      setIsLoading(false)
    }
  }
  async function addHotelToTrip(data) {
console.log(data);
const res= await createItem("hotel",currentArea.id,data)
console.log(res);
console.log(res.data.hotel.id);
await CreateDateFromMinMax(data.checkIn,data.checkOut,currentTrip.id,{hotelId:res.data.hotel.id})
  }



  return (
    <div>
      <div className="hotels-container">
        <div className="cards-container">
          {isLoading ? (
            // Loader
            <Skeleton className="filled-card" count={20} />
          ) :hotels ? (
            
            
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
                  <button onClick={()=>addHotelToTrip(hotel)}>add to fav</button>
                </div>
              );
            })
          ) : (
            <p>Location not found, please try again</p>
          )}

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
