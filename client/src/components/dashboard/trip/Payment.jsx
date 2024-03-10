import React, { useContext, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GeneralContext } from "../../../context/GeneralContext";
import { checkForUser , logout } from "../../../utils/AuthService";

function Payment() {
  const {isGuest ,setUser, setGoBack} = useContext(GeneralContext)
  const navigate = useNavigate();


  useEffect(() => {
      setGoBack("/dashboard/trip-planner");
  }, []);
 

  return (
    <div>
       Payment
    </div>
  );
}

export default Payment;
