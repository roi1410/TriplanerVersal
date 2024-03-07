import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GeneralContext } from "../../../context/GeneralContext";
import { checkForUser , logout } from "../../../utils/AuthService";


function Flights() {
  const {isGuest , setUser} = useContext(GeneralContext)
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

  
    return (
      <div>
        <IoMdArrowRoundBack onClick={handleGoBack} className="go-back" /> Flights
      </div>
    );
}

export default Flights