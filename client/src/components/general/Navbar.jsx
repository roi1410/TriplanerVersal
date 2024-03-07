import "./general.css";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "../../utils/AuthService";

function Navbar() {
  const { user ,setUser } = useContext(AppContext);
  let navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser({});
    navigate("/");
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
            <IoMdLogOut onClick={handleLogout} className="logout" />
          </div>
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
