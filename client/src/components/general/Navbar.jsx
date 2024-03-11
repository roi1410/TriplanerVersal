import "./general.css";
import { NavLink, useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContext";
import React, { createContext, useEffect, useState, useContext } from "react";
import { IoMdLogOut, IoMdArrowRoundBack } from "react-icons/io";
import { logout } from "../../utils/AuthService";
import Modal from "react-modal";

import { CurrentContext } from "../../context/CurrentContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "2rem 1.5rem",
    borderRadius: "0.5rem",
  },
};

function Navbar() {
  const { user, setUser, setGoBack, goBack } = useContext(GeneralContext);
  const {currentLogo, setCurrentLogo} = useContext(CurrentContext);
  const navigate = useNavigate();



  const handleLogout = async () => {
    await logout();
    setUser({});
    navigate("/");
  };

  const handleGoBack = () =>{
    navigate(`${goBack}`);
    if(goBack=="/dashboard"){
      localStorage.removeItem("currentTrip")
    }else if(goBack=="/dashboard/trip-planner"){
      localStorage.removeItem("currentArea")
      localStorage.removeItem("currentFlight")
      localStorage.removeItem("currentDay")
    }

    setGoBack("")
  }

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {user.id ? (
        <div>
          <div className="home-button" >
            {goBack != "" && <IoMdArrowRoundBack onClick={handleGoBack} className="go-back" />}
            <NavLink to="/">
              <img src={currentLogo} alt="" onClick={handleLogout}/>
            </NavLink>
          </div>
          <div className="navbar">
            <IoMdLogOut onClick={openModal} className="logout" />
          </div>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            appElement={document.getElementById("root")}
            contentLabel="Logout Modal"
          >
            <h3>Do you want to logout?</h3>
            <div className="modal-buttons">
              <button className="outlined-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="delete-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </Modal>
        </div>
      ) : (
        <div>
          <div className="home-button" >
            <NavLink to="/">
              <img src={currentLogo} alt="" onClick={handleLogout}/>
            </NavLink>
          </div>
          <div className="navbar">
            <NavLink to="/register">
              <button className="outlined-button">Register</button>
            </NavLink>
            <NavLink to="/login">
              <button className="primary-button">Login</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
