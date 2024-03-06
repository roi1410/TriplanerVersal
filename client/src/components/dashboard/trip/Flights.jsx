import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../../context/AppContext";
import { checkForUser } from "../../../utils/AuthService";


function Flights() {
  const {setUser} = useContext(AppContext)
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

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
        <IoMdArrowRoundBack onClick={handleGoBack} className="go-back" /> Flights
      </div>
    );
}

export default Flights