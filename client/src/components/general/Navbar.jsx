import "./general.css";
import { NavLink, useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContext";
import { useContext } from "react";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "../../utils/AuthService";
import React, { useState } from "react";
import Modal from "react-modal";

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
  const { user ,setUser } = useContext(GeneralContext);
  let navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser({});
    navigate("/");
  };

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
          <div className="home-button" onClick={handleLogout}>
            <NavLink to="/">
              <button>Home</button> 
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
          <button className="outlined-button" onClick={closeModal}>Cancel</button>
          <button className="primary-button" onClick={handleLogout}>Logout</button>
        </div>
      </Modal>
        </div>
      ) : (
        <div>
          <div className="home-button" onClick={handleLogout}>
            <NavLink to="/">
              <b>Home</b>
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
