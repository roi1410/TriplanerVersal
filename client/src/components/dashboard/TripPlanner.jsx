import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../context/AppContext";

function TripPlanner() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };
  const handleChooseFlight = () => {
    navigate("flights");
  };
  const handleChooseArea = () => {
    navigate("area/overview");
  };
  const handlePayment = () => {
    navigate("payment");
  };

  return (
    <div>
      <div className="cards-container-center">
        {user.id && (
          <IoMdArrowRoundBack onClick={handleGoBack} className="go-back" />
        )}
        <div className="filled-card small-card" onClick={handleChooseFlight}>
          Add Flight To...
        </div>
        <div className="filled-card" onClick={handleChooseArea}>
          Add Location
        </div>
        <div className="filled-card small-card" onClick={handleChooseFlight}>
          Add Flight To...
        </div>
      </div>
        <button className="primary-button" onClick={handlePayment}>
          Payment
        </button>
    </div>
  );
}

export default TripPlanner;
