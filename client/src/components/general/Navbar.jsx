import "./general.css";
import React from "react";
// import image from "../../assets/pet-rock.png";
import { NavLink , useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
// import { logout } from "../../utils/AuthService";

function Navbar() {
  const { loggedIn , setLoggedIn , user } = useContext(AppContext);
  let navigate = useNavigate()

  const handleLogout = async () => {
  await logout();
  setLoggedIn(false);
   navigate("/")
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <div className="home-button" onClick={handleLogout}>
            <NavLink to="/" >
              {/* <img src={image} alt="Pet Rock" /> */}
            </NavLink>
          </div>
          <div className="navbar">
            <NavLink to="">
              <button className="transparent-button">My Resumes</button>
            </NavLink>
            <NavLink to="">
              <button className="transparent-button">Resume Templates</button>
            </NavLink>
            <NavLink onClick={handleLogout} className="profile-container">
              {user.image ? (
                <img src={user.image} alt="Profile" className="profile-image" />
              ) : (
                <FaUserCircle className="profile-icon" />
                 )}
            </NavLink>
          </div>
        </div>
      ) : (
        <div>
          <div className="home-button" onClick={handleLogout}>
            <NavLink to="/">
              {/* <img src={image} alt="Pet Rock" /> */}
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
