import React, { useContext, useEffect } from "react";
import { checkForUser, logout } from "../../../../utils/AuthService";
import { AppContext } from "../../../../context/AppContext";

function Hotels() {

  const { isGuest, setUser } = useContext(AppContext);

  
  return (
    <div>
      <div className="hotels-container">
        <div className="cards-container">
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
          <div className="filled-card">Choose Hotel...</div>
        </div>
        <div>Map</div>
      </div>
    </div>
  );
}

export default Hotels;
