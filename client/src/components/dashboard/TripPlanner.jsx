import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function TripPlanner() {
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
      <IoMdArrowRoundBack onClick={handleGoBack} className="go-back"/>
      <button onClick={handleChooseFlight}>Choose Flight</button>
      <button onClick={handleChooseArea}>Choose Area</button>
      <button onClick={handlePayment}>Payment</button>
    </div>
  );
}

export default TripPlanner;
