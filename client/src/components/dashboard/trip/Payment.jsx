import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <IoMdArrowRoundBack onClick={handleGoBack} className="go-back" /> Payment
    </div>
  );
}

export default Payment;
