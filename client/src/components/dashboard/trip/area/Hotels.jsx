import React, { useContext, useEffect } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import Map from "../../../general/Map";
import "./area.css"

function Hotels() {
  const { isGuest, setUser , hotels , setHotels } = useContext(GeneralContext);

  return (
    <div>
      <div className="hotels-container">
        <div className="cards-container">
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
        </div>
        <div className="map-container">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default Hotels;
