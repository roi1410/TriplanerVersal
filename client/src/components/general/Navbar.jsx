import "./general.css";
import { NavLink, useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContext";
import { useContext, useEffect } from "react";
import { IoMdLogOut, IoMdArrowRoundBack } from "react-icons/io";
import { logout } from "../../utils/AuthService";
import React, { useState } from "react";
import Modal from "react-modal";
import lightLogo from "../../assets/tripel/secondary-secondary-light.png";
import darkLogo from "../../assets/tripel/secondary-secondary-dark.png";

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
  const [logo, setLogo] = useState(lightLogo);
  const navigate = useNavigate();

  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    if (isDarkMode) {
      setLogo(darkLogo);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser({});
    navigate("/");
  };

  const handleGoBack = () =>{
    navigate(`${goBack}`);
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
              <img src={logo} alt="" onClick={handleLogout}/>
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
              <img src={logo} alt="" onClick={handleLogout}/>
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
