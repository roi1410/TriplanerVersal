import React, { useContext, useEffect } from "react";
import { checkForUser } from "../../../../utils/AuthService";
import { AppContext } from "../../../../context/AppContext";
function Hotels() {
  const { setUser } = useContext(AppContext);
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
