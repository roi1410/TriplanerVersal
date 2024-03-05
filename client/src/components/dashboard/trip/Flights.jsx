import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";


function Flights() {
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