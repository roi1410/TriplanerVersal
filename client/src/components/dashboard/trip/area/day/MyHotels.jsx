import React, { useContext, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { checkForUser, logout } from "../../../../../utils/AuthService";
import { GeneralContext } from "../../../../../context/GeneralContext";

function MyHotels() {
  
  const { isGuest, setUser, setGoBack } = useContext(GeneralContext);
  const navigate = useNavigate();



  return (
    <div>
       MyHotels
    </div>
  );
}

export default MyHotels;
